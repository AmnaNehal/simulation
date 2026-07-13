# Quick Reference Guide

## 🚀 Starting the Application

### Windows
```
Double-click: START.bat
```
OR manually:
```
Terminal 1: cd Backend && dotnet run
Terminal 2: cd Frontend && npm run dev
```

### Mac/Linux
```
Terminal 1: cd Backend && dotnet run
Terminal 2: cd Frontend && npm run dev
```

Then open: **http://localhost:5173**

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api/queue`

| Endpoint | Input Fields | Response Fields |
|----------|-------------|-----------------|
| POST /mm1 | meanInterarrivalTime<br>meanServiceTime | rho, ls, ws, lq, wq, idle<br>isStable, errorMessage |
| POST /mms | numberOfServers<br>meanInterarrivalTime<br>meanServiceTime | rho, p0, ls, ws, lq, wq<br>idle, isStable, errorMessage |
| POST /mg1 | meanInterarrivalTime<br>serviceDistribution (0=Exp, 1=Poisson)<br>meanServiceTime<br>varianceServiceTime | rho, ls, ws, lq, wq<br>cs2, idle, isStable, errorMessage |
| POST /mgs | numberOfServers<br>meanInterarrivalTime<br>serviceDistribution (0=Exp, 1=Poisson)<br>meanServiceTime | rho, ls, ws, lq, wq<br>idle, isStable, errorMessage |
| POST /gg1 | interarrivalDistribution (0-4)<br>meanInterarrivalTime<br>varianceInterarrival<br>serviceDistribution (0-4)<br>meanServiceTime<br>varianceService | rho, ca2, cs2, ls, ws<br>lq, wq, idle, isStable, errorMessage |
| POST /ggs | numberOfServers<br>interarrivalDistribution (0-4)<br>meanInterarrivalTime<br>varianceInterarrival<br>serviceDistribution (0-4)<br>meanServiceTime<br>varianceService | rho, ca2, cs2, ls, ws<br>lq, wq, idle, isStable, errorMessage |
| POST /simulate | servers<br>arrivalRate<br>serviceRate<br>numCustomers<br>serviceDist (0=Exp, 1=Poisson) | avgWaitTime, avgSystemTime<br>avgQueueLength, avgSystemLength<br>serverUtilization, throughput<br>totalServed, table[] |

### Distribution Types (0-4)
- 0 = Exponential
- 1 = Poisson
- 2 = Normal
- 3 = Uniform
- 4 = Gamma

## 📝 Example API Calls

### M/M/1 Example
```bash
curl -X POST http://localhost:5000/api/queue/mm1 \
  -H "Content-Type: application/json" \
  -d '{"meanInterarrivalTime":10,"meanServiceTime":8}'
```

Response:
```json
{
  "rho": 0.8,
  "ls": 4.0,
  "ws": 40.0,
  "lq": 3.2,
  "wq": 32.0,
  "idle": 0.2,
  "isStable": true,
  "errorMessage": null
}
```

### Simulation Example
```bash
curl -X POST http://localhost:5000/api/queue/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "servers":2,
    "arrivalRate":0.5,
    "serviceRate":0.6,
    "numCustomers":100,
    "serviceDist":0
  }'
```

## 🔧 Troubleshooting

### Backend won't start
- Check if .NET 8.0 SDK is installed: `dotnet --version`
- Check if port 5000 is available
- Try: `cd Backend && dotnet clean && dotnet run`

### Frontend won't start
- Check if Node.js is installed: `node --version`
- Try: `cd Frontend && rm -rf node_modules && npm install`
- Check if port 5173 is available

### Connection errors
- Make sure BOTH backend and frontend are running
- Check browser console (F12) for errors
- Verify backend is on port 5000: http://localhost:5000/swagger

### CORS errors
- Make sure backend Program.cs has CORS enabled
- Clear browser cache
- Try incognito/private window

## 📁 Key Files to Edit

### Backend
- `Backend/Models/QueueModels.cs` - Queue calculation logic
- `Backend/Controllers/QueueController.cs` - API endpoints
- `Backend/Program.cs` - Server configuration
- `Backend/appsettings.json` - Port and logging settings

### Frontend
- `Frontend/src/api/queueAPI.ts` - API connection layer
- `Frontend/src/pages/` - UI pages
- `Frontend/vite.config.ts` - Dev server config

## 📊 Understanding Results

| Metric | Symbol | Meaning |
|--------|--------|---------|
| Utilization | ρ (rho) | % of time server is busy (must be < 1) |
| Avg in System | Ls | Average # of customers in entire system |
| Avg System Time | Ws | Average time customer spends in system |
| Avg in Queue | Lq | Average # of customers waiting |
| Avg Wait Time | Wq | Average time customer waits in queue |
| Idle Time | 1-ρ | % of time server is idle |

## 🎯 Common Use Cases

### Bank Teller
- Model: M/M/1 or M/M/S
- Interarrival: Time between customers
- Service: Time to serve one customer

### Call Center
- Model: M/M/S
- Servers: Number of agents
- Interarrival: Time between calls
- Service: Average call duration

### Manufacturing
- Model: M/G/1 or M/G/S
- Service: Can vary (use Poisson or other distributions)

## 🚫 Stopping the Application

### Windows
- Press Ctrl+C in each terminal
- Or close the terminal windows

### Mac/Linux
- Press Ctrl+C in each terminal

## 📚 More Help

See README.md for detailed setup instructions and deployment guides.
