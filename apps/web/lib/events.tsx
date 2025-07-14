import { EventRegister } from "@/app/(public)/events/[id]/event-register";
import Link from "next/link";

export const events = [
  {
    id: "AI-meetup-2025-Q3",
    title: "ملتقى الذكاء الصنعي - آب 2025",
    date: "2025/8/9 5:00 PM",
    location: "حلب",
    description: "",
    tags: ["ملتقى", "AI"],
    image: "https://uploads.aleppo.dev/AI-meetup.png",
    cta: { button: <EventRegister />, href: null },
    talks: [
      {
        title: "Crafting AI Solutions with Real Business Value",
        speaker: {
          name: (
            <Link href="https://www.linkedin.com/in/alaa-aldin-hajjar-18b0621a6/">
              علاء الدين حجّار
            </Link>
          ),
          description: "PhD Mathematical modeling & Software systems",
          image: "https://uploads.aleppo.dev/speakers/alaa-aldin-hajjar.jpg",
        },
        speakerDescription: "PhD Mathematical modeling & Software systems",
        description: (
          <ul className="list-disc list-inside">
            <li>فهم الهدف التجاري (Business Understanding)</li>
            <li>فهم البيانات (Data Understanding)</li>
            <li>تجهيز البيانات (Data Preparation)</li>
            <li>اختيار وبناء النموذج (Modeling)</li>
            <li>تقييم النموذج (Evaluation)</li>
          </ul>
        ),
      },
      {
        title: "Self-Adapting Language Models",
        speaker: {
          name: <Link href="https://www.linkedin.com/in/abd-ulfatah-esper/">عبد الفتاح إسبر</Link>,
          description: "AI Engineer, Data Scientist",
          image: "https://uploads.aleppo.dev/speakers/abd-ulfatah-esper.jpg",
        },
        description: (
          <div className="text-sm">
            <p className="mb-4">
              هل يمكن للذكاء الاصطناعي أن يصمم نفسه؟ استكشف SEAL: نموذج يُعيد بناء نفسه ذاتيًا دون
              إشراف مباشر، خطوة ثورية في عالم AutoML.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                من الإلهام البيولوجي إلى الابتكار التقني: تعرّف على كيف تستلهم Sakana AI من الطبيعة
                لتطوير DGM ، نماذج تنمو وتتطور كما تفعل الكائنات الحية.
              </li>
              <li>
                وداعًا للتدريب المكلف! كيف تمكّن SEAL من تحقيق أداء مذهل من دون Fine-tuning تقليدي
                أو تعليم مضبوط (Supervised Learning).
              </li>
              <li>
                التطبيقات المستقبلية في الصناعة والبحث: كيف ستؤثر SEAL وDGM على أدوات الذكاء
                الاصطناعي التي نعتمد عليها؟
              </li>
            </ul>
          </div>
        ),
      },
    ],
    sponsors: [],
  },
  {
    id: "dev-meetup-2025-Q2",
    title: "ملتقى مطوري حلب 2025 Q2",
    date: "2025/05/24",
    location: "دار الكتب الوطنية، ساحة باب الفرج، حلب",
    description:
      "جمع المتقى نخبة من المطورين من مختلف الاختصاصات، إلى جانب حضور لافت من الأساتذة الأكاديميين وممثلين عن بعض أبرز الشركات المحلية. كان يومًا مميزًا زاخراً بالتفاعل وتبادل المعرفة، وبناء العلاقات بين أفراد المجتمع التقني.",
    tags: ["ملتقى", "All-Dev"],
    cta: {
      label: "شارك على لينكدإن",
      href: "https://www.linkedin.com/feed/update/urn:li:activity:7332327903168249856",
    },
    image: "https://uploads.aleppo.dev/dev-meetup-Q2/IMG_7211.JPG",
    talks: [
      {
        title: "إدارة اسرار بيئة المشروع!",
        speaker: {
          name: <Link href="https://www.linkedin.com/in/haithamalnaeb/">هيثم النائب</Link>,
          description: "Software Engineer",
          image: "https://uploads.aleppo.dev/speakers/haitham-alnaeb.jpg",
        },
        description:
          "كيفية التعامل مع مفاتيح وأسرار المشاريع البرمجية بشكل آمن ومنظم، لضمان عدم ضياعها أو تسريبها.",
      },
      {
        title: "نقاشات مفتوحة",
        speaker: {
          name: (
            <>
              <Link href="https://www.linkedin.com/in/osama-rida/">أسامة رضا</Link>،{" "}
              <Link href="https://www.linkedin.com/in/islam-nassani/">إسلام نعساني</Link>،{" "}
              <Link href="https://www.linkedin.com/in/abdo-ka/">عبد الرحمن قنواتي</Link>
            </>
          ),
          description: "",
          image: "https://uploads.aleppo.dev/speakers/discussion.png",
        },
        description: (
          <ul className="list-disc list-inside">
            <li>Vibe Coding</li>
            <li>Blogging For Developers</li>
            <li>CI/CD</li>
          </ul>
        ),
      },
    ],
    sponsors: [
      {
        name: "Platform Human Capital Development",
        website: "https://platformhcd.com/",
        logo: "https://uploads.aleppo.dev/sponsors/platform.png",
        description:
          "Platform Human Capital Development is a local business agency focused on delivering tailored solutions to develop the human capital capacity and efficiency, in order to advance the economic landscape in Syria and more specifically in Aleppo.",
      },
      {
        name: "Zero Media",
        website: "https://zeromedia-agency.com/",
        logo: "https://uploads.aleppo.dev/sponsors/zero-media.jpg",
        description:
          "في Zero Media ، نعتقد أن كل فكرة رائعة تبدأ من الصفر. بصفتنا وكالة إبداعية كاملة الخدمات ، نحن متخصصون في تحويل اللوحات الفارغة إلى تصميمات واستراتيجيات مؤثرة ترفع العلامات التجارية إلى آفاق جديدة. سواء أكان ذلك من العلامات التجارية أو الإعلان أو إنشاء المحتوى الرقمي ، فنحن شريكك الموثوق به في صياغة قصص مرئية مقنعة لها صدى. من الصفر إلى التألق ، نحن معك في كل خطوة على الطريق “.",
      },
    ],
    gallery: [
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_18_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_1_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_2_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_3_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_4_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_5_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_6_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_7_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_8_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_9_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_10_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_11_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_12_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_13_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_14_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_15_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_16_2025-06-17_23-00-31.jpg",
      "https://uploads.aleppo.dev/dev-meetup-Q2/photo_17_2025-06-17_23-00-31.jpg",
    ],
  },
];

export type Event = (typeof events)[number];
