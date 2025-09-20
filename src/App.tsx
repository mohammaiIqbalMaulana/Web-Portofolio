import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AnimationProvider } from './contexts/AnimationContext'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <Router>
          <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </AnimationProvider>
    </ThemeProvider>
  )
}

export default App
