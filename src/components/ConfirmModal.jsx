import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-void/45 p-4 pointer-events-auto"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="glass-panel holo-pulse w-full max-w-sm p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
            <span className="hud-label text-signal-cyan">{title}</span>
          </div>
          <p className="text-secondary text-[14px] mt-3 leading-[22px]">
            {message}
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="hud-label text-[10px] px-4 py-2 rounded border border-secondary/30 text-secondary hover:text-ion-white transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="hud-label text-[10px] px-4 py-2 rounded border border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan hover:bg-signal-cyan/20 transition-colors"
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmModal;
