import { Resend } from "resend";
import { Email } from "./email";
import { NextResponse } from "next/server";
import EmailTemplate from "@/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const res = await req.json();
  try {
    const data = await resend.emails.send({
      from: "Doctor-Appointment-Booking@example.com",
      to: [response.data.Email],
      subject: "Appointment Conformation",
      react: EmailTemplate({ response }),
    });
    return NextResponse.json({ data: "Email Sent" });
  } catch (err) {
    return NextResponse.json({ error });
  }
}
