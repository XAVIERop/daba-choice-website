export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export function formatWhatsAppOrderMessage(
  cafeName: string,
  items: OrderItem[],
  total: number,
  customerInfo: { name: string; phone: string; address?: string; notes?: string }
): string {
  const itemLines = items
    .map((item) => `• *${item.quantity}x ${item.name}* (AED ${item.price.toFixed(2)})`)
    .join("\n");

  let message = `*Order from ${cafeName}*\n\n`;
  message += `👋 Hi! I'd like to place an order:\n\n`;
  message += `${itemLines}\n\n`;
  message += `💰 *Total: AED ${total.toFixed(2)}*\n\n`;
  message += `👤 *Customer Details:*\n`;
  message += `• Name: ${customerInfo.name}\n`;
  message += `• Phone: ${customerInfo.phone}\n`;

  if (customerInfo.address) {
    message += `📍 *Delivery Address:*\n${customerInfo.address}\n`;
  }

  if (customerInfo.notes) {
    message += `\n📝 *Notes:*\n${customerInfo.notes}\n`;
  }

  return encodeURIComponent(message);
}

export function getWhatsAppUrl(phone: string, message: string): string {
  // Remove any non-digit characters from the phone number
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

export function formatWhatsAppReservationMessage(
  cafeName: string,
  reservationInfo: { name: string; phone: string; date: string; time: string; guests: number; specialRequests?: string }
): string {
  let message = `*Table Reservation for ${cafeName}*\n\n`;
  message += `👋 Hi! I'd like to book a table:\n\n`;
  message += `📅 *Date:* ${reservationInfo.date}\n`;
  message += `⏰ *Time:* ${reservationInfo.time}\n`;
  message += `👥 *Guests:* ${reservationInfo.guests}\n\n`;
  message += `👤 *Customer Details:*\n`;
  message += `• Name: ${reservationInfo.name}\n`;
  message += `• Phone: ${reservationInfo.phone}\n`;

  if (reservationInfo.specialRequests) {
    message += `\n📝 *Special Requests:*\n${reservationInfo.specialRequests}\n`;
  }

  return encodeURIComponent(message);
}

export function formatWhatsAppContactMessage(
  cafeName: string,
  contactInfo: { name: string; email: string; subject: string; message: string }
): string {
  let message = `*Inquiry for ${cafeName}*\n\n`;
  message += `👋 Hi! I have a question:\n\n`;
  message += `📌 *Subject:* ${contactInfo.subject}\n`;
  message += `👤 *Name:* ${contactInfo.name}\n`;
  if (contactInfo.email) {
    message += `📧 *Email:* ${contactInfo.email}\n`;
  }
  message += `\n💬 *Message:*\n${contactInfo.message}\n`;

  return encodeURIComponent(message);
}

export function formatWhatsAppCateringMessage(
  cafeName: string,
  cateringInfo: { name: string; phone: string; email: string; eventType: string; guestCount: string; date: string; message: string; }
): string {
  let message = `*Catering Inquiry for ${cafeName}*\n\n`;
  message += `👋 Hi! We're interested in your catering services:\n\n`;
  message += `📅 *Event Date:* ${cateringInfo.date}\n`;
  message += `🎪 *Event Type:* ${cateringInfo.eventType}\n`;
  message += `👥 *Estimated Guests:* ${cateringInfo.guestCount}\n\n`;
  message += `👤 *Customer Details:*\n`;
  message += `• Name: ${cateringInfo.name}\n`;
  message += `• Phone: ${cateringInfo.phone}\n`;
  
  if (cateringInfo.email) {
    message += `• Email: ${cateringInfo.email}\n`;
  }

  if (cateringInfo.message) {
    message += `\n📝 *Additional Details & Requirements:*\n${cateringInfo.message}\n`;
  }

  return encodeURIComponent(message);
}

export function formatWhatsAppReviewMessage(
  cafeName: string,
  reviewInfo: { name: string; rating: number; review: string }
): string {
  let message = `*New Customer Review for ${cafeName}*\n\n`;
  message += `👤 *Customer:* ${reviewInfo.name}\n`;
  message += `⭐ *Rating:* ${reviewInfo.rating} / 5\n\n`;
  message += `💬 *Review:*\n"${reviewInfo.review}"\n`;

  return encodeURIComponent(message);
}
