export const owner = {
  name: 'Nitesh Salian',
  email: 'niteshsalian72@gmail.com',
  github: 'https://github.com/nitesh8652',
  linkedin: 'https://www.linkedin.com/in/nitesh8652/'
};

export const skills = [
  'React.js',
  'Node.js',
  'MongoDB',
  'Express',
  'Tailwind',
  'Supabase',
  'JavaScript',
  'Git',
  'Cloudinary',
  'REST APIs',
  'JWT',
  'Postman',

];

export const skillGroups = [
  { title: 'Frontend', items: ['React.js', 'HTML5 / CSS3', 'Tailwind CSS', 'Responsive UI'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
  { title: 'Database & Cloud', items: ['MongoDB Atlas', 'SQL', 'Supabase', 'Cloudinary'] },
  { title: 'Languages', items: ['JavaScript', 'Python'] },
  { title: 'Tools', items: ['Git & GitHub', 'Postman', 'Render', 'Senitry', 'Cloudinary', 'Clerk', 'VS Code'] }
];

export const projects = [
   {
    number: '01',
    name: 'JobEase.',
    tagline: 'Job Portal + Resume Builder',
    year: '2025',
    image: '/assets/jobease.png',
    docs: 'https://github.com/nitesh8652/JobEase',
    live: 'https://jobease-1.onrender.com/',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Render'],
    description:
      'Full stack job portal with dual dashboards for recruiters and job seekers, with resume builder.',
    highlights: [
      'Recruiter & Job Seeker dashboards',
      'In-platform resume builder',
      'Role-based access control (RBAC)',
      'Scalable RESTful architecture'
    ]
  },
  {
    number: '02',
    name: 'ClipSync',
    tagline: 'Media Sharing Platform',
    year: '2025',
    image: '/assets/clipsync.png',
    docs: 'https://github.com/nitesh8652/Clipsync',
    live: 'https://clipsynco.netlify.app/',
    stack: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
    description:
      'Full-stack for uploading, managing, and sharing media clips with user-based authorization, secure deletion logic, and cloud media storage.',
    highlights: [
      'Cloudinary integration for file upload/storage',
      'User auth with JWT + secure delete permissions',
      'Deployed backend on Render'
    ]
  },
  {
  number: '03',
  name: 'Landit.AI',
  tagline: 'AI-Powered Resume & Career Platform',
  year: '2025',
    image: '/assets/landit.png',
  docs: 'https://github.com/nitesh8652/LanditAI',
  live: 'https://github.com/nitesh8652/LanditAI',
  stack: ['React', 'Node.js', 'Express', 'MongoDB', 'AI Integration'],
  description:
    'An AI-powered resume builder and career platform that helps users create professional resumes, optimize content, and manage job applications with a modern and interactive interface.',
  highlights: [
    'AI-generated resume content and suggestions',
    'Modern responsive dashboard for job seekers',
    'Dynamic resume customization and templates',
    'Secure authentication and user data management',
    'Full-stack MERN architecture with scalable backend'
  ]
},
  {
    number: '04',
    name: 'Hari  Om  Sports',
    tagline: 'Sports Equiments Store',
    year: '2025',
     image: '/assets/sport.png',
    docs: 'https://github.com/kadamsamiksha254-dotcom/hosports',
    live: 'https://demoqa.com/',
    stack: ['React', 'Node.js', 'Supabase', 'Google Auth'],
    description:
      'A productivity app with calendar-based task management, Google authentication, and email reminders with cloud persistence.',
    highlights: [
      'Calendar UI with task markers',
      'Google OAuth via Supabase Auth',
      'Email reminders using Supabase Edge Functions',
      'Cloud-first data persistence'
    ]
  },
  {
    number: '05',
    name: 'Tasker',
    tagline: 'Productivity & Task Management App',
    year: '2025',
     image: '/assets/task.png',
    docs: 'https://github.com/nitesh8652/Tasker',
    live: 'https://taskervlite.netlify.app/',
    stack: ['React', 'Node.js', 'Supabase', 'Google Auth'],
    description:
      'A productivity app with calendar-based task management, Google authentication, and email reminders with cloud persistence.',
    highlights: [
      'Calendar UI with task markers',
      'Google OAuth via Supabase Auth',
      'Email reminders using Supabase Edge Functions',
      'Cloud-first data persistence'
    ]
  },

];
