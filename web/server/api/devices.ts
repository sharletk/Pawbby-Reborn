import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    const devices = await prisma.device.findMany()
    return { devices }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    
    // Create new device
    const device = await prisma.device.create({
      data: {
        name: body.name || 'Smart Litter Box',
        mode: body.mode || 'local',
        deviceId: body.deviceId,
        ipAddress: body.ipAddress,
        localKey: body.localKey,
        tuyaClientId: body.tuyaClientId,
        tuyaClientSecret: body.tuyaClientSecret,
        tuyaRegion: body.tuyaRegion,
      }
    })

    // Restart daemon
    const nitro = useNitroApp()
    await nitro.hooks.callHook('tuya:restart' as any)

    return { device }
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    const { id, ...data } = body
    if (!id) throw new Error('Device ID required for update')

    const device = await prisma.device.update({
      where: { id: String(id) },
      data
    })

    // Restart daemon
    const nitro = useNitroApp()
    await nitro.hooks.callHook('tuya:restart' as any)

    return { device }
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    if (query.id) {
      await prisma.device.delete({ where: { id: String(query.id) } })
      // Restart daemon
      const nitro = useNitroApp()
      await nitro.hooks.callHook('tuya:restart' as any)
      return { success: true }
    }
  }
})
