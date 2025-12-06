import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  selectedVariants?: string;
}

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  iva: number;
  total: number;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingProvince: string;
}

function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',') + ' €';
}

function generateOrderConfirmationEmail(data: OrderEmailData): string {
  const itemsHtml = data.items.map(item => {
    const variants = item.selectedVariants ? JSON.parse(item.selectedVariants) : {};
    const variantsText = Object.entries(variants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    return `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <div style="font-weight: 500; color: #111827;">${item.productName}</div>
          ${variantsText ? `<div style="font-size: 14px; color: #6b7280; margin-top: 4px;">${variantsText}</div>` : ''}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827;">
          ${formatPrice(item.price * item.quantity)}
        </td>
      </tr>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de pedido - La Teleria</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header -->
    <div style="text-align: center; padding: 32px 0;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #111827; letter-spacing: 2px;">LA TELERIA</h1>
    </div>

    <!-- Main Content -->
    <div style="background-color: #ffffff; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <!-- Success Icon -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 64px; height: 64px; background-color: #d1fae5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 300; color: #111827; text-align: center;">
        ¡Pedido confirmado!
      </h2>
      <p style="margin: 0 0 24px; color: #6b7280; text-align: center;">
        Hola ${data.customerName}, gracias por tu compra. Hemos recibido tu pedido correctamente.
      </p>

      <!-- Order Number -->
      <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: center;">
        <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">Número de pedido</p>
        <p style="margin: 0; font-size: 24px; font-family: monospace; font-weight: 500; color: #111827;">
          ${data.orderNumber}
        </p>
      </div>

      <!-- Payment Instructions -->
      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 500; color: #1e40af;">
          Instrucciones de pago
        </h3>
        <p style="margin: 0 0 16px; font-size: 14px; color: #1e3a8a;">
          Para completar tu pedido, realiza una transferencia bancaria a la siguiente cuenta:
        </p>
        <div style="background-color: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #bfdbfe;">
          <p style="margin: 0 0 4px; font-size: 12px; color: #6b7280;">IBAN</p>
          <p style="margin: 0; font-size: 18px; font-family: monospace; font-weight: 500; color: #111827;">
            ES12 3456 7890 1234 5678 9012
          </p>
        </div>
        <p style="margin: 16px 0 0; font-size: 14px; color: #1e3a8a;">
          <strong>Importante:</strong> Incluye tu número de pedido <span style="font-family: monospace; font-weight: 500;">${data.orderNumber}</span> como concepto de la transferencia.
        </p>
      </div>

      <!-- Order Summary -->
      <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 500; color: #111827;">
        Resumen del pedido
      </h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px 0; text-align: left; font-weight: 500; color: #6b7280; font-size: 14px;">Producto</th>
            <th style="padding: 12px 0; text-align: center; font-weight: 500; color: #6b7280; font-size: 14px;">Cantidad</th>
            <th style="padding: 12px 0; text-align: right; font-weight: 500; color: #6b7280; font-size: 14px;">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="border-top: 2px solid #e5e7eb; padding-top: 16px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #6b7280;">Subtotal</span>
          <span style="color: #111827;">${formatPrice(data.subtotal)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #6b7280;">IVA (21%)</span>
          <span style="color: #111827;">${formatPrice(data.iva)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 500;">
          <span style="color: #111827;">Total</span>
          <span style="color: #111827;">${formatPrice(data.total)}</span>
        </div>
      </div>

      <!-- Shipping Address -->
      <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 500; color: #111827;">
        Dirección de envío
      </h3>
      <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #111827; line-height: 1.6;">
          ${data.customerName}<br>
          ${data.shippingAddress}<br>
          ${data.shippingPostalCode} ${data.shippingCity}<br>
          ${data.shippingProvince}
        </p>
      </div>

      <!-- What's Next -->
      <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 500; color: #111827;">
        ¿Qué sucede ahora?
      </h3>
      <ol style="margin: 0; padding: 0 0 0 20px; color: #6b7280;">
        <li style="margin-bottom: 8px;">Realiza la transferencia bancaria con el número de pedido como concepto.</li>
        <li style="margin-bottom: 8px;">Verificaremos el pago en un plazo de 24-48 horas laborables.</li>
        <li style="margin-bottom: 0;">Te enviaremos un email de confirmación cuando el pedido esté en camino.</li>
      </ol>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 32px 0; color: #9ca3af; font-size: 14px;">
      <p style="margin: 0 0 8px;">
        Si tienes alguna pregunta, no dudes en contactarnos.
      </p>
      <p style="margin: 0;">
        &copy; ${new Date().getFullYear()} La Teleria. Todos los derechos reservados.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function sendOrderConfirmationEmail(orderData: OrderEmailData): Promise<{ success: boolean; error?: string }> {
  // If RESEND_API_KEY is not configured, skip email sending
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Skipping order confirmation email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const htmlContent = generateOrderConfirmationEmail(orderData);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'La Teleria <pedidos@lateleria.es>',
      to: orderData.customerEmail,
      subject: `Confirmación de pedido ${orderData.orderNumber} - La Teleria`,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending order confirmation email:', error);
      return { success: false, error: error.message };
    }

    console.log(`Order confirmation email sent to ${orderData.customerEmail} for order ${orderData.orderNumber}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
