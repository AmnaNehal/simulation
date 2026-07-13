# 📚 Documentation Index

Welcome to the Queue Algorithm Calculator full-stack project! This index will guide you to the right documentation.

## 🚀 I Want to Start Using It NOW!

**START HERE:** [`GETTING_STARTED.md`](GETTING_STARTED.md)

Step-by-step guide from installation to running the app in under 10 minutes.

**Quick Setup:**
- Windows: Double-click `START.bat`
- Mac/Linux: Run `./SETUP.sh` then start manually

## 📖 Documentation Guide

### For First-Time Users

1. **[GETTING_STARTED.md](GETTING_STARTED.md)** ⭐ START HERE
   - Prerequisites check
   - Installation steps
   - Running the application
   - Testing the connection
   - Screenshots of what success looks like

2. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)**
   - API endpoints reference
   - Example requests/responses
   - Common use cases
   - Keyboard shortcuts

### For Developers

3. **[README.md](README.md)**
   - Project overview
   - Complete feature list
   - API integration examples
   - Development workflow
   - Deployment instructions

4. **[ARCHITECTURE.md](ARCHITECTURE.md)**
   - System architecture diagrams
   - Data flow visualization
   - Technology stack details
   - Component relationships

### When Things Go Wrong

5. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**
   - Common connection errors
   - Port conflicts
   - CORS issues
   - Firewall problems
   - Step-by-step diagnostics

## 🔧 Setup Scripts

### Windows
- **`SETUP.bat`** - First-time setup (installs dependencies)
- **`START.bat`** - Start both servers automatically

### Mac/Linux
- **`SETUP.sh`** - First-time setup (installs dependencies)
- Manual start required (see GETTING_STARTED.md)

## 📁 Project Structure

```
QueueAlgoFullStack/
│
├── 📄 Documentation
│   ├── GETTING_STARTED.md      ⭐ Start here!
│   ├── README.md               📚 Complete guide
│   ├── QUICK_REFERENCE.md      📋 Quick lookup
│   ├── ARCHITECTURE.md         🏗️ Technical details
│   ├── TROUBLESHOOTING.md      🔧 Fix problems
│   └── INDEX.md                📑 This file
│
├── 🚀 Setup Scripts
│   ├── SETUP.bat               🪟 Windows setup
│   ├── SETUP.sh                🐧 Mac/Linux setup
│   └── START.bat               ▶️ Windows auto-start
│
├── 💻 Backend (C# ASP.NET Core)
│   ├── Controllers/
│   │   └── QueueController.cs  🎮 API endpoints
│   ├── Models/
│   │   └── QueueModels.cs      🧮 All calculations
│   ├── Program.cs              ⚙️ API configuration
│   ├── QueueAlgoAPI.csproj     📦 C# project file
│   └── appsettings.json        🔧 Settings
│
└── 🎨 Frontend (React TypeScript)
    ├── src/
    │   ├── api/
    │   │   └── queueAPI.ts      🔌 Backend connector
    │   ├── pages/               📄 UI pages
    │   ├── components/          🧩 Reusable components
    │   └── main.tsx             🚪 Entry point
    ├── package.json             📦 NPM dependencies
    └── vite.config.ts           ⚡ Build config
```

## 🎯 Common Tasks

### Task: Set Up for the First Time
→ Read: **GETTING_STARTED.md**
→ Run: `SETUP.bat` (Windows) or `./SETUP.sh` (Mac/Linux)

### Task: Start the Application
→ Windows: Double-click `START.bat`
→ Mac/Linux: See GETTING_STARTED.md Step 8-9

### Task: Understand the API
→ Read: **QUICK_REFERENCE.md**
→ Visit: http://localhost:5000/swagger (when backend is running)

### Task: Fix Connection Issues
→ Read: **TROUBLESHOOTING.md**
→ Check both terminals for errors
→ Try: Restart both backend and frontend

### Task: Modify Calculations
→ Edit: `Backend/Models/QueueModels.cs`
→ Restart: Backend server
→ Test: Frontend automatically uses new logic

### Task: Add New Queue Model
→ Read: README.md "Making Changes" section
→ Edit: Backend/Models, Backend/Controllers, Frontend/api

### Task: Deploy to Production
→ Read: README.md "Deployment" section
→ Build: `dotnet publish` and `npm run build`

### Task: Understand How It Works
→ Read: **ARCHITECTURE.md**
→ See: Data flow diagrams
→ Learn: Component interactions

