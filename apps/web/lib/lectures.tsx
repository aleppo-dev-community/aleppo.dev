export const lectures = [
  {
    id: "prompt-engineering-2025-10",
    title: "Prompt Engineering",
    startDate: "2025/10/18 3:00 PM",
    endDate: "2025/10/18 4:30 PM",
    location: null,
    instructor: {
      name: "محمد بابلي",
      url: "https://www.linkedin.com/in/mohammedbabelly",
      title: "Software Engineer at Codemagic CI/CD",
      image: "https://uploads.aleppo.dev/speakers/mohammed-babelly.jpg",
    },
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdSV9FonZYJM27RURechfNNugnmkZa9uVM1IAN8jSB4-i4VSw/viewform?usp=dialog",
    image: "https://uploads.aleppo.dev/coming-soon.png",
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
      youtube: null,
    },
  },
];

export type Lecture = (typeof lectures)[number];
