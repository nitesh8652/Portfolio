export const owner = {
  name: 'Nitesh Salian',
  email: 'your@email.com',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/'
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
  'Postman'
];

export const skillGroups = [
  { title: 'Frontend', items: ['React.js (Vite)', 'HTML5 / CSS3', 'Tailwind CSS', 'Responsive UI'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
  { title: 'Database & Cloud', items: ['MongoDB Atlas', 'Mongoose', 'Supabase', 'Cloudinary'] },
  { title: 'Languages', items: ['JavaScript', 'Java (DSA)'] },
  { title: 'Tools', items: ['Git & GitHub', 'Postman', 'Render', 'VS Code'] }
];

export const projects = [
  {
    number: '01',
    name: 'ClipSync',
    tagline: 'Media Sharing Platform',
    year: '2025',
    stack: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
    description:
      'A full-stack application for uploading, managing, and sharing media clips with user-based authorization, secure deletion logic, and cloud media storage.',
    highlights: [
      'Cloudinary integration for file upload/storage',
      'User auth with JWT + secure delete permissions',
      'Deployed backend on Render'
    ]
  },
  {
    number: '02',
    name: 'URL Shortener',
    tagline: 'Link Management Service',
    year: '2025',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Render'],
    description:
      'A clean URL shortening service with unique link generation, click tracking, and persistent storage.',
    highlights: [
      'Unique short code generation algorithm',
      'MongoDB for URL mapping storage',
      'Full-stack deployment on Render'
    ]
  },
  {
    number: '03',
    name: 'JobEase',
    tagline: 'Job Portal + Resume Builder',
    year: '2025',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    description:
      'A full MERN job portal with dual dashboards for recruiters and job seekers, plus an integrated resume builder.',
    highlights: [
      'Recruiter & Job Seeker dashboards',
      'In-platform resume builder',
      'Role-based access control (RBAC)',
      'Scalable RESTful architecture'
    ]
  },
  {
    number: '04',
    name: 'Tasker',
    tagline: 'Productivity & Task Management App',
    year: '2025',
    stack: ['React', 'Node.js', 'Supabase', 'Google Auth'],
    description:
      'A productivity app with calendar-based task management, Google authentication, and email reminders with cloud persistence.',
    highlights: [
      'Calendar UI with task markers',
      'Google OAuth via Supabase Auth',
      'Email reminders using Supabase Edge Functions',
      'Cloud-first data persistence'
    ]
  }
];
