import { motion } from "framer-motion"
import { styles } from "../styles"
import { staggerContainer } from "../utils/motion"
const SectionWrapper = (Component, idName, extraClass = "") =>
 function HOC (){
    return (
        <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{once:true, amount:0.15}}
        className={`${styles.padding} max-w-7xl mx-auto min-h-screen flex flex-col justify-center relative z-10 scroll-mt-24 ${extraClass}`}
        >
            <span className="hash-span" id={idName}>
                &nbsp;
             </span>
            <Component/>
        </motion.section>
    )
 }

export default SectionWrapper
