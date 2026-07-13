# Queue Algorithm Calculator - Full Stack (C# + React)

Complete full-stack application with C# ASP.NET Core Web API backend and React TypeScript frontend.

## 📁 Project Structure

```
QueueAlgoFullStack/
├── Backend/                    # C# ASP.NET Core Web API
│   ├── Controllers/
│   │   └── QueueController.cs  # API endpoints
│   ├── Models/
│   │   └── QueueModels.cs      # All queue calculation models
│   ├── Program.cs              # API configuration
│   ├── QueueAlgoAPI.csproj     # C# project file
│   └── appsettings.json        # API settings
│
├── Frontend/                   # React TypeScript application
│   ├── src/
│   │   ├── api/
│   │   │   └── queueAPI.ts     # API service layer
│   │   ├── pages/              # React pages (original)
│   │   ├── components/         # React components
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   └── vite.config.ts
│
└── README.md                   # This file
```

## 🚀 Quick Start Guide

### Prerequisites

1. **.NET 8.0 SDK** - Download from https://dotnet.microsoft.com/download
2. **Node.js 18+** - Download from https://nodejs.org/

Verify installations:
```bash
dotnet --version    # Should show 8.x.x
node --version      # Should show 18.x.x or higher
npm --version
```

### Step 1: Start the Backend (C# API)

Open a terminal in the `Backend` folder:

```bash
cd Backend

# Restore packages
dotnet restore

# Run the API (will start on http://localhost:5000)
dotnet run
```

You should see:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
```

Keep this terminal running. The API is now ready to receive requests.

**Test the API:**
- Open browser to http://localhost:5000/swagger
- You'll see the Swagger UI with all API endpoints

### Step 2: Start the Frontend (React)

Open a **NEW** terminal in the `Frontend` folder:

```bash
cd Frontend

# Install dependencies
npm install

# Start the development server (will start on http://localhost:5173)
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Open the Application

Open your browser to: **http://localhost:5173/**

The React app will automatically connect to the C# backend at http://localhost:5000

## 🔌 How the Connection Works

### Frontend → Backend Communication

The frontend uses the API service (`src/api/queueAPI.ts`) to communicate with the backend:

```typescript
// Example: Calculate M/M/1
const result = await queueAPI.calculateMM1(10, 8);
```

This sends a POST request to: `http://localhost:5000/api/queue/mm1`

### Backend Processing

The C# controller receives the request:

```csharp
[HttpPost("mm1")]
public IActionResult CalculateMM1([FromBody] MM1Model.InputParams input)
{
    var result = MM1Model.Calculate(input);
    return Ok(result);  // Returns JSON to frontend
}
```

### CORS Configuration

The backend is configured to allow requests from any origin (for development):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                         .AllowAnyMethod()
                         .AllowAnyHeader());
});
```

## 📡 Available API Endpoints

All endpoints are at: `http://localhost:5000/api/queue/`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mm1` | POST | M/M/1 Queue Calculator |
| `/mms` | POST | M/M/S Queue Calculator |
| `/mg1` | POST | M/G/1 Queue Calculator |
| `/mgs` | POST | M/G/S Queue Calculator |
| `/gg1` | POST | G/G/1 Queue Calculator |
| `/ggs` | POST | G/G/S Queue Calculator |
| `/simulate` | POST | Discrete Event Simulation |

### Example API Requests

**M/M/1 Request:**
```json
POST http://localhost:5000/api/queue/mm1
Content-Type: application/json

{
  "meanInterarrivalTime": 10,
  "meanServiceTime": 8
}
```

**M/M/1 Response:**
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

## 🛠️ Development

### Running Backend Only

```bash
cd Backend
dotnet watch run  # Auto-restart on code changes
```

### Running Frontend Only

```bash
cd Frontend
npm run dev  # Auto-reload on code changes
```

### Building for Production

**Backend:**
```bash
cd Backend
dotnet publish -c Release -o ../publish/backend
```

