import Link from "next/link";

export const events = [
  {
    id: "flutter-meetup-2026-01",
    title: "Flutter Meetup - كانون الثاني 2026",
    date: "سيحدد قريباً",
    location: "سيحدد قريباً",
    social: {
      youtube: null,
      linkedin: null,
    },
    image: "https://uploads.aleppo.dev/flutter-meetup-2026-01/cover.png",
    description: "",
    talks: [
      {
        title: "Flutter Beyond Mobile: Flutter For Web, Scalable Architecture",
        speaker: {
          name: "محمود طنطورة",
          description: "Senior Flutter Developer",
          image: "https://uploads.aleppo.dev/speakers/mahmoud-tantora.png",
        },
        description: "",
      },
      {
        title: (
          <div className="inline-flex items-center ">
            <img
              src="https://uploads.aleppo.dev/speakers/flutter-flash.png"
              className="w-16 h-16 object-cover ml-2"
              alt="Flutter Flash"
            />
            <span>Flutter Flash</span>
          </div>
        ),
        speaker: {
          name: null,
          description: null,
          image: null,
        },
        description: (
          <div className="-mt-4">
            <ul className="list-disc list-inside space-y-2">
              <li>Flutter Platform Channels</li>
              <li>Flutter Testing</li>
              <li>Rendering in Flutter</li>
              <li>Code Generators</li>
              <li>+ والمزيد</li>
            </ul>
          </div>
        ),
      },
    ],
    tags: ["ملتقى", "Flutter"],
    sponsors: [],
    gallery: [],
  },
  {
    id: "aleppojs-2025-09",
    title: "AleppoJS - أيلول 2025",
    date: "2025/09/06 1:30 PM",
    location: "كلية التربية، جامعة حلب، حلب",
    social: {
      youtube: null,
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7370458952062640128",
    },
    image: "https://uploads.aleppo.dev/aleppojs-2025-09/cover.png",
    description: "",
    talks: [
      {
        title: "Modern Frontend Projects: A practical guide & tips",
        speaker: {
          name: (
            <Link href="https://www.linkedin.com/in/mtg-softwares-dev/" target="_blank">
              محمد طاهر غزال
            </Link>
          ),
          description: "Senior Frontend Engineer @ Grafbase",
          image: "https://uploads.aleppo.dev/speakers/mohammed-taher-ghazal.jpeg",
        },
        description: (
          <div className="text-sm">
            <p className="mb-4">دليل عملي ونصائح قيمة لتطوير مشاريع Frontend حديثة ومتطورة</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                اختيار ال (Tech Stack) الأمثل: معايير تحديد الأدوات والتقنيات التي تناسب متطلبات
                مشروعك
              </li>
              <li>أهمية فصل الاهتمامات (Separation of Concerns) لضمان بنية قوية وسهلة الصيانة</li>
              <li>
                توظيف أدوات الأتمتة مثل ESLint و Prettier لضمان جودة الكود واتساق العمل بين أعضاء
                الفريق
              </li>
              <li>توظيف الذكاء الاصطناعي (AI) بذكاء: أين ومتى يمكن أن تستفيد منه كمطور Frontend</li>
              <li>استخدام ال Monorepos في المشاريع الضخمة</li>
            </ul>
          </div>
        ),
      },
      {
        title: (
          <div className="inline-flex items-center ">
            <img
              src="https://uploads.aleppo.dev/speakers/lighting-talk.png"
              className="w-16 h-16"
              alt="Lightning Talks"
            />
            <span>Lightning Talks</span>
          </div>
        ),
        speaker: {
          name: null,
          description: null,
          image: null,
        },
        description: (
          <div>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>
                  <Link
                    href="https://www.linkedin.com/in/nour-samman/"
                    target="_blank"
                    className="underline"
                  >
                    محمد نور سمان
                  </Link>
                </strong>{" "}
                - Knip: Declutter your JavaScript projects
              </li>
              <li>
                <strong>
                  <Link
                    href="https://www.linkedin.com/in/alaasufi00"
                    target="_blank"
                    className="underline"
                  >
                    آلاء صوفي
                  </Link>
                </strong>{" "}
                - Documenting Your JavaScript
              </li>
              <li>
                <strong>
                  <Link
                    href="https://www.linkedin.com/in/abdulrahman-alshahin"
                    target="_blank"
                    className="underline"
                  >
                    عبد الرحمن الشاهين
                  </Link>
                </strong>{" "}
                - Streams in JavaScript
              </li>
              <li>
                <strong>
                  <Link
                    href="https://www.linkedin.com/in/amir-battal/"
                    target="_blank"
                    className="underline"
                  >
                    أمير بطال
                  </Link>
                </strong>{" "}
                - Creative Coding
              </li>
              <li>
                <strong>
                  <Link
                    href="https://www.linkedin.com/in/muzan-ghazy-54217a37b"
                    target="_blank"
                    className="underline"
                  >
                    مُزن غازي
                  </Link>
                </strong>{" "}
                - The Risk of NPM Packages
              </li>
            </ul>
          </div>
        ),
      },
    ],
    tags: ["ملتقى", "AleppoJS"],
    sponsors: [
      {
        name: "الوسيط",
        website: "https://elwaseet-sy.com/",
        logo: "https://uploads.aleppo.dev/sponsors/el-waseet.webp",
        description:
          "تطبيق الوسيط هو منصة إلكترونية سهلة الاستخدام تتيح لك البيع والشراء بكل سرعة ومرونة. من خلاله يمكنك نشر إعلاناتك مجاناً والوصول إلى آلاف المهتمين في مختلف الفئات مثل العقارات، السيارات، الأجهزة الإلكترونية، الوظائف، والمزيد",
      },
      {
        name: "الهيئات الطلابية - محافظة حلب",
        website: "https://www.facebook.com/profile.php?id=61573542687856",
        logo: "https://uploads.aleppo.dev/sponsors/student-bodies-union-aleppo.png",
        description:
          "اتحاد الطلبة في جامعة حلب يعزز التواصل بين الطلاب وأعضاء الهيئة التدريسية والإدارة الجامعية. يقدم الاتحاد الدعم الأكاديمي والمساعدة في الدراسة، وينظم الفعاليات الثقافية والرياضية والاجتماعية. يهدف الاتحاد إلى تقديم المشورة والتوجيه للطلاب في المسائل الأكاديمية والمهنية، ودعم المشاريع الطلابية المبتكرة. يساهم الاتحاد في خلق بيئة جامعية محفزة ومتطورة للطلاب.",
      },
    ],
    gallery: [
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_15_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_1_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_9_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_3_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_5_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_4_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_6_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_2_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_7_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_8_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_10_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_11_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_13_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_14_2025-09-09_22-08-01.jpg",
      "https://uploads.aleppo.dev/aleppojs-2025-09/photo_12_2025-09-09_22-08-01.jpg",
    ],
  },
  {
    id: "AI-meetup-2025-Q3",
    title: "ملتقى الذكاء الصنعي - آب 2025",
    date: "2025/8/9 12:00 PM",
    location: "مدرج الخوارزمي، كلية الهندسة المعلوماتية، جامعة حلب، حلب",
    description: "",
    tags: ["ملتقى", "AI"],
    image: "https://uploads.aleppo.dev/AI-meetup-2025-08/cover.png",
    social: {
      youtube: "https://www.youtube.com/embed/I_M554OKAos",
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7360292528346099713",
    },
    talks: [
      {
        title: "Crafting AI Solutions with Real Business Value",
        speaker: {
          name: (
            <Link href="https://www.linkedin.com/in/alaa-aldin-hajjar-18b0621a6/" target="_blank">
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
          name: (
            <Link href="https://www.linkedin.com/in/abd-ulfatah-esper/" target="_blank">
              عبد الفتاح إسبر
            </Link>
          ),
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
    sponsors: [
      {
        name: "الهيئات الطلابية - محافظة حلب",
        website: "https://www.facebook.com/profile.php?id=61573542687856",
        logo: "https://uploads.aleppo.dev/sponsors/student-bodies-union-aleppo.png",
        description:
          "اتحاد الطلبة في جامعة حلب يعزز التواصل بين الطلاب وأعضاء الهيئة التدريسية والإدارة الجامعية. يقدم الاتحاد الدعم الأكاديمي والمساعدة في الدراسة، وينظم الفعاليات الثقافية والرياضية والاجتماعية. يهدف الاتحاد إلى تقديم المشورة والتوجيه للطلاب في المسائل الأكاديمية والمهنية، ودعم المشاريع الطلابية المبتكرة. يساهم الاتحاد في خلق بيئة جامعية محفزة ومتطورة للطلاب.",
      },
    ],
    gallery: [
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_1.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_2.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_5.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_3.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_4.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_7.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_8.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_9.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_11.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_10.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_13.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_6.jpg",
      "https://uploads.aleppo.dev/AI-meetup-2025-08/photo_12.jpg",
    ],
  },
  {
    id: "dev-meetup-2025-Q2",
    title: "ملتقى مطوري حلب - 2025 Q2",
    date: "2025/05/24 1:30 PM",
    location: "دار الكتب الوطنية، ساحة باب الفرج، حلب",
    description:
      "جمع المتقى نخبة من المطورين من مختلف الاختصاصات، إلى جانب حضور لافت من الأساتذة الأكاديميين وممثلين عن بعض أبرز الشركات المحلية. كان يومًا مميزًا زاخراً بالتفاعل وتبادل المعرفة، وبناء العلاقات بين أفراد المجتمع التقني.",
    tags: ["ملتقى", "All-Dev"],
    social: {
      youtube: "https://www.youtube.com/embed/MDtGeVc3WCo",
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7332327903168249856",
    },
    image: "https://uploads.aleppo.dev/dev-meetup-Q2/IMG_7211.JPG",
    talks: [
      {
        title: "إدارة اسرار بيئة المشروع!",
        speaker: {
          name: (
            <Link href="https://www.linkedin.com/in/haithamalnaeb/" target="_blank">
              هيثم النائب
            </Link>
          ),
          description: "CEO & Founder @ Architweb",
          image: "https://uploads.aleppo.dev/speakers/haitham-alnaeb.jpg",
        },
        description:
          "كيفية التعامل مع مفاتيح وأسرار المشاريع البرمجية بشكل آمن ومنظم، لضمان عدم ضياعها أو تسريبها.",
      },
      {
        title: (
          <div className="inline-flex items-center gap-3">
            <img
              src="https://uploads.aleppo.dev/speakers/discussion.png"
              className="w-16 h-16"
              alt="Lightning Talks"
            />
            <span>نقاشات مفتوحة</span>
          </div>
        ),
        speaker: {
          name: null,
          description: "",
          image: null,
        },
        description: (
          <ul className="list-disc list-inside">
            <li>
              <Link href="https://www.linkedin.com/in/osama-rida/" className="font-bold underline">
                أسامة رضا
              </Link>{" "}
              - Vibe Coding
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/islam-nassani/"
                className="font-bold underline"
              >
                إسلام نعساني
              </Link>{" "}
              - Blogging For Developers
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/abdo-ka/" className="font-bold underline">
                عبد الرحمن قنواتي
              </Link>{" "}
              - CI/CD
            </li>
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
