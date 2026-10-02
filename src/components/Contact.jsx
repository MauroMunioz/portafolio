import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { track } from "@vercel/analytics";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useSceneStore } from "../store/scene-store";
import { translations } from "../constants/i18n";
import { useLanguageStore } from "../store/language-store";
import ConfirmModal from "./ConfirmModal";

const WHATSAPP_NUMBER = "593989163836";
const WHATSAPP_MESSAGE = {
  es: "Hola Mauro, vi tu portafolio y quiero contactarte.",
  en: "Hi Mauro, I saw your portfolio and I'd like to get in touch.",
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  const setTypingEnergy = useSceneStore((s) => s.setTypingEnergy);
  const setTransmission = useSceneStore((s) => s.setTransmission);
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].contact;
  const tConfirm = translations[language].confirm;

  useEffect(() => {
    const filled =
      (form.name.length + form.email.length + form.message.length) / 60;
    setTypingEnergy(Math.min(filled, 1));
  }, [form, setTypingEnergy]);

  useEffect(() => {
    return () => {
      setTypingEnergy(0);
      setTransmission("idle");
    };
  }, [setTypingEnergy, setTransmission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPendingAction("email");
  };

  const sendEmail = () => {
    setPendingAction(null);
    setLoading(true);
    setStatus(null);
    setTransmission("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Mauro",
          from_email: form.email,
          to_email: "munozmauro99@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
          setTransmission("sent");
          track("Email Sent");
          setTimeout(() => setTransmission("idle"), 4000);
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          setTransmission("idle");
          console.error(error);
        }
      );
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE[language] ?? WHATSAPP_MESSAGE.es
  )}`;

  return (
    <div className="w-full flex justify-start">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="glass-panel holo-pulse w-full max-w-md sm:max-w-lg p-6 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
          <span className="hud-label">{t.badge}</span>
        </div>
        <h3 className="text-ion-white font-black text-[32px] sm:text-[40px] leading-tight mt-3">
          {t.heading}
        </h3>

        <button
          type="button"
          onClick={() => setPendingAction("whatsapp")}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg border border-[#25d366]/40 bg-[#25d366]/10 py-3 px-6 text-[#25d366] hover:bg-[#25d366]/20 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 shrink-0"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.9 9.9 0 0 0 4.77 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.19c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.12-.42-.13-.96-.32-1.65-.62-2.9-1.25-4.79-4.16-4.94-4.35-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.52-.09.2-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.15.28.68 1.12 1.46 1.81 1 .89 1.85 1.17 2.13 1.3.28.13.44.11.6-.07.17-.18.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.66.78 1.94.92.28.14.47.21.53.33.07.13.07.72-.17 1.4Z" />
          </svg>
          <span className="hud-label text-[11px]">WhatsApp</span>
        </button>

        <div className="mt-5 flex items-center gap-3">
          <span className="hud-line flex-1" />
          <span className="hud-label text-[9px] text-secondary/60">
            {language === "en" ? "or" : "o"}
          </span>
          <span className="hud-line flex-1" />
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-3.5"
        >
          <label className="flex flex-col">
            <span className="hud-label mb-1.5">{t.callerId}</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t.namePlaceholder}
              required
              className="bg-black-200/70 py-2.5 px-4 placeholder:text-secondary text-ion-white rounded-lg outline-none border border-signal-cyan/15 focus:border-signal-cyan/50 font-medium transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="hud-label mb-1.5">{t.returnFrequency}</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t.emailPlaceholder}
              required
              className="bg-black-200/70 py-2.5 px-4 placeholder:text-secondary text-ion-white rounded-lg outline-none border border-signal-cyan/15 focus:border-signal-cyan/50 font-medium transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="hud-label mb-1.5">{t.messagePayload}</span>
            <textarea
              rows={3}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              required
              className="bg-black-200/70 py-2.5 px-4 placeholder:text-secondary text-ion-white rounded-lg outline-none border border-signal-cyan/15 focus:border-signal-cyan/50 font-medium transition-colors resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="hud-label bg-signal-cyan/10 hover:bg-signal-cyan/20 border border-signal-cyan/40 py-3 px-8 rounded-lg outline-none w-fit text-signal-cyan transition-colors disabled:opacity-50 mt-1"
          >
            {loading ? t.sending : t.send}
          </button>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="hud-value text-signal-cyan text-[16px] tracking-widest">
                {t.successTitle}
              </p>
              <p className="hud-label text-engine-amber mt-1">
                {t.successSubtitle}
              </p>
            </motion.div>
          )}
          {status === "error" && (
            <p className="hud-value text-engine-amber text-[14px]">
              {t.error}
            </p>
          )}
        </form>
      </motion.div>

      <ConfirmModal
        open={pendingAction === "whatsapp"}
        title={tConfirm.whatsapp.title}
        message={tConfirm.whatsapp.message}
        confirmLabel={tConfirm.whatsapp.confirm}
        cancelLabel={tConfirm.cancel}
        onCancel={() => setPendingAction(null)}
        onConfirm={() => {
          setPendingAction(null);
          track("WhatsApp");
          window.open(whatsappHref, "_blank", "noreferrer");
        }}
      />

      <ConfirmModal
        open={pendingAction === "email"}
        title={tConfirm.email.title}
        message={tConfirm.email.message}
        confirmLabel={tConfirm.email.confirm}
        cancelLabel={tConfirm.cancel}
        onCancel={() => setPendingAction(null)}
        onConfirm={sendEmail}
      />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
