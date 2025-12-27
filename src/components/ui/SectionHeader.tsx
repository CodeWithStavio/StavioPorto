interface SectionHeaderProps {
  label: string
  title: string
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span>{label}</span>
      <span>{title}</span>
    </div>
  )
}
