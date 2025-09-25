import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAnimation } from '../contexts/AnimationContext'

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
  loop?: boolean
  stopAfterComplete?: boolean
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  speed = 100,
  delay = 0,
  className = '',
  cursorClassName = '',
  loop = true,
  stopAfterComplete = false
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const { reducedMotion } = useAnimation()

  const typingTimeoutRef = useRef<NodeJS.Timeout>()
  const cursorIntervalRef = useRef<NodeJS.Timeout>()
  const delayTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (reducedMotion) {
      // Skip animation for users who prefer reduced motion
      setCurrentText(texts[0])
      setIsComplete(true)
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

          // If stopAfterComplete is true, don't cycle to next text
          if (stopAfterComplete) {
            setIsComplete(true)
            return
          }

          // Wait before starting next text or looping back
          typingTimeoutRef.current = setTimeout(() => {
            if (currentTextIndex < texts.length - 1) {
              setCurrentTextIndex(prev => prev + 1)
              setCurrentText('')
            } else if (loop) {
              setCurrentTextIndex(0)
              setCurrentText('')
            }
          }, 2000) // Wait 2 seconds before next text
        }
      }, speed)

      // Store interval reference for cleanup
      typingTimeoutRef.current = typeInterval as any
    }

    delayTimeoutRef.current = setTimeout(startTyping, delay)

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
    }
  }, [currentTextIndex, texts, speed, delay, reducedMotion, loop, stopAfterComplete])

  // Cursor blinking animation - stop when complete
  useEffect(() => {
    if (reducedMotion || isComplete) return

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    cursorIntervalRef.current = cursorInterval

    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current)
    }
  }, [reducedMotion, isComplete])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current)
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
    }
  }, [])

  return (
    <span className={className}>
      {currentText}
      {!reducedMotion && !isComplete && (
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
