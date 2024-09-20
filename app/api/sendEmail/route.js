import { Resend } from "resend";
// import { Email } from "./emails";
import { NextResponse } from "next/server";
import EmailTemplate from "@/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const res = await req.json();
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [res.data.Email],
      subject: "Appointment Conformation",
      react: EmailTemplate({ res }),
    });
    return NextResponse.json({ data: "Email Sent" });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
