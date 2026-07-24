import {
  SiFacebook,
  SiFirebase,
  
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiExpress,
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiUnrealengine,
  SiX,
  SiPython,
  SiFastapi,
  SiCplusplus,
  SiLinux,
} from "react-icons/si";

// =================================================================================
// 1. TYPES & INTERFACES
// =================================================================================

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  description: string;
  logo: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  logo: string;
}

export interface ProjectItem {
  name: string;
  tagline: string;
  url: string;
  repo?: string;
  image: string;
}

// =================================================================================
// 2. PERSONAL DETAILS & LINKS
// =================================================================================

// export const BANNER_IMAGE = "/cp.jpg";
// ==============================================
// 2.5 currenlty watching
// ======================================
export const CURRENTLY_WATCHING = [
  {
    title: "Modern Family",
    image: "/watching/modernFamily.png",
    link: "https://www.google.com/search?q=modern+family&ie=UTF-8",
  },
  {
    title: "Lord of the mysteries",
    image: "/watching/lotm.png",
    link: "https://www.google.com/search?q=Lord+of+Mysteries&sxsrf=ANbL-n4JwvJKRrNlmfBYJa-mdp8BmV226A%3A1781251461799",
  },
  {
    title: "Mushoku Tensei",
    image: "/watching/MT.png",
    link: "...",
  },


];

// External Links
export const RESUME_URL = "https://drive.google.com/file/d/1wEMP9EcwoZhaZAcRCA9qhSelxtdEb8Av/view?usp=drive_link";
export const DISCORD_LINK = "https://discord.gg/CDAKZrbHGz";
export const CAL_URL = "https://cal.com/rohith-k3zubv/15min";

// =================================================================================
// 3. SOCIAL MEDIA
// =================================================================================

export const SOCIALS = [
  
  { 
    platform: "instagram", 
    url: "https://www.instagram.com/not_rohith.44?igsh=YnNxcHlzMGp6bjZ5", 
    icon: SiInstagram, 
    color: "#E1306C" 
  },
  { 
    platform: "linkedin", 
    url: "https://www.linkedin.com/in/rohith-n-r-not4rohith?utm_source=share_via&utm_content=profile&utm_medium=member_android", 
    icon: SiLinkedin, 
    color: "#0A66C2" 
  },
  { 
    platform: "github", 
    url: "https://github.com/not4rohith", 
    icon: SiGithub, 
    color: "#ffffff" 
  },
  { 
    platform: "x", 
    url: "https://x.com/NotRohith4", 
    icon: SiX, 
    color: "#ffffff" 
  },
];

// =================================================================================
// 4. TECH STACK
// =================================================================================

export const STACK = [
  { name: "C++", icon: SiCplusplus, color: "#00b3ffff" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#706bd6ff"},
  { name: "FastAPI", icon: SiFastapi, color: "#31f1c7ff"},
  { name: "React", icon: SiReact, color: "#61DAFB" },
  // { name: "React Native", icon: SiReact, color: "#61DAFB" },
  // { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Linux", icon: SiLinux },
  
  // { name: "Unreal Engine", icon: SiUnrealengine, color: "#FFFFFF" },
];

// =================================================================================
// 5. EXPERIENCE
// =================================================================================

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "IIT Ropar Vicharanashala Lab",
    role: "Software Engineering Intern",
    date: "july 2026 - sept 2026",
    description: "Open source project contribution with peer collaboration",
    logo: "/images/companies/vicharanshala.png", 
  },
  {
    company: "Chinmaya College",
    role: "Volunteer",
    date: "2025 - Present",
    description: "Testing 'Exam Engine' project to help students",
    logo: "/images/companies/Chinmaya.png", 
  },
  
];

// =================================================================================
// 6. EDUCATION
// =================================================================================

export const EDUCATION: EducationItem[] = [
  {
    institution: "National Institute of Engineering",
    degree: "BTech – Information Science",
    period: "July 2024 – July 2028",
    logo: "/images/education/NIE5.png",
  },
  
];

// =================================================================================
// 7. PROJECTS
// =================================================================================

export const PROJECTS: ProjectItem[] = [
   {
    name: "Exam-Engine",
    tagline: "Helps hostel students in their KCET prep.",
    url: "https://exam-engine-mock-test-generator-for.vercel.app/",
    repo: "https://github.com/Not4Rohith/Exam-Engine-mock-test-generator-for-hostel-students-",
    image: "/avatar/examEngine.png",
  },
  
];
