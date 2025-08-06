// api/subscribe.ts - Newsletter subscription endpoint
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const post: APIRoute = async ({ request }) => {
  const { name, email } = await request.json();

  // Validate the data
  if (!email || typeof email !== 'string' || !name || typeof name !== 'string') {
    return new Response(
      JSON.stringify({
        error: 'Name and valid email are required'
      }),
      { status: 400 }
    );
  }

  // Connect to Resend API
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    await resend.emails.send({
      from: 'newsletter@yourdomain.com',
      to: 'your@email.com',
      subject: 'New Newsletter Subscription',
      text: `New subscriber: ${name} <${email}>`
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process subscription'
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Thank you for subscribing!'
    }),
    { status: 200 }
  );
};
