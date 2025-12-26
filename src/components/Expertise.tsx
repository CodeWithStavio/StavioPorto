const expertiseItems = [
  {
    id: 'S1',
    title: 'Front-End Development',
    description:
      'Design and develop intuitive and user-friendly mobile app interfaces using React Native, ensuring seamless user experiences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    id: 'S2',
    title: 'Back-End Architecture',
    description:
      'Create robust and scalable back-end systems using technologies like Node.js, Firebase, and PostgreSQL, tailored to your app\'s needs.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'S3',
    title: 'DevOps & Hosting',
    description:
      'Manage deployments and hosting with tools like Nginx, PM2 and Ubuntu, ensuring reliable performance and minimal downtime.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
]

export default function Expertise() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
            What I Do
          </span>
          <h2 className="subheading">Expertise</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {expertiseItems.map((item, index) => (
            <div
              key={item.id}
              className="card group"
              data-cursor-hover
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Number */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-accent text-xs font-semibold tracking-widest">
                  {item.id}
                </span>
                <div className="text-accent opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Card Content */}
              <h3 className="text-xl font-semibold mb-4 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="body-text text-secondary-text leading-relaxed">
                {item.description}
              </p>

              {/* Hover Arrow */}
              <div className="mt-8 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                <span className="text-sm font-medium">Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
