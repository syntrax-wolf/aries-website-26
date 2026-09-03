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
  if (!name.trim()) return null

  return (
    <div className="card flex items-center gap-4 p-6">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-navy text-xs font-bold tracking-wide text-cream">
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
