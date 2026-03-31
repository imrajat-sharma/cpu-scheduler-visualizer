/* ═══════════════════════════════════════════════════════
   FIRST COME FIRST SERVE (FCFS)
   ═══════════════════════════════════════════════════════ */
export function fcfs(processes) {
  const sorted = [...processes].sort(
    (a, b) => a.arrivalTime - b.arrivalTime || a.id - b.id
  );
  const gantt = [];
  const results = [];
  let t = 0;

  for (const p of sorted) {
    if (t < p.arrivalTime) {
      gantt.push({ processId: "idle", start: t, end: p.arrivalTime });
      t = p.arrivalTime;
    }
    const start = t;
    const end = t + p.burstTime;
    gantt.push({ processId: p.id, start, end });
    t = end;
    results.push({
      ...p,
      completionTime: end,
      turnaroundTime: end - p.arrivalTime,
      waitingTime: end - p.arrivalTime - p.burstTime,
      responseTime: start - p.arrivalTime,
    });
  }
  return { gantt, results };
}

/* ═══════════════════════════════════════════════════════
   SHORTEST JOB FIRST (Non-Preemptive)
   ═══════════════════════════════════════════════════════ */
export function sjfNonPreemptive(processes) {
  const pool = processes.map((p) => ({ ...p }));
  const gantt = [];
  const results = [];
  let t = 0;
  const done = new Set();

  while (done.size < processes.length) {
    const avail = pool.filter((p) => !done.has(p.id) && p.arrivalTime <= t);

    if (!avail.length) {
      const next = Math.min(
        ...pool.filter((p) => !done.has(p.id)).map((p) => p.arrivalTime)
      );
      gantt.push({ processId: "idle", start: t, end: next });
      t = next;
      continue;
    }

    avail.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
    const p = avail[0];
    const start = t;
    const end = t + p.burstTime;
    gantt.push({ processId: p.id, start, end });
    t = end;
    done.add(p.id);
    results.push({
      ...p,
      completionTime: end,
      turnaroundTime: end - p.arrivalTime,
      waitingTime: end - p.arrivalTime - p.burstTime,
      responseTime: start - p.arrivalTime,
    });
  }
  return { gantt, results: results.sort((a, b) => a.id - b.id) };
}

/* ═══════════════════════════════════════════════════════
   SHORTEST REMAINING TIME FIRST (Preemptive SJF)
   ═══════════════════════════════════════════════════════ */
export function srtf(processes) {
  const pool = processes.map((p) => ({ ...p, rem: p.burstTime }));
  const gantt = [];
  const results = [];
  let t = 0;
  const done = new Set();
  const rt = {};
  let lastId = null;
  let blockStart = 0;
  const limit =
    Math.max(...processes.map((p) => p.arrivalTime)) +
    processes.reduce((s, p) => s + p.burstTime, 0) +
    1;

  while (done.size < processes.length && t <= limit) {
    const avail = pool.filter(
      (p) => !done.has(p.id) && p.arrivalTime <= t && p.rem > 0
    );

    if (!avail.length) {
      const rest = pool.filter((p) => !done.has(p.id));
      if (!rest.length) break;
      const next = Math.min(...rest.map((p) => p.arrivalTime));
      if (lastId !== null) {
        gantt.push({ processId: lastId, start: blockStart, end: t });
        lastId = null;
      }
      gantt.push({ processId: "idle", start: t, end: next });
      t = next;
      blockStart = t;
      continue;
    }

    avail.sort((a, b) => a.rem - b.rem || a.arrivalTime - b.arrivalTime);
    const p = avail[0];

    if (!(p.id in rt)) rt[p.id] = t - p.arrivalTime;

    if (lastId !== p.id) {
      if (lastId !== null)
        gantt.push({ processId: lastId, start: blockStart, end: t });
      blockStart = t;
      lastId = p.id;
    }

    p.rem--;
    t++;

    if (p.rem === 0) {
      done.add(p.id);
      const orig = processes.find((x) => x.id === p.id);
      results.push({
        ...orig,
        completionTime: t,
        turnaroundTime: t - orig.arrivalTime,
        waitingTime: t - orig.arrivalTime - orig.burstTime,
        responseTime: rt[p.id],
      });
    }
  }
  if (lastId !== null)
    gantt.push({ processId: lastId, start: blockStart, end: t });

  return { gantt, results: results.sort((a, b) => a.id - b.id) };
}

/* ═══════════════════════════════════════════════════════
   ROUND ROBIN
   ═══════════════════════════════════════════════════════ */
