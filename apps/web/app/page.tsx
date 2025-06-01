import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";

export default async function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="py-12 flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <img src="/logo.svg" alt="logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl md:text-3xl text-foreground uppercase mt-2">مجتمع مطوري حلب</h1>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" dir="ltr">
          <a href="https://www.linkedin.com/company/aleppo-dev-community" className="group">
            <div className="border border-main p-6 transition-all duration-300 rounded-sm hover:bg-foreground hover:text-background flex flex-col items-center">
              <FaLinkedin className="text-3xl mb-3" />
              <span className="text-sm uppercase tracking-wider">LinkedIn</span>
            </div>
          </a>
          <a href="https://t.me/aleppo_dev_community" className="group">
            <div className="border border-main p-6 transition-all duration-300 rounded-sm hover:bg-foreground hover:text-background flex flex-col items-center">
              <FaTelegram className="text-3xl mb-3" />
              <span className="text-sm uppercase tracking-wider">Telegram</span>
            </div>
          </a>
          <a href="https://www.facebook.com/AleppoDevCommunity/" className="group">
            <div className="border border-main p-6 transition-all duration-300 rounded-sm hover:bg-foreground hover:text-background flex flex-col items-center">
              <FaFacebook className="text-3xl mb-3" />
              <span className="text-sm uppercase tracking-wider">Facebook</span>
            </div>
          </a>
          <a href="https://www.instagram.com/aleppo_dev_community" className="group">
            <div className="border border-main p-6 transition-all duration-300 rounded-sm hover:bg-foreground hover:text-background flex flex-col items-center">
              <FaInstagram className="text-3xl mb-3" />
              <span className="text-sm uppercase tracking-wider">Instagram</span>
            </div>
          </a>
        </div>
        <footer className="py-8 border-t border-gray-800 text-center">
          <div className="mb-4">
            <a href="mailto:contact@aleppo.dev" className="text-gray-300 mb-1">
              contact@aleppo.dev
            </a>
            <p className="text-sm text-gray-300">
              للتعاون والمشاركة، يرجى التواصل معنا على البريد الإلكتروني
            </p>
          </div>
          <p className="text-sm text-fade">© 2025 مجتمع مطوري حلب. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  );
}
