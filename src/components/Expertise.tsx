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
      'Manage deployments and hosting with tools like Nginx, PM2, and Ubuntu, ensuring reliable performance and minimal downtime.',
  },
]

export default function Expertise() {
  return (
    <section className="expertise">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span>[B]</span>
          <span>Expertise</span>
        </div>

        {/* Expertise Items */}
        <div>
          {expertiseItems.map((item) => (
            <div key={item.id} className="expertise__item">
              <div className="expertise__number">{item.id}</div>
              <div className="expertise__content">
                <h3 className="expertise__title">{item.title}</h3>
                <p className="expertise__desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
