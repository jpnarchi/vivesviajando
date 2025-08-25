import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_KEY);

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('API Key exists:', !!process.env.RESEND_KEY);
    
    const { name, email, destino, fecha } = await request.json();
    console.log('Received data:', { name, email, destino, fecha });

    if (!name || !email || !destino || !fecha) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    console.log('Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: 'Dream2Go <onboarding@resend.dev>',
      to: ['travelxtravel2025@gmail.com'],
      subject: `Nueva solicitud de cotización - ${destino}`,
      html: `
        <h2>Nueva solicitud de cotización</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Fecha de viaje:</strong> ${fecha}</p>
        <br>
        <p>Contactar al cliente en: ${email}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { message: 'Solicitud enviada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Catch error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    );
  }
}