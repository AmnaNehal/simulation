// Discrete Event Simulation Engine

export type ServiceDist = 'exponential' | 'poisson' | 'uniform' | 'normal' | 'gamma';

export interface ServiceDistParams {
  uniformMin?: number;
  uniformMax?: number;
  normalMean?: number;
  normalStd?: number;
  gammaShape?: number;
  gammaScale?: number;
}

export interface SimParams {
  servers: number;
  arrivalRate: number;   // lambda
  serviceRate: number;   // mu
  numCustomers: number;
  serviceDist: ServiceDist;
  serviceParams?: ServiceDistParams;
}

export interface SimResult {
  avgWaitTime: number;
  avgSystemTime: number;
  avgResponseTime: number;
  avgQueueLength: number;
  avgSystemLength: number;
  serverUtilization: number;
  throughput: number;
  totalServed: number;
  table: TableRow[];
}

export interface TableRow {
  customer: number;
  server: number;
  arrivalTime: number;
  serviceStartTime: number;
  serviceTime: number;
  departureTime: number;
  waitTime: number;
  systemTime: number;
  responseTime: number;
}

function expRandom(rate: number): number {
  return -Math.log(1 - Math.random()) / rate;
}

function poissonRandom(lambda: number): number {
  // Generate Poisson deviate using Knuth algorithm
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}

function standardNormal(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function normalRandom(mean: number, std: number): number {
  return Math.max(0.0001, mean + std * standardNormal());
}

function uniformRandom(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

// Marsaglia & Tsang method
function gammaRandom(shape: number, scale: number): number {
  if (shape <= 0) return 0.0001;
  if (shape < 1) {
    const u = Math.random();
    return gammaRandom(1 + shape, scale) * Math.pow(u, 1 / shape);
  }
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x: number, v: number;
    do {
      x = standardNormal();
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x) return Math.max(0.0001, d * v * scale);
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return Math.max(0.0001, d * v * scale);
  }
}

export function generateServiceTime(dist: ServiceDist, mu: number, params?: ServiceDistParams): number {
  const mean = 1 / mu;
  switch (dist) {
    case 'exponential':
      return expRandom(mu);
    case 'poisson': {
      const val = poissonRandom(mean);
      return val <= 0 ? mean : val; // fallback to mean if 0
    }
    case 'uniform': {
      const min = params?.uniformMin ?? mean * 0.5;
      const max = params?.uniformMax ?? mean * 1.5;
      return uniformRandom(Math.min(min, max), Math.max(min, max));
    }
    case 'normal': {
      const nMean = params?.normalMean ?? mean;
      const nStd = params?.normalStd ?? mean * 0.3;
      return normalRandom(nMean, nStd);
    }
    case 'gamma': {
      const shape = params?.gammaShape ?? 2;
      const scale = params?.gammaScale ?? mean / shape;
      return gammaRandom(shape, scale);
    }
  }
}

export function runSimulation(params: SimParams): SimResult {
  const { servers, arrivalRate, serviceRate, numCustomers, serviceDist, serviceParams } = params;
  const table: TableRow[] = [];

  // Server free-at times
  const serverFreeAt = new Array(servers).fill(0);
  let time = 0;

  for (let i = 1; i <= numCustomers; i++) {
    // Arrival: Poisson process (exponential inter-arrivals)
    time += expRandom(arrivalRate);
    const arrivalTime = time;

    // Find earliest free server
    const minFree = Math.min(...serverFreeAt);
    const serverIdx = serverFreeAt.indexOf(minFree);
    const serviceStart = Math.max(arrivalTime, minFree);
    const serviceTime = generateServiceTime(serviceDist, serviceRate, serviceParams);
    const departure = serviceStart + serviceTime;
    serverFreeAt[serverIdx] = departure;

    const waitTime = serviceStart - arrivalTime;
    const systemTime = departure - arrivalTime;
    const responseTime = systemTime; // time from arrival to departure (sojourn time)

    table.push({ customer: i, server: serverIdx + 1, arrivalTime, serviceStartTime: serviceStart, serviceTime, departureTime: departure, waitTime, systemTime, responseTime });
  }

  const totalWait = table.reduce((s, r) => s + r.waitTime, 0);
  const totalSystem = table.reduce((s, r) => s + r.systemTime, 0);
  const totalResponse = table.reduce((s, r) => s + r.responseTime, 0);
  const totalService = table.reduce((s, r) => s + r.serviceTime, 0);
  const simDuration = table[table.length - 1].departureTime;

  const avgWaitTime = totalWait / numCustomers;
  const avgSystemTime = totalSystem / numCustomers;
  const avgResponseTime = totalResponse / numCustomers;
  const throughput = numCustomers / simDuration;
  const serverUtilization = totalService / (simDuration * servers);
  const avgSystemLength = throughput * avgSystemTime;
  const avgQueueLength = throughput * avgWaitTime;

  return { avgWaitTime, avgSystemTime, avgResponseTime, avgQueueLength, avgSystemLength, serverUtilization, throughput, totalServed: numCustomers, table };
}
