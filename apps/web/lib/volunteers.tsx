export type Volunteer = {
  id: string;
  name: string;
  gender: "male" | "female";
  professionalRole: string;
  roles: VolunteerRole[];
  linkedinUrl?: string;
  eventsCount: number;
  isAlumni?: boolean;
};
export const volunteers: Volunteer[] = [
  {
    id: "islam",
    name: "إسلام نعساني",
    gender: "male",
    professionalRole: "Software Engineer",
    roles: ["technical", "creative"],
    linkedinUrl: "https://www.linkedin.com/in/islam-nassani/",
    eventsCount: 6,
  },
  {
    id: "ibrahim",
    name: "إبراهيم العبيد",
    gender: "male",
    professionalRole: "AI Engineer",
    roles: ["relations"],
    linkedinUrl: "https://www.linkedin.com/in/ibrahimalobaid44/",
    eventsCount: 6,
  },
  {
    id: "osama",
    name: "أسامة رضا",
    gender: "male",
    professionalRole: "Software Engineer",
    roles: ["relations", "media"],
    linkedinUrl: "https://www.linkedin.com/in/osama-rida/",
    eventsCount: 6,
  },
  {
    id: "saad",
    name: "سعد شياح",
    gender: "male",
    professionalRole: "UX Engineer",
    roles: ["creative"],
    linkedinUrl: "https://www.linkedin.com/in/saad-shayah/",
    eventsCount: 5,
  },
  {
    id: "omar",
    name: "عمر كيالي",
    gender: "male",
    professionalRole: "Flutter Developer",
    roles: ["creative", "media"],
    linkedinUrl: "https://www.linkedin.com/in/omar-kaialy/",
    eventsCount: 6,
  },
  {
    id: "abdulrahman",
    name: "عبدالرحمن قنواتي",
    gender: "male",
    professionalRole: "Mobile App Developer",
    roles: ["media", "relations"],
    linkedinUrl: "https://www.linkedin.com/in/abdo-ka/",
    eventsCount: 6,
  },
  {
    id: "mohammad",
    name: "محمد علي",
    gender: "male",
    professionalRole: "Developer",
    roles: ["relations"],
    eventsCount: 3,
  },
  {
    id: "reda",
    name: "رضا حريتاني",
    gender: "male",
    professionalRole: "Network Engineer",
    roles: ["relations"],
    isAlumni: true,
    eventsCount: 3,
  },
  {
    id: "haidar",
    name: "أحمد الحيدر",
    gender: "male",
    professionalRole: "Flutter Developer",
    roles: ["logistics"],
    isAlumni: true,
    eventsCount: 6,
    linkedinUrl: "https://www.linkedin.com/in/ahmad-al-haidar-985b7822a",
  },
  {
    id: "bushra",
    name: "بشرى التنبي",
    gender: "female",
    professionalRole: "AI & Data Science Master's Student",
    roles: ["logistics"],
    linkedinUrl: "https://www.linkedin.com/in/bushra-altenbi-52a127288/",
    eventsCount: 6,
  },
  {
    id: "layla",
    name: "ليلى وراق",
    gender: "female",
    professionalRole: "UX/UI Designer",
    roles: ["media"],
    linkedinUrl: "https://www.linkedin.com/in/layla-warrak-2b3878331/",
    eventsCount: 5,
  },
  {
    id: "muzan",
    name: "مزن غازي",
    gender: "male",
    professionalRole: "Frontend Engineer",
    roles: ["media", "logistics"],
    linkedinUrl: "https://www.linkedin.com/in/muzan-ghazy-54217a37b/",
    eventsCount: 3,
  },
  {
    id: "latifa",
    name: "لطيفة عبدالرزاق",
    gender: "female",
    professionalRole: "Developer",
    roles: ["media", "logistics"],
    eventsCount: 5,
  },
  {
    id: "waad",
    name: "وعد غنوم",
    gender: "female",
    professionalRole: "Developer",
    roles: ["logistics"],
    eventsCount: 6,
  },
  {
    id: "nayyal",
    name: "براء نيّال",
    gender: "male",
    professionalRole: "Frontend Developer",
    linkedinUrl: "https://www.linkedin.com/in/baraa-nayyal/",
    roles: ["media"],
    eventsCount: 1,
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
    bg: "bg-red-500/20",
    text: "text-red-400",
  },
  relations: {
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
  },
};
