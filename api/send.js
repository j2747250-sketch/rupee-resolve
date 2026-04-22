import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { name, phone, issue } = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'j2747250@gmail.com',
      subject: 'New Lead - Rupee Resolve',
      text: `Name: ${name}\nPhone: ${phone}\nIssue: ${issue}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
}
