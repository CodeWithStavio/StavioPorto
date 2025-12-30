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
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description:
      'Develop predictive models and AI-powered features using PyTorch, TensorFlow, and NLP techniques. Specialized in deepfake detection and fraud prevention systems.',
    longDescription: 'Transforming complex data into intelligent solutions that drive business value. From natural language processing to computer vision, I architect AI systems that solve real-world problems at scale.',
    capabilities: [
      { title: 'Deep Learning', desc: 'Neural networks, CNNs, RNNs, Transformers for complex pattern recognition' },
      { title: 'NLP & Text Analysis', desc: 'Sentiment analysis, text classification, multilingual processing with XLM-RoBERTa' },
      { title: 'Audio Processing', desc: 'Deepfake detection, speech recognition using Wav2Vec2 and custom models' },
      { title: 'Fraud Detection', desc: 'XGBoost-based anomaly detection trained on millions of transactions' },
      { title: 'Computer Vision', desc: 'Image classification, object detection, and visual analysis pipelines' },
      { title: 'MLOps', desc: 'Model deployment, monitoring, and continuous improvement workflows' },
    ],
    tools: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Hugging Face', 'ONNX', 'FastAPI', 'Docker'],
    metrics: [
      { value: '2.7M+', label: 'Transactions Analyzed' },
      { value: '95%', label: 'Model Accuracy' },
      { value: '40%', label: 'Fraud Reduction' },
    ],
  },
  {
    id: 'S2',
    slug: 'cross-platform',
    title: 'Cross-Platform Development',
    description:
      'Build production-ready mobile apps with React Native and Next.js. Delivered multiple successful apps on App Store & Google Play with focus on performance and UX.',
    longDescription: 'Creating seamless experiences across iOS, Android, and web from a single codebase. I focus on performance, native feel, and delightful user experiences that drive engagement.',
    capabilities: [
      { title: 'React Native', desc: 'Production apps with native modules, animations, and 60fps performance' },
      { title: 'Expo Ecosystem', desc: 'Rapid development with EAS builds, OTA updates, and managed workflows' },
      { title: 'Next.js & Web', desc: 'Server-side rendering, static generation, and hybrid web applications' },
      { title: 'State Management', desc: 'Zustand, Redux Toolkit, and React Query for complex state logic' },
      { title: 'Native Integrations', desc: 'Push notifications, NFC, biometrics, camera, and device APIs' },
      { title: 'App Store Optimization', desc: 'Publishing, updates, and maintaining 4.5+ star ratings' },
    ],
    tools: ['React Native', 'Expo', 'Next.js', 'TypeScript', 'NativeWind', 'Zustand', 'Firebase', 'Reanimated'],
    metrics: [
      { value: '6+', label: 'Apps Published' },
      { value: '25%', label: 'Retention Boost' },
      { value: '4.5+', label: 'Store Rating' },
    ],
  },
  {
    id: 'S3',
    slug: 'full-stack',
    title: 'Full-Stack Architecture',
    description:
      'Design scalable systems with Node.js, FastAPI, PostgreSQL, and Docker. Implement secure APIs with RSA/AES encryption and JWT authentication.',
    longDescription: 'Engineering robust backend systems that scale. From database design to API architecture, I build secure, maintainable infrastructure that powers modern applications.',
    capabilities: [
      { title: 'API Design', desc: 'RESTful and GraphQL APIs with comprehensive documentation and versioning' },
      { title: 'Database Architecture', desc: 'PostgreSQL, MongoDB schema design with optimized queries and indexing' },
      { title: 'Authentication & Security', desc: 'JWT, OAuth, RSA/AES-256 encryption for enterprise-grade security' },
      { title: 'Real-time Systems', desc: 'WebSockets, Server-Sent Events for live data synchronization' },
      { title: 'Containerization', desc: 'Docker, Docker Compose for consistent development and deployment' },
      { title: 'Performance Optimization', desc: 'Caching strategies, query optimization, reducing latency by 35%' },
    ],
    tools: ['Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Prisma', 'JWT'],
    metrics: [
      { value: '35%', label: 'Latency Reduction' },
      { value: '99.9%', label: 'API Uptime' },
      { value: '10K+', label: 'Concurrent Users' },
    ],
  },
]

