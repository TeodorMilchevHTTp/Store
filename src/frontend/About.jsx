import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6 relative overflow-hidden">
      {/* Title */}
      <motion.h2
        className="text-5xl font-extrabold text-orange-600 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      </motion.h2>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 max-w-2xl text-gray-700"
      >
        <p className="mb-6 leading-relaxed">
          <span className="font-semibold text-orange-600">Typo.exe</span> is a modern prototype webstore built with 
          attention to design and interactivity. Created by <span className="font-bold text-gray-900">Teodor</span>,
          it blends performance, usability, and clean aesthetics to offer a glimpse into a next-generation shopping
          experience.
        </p>

        <p className="mb-10 text-gray-600">
          This project was developed as a creative experiment — showcasing animations, UI fluidity, and a love for 
          refined front-end craftsmanship.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="https://github.com/Teodor" // 🔗 replace with your actual GitHub link
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition"
          >
            <FiGithub className="text-xl" />
            <span>Visit GitHub</span>
          </motion.a>

          <motion.a
            href="https://blog-t.pragmatino.xyz" // 🔗 replace with your actual blog URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-orange-700 transition"
          >
            <FiExternalLink className="text-xl" />
            <span>Teodor’s Blog</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Subtle floating background glow */}
      <motion.div
        className="absolute w-96 h-96 bg-orange-500/30 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
