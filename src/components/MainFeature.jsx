import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, addDays } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('properties')
  const [properties, setProperties] = useState([
    {
      id: '1',
      title: 'Modern Downtown Condo',
      price: 450000,
      address: '123 Main St, Downtown',
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      propertyType: 'Condo',
      status: 'Available',
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'],
      listingDate: new Date(),
      agentId: 'agent1'
    },
    {
      id: '2',
      title: 'Suburban Family Home',
      price: 675000,
      address: '456 Oak Ave, Suburbia',
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2400,
      propertyType: 'House',
      status: 'Pending',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'],
      listingDate: addDays(new Date(), -5),
      agentId: 'agent1'
    }
  ])

  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      budget: 500000,
      status: 'Active',
      leadSource: 'Website',
      notes: 'Looking for downtown condo'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@email.com',
      phone: '(555) 987-6543',
      budget: 750000,
      status: 'Qualified',
      leadSource: 'Referral',
      notes: 'Family with two children'
    }
  ])

  const [appointments, setAppointments] = useState([
    {
      id: '1',
      propertyId: '1',
      clientId: '1',
      scheduledDate: addDays(new Date(), 2),
      status: 'Scheduled',
      type: 'Viewing',
      notes: 'First viewing'
    }
  ])

  const [newProperty, setNewProperty] = useState({
    title: '',
    price: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    propertyType: 'House',
    description: ''
  })

  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
