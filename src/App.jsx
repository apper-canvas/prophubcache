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
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <ApperIcon name="Building2" className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  PropHub
                </h1>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-600 dark:text-surface-300" 
                />
              </button>
            </div>
          </div>
        </header>

        <main className="pt-16">
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