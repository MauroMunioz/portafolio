import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useSceneStore } from "../store/scene-store";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const setTypingEnergy = useSceneStore((s) => s.setTypingEnergy);
  const setTransmission = useSceneStore((s) => s.setTransmission);

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

  return (
    <div className="w-full flex justify-start">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="glass-panel holo-pulse w-full max-w-md sm:max-w-lg p-6 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
          <span className="hud-label">Final Destination</span>
        </div>
        <h3 className="text-ion-white font-black text-[32px] sm:text-[40px] leading-tight mt-3">
          Transmission.
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-3.5"
        >
          <label className="flex flex-col">
            <span className="hud-label mb-1.5">Caller ID</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="bg-black-200/70 py-2.5 px-4 placeholder:text-secondary text-ion-white rounded-lg outline-none border border-signal-cyan/15 focus:border-signal-cyan/50 font-medium transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="hud-label mb-1.5">Return Frequency</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="bg-black-200/70 py-2.5 px-4 placeholder:text-secondary text-ion-white rounded-lg outline-none border border-signal-cyan/15 focus:border-signal-cyan/50 font-medium transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="hud-label mb-1.5">Message Payload</span>
            <textarea
              rows={3}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to transmit?"
              required
              className="bg-black-200/70 py-2.5 px-4 placeholder:text-secondary text-ion-white rounded-lg outline-none border border-signal-cyan/15 focus:border-signal-cyan/50 font-medium transition-colors resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="hud-label bg-signal-cyan/10 hover:bg-signal-cyan/20 border border-signal-cyan/40 py-3 px-8 rounded-lg outline-none w-fit text-signal-cyan transition-colors disabled:opacity-50 mt-1"
          >
            {loading ? "Transmitting..." : "Send Transmission"}
          </button>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="hud-value text-signal-cyan text-[16px] tracking-widest">
                TRANSMISSION SUCCESSFUL
              </p>
              <p className="hud-label text-engine-amber mt-1">Mission Complete</p>
            </motion.div>
          )}
          {status === "error" && (
            <p className="hud-value text-engine-amber text-[14px]">
              Signal lost. Please retry the transmission.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
