'use client'

export default function StatsSection() {
  const stats = [
    {
      icon: '👥',
      value: '2,000+',
      label: 'Happy Customers',
    },
    {
      icon: '📦',
      value: '5,000+',
      label: 'Gadgets Sold',
    },
    {
      icon: '⭐',
      value: '4.9/5',
      label: 'Customer Rating',
    },
    {
      icon: '✓',
      value: '100%',
      label: 'Quality Assured',
    },
  ]

  return (
    <section className="relative py-16 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center text-white animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
