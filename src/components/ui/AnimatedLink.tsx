import Link from 'next/link'

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
  variant?: 'default' | 'accent' | 'nav'
  className?: string
}

export default function AnimatedLink({
  href,
  children,
  external = false,
  variant = 'default',
  className = '',
}: AnimatedLinkProps) {
  const variantClasses = {
    default: 'link-animated',
    accent: 'link-animated link-animated--accent',
    nav: 'link-animated link-animated--nav',
  }

  const baseClass = variantClasses[variant]
  const combinedClass = className ? `${baseClass} ${className}` : baseClass

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClass}
      >
        {children}
      </a>
    )
  }

  // Check if it's a mailto or tel link
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a href={href} className={combinedClass}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={combinedClass}>
      {children}
    </Link>
  )
}