const [viewingProperty, setViewingProperty] = useState(null)
const [editingPropertyId, setEditingPropertyId] = useState(null)
  const [editProperty, setEditProperty] = useState({
    title: '',
    price: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    propertyType: 'House',
    description: ''
  })

  const handleEditProperty = (property) => {
    setEditingPropertyId(property.id)
    setEditProperty({
      title: property.title,
      price: property.price.toString(),
      address: property.address,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      squareFootage: property.squareFootage.toString(),
      propertyType: property.propertyType,
      description: property.description || ''
    })
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (!editProperty.title || !editProperty.price || !editProperty.address) {
      toast.error('Please fill in all required fields')
      return
    }

    const updatedProperty = {
      title: editProperty.title,
      price: parseFloat(editProperty.price),
      address: editProperty.address,
      bedrooms: parseInt(editProperty.bedrooms) || 0,
      bathrooms: parseInt(editProperty.bathrooms) || 0,
      squareFootage: parseInt(editProperty.squareFootage) || 0,
      propertyType: editProperty.propertyType,
      description: editProperty.description
    }

    setProperties(properties.map(prop => 
      prop.id === editingPropertyId 
        ? { ...prop, ...updatedProperty }
        : prop
    ))

    setEditingPropertyId(null)
    setEditProperty({
      title: '',
      price: '',
      address: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      propertyType: 'House',
      description: ''
    })
    toast.success('Property updated successfully!')
  }

  const handleCancelEdit = () => {
    setEditingPropertyId(null)
    setEditProperty({
      title: '',
      price: '',
      address: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      propertyType: 'House',
      description: ''
    })
  }

  const handleAddProperty = (e) => {
    e.preventDefault()
    if (!newProperty.title || !newProperty.price || !newProperty.address) {
      toast.error('Please fill in all required fields')
      return
    }

    const property = {
      id: Date.now().toString(),
      ...newProperty,
      price: parseFloat(newProperty.price),
      bedrooms: parseInt(newProperty.bedrooms) || 0,
      bathrooms: parseInt(newProperty.bathrooms) || 0,
      squareFootage: parseInt(newProperty.squareFootage) || 0,
      status: 'Available',
      images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'],
      listingDate: new Date(),
      agentId: 'agent1'
    }

    setProperties([...properties, property])
    setNewProperty({
      title: '',
      price: '',
      address: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      propertyType: 'House',
      description: ''
    })
    setShowPropertyForm(false)
    toast.success('Property added successfully!')
  }

  const updatePropertyStatus = (id, newStatus) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, status: newStatus } : prop
    ))
    toast.success(`Property status updated to ${newStatus}`)
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || property.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const tabs = [
    { id: 'properties', label: 'Properties', icon: 'Building2' },
    { id: 'clients', label: 'Clients', icon: 'Users' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ]

  const statusColors = {
    'Available': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Sold': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Off Market': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  const clientStatusColors = {
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Qualified': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
// View Property Modal Component
  const ViewPropertyModal = ({ property, onClose }) => {
    if (!property) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 dark:bg-surface-800/90 rounded-full p-2 hover:bg-white dark:hover:bg-surface-700 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-surface-700 dark:text-surface-300" />
            </button>
            <div className="absolute bottom-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[property.status]}`}>
                {property.status}
              </span>
            </div>
          </div>
          
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                  {property.title}
                </h2>
                <p className="text-3xl font-bold text-primary mb-3">
                  ${property.price.toLocaleString()}
                </p>
                <p className="text-surface-600 dark:text-surface-400 flex items-center">
                  <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                  {property.address}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <ApperIcon name="Bed" className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-surface-600 dark:text-surface-400">Bedrooms</p>
                <p className="text-lg font-semibold text-surface-900 dark:text-surface-100">{property.bedrooms}</p>
              </div>
              <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <ApperIcon name="Bath" className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-surface-600 dark:text-surface-400">Bathrooms</p>
                <p className="text-lg font-semibold text-surface-900 dark:text-surface-100">{property.bathrooms}</p>
              </div>
              <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <ApperIcon name="Square" className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-surface-600 dark:text-surface-400">Sq Ft</p>
                <p className="text-lg font-semibold text-surface-900 dark:text-surface-100">{property.squareFootage}</p>
              </div>
              <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <ApperIcon name="Home" className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-surface-600 dark:text-surface-400">Type</p>
                <p className="text-lg font-semibold text-surface-900 dark:text-surface-100">{property.propertyType}</p>
              </div>
            </div>

            <div className="border-t border-surface-200 dark:border-surface-600 pt-4">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">Property Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-surface-600 dark:text-surface-400">Listed Date:</span>
                  <span className="ml-2 text-surface-900 dark:text-surface-100">
                    {format(property.listingDate, 'PPP')}
                  </span>
                </div>
                <div>
                  <span className="text-surface-600 dark:text-surface-400">Property ID:</span>
                  <span className="ml-2 text-surface-900 dark:text-surface-100">{property.id}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-surface-200 dark:border-surface-600 mt-6">
              <button
                onClick={() => {
                  onClose()
                  handleEditProperty(property)
                }}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Edit" className="w-4 h-4" />
                <span>Edit Property</span>
              </button>
              <button
                onClick={onClose}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="X" className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-100 mb-4">
          Real Estate <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl">
          Manage your properties, track leads, and grow your real estate business with our comprehensive platform.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {[
          { label: 'Active Properties', value: properties.filter(p => p.status === 'Available').length, icon: 'Home', color: 'from-blue-500 to-blue-600' },
          { label: 'Total Clients', value: clients.length, icon: 'Users', color: 'from-green-500 to-green-600' },
          { label: 'Pending Sales', value: properties.filter(p => p.status === 'Pending').length, icon: 'Clock', color: 'from-yellow-500 to-yellow-600' },
          { label: 'This Month Revenue', value: '$125K', icon: 'DollarSign', color: 'from-purple-500 to-purple-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            className="card p-6 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full transform translate-x-6 -translate-y-6`} />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2 p-1 bg-surface-100 dark:bg-surface-800 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-surface-700 text-primary shadow-card'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-5 h-5" />
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'properties' && (
          <motion.div
            key="properties"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Properties Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field w-full sm:w-auto"
                >
                  <option value="All">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                  <option value="Off Market">Off Market</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPropertyForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-5 h-5" />
                <span>Add Property</span>
              </motion.button>
            </div>

            {/* Add Property Form */}
            <AnimatePresence>
              {showPropertyForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card p-6"
                >
                  <form onSubmit={handleAddProperty} className="space-y-4">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Add New Property
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label-text">Property Title *</label>
                        <input
                          type="text"
                          value={newProperty.title}
                          onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-text">Price *</label>
                        <input
                          type="number"
                          value={newProperty.price}
                          onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="label-text">Address *</label>
                        <input
                          type="text"
                          value={newProperty.address}
                          onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-text">Bedrooms</label>
                        <input
                          type="number"
                          value={newProperty.bedrooms}
                          onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="label-text">Bathrooms</label>
                        <input
                          type="number"
                          value={newProperty.bathrooms}
                          onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="label-text">Square Footage</label>
                        <input
                          type="number"
                          value={newProperty.squareFootage}
                          onChange={(e) => setNewProperty({...newProperty, squareFootage: e.target.value})}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="label-text">Property Type</label>
                        <select
                          value={newProperty.propertyType}
                          onChange={(e) => setNewProperty({...newProperty, propertyType: e.target.value})}
                          className="input-field"
                        >
                          <option value="House">House</option>
                          <option value="Condo">Condo</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Apartment">Apartment</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button type="submit" className="btn-primary">
                        Add Property
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPropertyForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card card-hover overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[property.status]}`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-black/50 text-white rounded-full text-sm font-medium">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
{editingPropertyId === property.id ? (
                    <div className="p-6">
                      <form onSubmit={handleSaveEdit} className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                          Edit Property
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label-text">Property Title *</label>
                            <input
                              type="text"
                              value={editProperty.title}
                              onChange={(e) => setEditProperty({...editProperty, title: e.target.value})}
                              className="input-field"
                              required
                            />
                          </div>
                          <div>
                            <label className="label-text">Price *</label>
                            <input
                              type="number"
                              value={editProperty.price}
                              onChange={(e) => setEditProperty({...editProperty, price: e.target.value})}
                              className="input-field"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="label-text">Address *</label>
                            <input
                              type="text"
                              value={editProperty.address}
                              onChange={(e) => setEditProperty({...editProperty, address: e.target.value})}
                              className="input-field"
                              required
                            />
                          </div>
                          <div>
                            <label className="label-text">Bedrooms</label>
                            <input
                              type="number"
                              value={editProperty.bedrooms}
                              onChange={(e) => setEditProperty({...editProperty, bedrooms: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="label-text">Bathrooms</label>
                            <input
                              type="number"
                              value={editProperty.bathrooms}
                              onChange={(e) => setEditProperty({...editProperty, bathrooms: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="label-text">Square Footage</label>
                            <input
                              type="number"
                              value={editProperty.squareFootage}
                              onChange={(e) => setEditProperty({...editProperty, squareFootage: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="label-text">Property Type</label>
                            <select
                              value={editProperty.propertyType}
                              onChange={(e) => setEditProperty({...editProperty, propertyType: e.target.value})}
                              className="input-field"
                            >
                              <option value="House">House</option>
                              <option value="Condo">Condo</option>
                              <option value="Townhouse">Townhouse</option>
                              <option value="Apartment">Apartment</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <button type="submit" className="btn-primary">
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                        {property.title}
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400 mb-4 flex items-center">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                        {property.address}
                      </p>
                      <div className="flex items-center justify-between text-sm text-surface-600 dark:text-surface-400 mb-4">
                        <span className="flex items-center">
                          <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                          {property.bedrooms} bed
                        </span>
                        <span className="flex items-center">
                          <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                          {property.bathrooms} bath
                        </span>
                        <span className="flex items-center">
                          <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                          {property.squareFootage} sqft
                        </span>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <select
                          value={property.status}
                          onChange={(e) => updatePropertyStatus(property.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-surface-300 dark:border-surface-600 rounded bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-300"
                        >
                          <option value="Available">Available</option>
                          <option value="Pending">Pending</option>
                          <option value="Sold">Sold</option>
                          <option value="Off Market">Off Market</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEditProperty(property)}
                          className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                          <span>Edit</span>
                        </motion.button>
<motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setViewingProperty(property)}
                          className="flex-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors flex items-center justify-center space-x-1"
                        >
                          <ApperIcon name="Eye" className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
<motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setViewingProperty(property)}
                          className="flex-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors flex items-center justify-center space-x-1"
                        >
                          <ApperIcon name="Eye" className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div
            key="clients"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card overflow-hidden">
              <div className="p-6 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                  Client Management
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-50 dark:bg-surface-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Budget
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-surface-50 dark:hover:bg-surface-800">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-surface-900 dark:text-surface-100">
                              {client.name}
                            </div>
                            <div className="text-sm text-surface-500 dark:text-surface-400">
                              {client.notes}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-surface-900 dark:text-surface-100">{client.email}</div>
                          <div className="text-sm text-surface-500 dark:text-surface-400">{client.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-900 dark:text-surface-100">
                          ${client.budget.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${clientStatusColors[client.status]}`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-surface-500 dark:text-surface-400">
                          {client.leadSource}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'appointments' && (
          <motion.div
            key="appointments"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                Upcoming Appointments
              </h3>
              <div className="space-y-4">
                {appointments.map((appointment) => {
                  const property = properties.find(p => p.id === appointment.propertyId)
                  const client = clients.find(c => c.id === appointment.clientId)
                  
                  return (
                    <div key={appointment.id} className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-surface-900 dark:text-surface-100">
                            {property?.title}
                          </h4>
                          <p className="text-sm text-surface-600 dark:text-surface-400">
                            Client: {client?.name} • {appointment.type}
                          </p>
                          <p className="text-sm text-surface-500 dark:text-surface-400">
                            {format(appointment.scheduledDate, 'PPP p')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-full">
                            {appointment.status}
                          </span>
                          <button className="p-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300">
                            <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  Property Status Distribution
                </h3>
                <div className="space-y-3">
                  {['Available', 'Pending', 'Sold'].map((status) => {
                    const count = properties.filter(p => p.status === status).length
                    const percentage = (count / properties.length) * 100
                    
                    return (
                      <div key={status}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                            {status}
                          </span>
                          <span className="text-sm text-surface-500 dark:text-surface-400">
                            {count}
                          </span>
                        </div>
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  Monthly Performance
                </h3>
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ApperIcon name="TrendingUp" className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                    $125,000
                  </p>
                  <p className="text-surface-600 dark:text-surface-400">
                    Revenue this month
                  </p>
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <ApperIcon name="ArrowUp" className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+15% from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
{/* View Property Modal */}
      <AnimatePresence>
        {viewingProperty && (
          <ViewPropertyModal
            property={viewingProperty}
            onClose={() => setViewingProperty(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature