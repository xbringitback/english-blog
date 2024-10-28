import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/welcome";
import prisma from "@/libs/prismadb";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(to: string) {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Confirm subscription",
      react: WelcomeEmail({}),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to send welcome email: ${error.message}`);
    } else {
      throw new Error("Failed to send welcome email: Unknown error");
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Subscriber in der Datenbank speichern
    await prisma.subscriber.create({
      data: {
        email: email,
      },
    });

    await sendWelcomeEmail(email);

    res.status(200).json({ message: "Welcome email sent successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
}
