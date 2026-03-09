const origMemoryUsage = process.memoryUsage;
process.memoryUsage = function () {
  try {
    return origMemoryUsage.call(process);
  } catch {
    return { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 };
  }
};
process.memoryUsage.rss = origMemoryUsage.rss;
