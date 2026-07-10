import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneStore } from "../store/scene-store";

gsap.registerPlugin(ScrollTrigger);

export const useScrollProgress = () => {
  const setScroll = useSceneStore((s) => s.setScroll);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const global = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

      const sections = Array.from(document.querySelectorAll("[data-scene]"));
      let active = "hero";
      let progress = 0;
      const focus = window.scrollY + window.innerHeight * 0.5;

      for (const el of sections) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (focus >= top && focus < bottom) {
          active = el.dataset.scene;
          progress = (focus - top) / el.offsetHeight;
          break;
        }
        if (focus >= bottom) {
          active = el.dataset.scene;
          progress = 1;
        }
      }

      setScroll(global, active, progress);
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: update,
      onRefresh: update,
    });
    update();

    return () => trigger.kill();
  }, [setScroll]);
};
