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
    title: 'Bima',
    subtitle: 'Brand in Mark Agency',
    description: 'Published mobile app for iOS and Android with Vite web frontend and Laravel backend. Led end-to-end delivery integrating React Native with Laravel APIs via Inertia.js.',
    color: '#0a0a0a',
    image: '/assets/bima-logo.webp',
    tags: ['React Native', 'Laravel', 'Vite', 'Inertia.js'],
  },
  {
    id: '02',
    title: 'Wave',
    subtitle: 'Senior Project',
    description: 'Dual-module deepfake and fake news detection platform. Engineered audio deepfake detection using Wav2Vec2 and NLP pipeline with XLM-RoBERTa. Flutter app with bilingual interface and offline caching.',
    color: '#0a0a0a',
    image: '/assets/wave.png',
    tags: ['PyTorch', 'Flutter', 'FastAPI', 'NLP', 'Docker'],
  },
  {
    id: '03',
    title: 'Zones',
    subtitle: 'Side Project',
    description: 'World clock and timezone collaboration app with group expense sharing. Reduced settlement time by 40% for groups of up to 20 users. Built with Expo Router and NativeWind.',
    color: '#f5f5f5',
    image: '/assets/zones.png',
    tags: ['React Native', 'Expo', 'Zustand', 'Firebase', 'JWT'],
  },
  {
    id: '04',
    title: 'F.U.S.E',
    subtitle: 'Junior Project',
    description: 'Financial ecosystem with mobile wallets, P2P transfers, and AI-driven fraud detection on 2.7M transactions. NFC/QR payments with RSA/AES-256-GCM encryption.',
    color: 'transparent',
    image: '/assets/Fuse.webp',
    tags: ['React Native', 'XGBoost', 'PostgreSQL', 'Next.js'],
  },
  {
    id: '05',
    title: 'AceLounge',
    subtitle: 'Freelance Project',
    description: 'Hospitality order management app that improved table turnover by 15% and reduced wait times by 22% using React Native and real-time data synchronization.',
    color: 'transparent',
    image: '/assets/AceLounge.webp',
    tags: ['React Native', 'Node.js', 'Real-time'],
  },
  {
    id: '06',
    title: 'Divvy',
    subtitle: 'Side Project',
    description: 'Bill splitting and expense sharing app for groups. Simplifies splitting costs among friends with real-time sync and smart payment tracking.',
    color: 'transparent',
    image: '/assets/Divvy.webp',
    tags: ['React Native', 'Firebase', 'Expo'],
  },
]

export const SKILLS = {
  languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
  frameworks: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Zustand', 'Node.js', 'Express', 'FastAPI', 'Flask', 'Laravel', 'Prisma'],
  databases: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'SQL'],
  devops: ['Git', 'Docker', 'REST APIs', 'JWT', 'CI/CD', 'Expo', 'App Store', 'Google Play'],
  aiml: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LSTM', 'RNN', 'NLP', 'Feature Engineering'],
  security: ['RSA/AES-256 Encryption', 'Secure API Design', 'JWT Authentication'],
}

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
