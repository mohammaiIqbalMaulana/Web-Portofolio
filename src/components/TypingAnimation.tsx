import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAnimation } from '../contexts/AnimationContext'

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  speed = 100,
  delay = 0,
  className = '',
  cursorClassName = ''
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const { reducedMotion } = useAnimation()

  useEffect(() => {
    if (reducedMotion) {
      // Skip animation for users who prefer reduced motion
      setCurrentText(texts[0])
      return
    }

    const startTyping = () => {
      setIsTyping(true)
      let currentIndex = 0
      const currentFullText = texts[currentTextIndex]

      const typeInterval = setInterval(() => {
        if (currentIndex < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)

          // Wait before starting next text or looping back
          setTimeout(() => {
            if (currentTextIndex < texts.length - 1) {
              setCurrentTextIndex(prev => prev + 1)
              setCurrentText('')
            } else {
              setCurrentTextIndex(0)
              setCurrentText('')
            }
          }, 2000) // Wait 2 seconds before next text
        }
      }, speed)
    }

    const timer = setTimeout(startTyping, delay)
    return () => clearTimeout(timer)
  }, [currentTextIndex, texts, speed, delay, reducedMotion])

  // Cursor blinking animation
  useEffect(() => {
    if (reducedMotion) return

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [reducedMotion])

  return (
    <span className={className}>
      {currentText}
      {!reducedMotion && (
        <motion.span
          className={`inline-block w-0.5 h-5 bg-current ml-1 ${cursorClassName}`}
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </span>
  )
}

export default TypingAnimation
