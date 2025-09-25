import React from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'
import { AnimationProvider } from '../contexts/AnimationContext'
import { MainLayout } from '../components/layout/MainLayout'

const SinglePageAppContent: React.FC = () => {
  return (
    <MainLayout />
  )
}

const SinglePageApp: React.FC = () => {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <SinglePageAppContent />
      </AnimationProvider>
    </ThemeProvider>
  )
}

export default SinglePageApp
