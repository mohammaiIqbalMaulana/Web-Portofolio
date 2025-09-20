import React, { createContext, useContext } from 'react'

interface AnimationContextType {
  // Animation preferences and controls
  reducedMotion: boolean
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export const useAnimation = () => {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}

interface AnimationProviderProps {
  children: React.ReactNode
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const value = {
    reducedMotion,
  }

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}
