import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.dreamhost.com", // DreamHost SMTP Server
      port: 587, // Use 587 for STARTTLS or 465 for SSL
      secure: false, // Set true if using port 465
      auth: {
        user: process.env.EMAIL_USER, // Your DreamHost email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: `"KVIK Studios" <${process.env.EMAIL_USER}>`, // Must match authenticated email
      to: "support@kvikstudios.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email Send Error:", error.message);
    return NextResponse.json({ error: "Failed to send email", details: error.message }, { status: 500 });
  }
}
