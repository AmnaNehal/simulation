# Getting Started - Step by Step

Follow these exact steps to get your Queue Algorithm Calculator running.

## 📋 Prerequisites Check

### Step 1: Install .NET SDK

1. Go to: https://dotnet.microsoft.com/download
2. Download ".NET 8.0 SDK"
3. Run the installer
4. Restart your computer
5. Verify installation:
   ```bash
   dotnet --version
   ```
   Should show: `8.x.x`

### Step 2: Install Node.js

1. Go to: https://nodejs.org/
2. Download the "LTS" version (18.x or higher)
3. Run the installer
4. Restart your computer
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   Should show version numbers

## 📦 Setup

### Step 3: Extract the Project

1. Find `QueueAlgoFullStack.zip`
2. Right-click → Extract All
3. Choose a location (e.g., `C:\Projects\` or `~/Projects/`)
4. You should now have a folder: `QueueAlgoFullStack`

### Step 4: Open Terminal/Command Prompt

**Windows:**
- Press `Win + R`
- Type `cmd`
- Press Enter

**Mac:**
- Press `Cmd + Space`
- Type `terminal`
- Press Enter

**Linux:**
- Press `Ctrl + Alt + T`

### Step 5: Navigate to Project

```bash
cd path/to/QueueAlgoFullStack

# Example Windows:
cd C:\Projects\QueueAlgoFullStack

# Example Mac/Linux:
cd ~/Projects/QueueAlgoFullStack
```

### Step 6: Install Backend Dependencies

```bash
cd Backend
dotnet restore
```

You should see:
```
Determining projects to restore...
Restored QueueAlgoAPI.csproj (in X ms).
```

### Step 7: Install Frontend Dependencies

```bash
cd ..
cd Frontend
npm install
```

You should see lots of packages being installed. This may take 2-3 minutes.

## 🚀 Running the Application

### Step 8: Start the Backend

**Keep your current terminal open and run:**

```bash
cd ..
cd Backend
dotnet run
```

You should see:
```
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

✅ **SUCCESS!** Your backend is running on port 5000.

⚠️ **IMPORTANT:** Keep this terminal window open! Don't close it.

### Step 9: Start the Frontend

**Open a NEW terminal window** (don't close the backend one!)

Navigate to the project again:
```bash
cd path/to/QueueAlgoFullStack/Frontend

# Example:
cd C:\Projects\QueueAlgoFullStack\Frontend
```

Run:
```bash
npm run dev
```

You should see:
```
  VITE v7.2.4  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **SUCCESS!** Your frontend is running on port 5173.

### Step 10: Open Your Browser

Open your web browser and go to:
```
http://localhost:5173
```

You should see the Queue Algorithm Calculator homepage!

## ✅ Testing the Connection

### Test 1: Calculate M/M/1

1. Click "Queue Models" in the navigation
2. Click "M/M/1"
3. Enter:
   - Mean Interarrival Time: `10`
   - Mean Service Time: `8`
4. Click "Calculate"

You should see results:
```
ρ (Utilization): 0.800 (80.0%)
Ls (Avg Customers in System): 4.000
Ws (Avg Time in System): 40.000
Lq (Avg Customers in Queue): 3.200
Wq (Avg Waiting Time): 32.000
Idle Time: 20.0%
```

✅ **IT WORKS!** Frontend is connected to backend.

### Test 2: Run a Simulation

1. Click "Simulation"
2. Click "M/M/S Simulation"
3. Enter:
   - Servers: `2`
   - Arrival Rate: `0.5`
   - Service Rate: `0.6`
   - Number of Customers: `50`
4. Click "Run Simulation"

You should see a table with customer data!

## 📊 What You Should See

### Two Terminal Windows Running

**Terminal 1 (Backend):**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started.
```

**Terminal 2 (Frontend):**
```
  VITE v7.2.4  ready in 523 ms

  ➜  Local:   http://localhost:5173/
```

### Browser Window

- Clean UI with navigation
- All buttons work
- Calculations return results instantly
- No error messages

## 🛑 Stopping the Application

### To Stop:

1. **Frontend:** Go to frontend terminal, press `Ctrl + C`
2. **Backend:** Go to backend terminal, press `Ctrl + C`

### To Restart:

Just repeat Step 8 and Step 9!

## 🔧 Alternative: Use the Scripts

### Windows - Automated Start

Double-click `START.bat` in the project folder.

This will:
- Open two command prompts
- Start backend in first window
- Start frontend in second window
- Both servers will start automatically!

### Mac/Linux - Automated Setup

```bash
cd QueueAlgoFullStack
./SETUP.sh
```

Then start manually as described in Step 8 and 9.

## 📍 Important URLs

Save these in your bookmarks:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend App | http://localhost:5173 | Main application |
| Backend API | http://localhost:5000 | API server |
| API Documentation | http://localhost:5000/swagger | Test endpoints |

## 🎯 Next Steps

Now that everything is running:

1. **Explore the Models:**
   - Try all 6 queue models
   - See how different parameters affect results
   - Understand when systems become unstable

2. **Run Simulations:**
   - Compare analytical results with simulation
   - Try different server configurations
   - Export simulation data

3. **Learn the Theory:**
   - Read about queue theory
   - Understand the formulas
   - Apply to real-world scenarios

## 💡 Pro Tips

### Keep Terminals Visible
Arrange your windows so you can see both terminals and the browser. This helps you spot errors quickly.

### Use Swagger for API Testing
Visit http://localhost:5000/swagger to test the API directly without the frontend.

### Check Browser Console
Press F12 in your browser to see the developer console. Any frontend errors will appear here.

### Watch the Terminals
Both terminals show useful information:
- Backend: API requests and responses
- Frontend: Build information and warnings

## ❓ Having Issues?

If something doesn't work:

1. **Check Prerequisites**
   ```bash
   dotnet --version  # Should show 8.x.x
   node --version    # Should show 18.x.x+
   ```

2. **Read Error Messages**
   - Backend errors appear in backend terminal
   - Frontend errors appear in frontend terminal and browser console

3. **Verify Both Are Running**
   - Backend should say "Now listening on: http://localhost:5000"
   - Frontend should say "Local: http://localhost:5173"

4. **Consult Troubleshooting Guide**
   - Open `TROUBLESHOOTING.md`
   - Search for your specific error
   - Follow the solutions

5. **Start Fresh**
   - Close both terminals
   - Delete `Frontend/node_modules` folder
   - Run `SETUP.bat` (Windows) or `./SETUP.sh` (Mac/Linux)
   - Try again

## ✨ You're All Set!

Congratulations! You now have a fully functional Queue Theory Calculator with:
- ✅ C# backend handling calculations
- ✅ React frontend providing beautiful UI
- ✅ Real-time connection between them
- ✅ 6 queue models + simulation engine

Enjoy exploring queue theory! 🎉
