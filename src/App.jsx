import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ApperIcon from './components/ApperIcon'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
<div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-surface-25 via-surface-50 to-surface-100 dark:from-surface-950 dark:via-surface-900 dark:to-surface-850">
        <header className="fixed top-0 left-0 right-0 z-50 glassmorphism-card border-b border-surface-200/50 dark:border-surface-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-glow">
                  <ApperIcon name="Building2" className="w-7 h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient-primary">
                    PropHub
                  </h1>
                  <p className="text-xs text-surface-600 dark:text-surface-400 font-medium">
                    Real Estate Platform
                  </p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="relative p-3 rounded-xl bg-white/60 dark:bg-surface-800/60 hover:bg-white/80 dark:hover:bg-surface-700/80 backdrop-blur-sm border border-surface-200/50 dark:border-surface-700/50 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <ApperIcon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-700 dark:text-surface-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </header>

<main className="pt-18">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
          className="mt-16"
        />
      </div>
    </div>
  )
}

export default App