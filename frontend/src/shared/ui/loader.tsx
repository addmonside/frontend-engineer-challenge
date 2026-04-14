import LoaderCycleIcon from '../assets/icons/loader-cycle-icon.svg'
import { cn } from '../lib'

export function Loader({ className }: { className?: string }) {
  return (
    <LoaderCycleIcon
      width={56}
      height={56}
      className={cn('animate-[spin_3s_linear_infinite]', className)}
    />
  )
}
