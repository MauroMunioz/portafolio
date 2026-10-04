import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { translations } from "../constants/i18n";
import { useLanguageStore } from "../store/language-store";
import ConfirmModal from "./ConfirmModal";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [confirmCv, setConfirmCv] = useState(false);
  const language = useLanguageStore((s) => s.language);
  const toggleLanguage = useLanguageStore((s) => s.toggleLanguage);
  const t = translations[language];

  const downloadCv = () => {
    setConfirmCv(false);
    const a = document.createElement("a");
    a.href = "/cv/Mauro_Munoz_CV.pdf";
    a.download = "Mauro_Munoz_CV.pdf";
    a.click();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-30 transition-colors pointer-events-auto ${
          scrolled ? "bg-void/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <span className="w-3 h-3 rounded-full border-2 border-signal-cyan flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-signal-cyan hud-blink" />
            </span>
            <p className="text-ion-white text-[18px] font-bold cursor-pointer flex">
              Mauro Muñoz
            </p>
          </Link>

          <div className="hidden sm:flex flex-row items-center gap-8">
            <ul className="list-none flex flex-row gap-10">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.id ? "text-signal-cyan" : "text-secondary"
                  } hover:text-ion-white hud-label text-[11px] cursor-pointer transition-colors`}
                  onClick={() => setActive(nav.id)}
                >
                  <a href={`#${nav.id}`}>{t.nav[nav.id]}</a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setConfirmCv(true)}
              className="hud-label text-[10px] px-3 py-1.5 rounded border border-signal-cyan/40 text-signal-cyan hover:bg-signal-cyan/10 transition-colors"
            >
              CV
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="hud-label text-[10px] flex items-center rounded border border-signal-cyan/30 overflow-hidden"
            >
              <span
                className={`px-2 py-1 transition-colors ${
                  language === "es"
                    ? "bg-signal-cyan/20 text-signal-cyan"
                    : "text-secondary"
                }`}
              >
                ES
              </span>
              <span
                className={`px-2 py-1 transition-colors ${
                  language === "en"
                    ? "bg-signal-cyan/20 text-signal-cyan"
                    : "text-secondary"
                }`}
              >
                EN
              </span>
            </button>
          </div>

          <div className="sm:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmCv(true)}
              className="hud-label text-[10px] px-2.5 py-1 rounded border border-signal-cyan/40 text-signal-cyan"
            >
              CV
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="hud-label text-[10px] text-signal-cyan"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </nav>

      <div className="sm:hidden fixed bottom-5 inset-x-0 z-30 flex justify-center pointer-events-none">
        <div className="glass-panel holo-pulse flex items-center gap-1 p-1.5 rounded-full pointer-events-auto shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
          {navLinks.map((nav) => (
            <a
              key={nav.id}
              href={`#${nav.id}`}
              onClick={() => setActive(nav.id)}
              className={`hud-label text-[10px] px-4 py-2.5 rounded-full transition-colors ${
                active === nav.id
                  ? "bg-signal-cyan/20 text-signal-cyan"
                  : "text-secondary"
              }`}
            >
              {t.nav[nav.id]}
            </a>
          ))}
        </div>
      </div>

      <ConfirmModal
        open={confirmCv}
        title={t.confirm.cv.title}
        message={t.confirm.cv.message}
        confirmLabel={t.confirm.cv.confirm}
        cancelLabel={t.confirm.cancel}
        onCancel={() => setConfirmCv(false)}
        onConfirm={downloadCv}
      />
    </>
  );
};

export default Navbar;
