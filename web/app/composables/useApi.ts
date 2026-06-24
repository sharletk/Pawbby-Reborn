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
  id?: string
  name: string
  birthDate?: string // YYYY-MM-DD
  weight: number
  imageBase64?: string
}

export interface TuyaConfig {
  id?: string
  mode: 'local' | 'cloud'
  deviceId?: string
  ipAddress?: string
  localKey?: string
  tuyaClientId?: string
  tuyaClientSecret?: string
  tuyaRegion?: string
}

export interface Device {
  id: string
  name: string
  status: 'Ready' | 'Cleaning' | 'Flattening' | 'Emptying' | 'Error'
  lastToileted: string
  todayToileted: number
  litterLevel: string
  wasteBin: string
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
  { id: 'log_1', deviceId: 'dev_1', type: 'auto-clean', timestamp: '5/16 15:02', description: 'auto-clean completed.' }
]

function getGravatar(email: string) {
  if (!email) return ''
  const hash = SparkMD5.hash(email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`
}

export const useApi = () => {

  const getUser = async (): Promise<User> => {
    const { user } = await $fetch('/api/settings') as any
    return user
  }

  const updateUser = async (updates: Partial<User>) => {
    const user = { ...updates }
    if (updates.email) user.avatarUrl = getGravatar(updates.email)
    await $fetch('/api/settings', { method: 'POST', body: { user } })
    return user
  }

  const getTuyaConfig = async (): Promise<TuyaConfig> => {
    const { tuya } = await $fetch('/api/settings') as any
    return tuya
  }

  const updateTuyaConfig = async (tuya: Partial<TuyaConfig>) => {
    await $fetch('/api/settings', { method: 'POST', body: { tuya } })
  }

  const getPets = async (): Promise<Pet[]> => {
    return await $fetch('/api/pets') as Pet[]
  }

  const addPet = async (pet: Omit<Pet, 'id'>) => {
    return await $fetch('/api/pets', { method: 'POST', body: pet })
  }

  const updatePet = async (id: string, updates: Partial<Pet>) => {
    return await $fetch('/api/pets', { method: 'POST', body: { id, ...updates } })
  }

  const deletePet = async (id: string) => {
    await $fetch('/api/pets', { method: 'DELETE', query: { id } })
  }

  const clearCache = async () => {
    // Only reload the page now, database manages state
  }

  const getDevices = async (): Promise<Device[]> => [seedDevice]
  const getDevice = async (id: string) => seedDevice
  const getLogs = async (deviceId: string) => seedLogs
  const triggerClean = async (id: string) => {}
  const triggerFlatten = async (id: string) => {}
  const triggerEmpty = async (id: string) => {}

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
    getUser,
    updateUser,
    getTuyaConfig,
    updateTuyaConfig,
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
