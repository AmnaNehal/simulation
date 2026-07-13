// API Service to connect to C# Backend
const API_BASE_URL = 'http://localhost:5000/api/queue';

export const queueAPI = {
  // M/M/1 Queue
  calculateMM1: async (meanIA: number, meanSvc: number) => {
    const response = await fetch(`${API_BASE_URL}/mm1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meanInterarrivalTime: meanIA,
        meanServiceTime: meanSvc
      })
    });
    return response.json();
  },

  // M/M/S Queue
  calculateMMS: async (servers: number, meanIA: number, meanSvc: number) => {
    const response = await fetch(`${API_BASE_URL}/mms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numberOfServers: servers,
        meanInterarrivalTime: meanIA,
        meanServiceTime: meanSvc
      })
    });
    return response.json();
  },

  // M/G/1 Queue
  calculateMG1: async (meanIA: number, serviceDist: string, meanSvc: number, varSvc: number) => {
    const response = await fetch(`${API_BASE_URL}/mg1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meanInterarrivalTime: meanIA,
        serviceDistribution: serviceDist === 'exponential' ? 0 : 1,
        meanServiceTime: meanSvc,
        varianceServiceTime: varSvc
      })
    });
    return response.json();
  },

  // M/G/S Queue
  calculateMGS: async (servers: number, meanIA: number, serviceDist: string, meanSvc: number) => {
    const response = await fetch(`${API_BASE_URL}/mgs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numberOfServers: servers,
        meanInterarrivalTime: meanIA,
        serviceDistribution: serviceDist === 'exponential' ? 0 : 1,
        meanServiceTime: meanSvc
      })
    });
    return response.json();
  },

  // G/G/1 Queue
  calculateGG1: async (
    arrDist: string, meanIA: number, varIA: number,
    svcDist: string, meanSvc: number, varSvc: number
  ) => {
    const distMap: Record<string, number> = {
      'exponential': 0, 'poisson': 1, 'normal': 2, 'uniform': 3, 'gamma': 4
    };
    
    const response = await fetch(`${API_BASE_URL}/gg1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interarrivalDistribution: distMap[arrDist],
        meanInterarrivalTime: meanIA,
        varianceInterarrival: varIA,
        serviceDistribution: distMap[svcDist],
        meanServiceTime: meanSvc,
        varianceService: varSvc
      })
    });
    return response.json();
  },

  // G/G/S Queue
  calculateGGS: async (
    servers: number,
    arrDist: string, meanIA: number, varIA: number,
    svcDist: string, meanSvc: number, varSvc: number
  ) => {
    const distMap: Record<string, number> = {
      'exponential': 0, 'poisson': 1, 'normal': 2, 'uniform': 3, 'gamma': 4
    };
    
    const response = await fetch(`${API_BASE_URL}/ggs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numberOfServers: servers,
        interarrivalDistribution: distMap[arrDist],
        meanInterarrivalTime: meanIA,
        varianceInterarrival: varIA,
        serviceDistribution: distMap[svcDist],
        meanServiceTime: meanSvc,
        varianceService: varSvc
      })
    });
    return response.json();
  },

  // Simulation
  runSimulation: async (servers: number, arrivalRate: number, serviceRate: number, numCustomers: number, serviceDist: string) => {
    const response = await fetch(`${API_BASE_URL}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        servers,
        arrivalRate,
        serviceRate,
        numCustomers,
        serviceDist: serviceDist === 'exponential' ? 0 : 1
      })
    });
    return response.json();
  }
};
