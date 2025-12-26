export default function Work() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="subheading mb-8">My Work</h1>
        <p className="body-text text-secondary-text text-lg mb-8">
          A showcase of mobile applications and projects I&apos;ve built using React Native, Node.js, and other technologies.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="p-8 border border-secondary-text/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p className="body-text text-secondary-text">
              Project portfolio is being updated. Check back soon to see my latest work.
            </p>
          </div>
          <div className="p-8 border border-secondary-text/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p className="body-text text-secondary-text">
              More projects will be added as I continue building innovative mobile solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
