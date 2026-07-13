# Connection Troubleshooting Guide

This guide helps you resolve connection issues between the frontend and backend.

## ✅ Pre-Flight Checklist

Before starting, verify:

1. **Prerequisites Installed**
   ```bash
   dotnet --version   # Should show 8.x.x
   node --version     # Should show 18.x.x or higher
   ```

2. **Dependencies Installed**
   ```bash
   # Backend
   cd Backend
   dotnet restore
   
   # Frontend
   cd Frontend
   npm install
   ```

## 🔴 Problem: Backend Won't Start

### Symptom
```
dotnet run
Unable to bind to http://localhost:5000
```

### Solution 1: Port Already in Use
```bash
# Windows - Find what's using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Mac/Linux - Find what's using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### Solution 2: Change Backend Port
Edit `Backend/appsettings.json`:
```json
{
  "Urls": "http://localhost:5001"
}
```

Then update `Frontend/src/api/queueAPI.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5001/api/queue';
```

### Solution 3: .NET SDK Issues
```bash
# Verify installation
dotnet --info

# Clean and rebuild
cd Backend
dotnet clean
dotnet restore
dotnet build
dotnet run
```

## 🔴 Problem: Frontend Won't Start

### Symptom
```
npm run dev
Error: Cannot find module 'vite'
```

### Solution 1: Reinstall Dependencies
```bash
cd Frontend
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### Solution 2: Node Version
```bash
# Check version
node --version

# If < 18, update Node.js from nodejs.org
# Then:
cd Frontend
npm install
```

### Solution 3: Port Already in Use
Vite will automatically try the next available port (5174, 5175, etc.)
Just use the port shown in the terminal output.

## 🔴 Problem: "Connection Refused" / "Network Error"

### Symptom
Browser console shows:
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

### Checklist
1. ✅ Is backend running? Check terminal for "Now listening on: http://localhost:5000"
2. ✅ Is frontend running? Check terminal for "Local: http://localhost:5173"
3. ✅ Are both using correct ports?

### Solution 1: Verify Backend is Running
Open browser to: http://localhost:5000/swagger

If you see Swagger UI → Backend is working ✅
If you get "can't reach this page" → Backend is not running ❌

### Solution 2: Check API URL
In `Frontend/src/api/queueAPI.ts`, verify:
```typescript
const API_BASE_URL = 'http://localhost:5000/api/queue';
```

### Solution 3: Test API Directly
```bash
# Test if backend responds
curl http://localhost:5000/api/queue/mm1 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"meanInterarrivalTime":10,"meanServiceTime":8}'
```

Should return JSON with queue metrics.

## 🔴 Problem: CORS Error

### Symptom
Browser console shows:
```
Access to fetch at 'http://localhost:5000/api/queue/mm1' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

### Solution 1: Verify CORS in Program.cs
Check `Backend/Program.cs` has:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                         .AllowAnyMethod()
                         .AllowAnyHeader());
});

// Later in the file:
app.UseCors("AllowAll");
```

### Solution 2: Restart Backend
```bash
cd Backend
# Stop with Ctrl+C
dotnet run
```

### Solution 3: Clear Browser Cache
- Chrome: Ctrl+Shift+Delete → Clear browsing data
- Or try Incognito/Private mode

## 🔴 Problem: API Returns 404

### Symptom
```
POST http://localhost:5000/api/queue/mm1 404 (Not Found)
```

### Solution 1: Check URL
Correct: `http://localhost:5000/api/queue/mm1`
Wrong: `http://localhost:5000/queue/mm1` (missing /api)
Wrong: `http://localhost:5000/api/mm1` (missing /queue)

### Solution 2: Verify Controller Route
In `Backend/Controllers/QueueController.cs`:
```csharp
[ApiController]
[Route("api/[controller]")]  // This creates /api/queue
public class QueueController : ControllerBase
```

### Solution 3: Rebuild Backend
```bash
cd Backend
dotnet clean
dotnet build
dotnet run
```

## 🔴 Problem: API Returns 400 Bad Request

### Symptom
```
POST http://localhost:5000/api/queue/mm1 400 (Bad Request)
```

### Cause
Invalid JSON format or wrong field names.

### Solution: Check Request Format
Correct format for M/M/1:
```json
{
  "meanInterarrivalTime": 10,
  "meanServiceTime": 8
}
```

Common mistakes:
- ❌ `MeanInterarrivalTime` (wrong casing)
- ❌ `mean_interarrival_time` (wrong format)
- ❌ `"10"` (string instead of number)

## 🔴 Problem: Results Not Showing

### Symptom
Click Calculate, nothing happens, no errors.

