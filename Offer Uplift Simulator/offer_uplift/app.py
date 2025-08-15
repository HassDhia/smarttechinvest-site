from __future__ import annotations

import json
import os
import sqlite3
from datetime import datetime, timezone
from typing import Any, Dict, List

from flask import Flask, jsonify, make_response, render_template, request, redirect
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests

try:
    from weasyprint import HTML  # type: ignore
    WEASYPRINT_AVAILABLE = True
except Exception:
    WEASYPRINT_AVAILABLE = False

app = Flask(__name__, static_folder="static", template_folder="templates")
DB_PATH = os.path.join(os.path.dirname(__file__), "offer_uplift.db")

def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db() -> None:
    conn = get_db_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS offer_uplift_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            event_type TEXT NOT NULL,
            email TEXT,
            payload_json TEXT,
            result_json TEXT,
            ip TEXT,
            ua TEXT
        );
        """
    )
    conn.commit()
    conn.close()

# Initialize DB once at import time (Flask 3.x removed before_first_request)
init_db()

def format_currency(value: float, currency_symbol: str = "$") -> str:
    try:
        return f"{currency_symbol}{value:,.2f}"
    except Exception:
        return f"{currency_symbol}{value}"

def format_percent(value: float) -> str:
    try:
        return f"{value*100:.2f}%" if abs(value) < 1.01 else f"{value:.2f}%"
    except Exception:
        return str(value)

def format_number(value: float) -> str:
    try:
        return f"{value:,.2f}"
    except Exception:
        return str(value)

# Register Jinja filters
app.add_template_filter(format_currency, name="currency")
app.add_template_filter(format_percent, name="percent")
app.add_template_filter(format_number, name="num")

def safe_div(n: float, d: float, default: float = 0.0) -> float:
    return n / d if d not in (0, 0.0) else default

def simulate(payload: Dict[str, Any]) -> Dict[str, Any]:
    P0 = float(payload.get("P0", 1000))
    i_pct = float(payload.get("i_pct", 10))
    d_pct = float(payload.get("d_pct", 5))
    L = int(payload.get("L", 100))
    w0_pct = float(payload.get("w0_pct", 20))
    cost_model = payload.get("cost_model", "margin")
    g_pct = float(payload.get("g_pct", 70))
    C = float(payload.get("C", 300))
    F = float(payload.get("F", 50000))
    is_sub = str(payload.get("is_sub", "true")).lower() == "true"

    i = i_pct / 100.0
    d = d_pct / 100.0
    w0 = w0_pct / 100.0

    P1 = P0 * (1 + i)
    U0 = L * w0
    U1 = L * w0 * (1 - d)

    if cost_model == "margin":
        g = g_pct / 100.0
        unit_cost_0 = P0 * (1 - g)
        unit_cost_1 = P1 * (1 - g)
        d_star = i / (1 + i) if (1 + i) != 0 else 0.0
    else:
        unit_cost_0 = C
        unit_cost_1 = C
        denom = (P1 - unit_cost_1)
        if denom == 0:
            d_star = 0.0
        else:
            d_star = 1 - ((P0 - unit_cost_0) / denom)

    R0 = P0 * U0
    R1 = P1 * U1
    GP0 = (P0 - unit_cost_0) * U0
    GP1 = (P1 - unit_cost_1) * U1
    NP0 = GP0 - F
    NP1 = GP1 - F
    ARR0 = 12 * R0 if is_sub else 0.0
    ARR1 = 12 * R1 if is_sub else 0.0

    margin0 = safe_div(GP0, R0, 0.0)
    margin1 = safe_div(GP1, R1, 0.0)
    cushion = d_star - d

    profit_x = list(range(0, 41))
    profit_y: List[float] = []
    for d_pct_sim in profit_x:
        d_sim = d_pct_sim / 100.0
        U1_sim = L * w0 * (1 - d_sim)
        if cost_model == "margin":
            unit_cost_1_sim = P1 * (1 - (g_pct / 100.0))
        else:
            unit_cost_1_sim = C
        GP1_sim = (P1 - unit_cost_1_sim) * U1_sim
        NP1_sim = GP1_sim - F
        profit_y.append(NP1_sim)

    arr_x = list(range(0, 51))
    arr_y: List[float] = []
    for i_pct_sim in arr_x:
        i_sim = i_pct_sim / 100.0
        P1_sim = P0 * (1 + i_sim)
        U1_fixed_d = L * w0 * (1 - d)
        R1_sim = P1_sim * U1_fixed_d if is_sub else 0.0
        arr_y.append(12 * R1_sim if is_sub else 0.0)

    out = dict(
        P0=P0,
        P1=P1,
        i_pct=i_pct,
        d_pct=d_pct,
        L=L,
        w0_pct=w0_pct,
        cost_model=cost_model,
        g_pct=g_pct,
        C=C,
        F=F,
        is_sub=is_sub,
        U0=U0,
        U1=U1,
        R0=R0,
        R1=R1,
        GP0=GP0,
        GP1=GP1,
        NP0=NP0,
        NP1=NP1,
        ARR0=ARR0,
        ARR1=ARR1,
        margin0=margin0,
        margin1=margin1,
        d_star=d_star,
        cushion=cushion,
        chart_profit_x=profit_x,
        chart_profit_y=profit_y,
        chart_arr_x=arr_x,
        chart_arr_y=arr_y,
    )
    return out


def send_email_via_resend(to_email: str, subject: str, html: str, text: str) -> bool:
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        return False
    from_email = os.environ.get("OFFER_FROM_EMAIL", "onboarding@resend.dev")
    try:
        resp = requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            data=json.dumps({
                "from": from_email,
                "to": [to_email],
                "subject": subject,
                "html": html,
                "text": text,
            }),
            timeout=10,
        )
        return 200 <= resp.status_code < 300
    except Exception:
        return False


def send_email_via_smtp(to_email: str, subject: str, html: str, text: str) -> bool:
    host = os.environ.get("SMTP_HOST")
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASS")
    port = int(os.environ.get("SMTP_PORT", "587"))
    if not (host and user and password):
        return False
    from_email = os.environ.get("OFFER_FROM_EMAIL", user)
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = from_email
        msg["To"] = to_email
        msg.attach(MIMEText(text, "plain"))
        msg.attach(MIMEText(html, "html"))
        with smtplib.SMTP(host, port, timeout=10) as server:
            server.starttls()
            server.login(user, password)
            server.sendmail(from_email, [to_email], msg.as_string())
        return True
    except Exception:
        return False

@app.get("/offer-uplift")
def offer_uplift() -> Any:
    defaults = dict(P0=1000, i_pct=10, d_pct=5, L=100, w0_pct=20,
                    cost_model="margin", g_pct=70, C=300, F=50000, is_sub="true")
    result = simulate(defaults)
    return render_template("offer_uplift.html", state={**defaults, **result})


@app.get("/")
def root() -> Any:
    return redirect("/offer-uplift")

@app.post("/offer-uplift/simulate")
def offer_uplift_sim() -> Any:
    payload = request.form.to_dict()
    if "is_sub" not in payload:
        payload["is_sub"] = "false"
    result = simulate(payload)
    return render_template("partials/ou_results.html", state=result)

@app.post("/offer-uplift/export")
def offer_uplift_export() -> Any:
    payload = request.form.to_dict()
    if "is_sub" not in payload:
        payload["is_sub"] = "false"
    result = simulate(payload)
    html = render_template("offer_uplift_print.html", state={**payload, **result})
    if WEASYPRINT_AVAILABLE:
        pdf = HTML(string=html).write_pdf()
        resp = make_response(pdf)
        resp.headers["Content-Type"] = "application/pdf"
        resp.headers["Content-Disposition"] = "attachment; filename=offer_uplift.pdf"
        return resp
    return make_response(html)

@app.post("/offer-uplift/email")
def offer_uplift_email() -> Any:
    payload = request.form.to_dict()
    email = payload.get("email", "").strip()
    # Basic validation
    if not email:
        return jsonify({"ok": False, "message": "Please enter your email above."})
    # Compute a brief result snapshot for the email body
    try:
        result = simulate(payload)
    except Exception:
        result = {}
    # Store an event so we can follow up later (minimal PII)
    try:
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO offer_uplift_events (created_at, event_type, email, payload_json, result_json, ip, ua) VALUES (?,?,?,?,?,?,?)",
            (
                datetime.now(timezone.utc).isoformat(),
                "email_request",
                email,
                json.dumps(payload),
                json.dumps(result) if result else None,
                request.headers.get("x-forwarded-for", request.remote_addr),
                request.headers.get("user-agent", ""),
            ),
        )
        conn.commit()
        conn.close()
    except Exception:
        pass
    # Send email to operator (default: has.dhia@gmail.com)
    notify_to = os.environ.get("OFFER_NOTIFY_EMAIL", "has.dhia@gmail.com")
    subject = "New Offer Uplift Model Request"
    html = f"""
      <h2>Offer Uplift Model Request</h2>
      <p><strong>User Email:</strong> {email}</p>
      <p><strong>Inputs</strong></p>
      <pre style='white-space:pre-wrap'>{json.dumps(payload, indent=2)}</pre>
      <hr />
      <p><strong>Key Results</strong></p>
      <pre style='white-space:pre-wrap'>{json.dumps({k: result.get(k) for k in ['P0','P1','R0','R1','GP0','GP1','NP0','NP1','margin0','margin1','ARR0','ARR1','d_star'] if result}, indent=2)}</pre>
    """
    text = f"Offer Uplift Model Request\n\nUser Email: {email}\n\nInputs:\n{json.dumps(payload, indent=2)}\n\nKey Results:\n{json.dumps({k: result.get(k) for k in ['P0','P1','R0','R1','GP0','GP1','NP0','NP1','margin0','margin1','ARR0','ARR1','d_star'] if result}, indent=2)}\n"

    delivered = send_email_via_resend(notify_to, subject, html, text) or send_email_via_smtp(notify_to, subject, html, text)
    if delivered:
        return make_response('<span class="text-green-700">Thanks! I\'ll email you the model and raise sequence shortly.</span>')
    else:
        return make_response('<span class="text-yellow-700">Request received. Email service is not configured; we\'ll follow up manually.</span>')

if __name__ == "__main__":
    # Render and many PaaS platforms provide $PORT and require binding to 0.0.0.0
    port = int(os.environ.get("PORT", "10000"))
    debug = os.environ.get("FLASK_DEBUG", "0") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug, use_reloader=False)
