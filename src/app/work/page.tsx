export default function Work() {
  const projects = [
    {
      id: '01',
      title: 'Coming Soon',
      category: 'Mobile App',
      description: 'An exciting mobile application project showcasing React Native expertise and modern UI/UX design principles.',
    },
    {
      id: '02',
      title: 'Coming Soon',
      category: 'Full-Stack',
      description: 'A comprehensive full-stack solution demonstrating backend architecture with Node.js, Firebase, and PostgreSQL.',
    },
    {
      id: '03',
      title: 'Coming Soon',
      category: 'Mobile App',
      description: 'Cross-platform mobile experience with seamless user interactions and optimized performance.',
    },
    {
      id: '04',
      title: 'Coming Soon',
      category: 'DevOps',
      description: 'Scalable deployment infrastructure with CI/CD pipelines, containerization, and cloud hosting.',
    },
  ]

  return (
    <section className="min-h-screen px-8 pt-32 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-6 block reveal">
            Portfolio
          </span>
          <h1 className="heading mb-6 reveal reveal-delay-1">
            My Work
          </h1>
          <p className="body-text text-secondary-text max-w-2xl reveal reveal-delay-2">
            A showcase of mobile applications and projects I&apos;ve built using React Native, Node.js, and other cutting-edge technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="card group reveal"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              data-cursor-hover
            >
              {/* Project Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-accent text-xs font-semibold tracking-widest">
                  {project.id}
                </span>
                <span className="text-secondary-text text-xs font-medium tracking-widest uppercase">
                  {project.category}
                </span>
              </div>

              {/* Placeholder Image */}
              <div className="aspect-video bg-background rounded-lg mb-6 flex items-center justify-center border border-white/5 group-hover:border-accent/30 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-secondary-text/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="body-text text-secondary-text">
                {project.description}
              </p>

              {/* View Project Link */}
              <div className="mt-6 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                <span className="text-sm font-medium">View Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center reveal" style={{ animationDelay: '0.7s' }}>
          <p className="text-secondary-text mb-6">
            Interested in working together?
          </p>
          <a
            href="/contact"
            className="btn-primary inline-block"
            data-cursor-hover
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
