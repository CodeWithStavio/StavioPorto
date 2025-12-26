import Hero from '@/components/Hero'
import Expertise from '@/components/Expertise'
import CallToAction from '@/components/CallToAction'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <Expertise />
      <div className="section-divider" />
      <CallToAction />
      <div className="section-divider" />
      <Contact />
    </>
  )
}
