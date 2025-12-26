const expertiseItems = [
  {
    id: 'S1',
    title: 'Front-End Development',
    description:
      'Design and develop intuitive and user-friendly mobile app interfaces using React Native, ensuring seamless user experiences.',
  },
  {
    id: 'S2',
    title: 'Back-End Architecture',
    description:
      'Create robust and scalable back-end systems using technologies like Node.js, Firebase, and PostgreSQL, tailored to your app\'s needs.',
  },
  {
    id: 'S3',
    title: 'DevOps & Hosting',
    description:
      'Manage deployments and hosting with tools like Nginx, PM2 and Ubuntu, ensuring reliable performance and minimal downtime.',
  },
]

export default function Expertise() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header with line */}
        <div className="section-header mb-16">
          <span className="text-secondary-text text-sm">[B]</span>
          <span className="text-secondary-text text-sm">Expertise</span>
        </div>

        {/* Expertise Items */}
        <div className="space-y-0">
          {expertiseItems.map((item) => (
            <div
              key={item.id}
              className="expertise-item"
              data-cursor-hover
            >
              {/* Big Faded Number */}
              <div className="big-number">{item.id}</div>

              {/* Content */}
              <div className="relative z-10 pt-16 md:pt-24">
                <h3 className="expertise-title">{item.title}</h3>
                <p className="body-text text-secondary-text max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
