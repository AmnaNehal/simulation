# 🎉 Queue Algorithm Calculator - Installation Guide

## What's Inside This Package?

This is a **complete full-stack application** with:
- ✅ **C# ASP.NET Core Backend** - All queue calculations run on a C# Web API
- ✅ **React TypeScript Frontend** - Beautiful UI (your original frontend)
- ✅ **Automatic Connection** - Frontend connects to C# backend via REST API
- ✅ **All Models Included** - M/M/1, M/M/S, M/G/1, M/G/S, G/G/1, G/G/S + Simulation

---

## 📋 What You Need to Install First

### 1. .NET 8.0 SDK
**Download:** https://dotnet.microsoft.com/download

**Verify installation:**
```bash
dotnet --version
```
Should show: `8.x.x`

### 2. Node.js (version 18 or higher)
**Download:** https://nodejs.org/

**Verify installation:**
```bash
node --version
npm --version
```

---

## 🚀 Easy Setup (3 Steps)

### Step 1: Extract the ZIP file
Extract `QueueAlgoFullStack.zip` to a folder on your computer.

### Step 2: Run Setup Script

**Windows:** Double-click `SETUP.bat`

**Mac/Linux:** 
```bash
chmod +x SETUP.sh
./SETUP.sh
```

This will install all dependencies for both frontend and backend.

### Step 3: Start the Application

**Windows:** Double-click `START.bat`

**Mac/Linux:** Open TWO terminals:

Terminal 1 (Backend):
```bash
cd Backend
dotnet run
```

Terminal 2 (Frontend):
```bash
cd Frontend
npm run dev
```

### Step 4: Open Your Browser

Go to: **http://localhost:5173**

✅ The app is now running with the C# backend!

---

## 🔍 How to Verify It's Working

1. **Check Backend is Running:**
   - Open: http://localhost:5000/swagger
   - You should see the Swagger API documentation

2. **Test the Connection:**
   - In the app, go to the "Connection Test" page (if available)
   - OR just try any queue calculation - if you get results, it's working!

3. **Check the Terminal:**
   - Backend terminal should show: `Now listening on: http://localhost:5000`
   - Frontend terminal should show: `Local: http://localhost:5173/`

---

## 📁 Folder Structure

```
QueueAlgoFullStack/
├── Backend/              # C# Web API (runs on port 5000)
│   ├── Controllers/      # API endpoints
│   ├── Models/          # Queue calculation logic
│   └── Program.cs       # Server configuration
│
├── Frontend/            # React App (runs on port 5173)
│   ├── src/
│   │   ├── api/        # Connects to C# backend
│   │   ├── pages/      # Your UI pages
│   │   └── components/ # UI components
│   └── package.json
│
├── SETUP.bat/.sh       # Installation script
├── START.bat           # Quick start (Windows)
└── README.md           # Detailed documentation
```

---

## 🎯 Quick Test

Once both servers are running, try this:

1. Open http://localhost:5173
2. Click "Queue Models" → "M/M/1"
3. Enter:
   - Mean Interarrival Time: `10`
   - Mean Service Time: `8`
4. Click "Calculate"
5. You should see:
   - Utilization (ρ): 0.800
   - Avg Customers in System: 4.00
   - And more results...

**This means your frontend is successfully talking to the C# backend!** 🎉

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if .NET is installed
dotnet --version

# If installed, try:
cd Backend
dotnet restore
dotnet run
```

### Frontend won't start
```bash
# Check if Node.js is installed
node --version

# If installed, try:
cd Frontend
npm install
npm run dev
```

### "Connection failed" errors
1. Make sure BOTH backend and frontend are running
2. Check backend is on http://localhost:5000
3. Check frontend is on http://localhost:5173
4. Look for errors in browser console (press F12)

### Port already in use
**Backend (port 5000):**
- Edit `Backend/appsettings.json`
- Change `"Urls": "http://localhost:5000"` to another port
- Update `Frontend/src/api/queueAPI.ts` API_BASE_URL

**Frontend (port 5173):**
- Vite will automatically try the next available port

---

## 📚 Documentation Files

- **README.md** - Complete setup and usage guide
- **QUICK_REFERENCE.md** - API endpoints and examples
- **ARCHITECTURE.md** - How frontend connects to backend
- **SETUP.bat/.sh** - Automated setup scripts
- **START.bat** - Quick start for Windows

---

## 💡 How the Connection Works

```
Your Browser (React App)
    ↓
    HTTP POST Request (JSON)
    ↓
C# Backend API (localhost:5000)
    ↓
Queue Calculation Models
    ↓
JSON Response
    ↓
React App Shows Results
```

Everything happens automatically! When you click "Calculate" in the frontend, it sends data to the C# backend, which calculates the results and sends them back.

---

## 🎓 Next Steps

1. ✅ Get it running (follow steps above)
2. 📖 Read `README.md` for detailed documentation
3. 🧪 Try all the queue models
4. 🔍 Check `Backend/Models/QueueModels.cs` to see the C# calculation code
5. 🎨 Customize the frontend in `Frontend/src/pages/`

---

## ❓ Need Help?

**Check these files:**
- `README.md` - Full documentation
- `QUICK_REFERENCE.md` - Quick tips and API reference
- `ARCHITECTURE.md` - System architecture

**Common Issues:**
1. Backend not starting → Install .NET 8.0 SDK
2. Frontend not starting → Install Node.js 18+
3. Connection errors → Make sure BOTH are running
4. Port conflicts → Change ports in config files

---

## 🎉 You're All Set!

Once both servers are running and you see the app in your browser, you have a fully functional full-stack queue theory calculator with:
- Beautiful React frontend (your original UI)
- Powerful C# backend (all calculations)
- Real-time API communication
- All 6 queue models + simulation

Enjoy! 🚀
