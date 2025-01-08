import osUtils from "os-utils";
import fs from "fs";
import os from "os";

const POLLING_INTERVAL = 5000; // 1 second

export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    console.log(
      "CPU Usage: " +
        cpuUsage +
        " | RAM Usage: " +
        ramUsage +
        " | Storage Usage: " +
        storageData.usage
    );
  }, POLLING_INTERVAL);
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024); // in GB

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  };
}

export function printStaticData() {
  const staticData = getStaticData();
  console.log(
    "CPU Model: " +
      staticData.cpuModel +
      " | Total Memory: " +
      staticData.totalMemoryGB +
      "GB | Total Storage: " +
      staticData.totalStorage +
      "GB"
  );
}

function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const totalSpace = stats.bsize * stats.blocks;
  const freeSpace = stats.bsize * stats.blocks;

  return {
    total: Math.floor(totalSpace / 1_000_000_000),
    usage: 1 - freeSpace / totalSpace,
  };
}
