import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      customerNumber, 
      postalCode, 
      email, 
      address, 
      postLocation, 
      phone, 
      moveDate, 
      ownerType 
    } = body;

    // Check for SMTP environment variables
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error("Missing SMTP environment variables.");
      return NextResponse.json(
        { error: "E-posttjenesten (SMTP) er ikke konfigurert ennå i .env.local" },
        { status: 500 }
      );
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports (like 587)
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Hime Flytteskjema" <${SMTP_USER}>`,
      to: "post@mktv.no",
      subject: `Flyttemelding: ${name} (${address})`,
      replyTo: email || SMTP_USER,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #003C46; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Flyttemelding</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #003C46; border-bottom: 1px solid #eee; padding-bottom: 10px;">Personopplysninger</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Navn:</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              ${customerNumber ? `<tr><td style="padding: 8px 0; color: #666;">Kundenummer:</td><td style="padding: 8px 0; font-weight: bold;">${customerNumber}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #666;">E-post:</td><td style="padding: 8px 0; font-weight: bold;">${email || "Ikke oppgitt"}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Telefon:</td><td style="padding: 8px 0; font-weight: bold;">${phone}</td></tr>
            </table>

            <h2 style="color: #003C46; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Flyttedetaljer</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Flyttedato:</td><td style="padding: 8px 0; font-weight: bold;">${moveDate || "Ikke oppgitt"}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Eier/Leier:</td><td style="padding: 8px 0; font-weight: bold;">${ownerType}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Adresse:</td><td style="padding: 8px 0; font-weight: bold;">${address}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Postnummer/sted:</td><td style="padding: 8px 0; font-weight: bold;">${postalCode} ${postLocation}</td></tr>
            </table>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; font-size: 12px; color: #999; text-align: center;">
            Denne meldingen er sendt automatisk fra flytteskjemaet på hime.no
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json(
      { error: "Det oppsto en feil under sending. Sjekk SMTP-innstillingene dine." },
      { status: 500 }
    );
  }
}
