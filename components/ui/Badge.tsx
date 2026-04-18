interface Props {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const variants = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
}

export default function Badge({ children, variant = 'default' }: Props) {
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}