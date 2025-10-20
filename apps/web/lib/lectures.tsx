export const lectures = [
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
