// Centralized data and constants for the portfolio

export const SITE_CONFIG = {
  name: 'Mustafa Alhassny',
  title: 'AI & Full-Stack Developer',
  email: 'Contact@Stavio.dev',
  yearsExperience: '3+',
}

export const SOCIAL_LINKS = [
  { name: 'Email', href: 'mailto:Contact@Stavio.dev?subject=Hello%20Mustafa' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'GitHub', href: 'https://github.com/CodeWithStavio' },
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
]

export const NAV_LINKS = [
  { text: 'Home', href: '/' },
  { text: 'Work', href: '/work' },
  { text: 'Contact', href: '/contact' },
]

export const EXPERTISE_ITEMS = [
  {
    id: 'S1',
    title: 'AI & Machine Learning',
    description:
      'Develop predictive models and AI-powered features using PyTorch, TensorFlow, and NLP techniques. Specialized in deepfake detection and fraud prevention systems.',
  },
  {
    id: 'S2',
    title: 'Cross-Platform Development',
    description:
      'Build production-ready mobile apps with React Native and Next.js. Delivered multiple successful apps on App Store & Google Play with focus on performance and UX.',
  },
  {
    id: 'S3',
    title: 'Full-Stack Architecture',
    description:
      'Design scalable systems with Node.js, FastAPI, PostgreSQL, and Docker. Implement secure APIs with RSA/AES encryption and JWT authentication.',
  },
]

export const PROJECTS = [
  {
    id: '01',
    title: 'Wave',
    description: 'AI-powered deepfake and fake news detection platform using Wav2Vec2 and XLM-RoBERTa models.',
    color: '#1a1a2e',
    image: '/assets/Divvy.avif',
    tags: ['PyTorch', 'Flutter', 'FastAPI', 'NLP'],
  },
  {
    id: '02',
    title: 'F.U.S.E',
    description: 'Financial ecosystem with mobile wallets, P2P transfers, and AI-driven fraud detection on 2.7M transactions.',
    color: '#574bc1',
    image: '/assets/Fuse.avif',
    tags: ['React Native', 'XGBoost', 'PostgreSQL'],
  },
  {
    id: '03',
    title: 'AceLounge',
    description: 'Hospitality order management app that improved table turnover by 15% with real-time data sync.',
    color: '#000f14',
    image: '/assets/AceLounge.avif',
    tags: ['React Native', 'Node.js', 'Real-time'],
  },
]

export const ROTATING_WORDS = ['Growth', 'Talent', 'Success', 'Involvement', 'Growth']

export const COPY = {
  hero: {
    prefix: 'Elevate your',
    bio: `I'm <strong>Mustafa Alhassny</strong>, an AI specialist and full-stack developer with expertise in machine learning, React Native, and modern web technologies. With <span class="hero__accent">${SITE_CONFIG.yearsExperience} years</span> of experience, I build AI-powered platforms and cross-platform applications that drive business growth.`,
  },
  cta: {
    title: 'Ready to Bring Your Vision to Life?',
    buttonText: 'Contact',
  },
  contact: {
    getInTouch: "Have a new project or want to collaborate on AI solutions, mobile apps, or full-stack development? I'd love to hear from you!",
    heroTitle: ["Let's Work", 'Together'],
    heroSubtitle: "As your AI & Full-Stack Developer, I'm Here to Bring Your Vision to Life",
  },
}
