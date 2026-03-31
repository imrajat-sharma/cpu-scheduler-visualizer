import { getProcessColor } from "../utils/colors";

export default function TimelineChart({ results, gantt, processes }) {
  if (!results || !results.length) return null;

  const totalTime = gantt[gantt.length - 1].end;

  return (
    <div
      className="glass-card p-6 animate-slide-up"
      style={{ animationDelay: "0.3s" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🕐</span> Process Timeline
      </h2>

      <div className="space-y-3 overflow-x-auto pb-2">
        {processes.map((process, idx) => {
          const color = getProcessColor(idx);
          const result = results.find((r) => r.id === process.id);
          const blocks = gantt.filter((g) => g.processId === process.id);

          return (
            <div key={process.id} className="flex items-center gap-3">
              <div
                className="w-12 text-right font-bold text-sm shrink-0"
                style={{ color: color.bg }}
              >
                {process.name}
              </div>

              <div
                className="flex-1 relative h-8 bg-gray-800/50 rounded-lg overflow-hidden"
                style={{ minWidth: 400 }}
              >
                {/* Arrival marker */}
                <div
                  className="absolute top-0 h-full w-0.5 z-10"
                  style={{
                    left: `${(process.arrivalTime / totalTime) * 100}%`,
                    backgroundColor: color.light,
                    opacity: 0.5,
                  }}
                />

                {/* Execution blocks */}
                {blocks.map((b, bi) => (
                  <div
                    key={bi}
                    className="absolute top-1 bottom-1 rounded-md transition-all duration-300 hover:top-0 hover:bottom-0"
                    style={{
                      left: `${(b.start / totalTime) * 100}%`,
                      width: `${((b.end - b.start) / totalTime) * 100}%`,
                      background: `linear-gradient(135deg,${color.bg},${color.dark})`,
                      boxShadow: `0 0 8px ${color.bg}30`,
                    }}
                  />
                ))}

                {/* Completion marker */}
                {result && (
                  <div
                    className="absolute top-0 h-full w-0.5 z-10"
                    style={{
                      left: `${(result.completionTime / totalTime) * 100}%`,
                      backgroundColor: "#fff",
                      opacity: 0.3,
                    }}
                  />
                )}
              </div>

              {result && (
                <div className="shrink-0 text-xs text-gray-400 font-mono w-20 text-right">
                  CT={result.completionTime}
                </div>
              )}
            </div>
          );
        })}

        {/* Axis */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-12" />
          <div className="flex-1 relative h-4" style={{ minWidth: 400 }}>
            {Array.from({ length: totalTime + 1 }, (_, i) => i).map((t) => {
              const step = Math.max(1, Math.ceil(totalTime / 20));
              return t % step === 0 ? (
                <div
                  key={t}
                  className="absolute text-[10px] font-mono text-gray-500 -translate-x-1/2"
                  style={{ left: `${(t / totalTime) * 100}%` }}
                >
                  {t}
                </div>
              ) : null;
            })}
          </div>
          <div className="w-20" />
        </div>
      </div>
    </div>
  );
}