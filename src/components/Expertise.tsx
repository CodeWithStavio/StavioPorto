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
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="subheading mb-16 text-center">Expertise</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {expertiseItems.map((item) => (
            <div
              key={item.id}
              className="p-8 border border-secondary-text/20 rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-accent text-sm font-semibold mb-4 block">
                {item.id}
              </span>
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="body-text text-secondary-text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
