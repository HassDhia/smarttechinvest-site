export function KPIStat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl p-4 bg-[#0f2544] text-white">
      <div className="text-2xl font-extrabold tracking-tight">{value}</div>
      <div className="font-semibold opacity-90">{label}</div>
      {hint ? <div className="text-sm opacity-80 mt-0.5">{hint}</div> : null}
    </div>
  );
}


