export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-2xl mx-auto">
      {children}
    </div>
  )
}
