import LogoIcon from '../assets/icons/logo-icon.svg'

export function Logo({ className }: Readonly<{ className?: string }>) {
  return (
    <LogoIcon
      width={200}
      height={40}
      className={className}
    />
  )
}
