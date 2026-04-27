export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, phone, issue } = req.body;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Rupee Resolve",
          email: "leadz@rupeeresolve.com",
        },
        to: [
          {
            email: "support@rupeeresolve.com", // <-- PUT YOUR EMAIL
          },
        ],
        subject: "New Lead - Rupee Resolve",
        htmlContent: `
          <h2>New Lead</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Issue:</b> ${issue}</p>
          <p><a href="https://wa.me/${phone}">Chat on WhatsApp</a></p>
        `,
      }),
    });

    const data = await response.json();

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
