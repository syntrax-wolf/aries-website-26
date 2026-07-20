function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function MemberCard({
  name,
  role,
  subtitle,
}: {
  name: string
  role: string
  subtitle?: string
}) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-cream">
        {initials(name)}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold text-navy">{name}</p>
        <p className="truncate text-sm text-[var(--ink-soft)]">{role}</p>
        {subtitle && (
          <p className="truncate text-xs text-[var(--ink-soft)]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