### Solution 1: Check Browser Console
Press F12 → Console tab → Look for errors

### Solution 2: Check Network Tab
Press F12 → Network tab → Click Calculate
- See the POST request?
- Status code 200?
- Response has data?

### Solution 3: Check API Response
```typescript
// Add console.log to see response
const result = await queueAPI.calculateMM1(10, 8);
console.log('API Response:', result);
```

## 🔴 Problem: "System is Unstable" Error

### Symptom
All calculations show "ρ ≥ 1: System is unstable"

### This is NOT a bug
This is correct behavior when arrival rate ≥ service rate.

### Solution
Adjust your inputs so that:
- Mean Interarrival Time > Mean Service Time (for M/M/1)
- Or increase number of servers

Example:
- ❌ Interarrival: 5, Service: 8 → Unstable (λ/μ = 1.6)
- ✅ Interarrival: 10, Service: 8 → Stable (λ/μ = 0.8)

## 🔴 Problem: Firewall Blocking Connection

### Windows Firewall
```
1. Search "Windows Defender Firewall"
2. Click "Allow an app through firewall"
3. Click "Change settings"
4. Find "dotnet" and check both boxes
5. Click OK
```

### Mac Firewall
```
1. System Preferences → Security & Privacy
2. Firewall tab → Firewall Options
3. Add dotnet to allowed apps
```

## 🔴 Problem: Different Machines

### Scenario
Frontend on one computer, backend on another.

### Solution
1. Find backend computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Update `appsettings.json` to listen on all interfaces:
   ```json
   {
     "Urls": "http://0.0.0.0:5000"
   }
   ```

3. Update frontend `queueAPI.ts`:
   ```typescript
   const API_BASE_URL = 'http://192.168.1.100:5000/api/queue';
   // Replace with actual IP
   ```

4. Update CORS in `Program.cs`:
   ```csharp
   builder.AllowAnyOrigin()  // Keep this for development
   ```

## 📊 Diagnostic Commands

### Test Backend Health
```bash
# Should return Swagger UI HTML
curl http://localhost:5000/swagger/index.html

# Should return API response
curl -X POST http://localhost:5000/api/queue/mm1 \
  -H "Content-Type: application/json" \
  -d '{"meanInterarrivalTime":10,"meanServiceTime":8}'
```

### Check Processes
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Mac/Linux
lsof -i :5000
lsof -i :5173
```

### Verify File Structure
```bash
QueueAlgoFullStack/
├── Backend/
│   ├── Controllers/QueueController.cs  ✅
│   ├── Models/QueueModels.cs           ✅
│   ├── Program.cs                      ✅
│   └── QueueAlgoAPI.csproj             ✅
└── Frontend/
    ├── src/api/queueAPI.ts             ✅
    └── package.json                    ✅
```

## 🆘 Still Not Working?

### Step-by-Step Debug

1. **Start Fresh**
   ```bash
   # Close all terminals
   # Delete node_modules and bin/obj folders
   cd Frontend
   rm -rf node_modules
   cd ../Backend
   dotnet clean
   ```

2. **Reinstall Everything**
   ```bash
   cd Backend
   dotnet restore
   cd ../Frontend
   npm install
   ```

3. **Start Backend First**
   ```bash
   cd Backend
   dotnet run
   # Wait for "Now listening on: http://localhost:5000"
   ```

4. **Test Backend**
   - Open: http://localhost:5000/swagger
   - Try an endpoint in Swagger UI

5. **Start Frontend**
   ```bash
   # In a NEW terminal
   cd Frontend
   npm run dev
   ```

6. **Test Connection**
   - Open: http://localhost:5173
   - Press F12 (Developer Tools)
   - Go to Console tab
   - Try a calculation
   - Watch for errors

### Get Detailed Logs

**Backend Logs:**
```bash
cd Backend
dotnet run --verbosity detailed
```

**Frontend Logs:**
Already visible in browser console (F12)

## 📞 Last Resort

If nothing works:
1. Take screenshots of all error messages
2. Copy the exact error text from console
3. Note your operating system and versions:
   ```bash
   dotnet --version
   node --version
   ```
4. Check the ARCHITECTURE.md to understand how components connect
5. Review the README.md setup instructions again

## Common Success Patterns

### ✅ Everything Working Looks Like:

**Backend Terminal:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

**Frontend Terminal:**
```
  VITE v7.2.4  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Browser:**
- No red errors in console
- API calls show in Network tab with status 200
- Results display correctly

**Swagger UI (http://localhost:5000/swagger):**
- Shows all endpoints
- "Try it out" works
- Returns valid JSON
