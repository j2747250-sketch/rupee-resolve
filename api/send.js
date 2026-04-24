import { Resend } from 'resend';

export default async function handler(req, res) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, phone, issue } = req.body;

    if (!name || !phone || !issue) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await resend.emails.send({
      from: 'Rupee Resolve <hello@rupeeresolve.com>',
      to: 'support@rupeeresolve.com',
      subject: `New Lead - ${name}`,
      html: `
        <h2>New Lead</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Issue:</b><br/>${issue}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
