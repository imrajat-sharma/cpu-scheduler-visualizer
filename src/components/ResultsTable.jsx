import { getProcessColor } from "../utils/colors";

export default function ResultsTable({ results, processes }) {
  if (!results || !results.length) return null;

  const n = results.length;
  const avg = (key) => (results.reduce((s, r) => s + r[key], 0) / n).toFixed(2);
  const avgCT = avg("completionTime");
  const avgTAT = avg("turnaroundTime");
  const avgWT = avg("waitingTime");
  const avgRT = avg("responseTime");

  const idxMap = {};
  processes.forEach((p, i) => (idxMap[p.id] = i));

  const metrics = [
    { label: "Avg Completion", value: avgCT, icon: "🏁", color: "from-blue-500 to-blue-600" },
    { label: "Avg Turnaround", value: avgTAT, icon: "🔄", color: "from-emerald-500 to-emerald-600" },
    { label: "Avg Waiting", value: avgWT, icon: "⏳", color: "from-amber-500 to-amber-600" },
    { label: "Avg Response", value: avgRT, icon: "⚡", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div
      className="glass-card p-6 animate-slide-up"
      style={{ animationDelay: "0.4s" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">📈</span> Results
      </h2>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl p-4 bg-gray-800/50 border border-gray-700/50
                       group hover:border-gray-600/50 transition-all"
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${m.color} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <div className="relative z-10">
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-2xl font-bold">{m.value}</div>
              <div className="text-xs text-gray-400 mt-1">{m.label} Time</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-700">
              {[
                "Process",
                "Arrival (AT)",
                "Burst (BT)",
                "Completion (CT)",
                "Turnaround (TAT)",
                "Waiting (WT)",
                "Response (RT)",
              ].map((h) => (
                <th
                  key={h}
                  className="text-center py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const c = getProcessColor(idxMap[r.id] ?? 0);
              return (
                <tr
                  key={r.id}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-3 text-center">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold"
                      style={{ backgroundColor: `${c.bg}20`, color: c.bg }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: c.bg }}
                      />
                      {r.name}
                    </span>
                  </td>
                  <td className="text-center py-3 px-3 font-mono">{r.arrivalTime}</td>
                  <td className="text-center py-3 px-3 font-mono">{r.burstTime}</td>
                  <td className="text-center py-3 px-3 font-mono font-bold text-blue-400">
                    {r.completionTime}
                  </td>
                  <td className="text-center py-3 px-3 font-mono font-bold text-emerald-400">
                    {r.turnaroundTime}
                  </td>
                  <td className="text-center py-3 px-3 font-mono font-bold text-amber-400">
                    {r.waitingTime}
                  </td>
                  <td className="text-center py-3 px-3 font-mono font-bold text-purple-400">
                    {r.responseTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-600 bg-gray-800/40">
              <td className="py-3 px-3 text-center font-bold text-gray-300" colSpan={3}>
                Average
              </td>
              <td className="text-center py-3 px-3 font-mono font-bold text-blue-300">{avgCT}</td>
              <td className="text-center py-3 px-3 font-mono font-bold text-emerald-300">{avgTAT}</td>
              <td className="text-center py-3 px-3 font-mono font-bold text-amber-300">{avgWT}</td>
              <td className="text-center py-3 px-3 font-mono font-bold text-purple-300">{avgRT}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
        <p className="text-xs text-gray-500 font-mono">
          TAT = CT − AT &nbsp;|&nbsp; WT = TAT − BT &nbsp;|&nbsp; RT = First CPU − AT
        </p>
      </div>
    </div>
  );
}