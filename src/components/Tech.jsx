import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import TechCanvas from "../three/tech/TechCanvas";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <span className="hud-label">Onboard Systems</span>
        <h2 className={`${styles.sectionHeadText} mt-3`}>Instruments.</h2>
      </motion.div>

      <div className="mt-6 w-full h-[420px]">
        <TechCanvas />
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
