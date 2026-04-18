'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (usuario === 'admin' && password === 'aberka2024') {
      document.cookie = 'admin_logged=true; path=/; max-age=86400'
      router.push('/admin/dashboard')
    } else {
      setError('Credenciales incorrectas')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="usuario" className="block text-sm font-medium text-foreground mb-1">
          Usuario
        </label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        style={{ backgroundColor: '#2C3E6B' }}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>

      <p className="text-xs text-muted text-center">
        ¿Problemas para ingresar? Contactá soporte
      </p>
    </form>
  )
}