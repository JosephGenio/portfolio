import { useState } from 'react'
import { motion } from 'framer-motion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8">
      <motion.h1
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Portfolio
      </motion.h1>

      <motion.p
        className="text-gray-400 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        React + Vite + TailwindCSS + Framer Motion
      </motion.p>

      <motion.button
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCount((c) => c + 1)}
      >
        Count: {count}
      </motion.button>
    </div>
  )
}

export default App
