import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const HoloCard = ({ index, title, icon }) => {
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
            Panel {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
          <span className="hud-label">Orbital Station</span>
        </div>
        <p className={`${styles.sectionSubText} mt-4`}>Crew manifest</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I&apos;m a software engineer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I approach every system like an expedition: mapping the
        problem, engineering a resilient architecture, and shipping efficient,
        user-friendly solutions. Let&apos;s explore what we can build together.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <HoloCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
