import { useState } from "react";
import { getProcessColor } from "../utils/colors";

export default function ProcessInput({ processes, setProcesses, algorithm }) {
  const [arrivalTime, setArrivalTime] = useState(0);
  const [burstTime, setBurstTime] = useState(1);
  const [priority, setPriority] = useState(1);

  const showPriority = algorithm.includes("priority");

  const addProcess = () => {
    const np = {
      id: processes.length + 1,
      name: `P${processes.length + 1}`,
      arrivalTime: parseInt(arrivalTime) || 0,
      burstTime: Math.max(1, parseInt(burstTime) || 1),
      priority: parseInt(priority) || 1,
    };
    setProcesses([...processes, np]);
  };

  const removeProcess = (id) => {
    setProcesses(
      processes
        .filter((p) => p.id !== id)
        .map((p, i) => ({ ...p, id: i + 1, name: `P${i + 1}` }))
    );
  };

  const loadExample = () =>
    setProcesses([
      { id: 1, name: "P1", arrivalTime: 0, burstTime: 6, priority: 3 },
      { id: 2, name: "P2", arrivalTime: 1, burstTime: 4, priority: 1 },
      { id: 3, name: "P3", arrivalTime: 2, burstTime: 2, priority: 4 },
      { id: 4, name: "P4", arrivalTime: 3, burstTime: 3, priority: 2 },
      { id: 5, name: "P5", arrivalTime: 5, burstTime: 5, priority: 5 },
    ]);

  return (
    <div
      className="glass-card p-6 animate-slide-up"
      style={{ animationDelay: "0.1s" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📝</span> Process Table
        </h2>
        <div className="flex gap-2">
          <button
            onClick={loadExample}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-all cursor-pointer"
          >
            Load Example
          </button>
          <button
            onClick={() => setProcesses([])}
            className="px-4 py-2 bg-red-900/50 hover:bg-red-800/50 border border-red-700/50 rounded-lg text-sm font-medium text-red-300 transition-all cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Input row */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div className="flex-1 min-w-25">
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Arrival Time
          </label>
          <input
            type="number"
            min="0"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex-1 min-w-25">
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Burst Time
          </label>
          <input
            type="number"
            min="1"
            value={burstTime}
            onChange={(e) => setBurstTime(e.target.value)}
            className="input-field"
          />
        </div>
        {showPriority && (
          <div className="flex-1 min-w-25">
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Priority{" "}
              <span className="text-[10px]">(lower = higher)</span>
            </label>
            <input
              type="number"
              min="1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input-field"
            />
          </div>
        )}
        <button onClick={addProcess} className="btn-primary flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      {/* Table */}
      {processes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase">
                  Process
                </th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase">
                  Arrival
                </th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase">
                  Burst
                </th>
                {showPriority && (
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase">
                    Priority
                  </th>
                )}
                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => {
                const color = getProcessColor(index);
                return (
                  <tr
                    key={process.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors animate-fade-in"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full shadow-lg"
                          style={{
                            backgroundColor: color.bg,
                            boxShadow: `0 0 8px ${color.bg}40`,
                          }}
                        />
                        <span className="font-semibold">{process.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-2.5 px-3 font-mono">
                      {process.arrivalTime}
                    </td>
                    <td className="text-center py-2.5 px-3 font-mono">
                      {process.burstTime}
                    </td>
                    {showPriority && (
                      <td className="text-center py-2.5 px-3 font-mono">
                        {process.priority}
                      </td>
                    )}
                    <td className="text-center py-2.5 px-3">
                      <button
                        onClick={() => removeProcess(process.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1 rounded-lg transition-all cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-sm">
            No processes added yet. Add a process or load an example.
          </p>
        </div>
      )}
    </div>
  );
}