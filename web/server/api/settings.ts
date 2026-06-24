import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    let config = await prisma.tuyaConfig.findUnique({ where: { id: 'default' } })
    if (!config) {
      config = await prisma.tuyaConfig.create({ data: { id: 'default', mode: 'local' } })
    }
    
    let user = await prisma.user.findFirst()
    if (!user) {
      user = await prisma.user.create({ data: { name: 'Olivia', email: 'hello@example.com', weightUnit: 'kg' } })
    }
    return { tuya: config, user }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    
    if (body.tuya) {
      await prisma.tuyaConfig.upsert({
        where: { id: 'default' },
        update: body.tuya,
        create: { id: 'default', ...body.tuya }
      })
      const nitro = useNitroApp()
      await nitro.hooks.callHook('tuya:restart' as any)
    }
    if (body.user) {
      const user = await prisma.user.findFirst()
      if (user) {
        await prisma.user.update({ where: { id: user.id }, data: body.user })
      } else {
        await prisma.user.create({ data: body.user })
      }
    }
    return { success: true }
  }
})
