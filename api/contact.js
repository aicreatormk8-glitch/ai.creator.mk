const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, service, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Вкажіть ім'я та email" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aicreatormk8@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // Письмо тебе
    await transporter.sendMail({
      from: '"AI Creator MK" <aicreatormk8@gmail.com>',
      to: "aicreatormk8@gmail.com",
      subject: `Нова заявка — ${service || "AI-проєкт"}`,
      html: `
        <h2>Нова заявка з сайту</h2>
        <p><b>Ім'я:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Напрям:</b> ${service || "—"}</p>
        <p><b>Деталі:</b><br>${message || "—"}</p>
      `,
    });

    // Підтвердження заявнику
    await transporter.sendMail({
      from: '"AI Creator MK" <aicreatormk8@gmail.com>',
      to: email,
      subject: "Ваша заявка отримана — AI Creator MK",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#06060c;color:#f6f7ff;border-radius:16px;">
          <h2 style="color:#b17fff;margin-top:0;">Дякуємо за заявку! 🎉</h2>
          <p>Привіт, <b>${name}</b>!</p>
          <p>AI Creator MK отримала ваше повідомлення. Зв'яжемося з вами найближчим часом.</p>
          <hr style="border-color:#222;margin:24px 0;" />
          <p style="font-size:0.9em;color:#888;">Напрям: ${service || "—"}</p>
          <p style="font-size:0.85em;color:#666;">© AI Creator MK · @ai.creator.mk</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Помилка відправки" });
  }
};
