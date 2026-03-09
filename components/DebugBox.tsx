interface DebugBoxProps {
  type: "Static" | "ISR";
  revalidate?: number;
  extra?: Record<string, string>;
}

export default function DebugBox({ type, revalidate, extra }: DebugBoxProps) {
  const now = new Date().toISOString();

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm font-mono">
      <h3 className="mb-2 font-bold text-gray-700">Debug Info</h3>
      <ul className="space-y-1 text-gray-600">
        <li>
          <span className="font-semibold">Render:</span> {now}
        </li>
        <li>
          <span className="font-semibold">Typ:</span>{" "}
          <span
            className={
              type === "ISR" ? "text-blue-600 font-bold" : "text-green-600 font-bold"
            }
          >
            {type}
          </span>
        </li>
        {revalidate !== undefined && (
          <li>
            <span className="font-semibold">Revalidate:</span> {revalidate}s
          </li>
        )}
        <li>
          <span className="font-semibold">Node:</span> {process.version}
        </li>
        <li>
          <span className="font-semibold">NODE_ENV:</span>{" "}
          {process.env.NODE_ENV}
        </li>
        {extra &&
          Object.entries(extra).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold">{key}:</span> {value}
            </li>
          ))}
      </ul>
    </div>
  );
}
