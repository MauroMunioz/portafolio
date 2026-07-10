import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const StarLogEntry = ({ experience, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.6)}
    className="glass-panel holo-pulse p-6 rounded-xl w-full sm:w-[360px]"
  >
    <div className="flex items-center gap-3">
      <span className="w-2 h-2 rounded-full bg-signal-cyan" />
      <span className="hud-label">Star {String(index + 1).padStart(2, "0")}</span>
    </div>
    <h3 className="text-ion-white text-[20px] font-bold mt-4">
      {experience.title}
    </h3>
    <p className="text-signal-cyan text-[14px] font-medium">
      {experience.company_name}
    </p>
    <p className="hud-label text-[9px] mt-1">{experience.date}</p>
    {experience.points?.length > 0 && (
      <ul className="mt-4 list-disc ml-4 space-y-1">
        {experience.points.map((point, i) => (
          <li key={i} className="text-secondary text-[13px]">
            {point}
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <span className="hud-label">Career Constellation</span>
        <p className={`${styles.sectionSubText} mt-4`}>Charted trajectory</p>
        <h2 className={styles.sectionHeadText}>Experience.</h2>
      </motion.div>

      {experiences.length > 0 ? (
        <div className="mt-16 flex flex-wrap gap-7">
          {experiences.map((experience, index) => (
            <StarLogEntry key={index} experience={experience} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 0.8)}
          className="mt-16 glass-panel holo-pulse max-w-xl p-8 rounded-2xl"
        >
          <span className="hud-label text-engine-amber">Constellation Mapping</span>
          <p className="text-ion-white text-[18px] mt-4 leading-[28px]">
            New stars are being charted.
          </p>
          <p className="text-secondary text-[14px] mt-2 leading-[24px]">
            This constellation is under active survey. Full career coordinates
            will be plotted here soon.
          </p>
        </motion.div>
      )}
    </>
  );
};

export default SectionWrapper(Experience, "experience");
