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
// Contracts state
  const [contracts, setContracts] = useState([
    {
      id: '1',
      propertyId: '1',
      clientId: '1',
      contractType: 'Purchase Agreement',
      status: 'Active',
      value: 450000,
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      signedDate: null,
      documents: ['purchase_agreement.pdf', 'property_disclosure.pdf'],
      notes: 'Standard purchase agreement'
    },
    {
      id: '2',
      propertyId: '2',
      clientId: '2',
      contractType: 'Listing Agreement',
      status: 'Signed',
      value: 675000,
      startDate: addDays(new Date(), -10),
      endDate: addDays(new Date(), 80),
      signedDate: addDays(new Date(), -5),
      documents: ['listing_agreement.pdf'],
      notes: 'Exclusive listing contract'
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
description: '',
    url: ''
  })
// Contract management state
  const [newContract, setNewContract] = useState({
    propertyId: '',
    clientId: '',
    contractType: 'Purchase Agreement',
    status: 'Draft',
    value: '',
    startDate: '',
    endDate: '',
    notes: '',
    documents: []
  })
  
  const [showContractForm, setShowContractForm] = useState(false)
  const [contractSearchTerm, setContractSearchTerm] = useState('')
  const [contractFilterStatus, setContractFilterStatus] = useState('All')
  const [contractFilterType, setContractFilterType] = useState('All')
  const [editingContractId, setEditingContractId] = useState(null)
  const [editContract, setEditContract] = useState({
    propertyId: '',
    clientId: '',
    contractType: 'Purchase Agreement',
    status: 'Draft',
    value: '',
    startDate: '',
    endDate: '',
    notes: '',
    documents: []
  })
  
  const contractStatusColors = {
    'Draft': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'Active': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Signed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Expired': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

// Appointment management state
  const [newAppointment, setNewAppointment] = useState({
    propertyId: '',
    clientId: '',
    scheduledDate: '',
    scheduledTime: '',
    status: 'Scheduled',
    type: 'Viewing',
    notes: ''
  })
  
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [appointmentSearchTerm, setAppointmentSearchTerm] = useState('')
  const [appointmentFilterStatus, setAppointmentFilterStatus] = useState('All')
  const [appointmentFilterType, setAppointmentFilterType] = useState('All')
  const [editingAppointmentId, setEditingAppointmentId] = useState(null)
  const [editAppointment, setEditAppointment] = useState({
    propertyId: '',
    clientId: '',
    scheduledDate: '',
    scheduledTime: '',
    status: 'Scheduled',
    type: 'Viewing',
    notes: ''
  })
  
  const appointmentStatusColors = {
    'Scheduled': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Confirmed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Completed': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'No Show': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
// Client management state
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    status: 'Active',
    leadSource: 'Website',
    notes: ''
  })
  
  const [showClientForm, setShowClientForm] = useState(false)
  const [clientSearchTerm, setClientSearchTerm] = useState('')
  const [clientFilterStatus, setClientFilterStatus] = useState('All')
  const [editingClientId, setEditingClientId] = useState(null)
  const [editClient, setEditClient] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    status: 'Active',
    leadSource: 'Website',
    notes: ''
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
description: '',
    url: ''
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
description: property.description || '',
    url: property.url || ''
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
description: editProperty.description,
    url: editProperty.url
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
description: '',
      url: ''
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
description: '',
    url: ''
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
description: '',
      url: ''
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
    { id: 'contracts', label: 'Contracts', icon: 'FileText' },
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
// Contract management functions
  const handleAddContract = (e) => {
    e.preventDefault()
    if (!newContract.propertyId || !newContract.clientId || !newContract.value || !newContract.startDate || !newContract.endDate) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate dates
    const startDate = new Date(newContract.startDate)
    const endDate = new Date(newContract.endDate)
    
    if (endDate <= startDate) {
      toast.error('End date must be after start date')
      return
    }

    const contract = {
      id: Date.now().toString(),
      propertyId: newContract.propertyId,
      clientId: newContract.clientId,
      contractType: newContract.contractType,
      status: newContract.status,
      value: parseFloat(newContract.value),
      startDate: startDate,
      endDate: endDate,
      signedDate: newContract.status === 'Signed' ? new Date() : null,
      documents: [],
      notes: newContract.notes
    }

    setContracts([...contracts, contract])
    setNewContract({
      propertyId: '',
      clientId: '',
      contractType: 'Purchase Agreement',
      status: 'Draft',
      value: '',
      startDate: '',
      endDate: '',
      notes: '',
      documents: []
    })
    setShowContractForm(false)
    toast.success('Contract created successfully!')
  }

  const handleEditContract = (contract) => {
    setEditingContractId(contract.id)
    setEditContract({
      propertyId: contract.propertyId,
      clientId: contract.clientId,
      contractType: contract.contractType,
      status: contract.status,
      value: contract.value.toString(),
      startDate: format(new Date(contract.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(contract.endDate), 'yyyy-MM-dd'),
      notes: contract.notes,
      documents: contract.documents
    })
  }

  const handleSaveContractEdit = (e) => {
    e.preventDefault()
    if (!editContract.propertyId || !editContract.clientId || !editContract.value || !editContract.startDate || !editContract.endDate) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate dates
    const startDate = new Date(editContract.startDate)
    const endDate = new Date(editContract.endDate)
    
    if (endDate <= startDate) {
      toast.error('End date must be after start date')
      return
    }

    const updatedContract = {
      propertyId: editContract.propertyId,
      clientId: editContract.clientId,
      contractType: editContract.contractType,
      status: editContract.status,
      value: parseFloat(editContract.value),
      startDate: startDate,
      endDate: endDate,
      signedDate: editContract.status === 'Signed' && !contracts.find(c => c.id === editingContractId)?.signedDate ? new Date() : contracts.find(c => c.id === editingContractId)?.signedDate,
      notes: editContract.notes,
      documents: editContract.documents
    }

    setContracts(contracts.map(contract => 
      contract.id === editingContractId 
        ? { ...contract, ...updatedContract }
        : contract
    ))

    setEditingContractId(null)
    setEditContract({
      propertyId: '',
      clientId: '',
      contractType: 'Purchase Agreement',
      status: 'Draft',
      value: '',
      startDate: '',
      endDate: '',
      notes: '',
      documents: []
    })
    toast.success('Contract updated successfully!')
  }

  const handleCancelContractEdit = () => {
    setEditingContractId(null)
    setEditContract({
      propertyId: '',
      clientId: '',
      contractType: 'Purchase Agreement',
      status: 'Draft',
      value: '',
      startDate: '',
      endDate: '',
      notes: '',
      documents: []
    })
  }

  const updateContractStatus = (id, newStatus) => {
    setContracts(contracts.map(contract => 
      contract.id === id ? { 
        ...contract, 
        status: newStatus,
        signedDate: newStatus === 'Signed' && !contract.signedDate ? new Date() : contract.signedDate
      } : contract
    ))
    toast.success(`Contract status updated to ${newStatus}`)
  }

  const deleteContract = (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      setContracts(contracts.filter(contract => contract.id !== id))
      toast.success('Contract deleted successfully!')
    }
  }

  const filteredContracts = contracts.filter(contract => {
    const property = properties.find(p => p.id === contract.propertyId)
    const client = clients.find(c => c.id === contract.clientId)
    
    const matchesSearch = contractSearchTerm === '' || 
      (property?.title.toLowerCase().includes(contractSearchTerm.toLowerCase())) ||
      (property?.address.toLowerCase().includes(contractSearchTerm.toLowerCase())) ||
      (client?.name.toLowerCase().includes(contractSearchTerm.toLowerCase())) ||
      (contract.contractType.toLowerCase().includes(contractSearchTerm.toLowerCase())) ||
      (contract.notes.toLowerCase().includes(contractSearchTerm.toLowerCase()))
    
    const matchesStatusFilter = contractFilterStatus === 'All' || contract.status === contractFilterStatus
    const matchesTypeFilter = contractFilterType === 'All' || contract.contractType === contractFilterType
    
    return matchesSearch && matchesStatusFilter && matchesTypeFilter
  })
// Client management functions
  const handleAddClient = (e) => {
    e.preventDefault()
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newClient.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    const client = {
      id: Date.now().toString(),
      ...newClient,
      budget: parseFloat(newClient.budget) || 0
    }

    setClients([...clients, client])
    setNewClient({
      name: '',
      email: '',
      phone: '',
      budget: '',
      status: 'Active',
      leadSource: 'Website',
      notes: ''
    })
    setShowClientForm(false)
    toast.success('Client added successfully!')
  }

  const handleEditClient = (client) => {
    setEditingClientId(client.id)
    setEditClient({
      name: client.name,
      email: client.email,
      phone: client.phone,
      budget: client.budget.toString(),
      status: client.status,
      leadSource: client.leadSource,
      notes: client.notes
    })
  }

  const handleSaveClientEdit = (e) => {
    e.preventDefault()
    if (!editClient.name || !editClient.email || !editClient.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editClient.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    const updatedClient = {
      name: editClient.name,
      email: editClient.email,
      phone: editClient.phone,
      budget: parseFloat(editClient.budget) || 0,
      status: editClient.status,
      leadSource: editClient.leadSource,
      notes: editClient.notes
    }

    setClients(clients.map(client => 
      client.id === editingClientId 
        ? { ...client, ...updatedClient }
        : client
    ))

    setEditingClientId(null)
    setEditClient({
      name: '',
      email: '',
      phone: '',
      budget: '',
      status: 'Active',
      leadSource: 'Website',
      notes: ''
    })
    toast.success('Client updated successfully!')
  }

  const handleCancelClientEdit = () => {
    setEditingClientId(null)
    setEditClient({
      name: '',
      email: '',
      phone: '',
      budget: '',
      status: 'Active',
      leadSource: 'Website',
      notes: ''
    })
  }

  const updateClientStatus = (id, newStatus) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, status: newStatus } : client
    ))
    toast.success(`Client status updated to ${newStatus}`)
  }

  const deleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== id))
      toast.success('Client deleted successfully!')
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                         client.phone.includes(clientSearchTerm)
    const matchesFilter = clientFilterStatus === 'All' || client.status === clientFilterStatus
    return matchesSearch && matchesFilter
  })
// Appointment management functions
  const handleAddAppointment = (e) => {
    e.preventDefault()
    if (!newAppointment.propertyId || !newAppointment.clientId || !newAppointment.scheduledDate || !newAppointment.scheduledTime) {
      toast.error('Please fill in all required fields')
      return
    }

    // Combine date and time
    const scheduledDateTime = new Date(`${newAppointment.scheduledDate}T${newAppointment.scheduledTime}`)
    
    // Check if appointment is in the past
    if (scheduledDateTime < new Date()) {
      toast.error('Cannot schedule appointments in the past')
      return
    }

    const appointment = {
      id: Date.now().toString(),
      propertyId: newAppointment.propertyId,
      clientId: newAppointment.clientId,
      scheduledDate: scheduledDateTime,
      status: newAppointment.status,
      type: newAppointment.type,
      notes: newAppointment.notes
    }

    setAppointments([...appointments, appointment])
    setNewAppointment({
      propertyId: '',
      clientId: '',
      scheduledDate: '',
      scheduledTime: '',
      status: 'Scheduled',
      type: 'Viewing',
      notes: ''
    })
    setShowAppointmentForm(false)
    toast.success('Appointment scheduled successfully!')
  }

  const handleEditAppointment = (appointment) => {
    setEditingAppointmentId(appointment.id)
    const appointmentDate = new Date(appointment.scheduledDate)
    setEditAppointment({
      propertyId: appointment.propertyId,
      clientId: appointment.clientId,
      scheduledDate: format(appointmentDate, 'yyyy-MM-dd'),
      scheduledTime: format(appointmentDate, 'HH:mm'),
      status: appointment.status,
      type: appointment.type,
      notes: appointment.notes
    })
  }

  const handleSaveAppointmentEdit = (e) => {
    e.preventDefault()
    if (!editAppointment.propertyId || !editAppointment.clientId || !editAppointment.scheduledDate || !editAppointment.scheduledTime) {
      toast.error('Please fill in all required fields')
      return
    }

    // Combine date and time
    const scheduledDateTime = new Date(`${editAppointment.scheduledDate}T${editAppointment.scheduledTime}`)

    const updatedAppointment = {
      propertyId: editAppointment.propertyId,
      clientId: editAppointment.clientId,
      scheduledDate: scheduledDateTime,
      status: editAppointment.status,
      type: editAppointment.type,
      notes: editAppointment.notes
    }

    setAppointments(appointments.map(appointment => 
      appointment.id === editingAppointmentId 
        ? { ...appointment, ...updatedAppointment }
        : appointment
    ))

    setEditingAppointmentId(null)
    setEditAppointment({
      propertyId: '',
      clientId: '',
      scheduledDate: '',
      scheduledTime: '',
      status: 'Scheduled',
      type: 'Viewing',
      notes: ''
    })
    toast.success('Appointment updated successfully!')
  }

  const handleCancelAppointmentEdit = () => {
    setEditingAppointmentId(null)
    setEditAppointment({
      propertyId: '',
      clientId: '',
      scheduledDate: '',
      scheduledTime: '',
      status: 'Scheduled',
      type: 'Viewing',
      notes: ''
    })
  }

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ))
    toast.success(`Appointment status updated to ${newStatus}`)
  }

  const deleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(appointment => appointment.id !== id))
      toast.success('Appointment deleted successfully!')
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const property = properties.find(p => p.id === appointment.propertyId)
    const client = clients.find(c => c.id === appointment.clientId)
    
    const matchesSearch = appointmentSearchTerm === '' || 
      (property?.title.toLowerCase().includes(appointmentSearchTerm.toLowerCase())) ||
      (property?.address.toLowerCase().includes(appointmentSearchTerm.toLowerCase())) ||
      (client?.name.toLowerCase().includes(appointmentSearchTerm.toLowerCase())) ||
      (appointment.notes.toLowerCase().includes(appointmentSearchTerm.toLowerCase()))
    
    const matchesStatusFilter = appointmentFilterStatus === 'All' || appointment.status === appointmentFilterStatus
    const matchesTypeFilter = appointmentFilterType === 'All' || appointment.type === appointmentFilterType
    
    return matchesSearch && matchesStatusFilter && matchesTypeFilter
  })

  // Sort appointments by date (upcoming first)
  const sortedAppointments = filteredAppointments.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
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
{ label: 'Active Contracts', value: contracts.filter(c => c.status === 'Active' || c.status === 'Signed').length, icon: 'FileText', color: 'from-orange-500 to-orange-600' },
          { label: 'Revenue', value: '$125K', icon: 'TrendingUp', color: 'from-purple-500 to-purple-600' }
        ].map((stat, index) => (
          <motion.div
            key={index}
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
<div className="md:col-span-2">
                        <label className="label-text">Description</label>
                        <textarea
                          value={newProperty.description}
                          onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                          className="input-field"
                          rows="3"
                          placeholder="Property description..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="label-text">Property URL</label>
                        <input
                          type="url"
                          value={newProperty.url}
                          onChange={(e) => setNewProperty({...newProperty, url: e.target.value})}
                          className="input-field"
                          placeholder="https://example.com/property"
                        />
                      </div>
<div className="md:col-span-2">
                        <label className="label-text">Property URL</label>
                        <input
                          type="url"
                          value={newProperty.url}
                          onChange={(e) => setNewProperty({...newProperty, url: e.target.value})}
                          className="input-field"
                          placeholder="https://example.com/property"
                        />
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
<div className="md:col-span-2">
                            <label className="label-text">Description</label>
                            <textarea
                              value={editProperty.description}
                              onChange={(e) => setEditProperty({...editProperty, description: e.target.value})}
                              className="input-field"
                              rows="3"
                            />
                          </div>
                          <div className="md:col-span-2">
<label className="label-text">Property URL</label>
                            <input
                              type="url"
                              value={editProperty.url}
                              onChange={(e) => setEditProperty({...editProperty, url: e.target.value})}
                              className="input-field"
                              placeholder="https://example.com/property"
                            />
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Clients Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={clientSearchTerm}
                    onChange={(e) => setClientSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <select
                  value={clientFilterStatus}
                  onChange={(e) => setClientFilterStatus(e.target.value)}
                  className="input-field w-full sm:w-auto"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowClientForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-5 h-5" />
                <span>Add Client</span>
              </motion.button>
            </div>

            {/* Add Client Form */}
            <AnimatePresence>
              {showClientForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card p-6"
                >
                  <form onSubmit={handleAddClient} className="space-y-4">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Add New Client
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label-text">Full Name *</label>
                        <input
                          type="text"
                          value={newClient.name}
                          onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-text">Email *</label>
                        <input
                          type="email"
                          value={newClient.email}
                          onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-text">Phone *</label>
                        <input
                          type="tel"
                          value={newClient.phone}
                          onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-text">Budget</label>
                        <input
                          type="number"
                          value={newClient.budget}
                          onChange={(e) => setNewClient({...newClient, budget: e.target.value})}
                          className="input-field"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="label-text">Status</label>
                        <select
                          value={newClient.status}
                          onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                          className="input-field"
                        >
                          <option value="Active">Active</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-text">Lead Source</label>
                        <select
                          value={newClient.leadSource}
                          onChange={(e) => setNewClient({...newClient, leadSource: e.target.value})}
                          className="input-field"
                        >
                          <option value="Website">Website</option>
                          <option value="Referral">Referral</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Walk-in">Walk-in</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="label-text">Notes</label>
                        <textarea
                          value={newClient.notes}
                          onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                          className="input-field"
                          rows="3"
                          placeholder="Additional notes about the client..."
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button type="submit" className="btn-primary">
                        Add Client
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowClientForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card card-hover"
                >
                  {editingClientId === client.id ? (
                    <div className="p-6">
                      <form onSubmit={handleSaveClientEdit} className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                          Edit Client
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="label-text">Full Name *</label>
                            <input
                              type="text"
                              value={editClient.name}
                              onChange={(e) => setEditClient({...editClient, name: e.target.value})}
                              className="input-field"
                              required
                            />
                          </div>
                          <div>
                            <label className="label-text">Email *</label>
                            <input
                              type="email"
                              value={editClient.email}
                              onChange={(e) => setEditClient({...editClient, email: e.target.value})}
                              className="input-field"
                              required
                            />
                          </div>
                          <div>
                            <label className="label-text">Phone *</label>
                            <input
                              type="tel"
                              value={editClient.phone}
                              onChange={(e) => setEditClient({...editClient, phone: e.target.value})}
                              className="input-field"
                              required
                            />
                          </div>
                          <div>
                            <label className="label-text">Budget</label>
                            <input
                              type="number"
                              value={editClient.budget}
                              onChange={(e) => setEditClient({...editClient, budget: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="label-text">Status</label>
                            <select
                              value={editClient.status}
                              onChange={(e) => setEditClient({...editClient, status: e.target.value})}
                              className="input-field"
                            >
                              <option value="Active">Active</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                          <div>
                            <label className="label-text">Lead Source</label>
                            <select
                              value={editClient.leadSource}
                              onChange={(e) => setEditClient({...editClient, leadSource: e.target.value})}
                              className="input-field"
                            >
                              <option value="Website">Website</option>
                              <option value="Referral">Referral</option>
                              <option value="Social Media">Social Media</option>
                              <option value="Walk-in">Walk-in</option>
                              <option value="Advertisement">Advertisement</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="label-text">Notes</label>
                            <textarea
                              value={editClient.notes}
                              onChange={(e) => setEditClient({...editClient, notes: e.target.value})}
                              className="input-field"
                              rows="3"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <button type="submit" className="btn-primary">
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelClientEdit}
                            className="btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                            {client.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${clientStatusColors[client.status]}`}>
                            {client.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-surface-600 dark:text-surface-400">
                          <ApperIcon name="Mail" className="w-4 h-4 mr-3" />
                          <span className="text-sm">{client.email}</span>
                        </div>
                        <div className="flex items-center text-surface-600 dark:text-surface-400">
                          <ApperIcon name="Phone" className="w-4 h-4 mr-3" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                        <div className="flex items-center text-surface-600 dark:text-surface-400">
                          <ApperIcon name="DollarSign" className="w-4 h-4 mr-3" />
                          <span className="text-sm">${client.budget.toLocaleString()} budget</span>
                        </div>
                        <div className="flex items-center text-surface-600 dark:text-surface-400">
                          <ApperIcon name="Users" className="w-4 h-4 mr-3" />
                          <span className="text-sm">{client.leadSource}</span>
                        </div>
                      </div>

                      {client.notes && (
                        <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 mb-4">
                          <p className="text-sm text-surface-600 dark:text-surface-400">
                            {client.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <select
                          value={client.status}
                          onChange={(e) => updateClientStatus(client.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-surface-300 dark:border-surface-600 rounded bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-300"
                        >
                          <option value="Active">Active</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEditClient(client)}
                          className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                          <span>Edit</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => deleteClient(client.id)}
                          className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                          <span>Delete</span>
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Users" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
                  No clients found
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  {clientSearchTerm || clientFilterStatus !== 'All' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by adding your first client'
                  }
                </p>
                {!clientSearchTerm && clientFilterStatus === 'All' && (
                  <button
                    onClick={() => setShowClientForm(true)}
                    className="btn-primary"
                  >
                    Add Your First Client
                  </button>
                )}
              </div>
            )}
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
            {/* Appointments Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={appointmentSearchTerm}
                    onChange={(e) => setAppointmentSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <select
                  value={appointmentFilterStatus}
                  onChange={(e) => setAppointmentFilterStatus(e.target.value)}
                  className="input-field w-full sm:w-auto"
                >
                  <option value="All">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No Show">No Show</option>
                </select>
                <select
                  value={appointmentFilterType}
                  onChange={(e) => setAppointmentFilterType(e.target.value)}
                  className="input-field w-full sm:w-auto"
                >
                  <option value="All">All Types</option>
                  <option value="Viewing">Viewing</option>
                  <option value="Showing">Showing</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAppointmentForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-5 h-5" />
                <span>Schedule Appointment</span>
              </motion.button>
            </div>

            {/* Add Appointment Form */}
            <AnimatePresence>
              {showAppointmentForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card p-6"
                >
                  <form onSubmit={handleAddAppointment} className="space-y-4">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Schedule New Appointment
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label-text">Property *</label>
                        <select
                          value={newAppointment.propertyId}
                          onChange={(e) => setNewAppointment({...newAppointment, propertyId: e.target.value})}
                          className="input-field"
                          required
                        >
                          <option value="">Select a property</option>
                          {properties.map((property) => (
                            <option key={property.id} value={property.id}>
                              {property.title} - {property.address}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-text">Client *</label>
                        <select
                          value={newAppointment.clientId}
                          onChange={(e) => setNewAppointment({...newAppointment, clientId: e.target.value})}
                          className="input-field"
                          required
                        >
                          <option value="">Select a client</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name} - {client.email}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-text">Date *</label>
                        <input
                          type="date"
                          value={newAppointment.scheduledDate}
                          onChange={(e) => setNewAppointment({...newAppointment, scheduledDate: e.target.value})}
                          className="input-field"
                          required
                          min={format(new Date(), 'yyyy-MM-dd')}
                        />
                      </div>
                      <div>
                        <label className="label-text">Time *</label>
                        <input
                          type="time"
                          value={newAppointment.scheduledTime}
                          onChange={(e) => setNewAppointment({...newAppointment, scheduledTime: e.target.value})}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-text">Type</label>
                        <select
                          value={newAppointment.type}
                          onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                          className="input-field"
                        >
                          <option value="Viewing">Viewing</option>
                          <option value="Showing">Showing</option>
                          <option value="Consultation">Consultation</option>
                          <option value="Follow-up">Follow-up</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-text">Status</label>
                        <select
                          value={newAppointment.status}
                          onChange={(e) => setNewAppointment({...newAppointment, status: e.target.value})}
                          className="input-field"
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Confirmed">Confirmed</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="label-text">Notes</label>
                        <textarea
                          value={newAppointment.notes}
                          onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                          className="input-field"
                          rows="3"
                          placeholder="Additional notes about the appointment..."
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button type="submit" className="btn-primary">
                        Schedule Appointment
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAppointmentForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Appointments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedAppointments.map((appointment, index) => {
                const property = properties.find(p => p.id === appointment.propertyId)
                const client = clients.find(c => c.id === appointment.clientId)
                
                return (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card card-hover"
                  >
                    {editingAppointmentId === appointment.id ? (
                      <div className="p-6">
                        <form onSubmit={handleSaveAppointmentEdit} className="space-y-4">
                          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                            Edit Appointment
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="label-text">Property *</label>
                              <select
                                value={editAppointment.propertyId}
                                onChange={(e) => setEditAppointment({...editAppointment, propertyId: e.target.value})}
                                className="input-field"
                                required
                              >
                                <option value="">Select a property</option>
                                {properties.map((property) => (
                                  <option key={property.id} value={property.id}>
                                    {property.title} - {property.address}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="label-text">Client *</label>
                              <select
                                value={editAppointment.clientId}
                                onChange={(e) => setEditAppointment({...editAppointment, clientId: e.target.value})}
                                className="input-field"
                                required
                              >
                                <option value="">Select a client</option>
                                {clients.map((client) => (
                                  <option key={client.id} value={client.id}>
                                    {client.name} - {client.email}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="label-text">Date *</label>
                                <input
                                  type="date"
                                  value={editAppointment.scheduledDate}
                                  onChange={(e) => setEditAppointment({...editAppointment, scheduledDate: e.target.value})}
                                  className="input-field"
                                  required
                                />
                              </div>
                              <div>
                                <label className="label-text">Time *</label>
                                <input
                                  type="time"
                                  value={editAppointment.scheduledTime}
                                  onChange={(e) => setEditAppointment({...editAppointment, scheduledTime: e.target.value})}
                                  className="input-field"
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="label-text">Type</label>
                                <select
                                  value={editAppointment.type}
                                  onChange={(e) => setEditAppointment({...editAppointment, type: e.target.value})}
                                  className="input-field"
                                >
                                  <option value="Viewing">Viewing</option>
                                  <option value="Showing">Showing</option>
                                  <option value="Consultation">Consultation</option>
                                  <option value="Follow-up">Follow-up</option>
                                </select>
                              </div>
                              <div>
                                <label className="label-text">Status</label>
                                <select
                                  value={editAppointment.status}
                                  onChange={(e) => setEditAppointment({...editAppointment, status: e.target.value})}
                                  className="input-field"
                                >
                                  <option value="Scheduled">Scheduled</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="No Show">No Show</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="label-text">Notes</label>
                              <textarea
                                value={editAppointment.notes}
                                onChange={(e) => setEditAppointment({...editAppointment, notes: e.target.value})}
                                className="input-field"
                                rows="3"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button type="submit" className="btn-primary">
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelAppointmentEdit}
                              className="btn-secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                              {property?.title || 'Property Not Found'}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointmentStatusColors[appointment.status]}`}>
                              {appointment.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="MapPin" className="w-4 h-4 mr-3" />
                            <span className="text-sm">{property?.address || 'Address not available'}</span>
                          </div>
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="User" className="w-4 h-4 mr-3" />
                            <span className="text-sm">{client?.name || 'Client not found'}</span>
                          </div>
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Calendar" className="w-4 h-4 mr-3" />
                            <span className="text-sm">{format(new Date(appointment.scheduledDate), 'PPP')}</span>
                          </div>
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Clock" className="w-4 h-4 mr-3" />
                            <span className="text-sm">{format(new Date(appointment.scheduledDate), 'p')}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 mb-4">
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              {appointment.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 mb-4">
                          <select
                            value={appointment.status}
                            onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                            className="text-xs px-2 py-1 border border-surface-300 dark:border-surface-600 rounded bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-300"
                          >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="No Show">No Show</option>
                          </select>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleEditAppointment(appointment)}
                            className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1"
                          >
                            <ApperIcon name="Edit" className="w-4 h-4" />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => deleteAppointment(appointment.id)}
                            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                            <span>Delete</span>
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {sortedAppointments.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Calendar" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
                  No appointments found
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  {appointmentSearchTerm || appointmentFilterStatus !== 'All' || appointmentFilterType !== 'All'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by scheduling your first appointment'
                  }
                </p>
                {!appointmentSearchTerm && appointmentFilterStatus === 'All' && appointmentFilterType === 'All' && (
                  <button
                    onClick={() => setShowAppointmentForm(true)}
                    className="btn-primary"
                  >
                    Schedule Your First Appointment
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
{activeTab === 'contracts' && (
          <motion.div
            key="contracts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Contracts Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search contracts..."
                    value={contractSearchTerm}
                    onChange={(e) => setContractSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <select
                  value={contractFilterStatus}
                  onChange={(e) => setContractFilterStatus(e.target.value)}
                  className="input-field w-full sm:w-auto"
                >
                  <option value="All">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Signed">Signed</option>
                  <option value="Expired">Expired</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={contractFilterType}
                  onChange={(e) => setContractFilterType(e.target.value)}
                  className="input-field w-full sm:w-auto"
                >
                  <option value="All">All Types</option>
                  <option value="Purchase Agreement">Purchase Agreement</option>
                  <option value="Listing Agreement">Listing Agreement</option>
                  <option value="Lease Agreement">Lease Agreement</option>
                  <option value="Service Contract">Service Contract</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowContractForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-5 h-5" />
                <span>Create Contract</span>
              </motion.button>
            </div>

            {/* Add Contract Form */}
            <AnimatePresence>
              {showContractForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card p-6"
                >
                  <form onSubmit={handleAddContract} className="space-y-4">
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Create New Contract
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label-text">Property *</label>
                        <select
                          value={newContract.propertyId}
                          onChange={(e) => setNewContract({...newContract, propertyId: e.target.value})}
                          className="input-field"
                          required
                        >
                          <option value="">Select a property</option>
                          {properties.map((property) => (
                            <option key={property.id} value={property.id}>
                              {property.title} - {property.address}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-text">Client *</label>
                        <select
                          value={newContract.clientId}
                          onChange={(e) => setNewContract({...newContract, clientId: e.target.value})}
                          className="input-field"
                          required
                        >
                          <option value="">Select a client</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name} - {client.email}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-text">Contract Type</label>
                        <select
                          value={newContract.contractType}
                          onChange={(e) => setNewContract({...newContract, contractType: e.target.value})}
                          className="input-field"
                        >
                          <option value="Purchase Agreement">Purchase Agreement</option>
                          <option value="Listing Agreement">Listing Agreement</option>
                          <option value="Lease Agreement">Lease Agreement</option>
                          <option value="Service Contract">Service Contract</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-text">Contract Value *</label>
                        <input
                          type="number"
                          value={newContract.value}
                          onChange={(e) => setNewContract({...newContract, value: e.target.value})}
                          className="input-field"
                          placeholder="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="label-text">Start Date *</label>
                        <input
                          type="date"
                          value={newContract.startDate}
                          onChange={(e) => setNewContract({...newContract, startDate: e.target.value})}
                          className="input-field"
                          required
                          min={format(new Date(), 'yyyy-MM-dd')}
                        />
                      </div>
                      <div>
                        <label className="label-text">End Date *</label>
                        <input
                          type="date"
                          value={newContract.endDate}
                          onChange={(e) => setNewContract({...newContract, endDate: e.target.value})}
                          className="input-field"
                          required
                          min={newContract.startDate || format(new Date(), 'yyyy-MM-dd')}
                        />
                      </div>
                      <div>
                        <label className="label-text">Status</label>
                        <select
                          value={newContract.status}
                          onChange={(e) => setNewContract({...newContract, status: e.target.value})}
                          className="input-field"
                        >
                          <option value="Draft">Draft</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Signed">Signed</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="label-text">Notes</label>
                        <textarea
                          value={newContract.notes}
                          onChange={(e) => setNewContract({...newContract, notes: e.target.value})}
                          className="input-field"
                          rows="3"
                          placeholder="Additional notes about the contract..."
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button type="submit" className="btn-primary">
                        Create Contract
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContractForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contracts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredContracts.map((contract, index) => {
                const property = properties.find(p => p.id === contract.propertyId)
                const client = clients.find(c => c.id === contract.clientId)
                
                return (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card card-hover"
                  >
                    {editingContractId === contract.id ? (
                      <div className="p-6">
                        <form onSubmit={handleSaveContractEdit} className="space-y-4">
                          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                            Edit Contract
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="label-text">Property *</label>
                              <select
                                value={editContract.propertyId}
                                onChange={(e) => setEditContract({...editContract, propertyId: e.target.value})}
                                className="input-field"
                                required
                              >
                                <option value="">Select a property</option>
                                {properties.map((property) => (
                                  <option key={property.id} value={property.id}>
                                    {property.title} - {property.address}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="label-text">Client *</label>
                              <select
                                value={editContract.clientId}
                                onChange={(e) => setEditContract({...editContract, clientId: e.target.value})}
                                className="input-field"
                                required
                              >
                                <option value="">Select a client</option>
                                {clients.map((client) => (
                                  <option key={client.id} value={client.id}>
                                    {client.name} - {client.email}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="label-text">Contract Type</label>
                                <select
                                  value={editContract.contractType}
                                  onChange={(e) => setEditContract({...editContract, contractType: e.target.value})}
                                  className="input-field"
                                >
                                  <option value="Purchase Agreement">Purchase Agreement</option>
                                  <option value="Listing Agreement">Listing Agreement</option>
                                  <option value="Lease Agreement">Lease Agreement</option>
                                  <option value="Service Contract">Service Contract</option>
                                </select>
                              </div>
                              <div>
                                <label className="label-text">Contract Value *</label>
                                <input
                                  type="number"
                                  value={editContract.value}
                                  onChange={(e) => setEditContract({...editContract, value: e.target.value})}
                                  className="input-field"
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="label-text">Start Date *</label>
                                <input
                                  type="date"
                                  value={editContract.startDate}
                                  onChange={(e) => setEditContract({...editContract, startDate: e.target.value})}
                                  className="input-field"
                                  required
                                />
                              </div>
                              <div>
                                <label className="label-text">End Date *</label>
                                <input
                                  type="date"
                                  value={editContract.endDate}
                                  onChange={(e) => setEditContract({...editContract, endDate: e.target.value})}
                                  className="input-field"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="label-text">Status</label>
                              <select
                                value={editContract.status}
                                onChange={(e) => setEditContract({...editContract, status: e.target.value})}
                                className="input-field"
                              >
                                <option value="Draft">Draft</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Signed">Signed</option>
                                <option value="Expired">Expired</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                            <div>
                              <label className="label-text">Notes</label>
                              <textarea
                                value={editContract.notes}
                                onChange={(e) => setEditContract({...editContract, notes: e.target.value})}
                                className="input-field"
                                rows="3"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button type="submit" className="btn-primary">
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelContractEdit}
                              className="btn-secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                              {contract.contractType}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${contractStatusColors[contract.status]}`}>
                              {contract.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              ${contract.value.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Building2" className="w-4 h-4 mr-3" />
                            <span className="text-sm">{property?.title || 'Property not found'}</span>
                          </div>
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="MapPin" className="w-4 h-4 mr-3" />
                            <span className="text-sm">{property?.address || 'Address not available'}</span>
                          </div>
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="User" className="w-4 h-4 mr-3" />
                            <span className="text-sm">{client?.name || 'Client not found'}</span>
                          </div>
                          <div className="flex items-center text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Calendar" className="w-4 h-4 mr-3" />
                            <span className="text-sm">
                              {format(new Date(contract.startDate), 'MMM dd, yyyy')} - {format(new Date(contract.endDate), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          {contract.signedDate && (
                            <div className="flex items-center text-surface-600 dark:text-surface-400">
                              <ApperIcon name="CheckCircle" className="w-4 h-4 mr-3" />
                              <span className="text-sm">Signed on {format(new Date(contract.signedDate), 'MMM dd, yyyy')}</span>
                            </div>
                          )}
                        </div>

                        {contract.documents && contract.documents.length > 0 && (
                          <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 mb-4">
                            <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Documents ({contract.documents.length})
                            </h4>
                            <div className="space-y-1">
                              {contract.documents.map((doc, docIndex) => (
                                <div key={docIndex} className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                                  <ApperIcon name="FileText" className="w-3 h-3 mr-2" />
                                  <span>{doc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {contract.notes && (
                          <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 mb-4">
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              {contract.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 mb-4">
                          <select
                            value={contract.status}
                            onChange={(e) => updateContractStatus(contract.id, e.target.value)}
                            className="text-xs px-2 py-1 border border-surface-300 dark:border-surface-600 rounded bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-300"
                          >
                            <option value="Draft">Draft</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Signed">Signed</option>
                            <option value="Expired">Expired</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleEditContract(contract)}
                            className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1"
                          >
                            <ApperIcon name="Edit" className="w-4 h-4" />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => deleteContract(contract.id)}
                            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                            <span>Delete</span>
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {filteredContracts.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="FileText" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
                  No contracts found
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  {contractSearchTerm || contractFilterStatus !== 'All' || contractFilterType !== 'All'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first contract'
                  }
                </p>
                {!contractSearchTerm && contractFilterStatus === 'All' && contractFilterType === 'All' && (
                  <button
                    onClick={() => setShowContractForm(true)}
                    className="btn-primary"
                  >
                    Create Your First Contract
                  </button>
                )}
              </div>
            )}
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