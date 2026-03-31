import {
  fcfs,
  sjfNonPreemptive,
  srtf,
  roundRobin,
  priorityNonPreemptive,
  priorityPreemptive,
} from "../utils/schedulingAlgorithms";

const ALGO_LIST = [
  { id: "fcfs", name: "FCFS", fn: (p) => fcfs(p) },
  { id: "sjf", name: "SJF", fn: (p) => sjfNonPreemptive(p) },
  { id: "srtf", name: "SRTF", fn: (p) => srtf(p) },
  { id: "rr2", name: "RR (Q=2)", fn: (p) => roundRobin(p, 2) },
  { id: "rr4", name: "RR (Q=4)", fn: (p) => roundRobin(p, 4) },
  { id: "pri-np", name: "Priority NP", fn: (p) => priorityNonPreemptive(p) },
  { id: "pri-p", name: "Priority P", fn: (p) => priorityPreemptive(p) },
];

export default function ComparisonView({ processes }) {
  if (!processes.length) return null;

  const rows = ALGO_LIST.map((a) => {
    const { results } = a.fn(processes);
    const n = results.length;
    const avg = (k) => (results.reduce((s, r) => s + r[k], 0) / n).toFixed(2);
    return { ...a, avgTAT: avg("turnaroundTime"), avgWT: avg("waitingTime"), avgRT: avg("responseTime") };
  });

  const best = (k) => Math.min(...rows.map((r) => parseFloat(r[k])));
  const bestWT = best("avgWT");
  const bestTAT = best("avgTAT");
  const bestRT = best("avgRT");
  const maxWT = Math.max(...rows.map((r) => parseFloat(r.avgWT)));

  return (
    <div
      className="glass-card p-6 animate-slide-up"
      style={{ animationDelay: "0.5s" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🏅</span> Algorithm Comparison
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-700">
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase">
                Algorithm
              </th>
              <th className="text-center py-3 px-4 text-xs font-bold text-gray-400 uppercase">
                Avg TAT
              </th>
              <th className="text-center py-3 px-4 text-xs font-bold text-gray-400 uppercase">
                Avg WT
              </th>
              <th className="text-center py-3 px-4 text-xs font-bold text-gray-400 uppercase">
                Avg RT
              </th>
              <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase text-left">
                Waiting Time
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const isBestWT = parseFloat(c.avgWT) === bestWT;
              const isBestTAT = parseFloat(c.avgTAT) === bestTAT;
              const isBestRT = parseFloat(c.avgRT) === bestRT;
              const bar = maxWT > 0 ? (parseFloat(c.avgWT) / maxWT) * 100 : 0;

              return (
                <tr
                  key={c.id}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-sm">{c.name}</td>
                  <td
                    className={`text-center py-3 px-4 font-mono font-bold ${
                      isBestTAT ? "text-emerald-400" : "text-gray-300"
                    }`}
                  >
                    {c.avgTAT}
                    {isBestTAT && <span className="ml-1 text-[10px]">🏆</span>}
                  </td>
                  <td
                    className={`text-center py-3 px-4 font-mono font-bold ${
                      isBestWT ? "text-emerald-400" : "text-gray-300"
                    }`}
                  >
                    {c.avgWT}
                    {isBestWT && <span className="ml-1 text-[10px]">🏆</span>}
                  </td>
                  <td
                    className={`text-center py-3 px-4 font-mono font-bold ${
                      isBestRT ? "text-emerald-400" : "text-gray-300"
                    }`}
                  >
                    {c.avgRT}
                    {isBestRT && <span className="ml-1 text-[10px]">🏆</span>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${bar}%`,
                            background: isBestWT
                              ? "linear-gradient(90deg,#10B981,#059669)"
                              : "linear-gradient(90deg,#F59E0B,#D97706)",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}