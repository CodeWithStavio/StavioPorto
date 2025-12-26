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
    <section className="u-section">
      <div className="u-container">
        {/* Section Header */}
        <div className="section__head">
          <span>[B]</span>
          <span>Expertise</span>
        </div>

        {/* Expertise Items */}
        <div>
          {expertiseItems.map((item) => (
            <div key={item.id} className="exp" data-cursor-hover>
              <div className="u-container">
                <div className="exp__grid">
                  {/* Big Faded Number */}
                  <div className="exp__number">{item.id}</div>

                  {/* Content */}
                  <div className="exp__content">
                    <h3 className="exp__title">{item.title}</h3>
                    <p className="exp__desc">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
