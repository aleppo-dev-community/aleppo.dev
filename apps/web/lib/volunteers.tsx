export type Volunteer = {
  id: string;
  name: string;
  gender: "male" | "female";
  professionalRole: string;
  roles:  VolunteerRole[];
  linkedinUrl: string;
  eventsCount: number;
  isAlumni?: boolean;
};
export const volunteers: Volunteer[] = [
  {
    id: "ahmed",
    name: "أحمد محمد الخليل",
    gender: "male",
    professionalRole: "Front-end Developer",
      roles: ["technical", "media"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 5,
  },
  {
    id: "sara",
    name: "سارة علي",
    gender: "female",
    professionalRole: "Project Manager",
    roles: ["logistics"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 3,
  },
  {
    id: "mohammed",
    name: "محمد أحمد خالد",
    gender: "male",
    professionalRole: "Content Creator",
    roles: ["media"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 7,
  },
  {
    id: "lina",
    name: "لينا حسن",
    gender: "female",
    professionalRole: "Backend Engineer",
    roles: ["technical"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 2,
    isAlumni: true,
  },
  {
    id: "omar",
    name: "عمر يوسف",
    gender: "male",
    professionalRole: "Full-stack Developer",
    roles: ["technical", "creative"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 8,
  },
  {
    id: "fatima",
    name: "فاطمة محمد أحمد",
    gender: "female",
    professionalRole: "UI/UX Designer",
    roles: ["creative", "media"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 4,
  },
  {
    id: "khaled",
    name: "خالد محمود",
    gender: "male",
    professionalRole: "DevOps Engineer",
    roles: ["technical"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 6,
  },
  {
    id: "nour",
    name: "نور عبد الله",
    gender: "female",
    professionalRole: "Marketing Specialist",
    roles: ["media", "logistics"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 9,
  },
  {
    id: "youssef",
    name: "يوسف إبراهيم",
    gender: "male",
    professionalRole: "Mobile Developer",
    roles: ["technical"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 3,
  },
  {
    id: "maya",
    name: "مايا سليم",
    gender: "female",
    professionalRole: "Graphic Designer",
    roles: ["creative"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 5,
  },
  {
    id: "tarek",
    name: "طارق أحمد حسين",
    gender: "male",
    professionalRole: "Data Scientist",
    roles: ["technical", "media"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 7,
  },
  {
    id: "rana",
    name: "رنا فاضل",
    gender: "female",
    professionalRole: "Event Coordinator",
    roles: ["logistics"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 12,
  },
  {
    id: "ali",
    name: "علي ناصر",
    gender: "male",
    professionalRole: "Software Architect",
    roles: ["technical"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 4,
  },
  {
    id: "layla",
    name: "ليلى كمال",
    gender: "female",
    professionalRole: "Video Editor",
    roles: ["media", "creative"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 6,
  },
  {
    id: "hassan",
    name: "حسان رضوان",
    gender: "male",
    professionalRole: "QA Engineer",
        roles: ["technical"], linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 3,
  },
  {
    id: "dina",
    name: "دينا بشارة",
    gender: "female",
    professionalRole: "Community Manager",
    roles: [ "media"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    eventsCount: 10,
    isAlumni: true,
  },
];


export const roleLabels = {
  all: "الكل",
  technical: "تقني",
  media: "الإعلام",
  logistics: "لوجستي",
  relations: "العلاقات",
  creative: "إبداعي",
} as const;

export type VolunteerRole = Exclude<keyof typeof roleLabels, "all">;

export const roleColors: Record<VolunteerRole, { bg: string; text: string }> = {
  technical: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
  },
  media: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
  },
  logistics: {
    bg: "bg-green-500/20",
    text: "text-green-400",
  },
  creative: {
    bg: "bg-pink-500/20",
    text: "text-pink-400",
  },
  relations: {
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
  },
};