## 📊 Features Overview

### Queue Theory Models
- ✅ **M/M/1** - Single server, Poisson arrivals, exponential service
- ✅ **M/M/S** - Multiple servers, Poisson arrivals, exponential service
- ✅ **M/G/1** - Single server, Poisson arrivals, general service
- ✅ **M/G/S** - Multiple servers, Poisson arrivals, general service
- ✅ **G/G/1** - Single server, general arrivals, general service
- ✅ **G/G/S** - Multiple servers, general arrivals, general service

### Simulation
- ✅ Discrete event simulation
- ✅ Multiple servers support
- ✅ Exponential & Poisson distributions
- ✅ Customer-by-customer tracking
- ✅ Detailed statistics

### Calculated Metrics
- Server utilization (ρ)
- Average customers in system (Ls)
- Average time in system (Ws)
- Average customers in queue (Lq)
- Average waiting time (Wq)
- Idle time percentage
- Stability checks

## 🔗 Important URLs

When the application is running:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main web application |
| **Backend API** | http://localhost:5000 | REST API server |
| **API Docs** | http://localhost:5000/swagger | Interactive API documentation |

## 💡 Tips

### First Time Using?
1. Start with GETTING_STARTED.md
2. Follow every step exactly
3. Keep both terminal windows open
4. Test with M/M/1 calculator first

### Already Running?
- QUICK_REFERENCE.md for API details
- TROUBLESHOOTING.md if something breaks
- README.md for advanced features

### Want to Modify?
- ARCHITECTURE.md to understand structure
- README.md for code examples
- Edit and restart backend to see changes

## 🆘 Need Help?

**Priority order:**

1. **Check TROUBLESHOOTING.md** - Most issues are covered here
2. **Read error messages** - They usually tell you what's wrong
3. **Verify prerequisites** - Ensure .NET 8.0 and Node.js 18+ installed
4. **Start fresh** - Delete node_modules, run setup again
5. **Check ARCHITECTURE.md** - Understand how components connect

## ✨ What's Inside Each Document

### GETTING_STARTED.md (Beginners)
- ✅ Assumes no prior knowledge
- ✅ Step-by-step with verification
- ✅ Visual descriptions of success
- ✅ Common pitfalls highlighted

### README.md (Complete Reference)
- ✅ Full project documentation
- ✅ API usage examples
- ✅ Development workflow
- ✅ Deployment instructions
- ✅ Technical specifications

### QUICK_REFERENCE.md (Cheat Sheet)
- ✅ All API endpoints
- ✅ Request/response formats
- ✅ curl command examples
- ✅ Quick troubleshooting

### ARCHITECTURE.md (Technical)
- ✅ System design diagrams
- ✅ Data flow visualization
- ✅ Component interaction
- ✅ Technology stack details

### TROUBLESHOOTING.md (Problem Solving)
- ✅ Common errors with solutions
- ✅ Port conflicts
- ✅ Connection issues
- ✅ CORS problems
- ✅ Diagnostic commands

## 🎓 Learning Path

**For Users:**
1. GETTING_STARTED.md
2. Use the application
3. QUICK_REFERENCE.md when needed

**For Developers:**
1. GETTING_STARTED.md
2. README.md
3. ARCHITECTURE.md
4. Modify code
5. TROUBLESHOOTING.md when needed

**For Integrators:**
1. README.md
2. ARCHITECTURE.md
3. API documentation (Swagger UI)
4. QUICK_REFERENCE.md

## 📞 Quick Support Checklist

Before asking for help, verify:

- [ ] .NET 8.0 SDK installed (`dotnet --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Both servers are running (check terminals)
- [ ] No red errors in browser console (F12)
- [ ] Checked TROUBLESHOOTING.md for your specific error
- [ ] Tried restarting both backend and frontend

## 🎉 Success Indicators

You'll know everything is working when:

✅ Backend terminal shows: "Now listening on: http://localhost:5000"
✅ Frontend terminal shows: "Local: http://localhost:5173"
✅ Browser at http://localhost:5173 shows the app
✅ No red errors in browser console
✅ Calculations return results instantly
✅ Swagger UI works at http://localhost:5000/swagger

---

**Ready to start?** → Go to [GETTING_STARTED.md](GETTING_STARTED.md)

**Have a specific question?** → Use the table of contents above to find the right document.

**Something broken?** → Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) first.

Happy queueing! 🎊
