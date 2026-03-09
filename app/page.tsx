import fs from "fs";
import DebugBox from "@/components/DebugBox";

export default function Home() {
  // Filesystem write/read test
  let fsTestResult: string;
  try {
    const testFile = "/tmp/isr-test.txt";
    const testContent = `ISR Test: ${new Date().toISOString()}`;
    fs.writeFileSync(testFile, testContent);
    const readBack = fs.readFileSync(testFile, "utf-8");
    fsTestResult =
      readBack === testContent ? `OK — ${readBack}` : `MISMATCH — wrote: ${testContent}, read: ${readBack}`;
  } catch (err) {
    fsTestResult = `FEHLER — ${err instanceof Error ? err.message : String(err)}`;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ISR Test App</h1>
      <p className="text-gray-600">
        Diese App testet Incremental Static Regeneration (ISR) auf
        Netcup/Plesk Shared Hosting.
      </p>

      <DebugBox type="Static" />

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm font-mono">
        <h3 className="mb-2 font-bold text-gray-700">Filesystem Test (/tmp)</h3>
        <p
          className={
            fsTestResult.startsWith("OK")
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {fsTestResult}
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <h2 className="mb-2 font-bold">Testplan</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
          <li>
            <strong>/</strong> — Diese Seite (statisch, Build-Zeitstempel)
          </li>
          <li>
            <strong>/produkte</strong> — Produktliste (ISR, revalidate=60)
          </li>
          <li>
            <strong>/produkte/[slug]</strong> — Produktdetail (ISR, revalidate=120)
          </li>
          <li>
            <strong>/api/revalidate</strong> — Manuelle Revalidierung
          </li>
        </ol>
      </div>
    </div>
  );
}
