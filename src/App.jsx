import { useState, useCallback } from "react";
import AlgorithmSelector from "./components/AlgorithmSelector";
import ProcessInput from "./components/ProcessInput";
import GanttChart from "./components/GanttChart";
import TimelineChart from "./components/TimelineChart";
import ResultsTable from "./components/ResultsTable";
import ComparisonView from "./components/ComparisonView";
import {
  fcfs,
  sjfNonPreemptive,
  srtf,
  roundRobin,
  priorityNonPreemptive,
  priorityPreemptive,
} from "./utils/schedulingAlgorithms";
import Footer from "./components/Footer";

const ALGO_NAMES = {
  fcfs: "First Come First Serve",
  sjf: "Shortest Job First (Non-Preemptive)",
  srtf: "Shortest Remaining Time First (Preemptive)",
  rr: "Round Robin",
  "priority-np": "Priority Scheduling (Non-Preemptive)",
  "priority-p": "Priority Scheduling (Preemptive)",
};

export default function App() {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("fcfs");
  const [quantum, setQuantum] = useState(2);
  const [result, setResult] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const runScheduler = useCallback(() => {
    if (!processes.length) return;
    const fns = {
      fcfs: () => fcfs(processes),
      sjf: () => sjfNonPreemptive(processes),
      srtf: () => srtf(processes),
      rr: () => roundRobin(processes, quantum),
      "priority-np": () => priorityNonPreemptive(processes),
      "priority-p": () => priorityPreemptive(processes),
    };
    setResult((fns[algorithm] || fns.fcfs)());
    setShowComparison(false);
  }, [processes, algorithm, quantum]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            CPU Scheduling Visualizer
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
            Visualize and compare CPU scheduling algorithms with interactive
            Gantt charts, timelines, and detailed metrics.
          </p>
        </header>

        <div className="space-y-6">
          <AlgorithmSelector
            selected={algorithm}
            onSelect={setAlgorithm}
            quantum={quantum}
            onQuantumChange={setQuantum}
          />

          <ProcessInput
            processes={processes}
            setProcesses={setProcesses}
            algorithm={algorithm}
          />

          {/* Action buttons */}
          {processes.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              <button
                onClick={runScheduler}
                className="btn-success flex items-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Run {ALGO_NAMES[algorithm]}
              </button>

              <button
                onClick={() => {
                  setShowComparison((v) => !v);
                  if (!result) runScheduler();
                }}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600
                           hover:from-purple-500 hover:to-indigo-500 text-white font-bold
                           rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200
                           active:scale-95 text-lg flex items-center gap-2 cursor-pointer"
              >
                🏅 {showComparison ? "Hide" : "Compare All"}
              </button>
            </div>
          )}

          {/* Results section */}
          {result && (
            <>
              <div className="text-center animate-fade-in">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Showing results for:
                  <strong className="text-blue-400">
                    {ALGO_NAMES[algorithm]}
                  </strong>
                  {algorithm === "rr" && (
                    <span className="text-gray-400">(Q={quantum})</span>
                  )}
                </span>
              </div>

              <GanttChart gantt={result.gantt} processes={processes} />
              <TimelineChart
                results={result.results}
                gantt={result.gantt}
                processes={processes}
              />
              <ResultsTable results={result.results} processes={processes} />
            </>
          )}

          {showComparison && <ComparisonView processes={processes} />}
        </div>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
}