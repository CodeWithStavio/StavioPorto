// Centralized data and constants for the portfolio

export const SITE_CONFIG = {
  name: 'Mustafa Alhassny',
  title: 'App Developer',
  email: 'Contact@Stavio.dev',
  yearsExperience: '2+',
}

export const SOCIAL_LINKS = [
  { name: 'Email', href: 'mailto:Contact@Stavio.dev?subject=Hello%20Mustafa' },
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'GitLab', href: 'https://gitlab.com/Mustafa_Alhassny' },
]

export const NAV_LINKS = [
  { text: 'Home', href: '/' },
  { text: 'Work', href: '/work' },
  { text: 'Contact', href: '/contact' },
]

export const EXPERTISE_ITEMS = [
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
      "Create robust and scalable back-end systems using technologies like Node.js, Firebase, and PostgreSQL, tailored to your app's needs.",
  },
  {
    id: 'S3',
    title: 'DevOps & Hosting',
    description:
      'Manage deployments and hosting with tools like Nginx, PM2, and Ubuntu, ensuring reliable performance and minimal downtime.',
  },
]

export const PROJECTS = [
  {
    id: '01',
    title: 'Divvy',
    description: 'A mobile app for splitting bills and managing shared expenses with friends and family.',
    color: '#f60',
    image: '/assets/Divvy.avif',
    tags: ['React Native', 'Node.js', 'MongoDB'],
  },
  {
    id: '02',
    title: 'F.U.S.E',
    description: 'Full-stack mobile application with comprehensive backend infrastructure and hosting.',
    color: '#574bc1',
    image: '/assets/Fuse.avif',
    tags: ['React Native', 'Express', 'AWS'],
  },
  {
    id: '03',
    title: 'AceLounge',
    description: 'Complete mobile solution with DevOps pipeline and cloud hosting infrastructure.',
    color: '#000f14',
    image: '/assets/AceLounge.avif',
    tags: ['React Native', 'Docker', 'Kubernetes'],
  },
]

export const ROTATING_WORDS = ['Growth', 'Talent', 'Success', 'Involvement', 'Growth']

export const COPY = {
  hero: {
    prefix: 'Elevate your',
    bio: `I'm <strong>Mustafa Alhassny</strong>, a dedicated Mobile App Developer with expertise in React Native and backend architecture. With <span class="hero__accent">${SITE_CONFIG.yearsExperience} years</span> of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.`,
  },
  cta: {
    title: 'Ready to Bring Your Vision to Life?',
    buttonText: 'Contact',
  },
  contact: {
    getInTouch: "Have a new project or want to collaborate on mobile and full-stack app development? I'd love to hear from you!",
    heroTitle: ["Let's Work", 'Together'],
    heroSubtitle: "As your App Developer, I'm Here to Bring Your Vision to Life",
  },
}