**Frontend:**
```bash
cd Frontend
npm run build  # Creates dist/ folder
```

## 🧪 Testing the Connection

### Method 1: Using Swagger UI

1. Start the backend: `cd Backend && dotnet run`
2. Open: http://localhost:5000/swagger
3. Click on any endpoint (e.g., POST /api/queue/mm1)
4. Click "Try it out"
5. Enter test data:
   ```json
   {
     "meanInterarrivalTime": 10,
     "meanServiceTime": 8
   }
   ```
6. Click "Execute"
7. See the response below

### Method 2: Using curl

```bash
curl -X POST http://localhost:5000/api/queue/mm1 \
  -H "Content-Type: application/json" \
  -d '{"meanInterarrivalTime":10,"meanServiceTime":8}'
```

### Method 3: Using the Frontend

1. Start both backend and frontend
2. Open http://localhost:5173/
3. Click on "Queue Models" → "M/M/1"
4. Enter values and click Calculate
5. See results instantly

## 🔧 Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change port in Backend/appsettings.json
"Urls": "http://localhost:5001"

# Update API_BASE_URL in Frontend/src/api/queueAPI.ts
const API_BASE_URL = 'http://localhost:5001/api/queue';
```

**CORS errors in browser console:**
- Make sure backend is running
- Check that Program.cs has `app.UseCors("AllowAll")`

### Frontend Issues

**API connection failed:**
1. Verify backend is running on port 5000
2. Check browser console for errors
3. Verify `API_BASE_URL` in `queueAPI.ts` matches backend URL

**Port 5173 already in use:**
```bash
# Vite will automatically try the next available port
# Or specify in vite.config.ts
```

### Both Not Connecting

1. Check firewall settings
2. Make sure both servers are running
3. Clear browser cache
4. Check browser console (F12) for errors

## 📊 Features

### Queue Theory Models
- ✅ M/M/1 - Single server, exponential
- ✅ M/M/S - Multiple servers, exponential
- ✅ M/G/1 - General service distribution
- ✅ M/G/S - Multiple servers, general service
- ✅ G/G/1 - General arrivals and service
- ✅ G/G/S - Multiple servers, general

### Simulation
- ✅ Discrete event simulation
- ✅ Multiple servers support
- ✅ Exponential & Poisson distributions
- ✅ Customer-by-customer tracking

### Calculations
- Server utilization (ρ)
- Average customers in system (Ls)
- Average time in system (Ws)
- Average customers in queue (Lq)
- Average waiting time (Wq)
- Stability checks

## 📝 Making Changes

### Adding a New Queue Model

1. **Backend:** Add model to `Backend/Models/QueueModels.cs`
2. **Backend:** Add endpoint to `Backend/Controllers/QueueController.cs`
3. **Frontend:** Add API function to `Frontend/src/api/queueAPI.ts`
4. **Frontend:** Create UI page in `Frontend/src/pages/queuemodels/`

### Modifying Existing Calculations

1. Update the calculation logic in `Backend/Models/QueueModels.cs`
2. Restart backend (`dotnet run`)
3. Frontend will automatically use new calculations

## 🌐 Deployment

### Deploy Backend (Azure, AWS, etc.)

```bash
cd Backend
dotnet publish -c Release
# Deploy the publish folder to your hosting service
```

Update CORS policy in `Program.cs` to only allow your frontend domain.

### Deploy Frontend (Vercel, Netlify, etc.)

```bash
cd Frontend
npm run build
# Deploy the dist folder
```

Update `API_BASE_URL` in `queueAPI.ts` to point to your deployed backend URL.

## 📚 Additional Resources

- ASP.NET Core Docs: https://docs.microsoft.com/aspnet/core
- React Documentation: https://react.dev
- Vite Documentation: https://vitejs.dev

## 🤝 Support

If you encounter issues:
1. Check both terminals for error messages
2. Verify both backend and frontend are running
3. Check browser console (F12) for frontend errors
4. Review the API response in Swagger UI

## 📄 License

MIT License - feel free to use for any purpose
