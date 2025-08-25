import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_KEY);

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('Quote API - API Key exists:', !!process.env.RESEND_KEY);
    
    const formData = await request.json();
    console.log('Quote API - Received data:', formData);

    const { nombre, apellidos, email, telefono } = formData;

    if (!nombre || !apellidos || !email || !telefono) {
      return NextResponse.json(
        { error: 'Nombre, apellidos, email y teléfono son campos requeridos' },
        { status: 400 }
      );
    }

    console.log('Quote API - Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: 'Dream2Go Cotizaciones <onboarding@resend.dev>',
      to: ['travelxtravel2025@gmail.com'],
      subject: `Nueva solicitud de cotización - ${nombre} ${apellidos}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; font-size: 28px; margin-bottom: 10px;">
              Nueva Solicitud de Cotización
            </h1>
            <p style="color: #6b7280; font-size: 16px;">Dream2Go Travel</p>
          </div>
          
          <!-- Datos Personales -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h2 style="color: #16a34a; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #16a34a; padding-bottom: 5px;">
              👤 Datos Personales
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${nombre}</p>
              <p style="margin: 5px 0;"><strong>Apellidos:</strong> ${apellidos}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${telefono}</p>
            </div>
            ${formData.fechaNacimiento ? `<p style="margin: 5px 0;"><strong>Fecha de nacimiento:</strong> ${formData.fechaNacimiento}</p>` : ''}
            <p style="margin: 5px 0;"><strong>Número de viajeros:</strong> ${formData.numeroViajeros} persona(s)</p>
          </div>

          <!-- Lugar de Salida -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h2 style="color: #16a34a; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #16a34a; padding-bottom: 5px;">
              🗺️ Lugar de Salida
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <p style="margin: 5px 0;"><strong>País de origen:</strong> ${formData.paisOrigen}</p>
              <p style="margin: 5px 0;"><strong>Ciudad de origen:</strong> ${formData.ciudadOrigen}</p>
              ${formData.aeropuertoPreferido ? `<p style="margin: 5px 0;"><strong>Aeropuerto preferido:</strong> ${formData.aeropuertoPreferido}</p>` : ''}
              <p style="margin: 5px 0;"><strong>Fecha de ida:</strong> ${formData.fechaIda}</p>
              <p style="margin: 5px 0;"><strong>Fecha de vuelta:</strong> ${formData.fechaVuelta}</p>
            </div>
            ${formData.flexibilidadFechas ? '<p style="margin: 10px 0; color: #16a34a;"><strong>✓ Tiene flexibilidad en las fechas (+/- 3 días)</strong></p>' : ''}
          </div>

          <!-- Información del Viaje -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h2 style="color: #16a34a; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #16a34a; padding-bottom: 5px;">
              ✈️ Información del Viaje
            </h2>
            <p style="margin: 8px 0;"><strong>Tipo de viaje:</strong> ${formData.tipoViaje}</p>
            <p style="margin: 8px 0;"><strong>Presupuesto aproximado:</strong> ${formData.presupuestoAproximado}</p>
            
            ${formData.destinosInteres && formData.destinosInteres.length > 0 ? `
              <p style="margin: 8px 0;"><strong>Destinos de interés:</strong></p>
              <ul style="margin: 5px 0 15px 20px; color: #374151;">
                ${formData.destinosInteres.map((destino: string) => `<li>${destino}</li>`).join('')}
              </ul>
            ` : ''}
            
            ${formData.actividades && formData.actividades.length > 0 ? `
              <p style="margin: 8px 0;"><strong>Actividades preferidas:</strong></p>
              <ul style="margin: 5px 0 15px 20px; color: #374151;">
                ${formData.actividades.map((actividad: string) => `<li>${actividad}</li>`).join('')}
              </ul>
            ` : ''}
            
            ${formData.tipoAlojamiento ? `<p style="margin: 8px 0;"><strong>Tipo de alojamiento:</strong> ${formData.tipoAlojamiento}</p>` : ''}
            
            ${formData.comentarios ? `
              <div style="margin-top: 15px;">
                <p style="margin: 8px 0;"><strong>Comentarios adicionales:</strong></p>
                <div style="background-color: #ffffff; border-left: 4px solid #16a34a; padding: 15px; margin: 10px 0;">
                  ${formData.comentarios.replace(/\n/g, '<br>')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Información de contacto -->
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; text-align: center; margin-top: 30px;">
            <h3 style="color: #16a34a; margin-bottom: 10px;">Información de Contacto del Cliente</h3>
            <p style="margin: 5px 0; color: #6b7280;">
              📧 <a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a>
            </p>
            <p style="margin: 5px 0; color: #6b7280;">
              📞 ${telefono}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Esta cotización fue generada automáticamente desde el sitio web de Dream2Go
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Quote API - Resend error:', error);
      return NextResponse.json(
        { error: 'Error al enviar la cotización', details: error },
        { status: 500 }
      );
    }

    console.log('Quote API - Email sent successfully:', data);
    return NextResponse.json(
      { message: 'Cotización enviada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Quote API - Catch error:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}