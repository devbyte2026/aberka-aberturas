'use client'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493794000000'
  const mensaje = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola! Quiero consultar sobre aberturas.'
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 flex items-center gap-2 group mb-16 sm:mb-6"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-medium">
        Consultar por WhatsApp
      </span>
    </a>
  )
}