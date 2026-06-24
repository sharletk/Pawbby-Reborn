import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'POST') {
    const body = await readBody(event)
    const newEvent = await prisma.litterEvent.create({
      data: {
        deviceId: body.deviceId,
        type: body.type,
        rawData: body.rawData,
        petId: body.petId
      }
    })
    return { success: true, event: newEvent }
  }

  const query = getQuery(event)
  const deviceId = query.deviceId as string

  if (!deviceId) return { events: [] }

  const dbEvents = await prisma.litterEvent.findMany({
    where: { 
      deviceId,
      type: { not: 'tuya-raw-data' }
    },
    orderBy: { timestamp: 'desc' }
  })

  const mappedLogs = dbEvents.map(e => {
    let description = e.type
    
    if (e.type === 'reset-deodorizer' && e.rawData) {
      try {
        const parsed = JSON.parse(e.rawData)
        description = `Deodorizing pod reset for ${parsed.duration} days.`
      } catch (err) {}
    } else if (e.type === 'tuya-raw-data' && e.rawData) {
      // Try to parse the raw data to extract something readable if possible
      try {
        const parsed = JSON.parse(e.rawData)
        if (parsed.dps) {
          description = `Raw DPS: ${JSON.stringify(parsed.dps)}`
        }
      } catch (err) {
        description = e.rawData
      }
    }

    return {
      id: e.id,
      deviceId: e.deviceId,
      petId: e.petId,
      type: e.type,
      // Format to MM/DD HH:mm
      timestamp: new Date(e.timestamp).toLocaleString('en-US', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }),
      description
    }
  })

  return { events: mappedLogs }
})
