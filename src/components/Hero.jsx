import { motion } from "framer-motion";
import { styles } from "../styles";
import { translations } from "../constants/i18n";
import { useLanguageStore } from "../store/language-store";

const HudRow = ({ label, value, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    className="flex flex-col gap-1"
  >
    <span className="hud-label">{label}</span>
    <span
      className={`hud-value text-[15px] sm:text-[17px] ${
        accent ? "text-signal-cyan" : "text-ion-white"
      }`}
    >
      {value}
    </span>
  </motion.div>
);

const Hero = () => {
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].hero;

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-engine-amber hud-blink" />
          <span className="hud-label text-engine-amber">{t.missionReady}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`${styles.heroHeadText} text-ion-white mt-6`}
        >
          Mauro <span className="text-signal-cyan">Muñoz</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className={`${styles.heroSubText} mt-3 text-secondary max-w-xl`}
        >
          {t.tagline}
        </motion.p>

        <div className="mt-12 glass-panel holo-pulse inline-flex flex-col sm:flex-row gap-8 sm:gap-14 px-8 py-6">
          <HudRow label={t.pilot} value="Mauro Muñoz" delay={0.5} />
          <HudRow
            label={t.destination}
            value={t.destinationValue}
            accent
            delay={0.65}
          />
          <HudRow label={t.status} value={t.statusValue} delay={0.8} />
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-24 w-full flex justify-center items-center pointer-events-auto">
        <a href="#about" aria-label={t.beginDescent}>
          <div className="w-[34px] h-[62px] rounded-3xl border-2 border-signal-cyan/50 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 22, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
              className="w-2.5 h-2.5 rounded-full bg-signal-cyan"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