export const PROJECTS = [
  {
    id: '01',
    slug: 'bima',
    title: 'Bima',
    subtitle: 'Brand in Mark Agency',
    description: 'Led end-to-end delivery of cross-platform insurance mobile app for iOS and Android. Built scalable architecture integrating React Native with Laravel APIs via Inertia.js. Developed web frontend with Vite and implemented secure backend services.',
    longDescription: 'A comprehensive insurance platform that revolutionizes how users manage their policies. From policy browsing to claims submission, every interaction was designed for simplicity and trust.',
    color: '#0a0a0a',
    image: '/assets/bima-logo.webp',
    tags: ['React Native', 'Laravel', 'Vite', 'Inertia.js', 'iOS', 'Android'],
    role: 'Lead Developer',
    duration: '6 months',
    highlights: [
      'Architected cross-platform mobile app serving iOS and Android from single codebase',
      'Integrated React Native with Laravel backend using Inertia.js for seamless data flow',
      'Developed responsive web frontend with Vite for lightning-fast performance',
      'Implemented secure authentication and policy management features',
    ],
    metrics: [
      { value: '2', label: 'Platforms' },
      { value: '50+', label: 'API Endpoints' },
      { value: '< 2s', label: 'Load Time' },
    ],
  },
  {
    id: '02',
    slug: 'wave',
    title: 'Wave',
    subtitle: 'Senior Project',
    description: 'Dual-module AI platform detecting misleading news and synthetic audio deepfakes. Engineered Wav2Vec2-based audio deepfake detection and fine-tuned XLM-RoBERTa for multilingual news analysis. Flutter app with bilingual interface, offline caching, and push notifications.',
    longDescription: 'An AI-powered truth verification platform that combats misinformation. Combining state-of-the-art NLP and audio analysis to detect fake news and deepfake audio in real-time.',
    color: '#0a0a0a',
    image: '/assets/wave.png',
    tags: ['PyTorch', 'Wav2Vec2', 'XLM-RoBERTa', 'Flutter', 'FastAPI', 'NLP', 'Docker', 'PostgreSQL'],
    role: 'AI Engineer & Lead Developer',
    duration: '8 months',
    highlights: [
      'Engineered Wav2Vec2-based audio deepfake detection with 95%+ accuracy',
      'Fine-tuned XLM-RoBERTa for multilingual fake news detection (Arabic & English)',
      'Built Flutter app with bilingual interface and offline-first architecture',
      'Deployed scalable FastAPI backend with Docker containerization',
    ],
    metrics: [
      { value: '95%', label: 'Detection Accuracy' },
      { value: '2', label: 'Languages' },
      { value: '< 3s', label: 'Analysis Time' },
    ],
  },
  {
    id: '03',
    slug: 'zones',
    title: 'Zones',
    subtitle: 'Side Project',
    description: 'World clock and timezone collaboration app with group expense sharing. Reduced settlement time by 40% for groups up to 20 users. Persistent offline state with Zustand/AsyncStorage. Enhanced 25% user retention through UI/UX design and push notifications.',
    longDescription: 'A productivity app for distributed teams. Zones makes scheduling across timezones effortless while also handling group expenses for traveling teams.',
    color: '#f5f5f5',
    image: '/assets/zones.png',
    tags: ['React Native', 'TypeScript', 'Expo Router', 'NativeWind', 'Zustand', 'Firebase', 'JWT', 'Luxon'],
    role: 'Solo Developer',
    duration: '3 months',
    highlights: [
      'Built intuitive timezone visualization for global team coordination',
      'Implemented group expense splitting reducing settlement time by 40%',
      'Designed offline-first architecture with Zustand and AsyncStorage',
      'Achieved 25% user retention improvement through UX optimization',
    ],
    metrics: [
      { value: '40%', label: 'Faster Settlements' },
      { value: '25%', label: 'Retention Boost' },
      { value: '20', label: 'Max Group Size' },
    ],
  },
  {
    id: '04',
    slug: 'fuse',
    title: 'F.U.S.E',
    subtitle: 'Junior Project',
    description: 'Financial ecosystem with mobile wallets, P2P transfers, and AI-driven spending analytics. Trained XGBoost fraud detection model on 2.7M transactions. Implemented RSA/AES-256-GCM encryption securing all APIs. NFC/QR payments with AI financial advisory features.',
    longDescription: 'A next-generation fintech platform that makes money management intelligent. From payments to fraud detection, F.U.S.E leverages AI to protect and advise users.',
    color: 'transparent',
    image: '/assets/Fuse.webp',
    tags: ['React Native', 'Python', 'XGBoost', 'Node.js', 'Next.js', 'PostgreSQL', 'RSA/AES-256', 'NFC', 'TypeScript'],
    role: 'Full-Stack & ML Engineer',
    duration: '10 months',
    highlights: [
      'Trained XGBoost fraud detection on 2.7M+ transactions with high precision',
      'Implemented military-grade RSA/AES-256-GCM encryption for all APIs',
      'Built NFC and QR payment systems for contactless transactions',
      'Developed AI financial advisor providing personalized spending insights',
    ],
    metrics: [
      { value: '2.7M+', label: 'Transactions' },
      { value: '256-bit', label: 'Encryption' },
      { value: '40%', label: 'Fraud Reduction' },
    ],
  },
  {
    id: '05',
    slug: 'acelounge',
    title: 'AceLounge',
    subtitle: 'Freelance Project',
    description: 'Hospitality order management app that improved table turnover by 15% and reduced customer wait times by 22%. Built with React Native and real-time data synchronization. Optimized API integrations reducing latency by 35% through caching strategies.',
    longDescription: 'A hospitality management solution that streamlines restaurant operations. Real-time order tracking and smart queue management for better customer experiences.',
    color: 'transparent',
    image: '/assets/AceLounge.webp',
    tags: ['React Native', 'Node.js', 'Real-time Sync', 'API Optimization', 'Caching'],
    role: 'Mobile Developer',
    duration: '4 months',
    highlights: [
      'Improved table turnover by 15% through optimized order flow',
      'Reduced customer wait times by 22% with real-time sync',
      'Optimized API integrations achieving 35% latency reduction',
      'Implemented intelligent caching for offline resilience',
    ],
    metrics: [
      { value: '15%', label: 'Faster Turnover' },
      { value: '22%', label: 'Less Wait Time' },
      { value: '35%', label: 'Latency Cut' },
    ],
  },
  {
    id: '06',
    slug: 'divvy',
    title: 'Divvy',
    subtitle: 'Side Project',
    description: 'Bill splitting and expense sharing app for groups. Simplifies splitting costs among friends with real-time sync and smart payment tracking.',
    longDescription: 'The simplest way to split bills with friends. No more awkward calculations or forgotten debts—Divvy handles it all with smart tracking and instant sync.',
    color: 'transparent',
    image: '/assets/Divvy.webp',
    tags: ['React Native', 'Firebase', 'Expo'],
    role: 'Solo Developer',
    duration: '2 months',
    highlights: [
      'Built intuitive bill splitting with smart amount suggestions',
      'Real-time sync across all group members devices',
      'Simplified debt tracking with automatic balance calculations',
      'Clean, minimal UI focused on speed and clarity',
    ],
    metrics: [
      { value: '100%', label: 'Real-time Sync' },
      { value: '< 1s', label: 'Split Calculation' },
      { value: 'Unlimited', label: 'Group Members' },
    ],
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
