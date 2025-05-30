import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-soft"
            >
              <ApperIcon name="Home" className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl font-bold text-gradient">404</h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
              Property Not Found
            </h2>
            <p className="text-surface-600 dark:text-surface-400 text-lg">
              Looks like this property has been sold or moved to a new location.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound