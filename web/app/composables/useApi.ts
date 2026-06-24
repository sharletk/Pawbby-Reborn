import localforage from 'localforage'
import SparkMD5 from 'spark-md5'

// Types
export interface User {
  id?: string
  name: string
  email: string
  avatarUrl?: string
  weightUnit?: 'kg' | 'lb'
}

export interface Pet {
  id: string
  name: string
  birthDate?: string // YYYY-MM-DD
  weight: number
  imageBase64?: string
}

export interface Device {
  id: string
  name: string
  status: 'Ready' | 'Cleaning' | 'Flattening' | 'Emptying'
  lastToileted: string
  todayToileted: number
  litterLevel: string // 'Sufficient'
  wasteBin: string // 'Not Full'
  daysLeft: number
}

export interface DeviceLog {
  id: string
  deviceId: string
  type: 'auto-clean' | 'manual-clean' | 'toileted' | 'flatten' | 'empty'
  timestamp: string
  description: string
  petId?: string
}

// Initialize LocalForage instance
const store = localforage.createInstance({
  name: 'pawbby_reborn'
})

// Helper: generate Gravatar URL
function getGravatar(email: string) {
  if (!email) return ''
  const hash = SparkMD5.hash(email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`
}

// Initial Data Seeds
const seedUser: User = { name: 'Olivia', email: 'hello@example.com', weightUnit: 'kg' }

const seedPets: Pet[] = [
  { id: '1', name: 'Bibi', birthDate: '2023-01-15', weight: 10, imageBase64: '/pet_bibi_1782295437667.png' },
  { id: '2', name: 'Sala', birthDate: '2024-05-10', weight: 9, imageBase64: '/pet_sala_1782295438814.png' },
  { id: '3', name: 'Paw', birthDate: '2022-06-20', weight: 12, imageBase64: '/pet_paw_1782295440078.png' },
  { id: '4', name: 'Elf', birthDate: '2025-07-01', weight: 8, imageBase64: '/pet_elf_1782295440939.png' }
]

const seedDevice: Device = {
  id: 'dev_1',
  name: 'PAWBBY Smart Litter Box',
  status: 'Ready',
  lastToileted: '09:02',
  todayToileted: 12,
  litterLevel: 'Sufficient',
  wasteBin: 'Not Full',
  daysLeft: 20
}

const seedLogs: DeviceLog[] = [
  { id: 'log_1', deviceId: 'dev_1', type: 'auto-clean', timestamp: '5/16 15:02', description: 'auto-clean completed.' },
  { id: 'log_2', deviceId: 'dev_1', type: 'manual-clean', timestamp: '5/16 14:00', description: 'Manual cleaning completed.' },
  { id: 'log_3', deviceId: 'dev_1', type: 'toileted', timestamp: '5/16 13:45', description: 'Sala has toileted, stay for 19", weight of 8.2lb.', petId: '2' },
]

// API Composable
export const useApi = () => {

  // Auth & User
  const login = async (email: string, password?: string) => {
    // Mock login, just ensure user exists
    let user: User | null = await store.getItem('user')
    if (!user) {
      user = { name: email.split('@')[0], email, avatarUrl: getGravatar(email) }
      await store.setItem('user', user)
    }
    return user
  }

  const register = async (name: string, email: string, password?: string) => {
    const user: User = { name, email, avatarUrl: getGravatar(email) }
    await store.setItem('user', user)
    return user
  }

  const getUser = async (): Promise<User> => {
    let user: User | null = await store.getItem('user')
    if (!user) {
      user = seedUser
      user.avatarUrl = getGravatar(user.email)
      await store.setItem('user', user)
    }
    return user
  }

  const updateUser = async (updates: Partial<User>) => {
    const user = await getUser()
    const updated = { ...user, ...updates }
    if (updates.email) updated.avatarUrl = getGravatar(updates.email)
    await store.setItem('user', updated)
    return updated
  }

  // Devices
  const getDevices = async (): Promise<Device[]> => {
    let devices: Device[] | null = await store.getItem('devices')
    if (!devices) {
      devices = [seedDevice]
      await store.setItem('devices', devices)
    }
    return devices
  }

  const getDevice = async (id: string): Promise<Device | undefined> => {
    const devices = await getDevices()
    return devices.find(d => d.id === id)
  }

  const triggerClean = async (id: string) => {
    const devices = await getDevices()
    const dev = devices.find(d => d.id === id)
    if (dev) {
      dev.status = 'Cleaning'
      await store.setItem('devices', devices)
      await addLog(id, 'manual-clean', 'Manual cleaning started.')
      // Simulate finish
      setTimeout(() => completeAction(id, 'Ready', 'Manual cleaning completed.'), 3000)
    }
  }

  const triggerFlatten = async (id: string) => {
    const devices = await getDevices()
    const dev = devices.find(d => d.id === id)
    if (dev) {
      dev.status = 'Flattening'
      await store.setItem('devices', devices)
      await addLog(id, 'flatten', 'Litter flattening started.')
      setTimeout(() => completeAction(id, 'Ready', 'Litter flattening completed.'), 3000)
    }
  }

  const triggerEmpty = async (id: string) => {
    const devices = await getDevices()
    const dev = devices.find(d => d.id === id)
    if (dev) {
      dev.status = 'Emptying'
      await store.setItem('devices', devices)
      await addLog(id, 'empty', 'Emptying litter box started.')
      setTimeout(() => completeAction(id, 'Ready', 'Emptying litter box completed.'), 3000)
    }
  }

  const completeAction = async (id: string, status: Device['status'], desc: string) => {
    const devices = await getDevices()
    const dev = devices.find(d => d.id === id)
    if (dev) {
      dev.status = status
      await store.setItem('devices', devices)
      // trigger reactivity in components by reloading data or using events, but since this is mock, 
      // the caller component will just poll or reload
    }
  }

  const getLogs = async (deviceId: string): Promise<DeviceLog[]> => {
    let logs: DeviceLog[] | null = await store.getItem('logs')
    if (!logs) {
      logs = seedLogs
      await store.setItem('logs', logs)
    }
    return logs.filter(l => l.deviceId === deviceId).reverse()
  }

  const addLog = async (deviceId: string, type: DeviceLog['type'], description: string, petId?: string) => {
    let logs: DeviceLog[] | null = await store.getItem('logs')
    if (!logs) logs = []
    const now = new Date()
    const timestamp = `${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    logs.push({
      id: 'log_' + Date.now(),
      deviceId,
      type,
      timestamp,
      description,
      petId
    })
    await store.setItem('logs', logs)
  }

  // Pets
  const getPets = async (): Promise<Pet[]> => {
    let pets: Pet[] | null = await store.getItem('pets')
    if (!pets) {
      pets = seedPets
      await store.setItem('pets', pets)
    }
    return pets
  }

  const addPet = async (pet: Omit<Pet, 'id'>) => {
    const pets = await getPets()
    const newPet = { ...pet, id: 'pet_' + Date.now() }
    pets.push(newPet)
    await store.setItem('pets', pets)
    return newPet
  }

  const updatePet = async (id: string, updates: Partial<Pet>) => {
    const pets = await getPets()
    const index = pets.findIndex(p => p.id === id)
    if (index !== -1) {
      pets[index] = { ...pets[index], ...updates }
      await store.setItem('pets', pets)
      return pets[index]
    }
    throw new Error('Pet not found')
  }

  const deletePet = async (id: string) => {
    let pets = await getPets()
    pets = pets.filter(p => p.id !== id)
    await store.setItem('pets', pets)
  }

  // System
  const clearCache = async () => {
    await store.clear()
    // It will be re-seeded on next reload
  }

  // Image Utilities
  const resizeImage = (file: File, maxWidth = 400, maxHeight = 400): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * maxWidth / width)
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * maxHeight / height)
              height = maxHeight
            }
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL('image/jpeg', 0.8))
        }
        img.onerror = (e) => reject(e)
      }
      reader.onerror = (e) => reject(e)
    })
  }

  return {
    login,
    register,
    getUser,
    updateUser,
    getDevices,
    getDevice,
    triggerClean,
    triggerFlatten,
    triggerEmpty,
    getLogs,
    getPets,
    addPet,
    updatePet,
    deletePet,
    resizeImage,
    clearCache
  }
}
