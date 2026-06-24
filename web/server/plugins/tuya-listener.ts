import TuyaDevice from "tuyapi";
import prisma from "../utils/prisma";

export default defineNitroPlugin((nitroApp) => {
  const activeDevices = new Map<string, any>();
  const retryTimeouts = new Map<string, any>();

  const startTuyaListener = async () => {
    try {
      const devices = await prisma.device.findMany({
        where: { mode: "local" }
      });

      // Disconnect all existing devices
      for (const [id, device] of activeDevices.entries()) {
        try { device.disconnect(); } catch (e) {}
      }
      activeDevices.clear();
      
      // Clear timeouts
      for (const [id, timeoutId] of retryTimeouts.entries()) {
        clearTimeout(timeoutId);
      }
      retryTimeouts.clear();

      for (const config of devices) {
        if (!config.deviceId || !config.localKey) continue;

        console.log(`[Tuya] Starting local daemon for Device: ${config.name}`);

        const currentDevice = new TuyaDevice({
          id: config.deviceId,
          key: config.localKey,
          ip: config.ipAddress || undefined,
          version: 3.4,
          issueRefreshOnConnect: true,
        });

        activeDevices.set(config.id, currentDevice);

        currentDevice.on("disconnected", () => {
          console.log(`[Tuya] Disconnected from device ${config.name}.`);
          if (!retryTimeouts.has(config.id)) {
             const timeout = setTimeout(() => {
                retryTimeouts.delete(config.id);
                // Restart all connections
                startTuyaListener();
             }, 5000);
             retryTimeouts.set(config.id, timeout);
          }
        });

        currentDevice.on("error", (error: any) => {
          console.error(`[Tuya] Error for ${config.name}!`, error);
        });

        currentDevice.on("data", async (data: any) => {
          console.log(`\n[Tuya CATCH - ${config.name}] Raw Data Received:`, data);
          
          await prisma.litterEvent.create({
            data: {
              type: "tuya-raw-data",
              rawData: JSON.stringify(data),
              deviceId: config.id
            },
          });
        });

        currentDevice.on("connected", () => {
          console.log(`[Tuya] Connected to device ${config.name}!`);
        });

        currentDevice.find().then(() => {
           console.log(`[Tuya] Found device ${config.name}! Connecting...`);
           currentDevice.connect().catch((e: any) => {
               console.error(`[Tuya] Daemon failed to connect ${config.name}:`, e);
           });
        }).catch((e: any) => {
           console.error(`[Tuya] Daemon failed to find device ${config.name}:`, e);
           if (!retryTimeouts.has(config.id)) {
             const timeout = setTimeout(() => {
                retryTimeouts.delete(config.id);
                startTuyaListener();
             }, 10000);
             retryTimeouts.set(config.id, timeout);
          }
        });
      }
    } catch (error) {
       console.error("[Tuya] Daemon failed to fetch devices", error);
    }
  };

  nitroApp.hooks.hook("tuya:restart" as any, () => {
    console.log("[Tuya] Restarting daemon due to config change...");
    startTuyaListener();
  });

  setTimeout(() => startTuyaListener(), 1000);
});
