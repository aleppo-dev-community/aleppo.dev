export const lectures = [
  {
    id: "career-growth-2025-12",
    title: "النمو المهني",
    startDate: "2025/12/04 6:00 PM",
    endDate: "2025/12/04 8:00 PM",
    location: "غرفة التجارة في حلب، حلب",
    instructor: {
      name: "أسامة أبو حجر",
      url: "https://www.linkedin.com/in/osamaabouhajar",
      title: "Software Engineer II @ Microsoft",
      image: "https://uploads.aleppo.dev/speakers/osama-abo-hajar.jpg",
    },
    registrationUrl: "",
    registrationOpen: true,
    image: "https://uploads.aleppo.dev/career-growth-2025-12/cover.png",
    topics: [
      "تحويل الإخفاقات إلى خطوات نحو شركات عالمية",
      "تحسين أداء المقابلات والاستراتيجية المهنية",
      'نظرية "الوصفة والمكوّنات"',
      "أدوات وتقنيات الذكاء الاصطناعي لرفع الإنتاجية ونمو المسار المهني المبكر",
    ],
    tags: ["مهني"],
    level: "كل المستويات",
    requirements: [],
    social: {},
    gallery: [],
  },
  {
    id: "prompt-engineering-2025-10",
    title: "Prompt Engineering",
    startDate: "2025/10/18 3:00 PM",
    endDate: "2025/10/18 4:30 PM",
    location: "مدرج الدكتور علي فارس، كلية الهندسة المكانيكية، جامعة حلب، حلب",
    instructor: {
      name: "محمد بابلي",
      url: "https://www.linkedin.com/in/mohammedbabelly",
      title: "Software Engineer at Codemagic CI/CD",
      image: "https://uploads.aleppo.dev/speakers/mohammed-babelly.jpg",
    },
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdSV9FonZYJM27RURechfNNugnmkZa9uVM1IAN8jSB4-i4VSw/viewform?usp=dialog",
    registrationOpen: false,
    image: "https://uploads.aleppo.dev/prompt-engineering-2025-10/cover.png",
    topics: [
      "Saving time & tokens using better prompts",
      "Why prompt engineering matters nowadays",
      "Prompt structure",
      "Iterative prompt development",
      "Advanced prompt engineering techniques",
    ],
    tags: ["AI"],
    level: "كل المستويات",
    requirements: [],
    social: {
      youtube: "https://www.youtube.com/embed/kg_mYaz8MKc",
    },
    gallery: [
      "https://uploads.aleppo.dev/prompt-engineering-2025-10/photo_1_2025-10-20_13-10-50.jpg",
      "https://uploads.aleppo.dev/prompt-engineering-2025-10/photo_2_2025-10-20_13-10-50.jpg",
      "https://uploads.aleppo.dev/prompt-engineering-2025-10/photo_3_2025-10-20_13-10-50.jpg",
      "https://uploads.aleppo.dev/prompt-engineering-2025-10/photo_4_2025-10-20_13-10-50.jpg",
      "https://uploads.aleppo.dev/prompt-engineering-2025-10/photo_5_2025-10-20_13-10-50.jpg",
      "https://uploads.aleppo.dev/prompt-engineering-2025-10/photo_6_2025-10-20_13-10-50.jpg",
    ],
  },
];

export type Lecture = (typeof lectures)[number];
