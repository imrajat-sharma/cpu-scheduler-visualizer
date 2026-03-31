const ALGORITHMS = [
  { id: "fcfs", name: "FCFS", full: "First Come First Serve", icon: "📋" },
  { id: "sjf", name: "SJF", full: "Shortest Job First", icon: "⚡" },
  { id: "srtf", name: "SRTF", full: "Shortest Remaining Time", icon: "🔄" },
  { id: "rr", name: "RR", full: "Round Robin", icon: "🔁" },
  { id: "priority-np", name: "Priority (NP)", full: "Priority Non-Preemptive", icon: "🏆" },
  { id: "priority-p", name: "Priority (P)", full: "Priority Preemptive", icon: "⭐" },
];

export default function AlgorithmSelector({
  selected,
  onSelect,
  quantum,
  onQuantumChange,
}) {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">⚙️</span>
        Scheduling Algorithm
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ALGORITHMS.map((algo) => (
          <button
            key={algo.id}
            onClick={() => onSelect(algo.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center cursor-pointer
              ${
                selected === algo.id
                  ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20 scale-105"
                  : "border-gray-700 bg-gray-800/40 hover:border-gray-500 hover:bg-gray-800/60"
              }`}
          >
            <div className="text-2xl mb-1">{algo.icon}</div>
            <div className="font-bold text-sm">{algo.name}</div>
            <div className="text-[10px] text-gray-400 mt-1 leading-tight">
              {algo.full}
            </div>
            {selected === algo.id && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {selected === "rr" && (
        <div className="mt-4 flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl animate-fade-in">
          <label className="text-sm font-semibold text-blue-300 whitespace-nowrap">
            Time Quantum:
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={quantum}
            onChange={(e) =>
              onQuantumChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="input-field w-24 text-center"
          />
          <span className="text-xs text-gray-400">time units</span>
        </div>
      )}
    </div>
  );
}