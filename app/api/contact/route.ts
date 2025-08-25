import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_KEY);

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API - API Key exists:', !!process.env.RESEND_KEY);
    
    const { name, email, phone, subject, message } = await request.json();
    console.log('Contact API - Received data:', { name, email, phone, subject, message });

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Nombre, email, asunto y mensaje son campos requeridos' },
        { status: 400 }
      );
    }

    console.log('Contact API - Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: 'Dream2Go Contacto <onboarding@resend.dev>',
      to: ['travelxtravel2025@gmail.com'],
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            Nuevo mensaje de contacto - Dream2Go
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
            <p><strong>Asunto:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Mensaje:</h3>
            <div style="background-color: #ffffff; border-left: 4px solid #16a34a; padding: 15px; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              📧 Responder a: <a href="mailto:${email}" style="color: #16a34a;">${email}</a>
              ${phone ? `<br>📞 Teléfono: ${phone}` : ''}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Contact API - Resend error:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje', details: error },
        { status: 500 }
      );
    }

    console.log('Contact API - Email sent successfully:', data);
    return NextResponse.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API - Catch error:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}