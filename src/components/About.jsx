import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { getServices } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { translations } from "../constants/i18n";
import { useLanguageStore } from "../store/language-store";

const HoloCard = ({ index, title, icon, panelLabel }) => {
  return (
    <Tilt
      className="xs:w-[250px] w-full pointer-events-auto"
      tiltMaxAngleX={18}
      tiltMaxAngleY={18}
      glareEnable
      glareMaxOpacity={0.15}
      glareColor="#5ef0ff"
      glarePosition="all"
      scale={1.02}
      transitionSpeed={800}
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.4 * index, 0.75)}
        className="w-full glass-panel holo-pulse p-[1px] rounded-[18px]"
      >
        <div className="bg-black-200/40 rounded-[18px] py-6 px-8 min-h-[260px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} className="w-14 h-14 object-contain" />
          <h3 className="text-ion-white text-[18px] font-bold text-center">
            {title}
          </h3>
          <span className="hud-label text-[9px] opacity-70">
            {panelLabel} {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].about;
  const services = getServices(language);

  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
          <span className="hud-label">{t.badge}</span>
        </div>
        <p className={`${styles.sectionSubText} mt-4`}>{t.subtext}</p>
        <h2 className={styles.sectionHeadText}>{t.heading}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {t.paragraph}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <HoloCard
            key={service.title}
            index={index}
            panelLabel={t.panel}
            {...service}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
