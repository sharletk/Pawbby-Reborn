import TuyaDevice from "tuyapi";
import prisma from "../utils/prisma";

export default defineNitroPlugin((nitroApp) => {
  let currentDevice: any = null;
  let isRetrying = false;

  const startTuyaListener = async () => {
    try {
      const config = await prisma.tuyaConfig.findUnique({
        where: { id: "default" },
      });
      if (
        !config ||
        config.mode !== "local" ||
        !config.deviceId ||
        !config.localKey
      ) {
        console.log(
          "[Tuya] Daemon skipping: Local credentials missing or mode is not local.",
        );
        return;
      }

      console.log(
        `[Tuya] Starting local daemon for Device ID: ${config.deviceId}`,
      );

      if (currentDevice) {
        currentDevice.disconnect();
      }

      currentDevice = new TuyaDevice({
        id: config.deviceId,
        key: config.localKey,
        ip: config.ipAddress || undefined,
        version: 3.4,
        issueRefreshOnConnect: true,
      });

      currentDevice.on("disconnected", () => {
        console.log("[Tuya] Disconnected from device.");
        if (!isRetrying) {
          isRetrying = true;
          setTimeout(() => {
            isRetrying = false;
            startTuyaListener();
          }, 5000);
        }
      });

      currentDevice.on("error", (error: any) => {
        console.error("[Tuya] Error!", error);
      });

      currentDevice.on("data", async (data: any) => {
        console.log("\n[Tuya CATCH] Raw Data Received:", data);

        // Insert into database
        await prisma.litterEvent.create({
          data: {
            type: "tuya-raw-data",
            // Tuya typically sends a 'dps' object inside data
            rawData: JSON.stringify(data),
          },
        });
      });

      currentDevice.on("connected", () => {
        console.log("[Tuya] Connected to device!");
      });

      // Find device on network
      await currentDevice.find();
      console.log("[Tuya] Found device! Connecting...");

      // Connect to device
      await currentDevice.connect();
    } catch (error) {
      console.error("[Tuya] Daemon failed to start or find device:", error);
      if (!isRetrying) {
        isRetrying = true;
        setTimeout(() => {
          isRetrying = false;
          startTuyaListener();
        }, 10000);
      }
    }
  };

  nitroApp.hooks.hook("tuya:restart" as any, () => {
    console.log("[Tuya] Restarting daemon due to config change...");
    startTuyaListener();
  });

  // Start the daemon asynchronously in the background
  // We wrap in setTimeout to not block Nitro server boot
  setTimeout(() => startTuyaListener(), 1000);
});