export function roundRobin(processes, quantum = 2) {
  const pool = processes.map((p) => ({ ...p, rem: p.burstTime }));
  const sorted = [...pool].sort(
    (a, b) => a.arrivalTime - b.arrivalTime || a.id - b.id
  );
  const gantt = [];
  const results = [];
  let t = 0;
  const done = new Set();
  const rt = {};
  const queue = [];
  const added = new Set();
  let idx = 0;

  const enqueueArrivals = () => {
    while (idx < sorted.length && sorted[idx].arrivalTime <= t) {
      if (!added.has(sorted[idx].id)) {
        queue.push(sorted[idx]);
        added.add(sorted[idx].id);
      }
      idx++;
    }
  };

  enqueueArrivals();

  while (done.size < processes.length) {
    if (!queue.length) {
      const rest = pool.filter((p) => !done.has(p.id));
      if (!rest.length) break;
      const next = Math.min(...rest.map((p) => p.arrivalTime));
      gantt.push({ processId: "idle", start: t, end: next });
      t = next;
      enqueueArrivals();
      continue;
    }

    const p = queue.shift();
    if (!(p.id in rt)) rt[p.id] = t - p.arrivalTime;

    const exec = Math.min(quantum, p.rem);
    gantt.push({ processId: p.id, start: t, end: t + exec });
    t += exec;
    p.rem -= exec;

    enqueueArrivals();

    if (p.rem === 0) {
      done.add(p.id);
      const orig = processes.find((x) => x.id === p.id);
      results.push({
        ...orig,
        completionTime: t,
        turnaroundTime: t - orig.arrivalTime,
        waitingTime: t - orig.arrivalTime - orig.burstTime,
        responseTime: rt[p.id],
      });
    } else {
      queue.push(p);
    }
  }
  return { gantt, results: results.sort((a, b) => a.id - b.id) };
}

/* ═══════════════════════════════════════════════════════
   PRIORITY (Non-Preemptive)  — lower number = higher priority
   ═══════════════════════════════════════════════════════ */
export function priorityNonPreemptive(processes) {
  const pool = processes.map((p) => ({ ...p }));
  const gantt = [];
  const results = [];
  let t = 0;
  const done = new Set();

  while (done.size < processes.length) {
    const avail = pool.filter((p) => !done.has(p.id) && p.arrivalTime <= t);

    if (!avail.length) {
      const next = Math.min(
        ...pool.filter((p) => !done.has(p.id)).map((p) => p.arrivalTime)
      );
      gantt.push({ processId: "idle", start: t, end: next });
      t = next;
      continue;
    }

    avail.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
    const p = avail[0];
    const start = t;
    const end = t + p.burstTime;
    gantt.push({ processId: p.id, start, end });
    t = end;
    done.add(p.id);
    results.push({
      ...p,
      completionTime: end,
      turnaroundTime: end - p.arrivalTime,
      waitingTime: end - p.arrivalTime - p.burstTime,
      responseTime: start - p.arrivalTime,
    });
  }
  return { gantt, results: results.sort((a, b) => a.id - b.id) };
}

/* ═══════════════════════════════════════════════════════
   PRIORITY (Preemptive)
   ═══════════════════════════════════════════════════════ */
export function priorityPreemptive(processes) {
  const pool = processes.map((p) => ({ ...p, rem: p.burstTime }));
  const gantt = [];
  const results = [];
  let t = 0;
  const done = new Set();
  const rt = {};
  let lastId = null;
  let blockStart = 0;
  const limit =
    Math.max(...processes.map((p) => p.arrivalTime)) +
    processes.reduce((s, p) => s + p.burstTime, 0) +
    1;

  while (done.size < processes.length && t <= limit) {
    const avail = pool.filter(
      (p) => !done.has(p.id) && p.arrivalTime <= t && p.rem > 0
    );

    if (!avail.length) {
      const rest = pool.filter((p) => !done.has(p.id));
      if (!rest.length) break;
      const next = Math.min(...rest.map((p) => p.arrivalTime));
      if (lastId !== null) {
        gantt.push({ processId: lastId, start: blockStart, end: t });
        lastId = null;
      }
      gantt.push({ processId: "idle", start: t, end: next });
      t = next;
      blockStart = t;
      continue;
    }

    avail.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
    const p = avail[0];

    if (!(p.id in rt)) rt[p.id] = t - p.arrivalTime;

    if (lastId !== p.id) {
      if (lastId !== null)
        gantt.push({ processId: lastId, start: blockStart, end: t });
      blockStart = t;
      lastId = p.id;
    }

    p.rem--;
    t++;

    if (p.rem === 0) {
      done.add(p.id);
      const orig = processes.find((x) => x.id === p.id);
      results.push({
        ...orig,
        completionTime: t,
        turnaroundTime: t - orig.arrivalTime,
        waitingTime: t - orig.arrivalTime - orig.burstTime,
        responseTime: rt[p.id],
      });
    }
  }
  if (lastId !== null)
    gantt.push({ processId: lastId, start: blockStart, end: t });

  return { gantt, results: results.sort((a, b) => a.id - b.id) };
}