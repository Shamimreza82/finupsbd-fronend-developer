import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

export default function BackHomeLink() {
  return (
    <MotionLink
      href="/"
      passHref
      className="group inline-flex items-center text-gray-700 transition-colors duration-200 ease-in-out"
      aria-label="Go back to home"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        className="flex-shrink-0 w-5 h-5 mr-2 text-gray-700 group-hover:text-green-600"
        whileHover={{ x: -2 }}
        transition={{ type: 'spring', stiffness: 300 }}
        aria-hidden="true"
      >
        <ArrowLeft className="w-full h-full" />
      </motion.span>

      <span className="relative">
        <span className="block">Back Home</span>
        {/* underline slide-in */}
        <span
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-600 transition-[width] duration-200 ease-in-out group-hover:w-full"
          aria-hidden="true"
        />
      </span>
    </MotionLink>
  )
}
