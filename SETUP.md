# 🎾 CPL Pickleball Lineup Builder - Complete Setup Guide

Welcome! Your fully-featured pickleball lineup management application is ready to use.

---

## 📁 What You Have

Your application folder contains:

```
cpl-lineup-builder/
├── app.py                    # Main application (Flask backend)
├── requirements.txt          # Python dependencies
├── run.sh                   # Startup script (macOS/Linux)
├── run.bat                  # Startup script (Windows)
├── build_executable.sh      # Create standalone app (optional)
│
├── templates/
│   └── index.html           # Web interface
├── static/
│   ├── style.css            # Styling
│   └── script.js            # Frontend logic
│
├── README.md                # Full documentation
├── QUICK_START.md           # Quick setup guide
├── BUILD_EXECUTABLE.md      # How to build standalone apps
├── DEPLOYMENT.md            # Distribution methods
└── SETUP.md                 # This file
```

---

## 🚀 Getting Started (5 Minutes)

### macOS & Linux Users:

```bash
# 1. Open Terminal
# 2. Navigate to the folder:
cd path/to/cpl-lineup-builder

# 3. Make script executable (first time only):
chmod +x run.sh

# 4. Run:
./run.sh

# The app will open automatically at http://localhost:5000
```

### Windows Users:

1. **First Time Setup**: Install Python 3
   - Download from https://www.python.org/downloads/
   - During installation: Check "Add Python to PATH"

2. **Run the app**:
   - Double-click `run.bat` in the folder
   - Your browser opens automatically

3. **Stop the app**:
   - Close the Command Prompt window

---

## ✨ Features Overview

### 1. **Lineup Builder**
- Drag-and-drop style interface with dropdowns
- 8 rounds × 4 games = 32 games total
- Automatic game type handling (mixed vs. gender)

### 2. **Rule Validation**
Click "✓ Validate Lineup" to check:
- ✅ No player plays twice per round
- ✅ No same partnership more than 2 games
- ✅ Mixed rounds have correct genders
- ✅ Gender rounds have correct genders

### 3. **Player Stats**
Click "Info & Stats" tab to see:
- How many games each player plays
- Which rounds they participate in
- Partnership history
- Game type breakdown

### 4. **PDF Export**
Click "📄 Export to PDF" to:
- Generate professional-looking lineup sheet
- Download for printing
- Share with team

---

## 📊 Team Roster

**Men (9):**
Matt Marletta, Pranav Tailor, Jesse Mynahan, Jonathan Marquez, Lassen Christov, 
Diogenis Panagiotis, Yevgeniy, Xhulio Kola, Neel Goyal

**Women (7):**
Addy, Kaleigh Tierney, Natalie Ruiz, Joreen Sun, Jill Del Pozzo, Maggie Jiang, 
Jennifer Hansen

---

## 🎮 How to Use

### Step 1: Open Lineup Tab
- Click "Lineup" tab at the top

### Step 2: Fill in Players
- Click any dropdown to select a player
- Mixed rounds (1,3,5,7): 1 man + 1 woman per pair
- Gender rounds (2,4,6,8): Same gender per pair

### Step 3: Validate
- Click "✓ Validate Lineup" button
- Green message = All good!
- Red message = Fix issues listed

### Step 4: Check Stats
- Click "Info & Stats" tab
- See player game counts and partnerships

### Step 5: Export
- Click "📄 Export to PDF"
- Download and print/share

---

## ⚙️ System Requirements

✅ **macOS**: 10.13+
✅ **Windows**: 7 SP1, 8, 10, 11 (Python 3.7+ required)
✅ **Linux**: Any modern distribution
✅ **Browser**: Chrome, Firefox, Safari, or Edge

---

## 🛠️ Troubleshooting

### Issue: "Python not found" (Windows)
**Solution**: Install Python 3 from https://www.python.org/downloads/
- Check "Add Python to PATH" during installation

### Issue: Port 5000 already in use
**Solution**: Edit `app.py`, find line with `port=5000`, change to `port=5001`

### Issue: Browser doesn't open automatically
**Solution**: Manually go to `http://localhost:5000` in your browser

### Issue: Players not showing in dropdowns
**Solution**: Refresh browser page (Ctrl+R or Cmd+R)

### Issue: Can't stop the app
**Solution**: Close the Terminal/Command Prompt window

For more troubleshooting, see `README.md` or `QUICK_START.md`

---

## 📦 Sharing with Your Team

### Option A: Simple & Easy
1. Zip the `cpl-lineup-builder` folder
2. Share via email/cloud storage
3. Recipients run `run.sh` (Mac/Linux) or `run.bat` (Windows)
4. Share `QUICK_START.md` with non-technical users

### Option B: Standalone Executable (No Python Needed)
1. Follow instructions in `BUILD_EXECUTABLE.md`
2. Share the `.exe` file (Windows) or app file (macOS)
3. No Python installation needed!

### Option C: Cloud Version (Anywhere Access)
1. Follow instructions in `DEPLOYMENT.md`
2. Deploy to Heroku, PythonAnywhere, or similar
3. Share link with team (works in any browser)

---

## 📝 Match Rules

### Partnership Rule
- Two players can play together **maximum 2 games**
- After 2 games together, must split up

### Availability Rule
- Each player plays **maximum 1 game per round**
- With 8 rounds, max games per player is **8**

### Mixed Game Rule (Rounds 1, 3, 5, 7)
- Each pair must have **1 man + 1 woman**
- Not two men or two women

### Gender Game Rule (Rounds 2, 4, 6, 8)
- Women's games: 2 women per pair
- Men's games: 2 men per pair

---

## 🎯 Tips for Better Lineups

1. **Start with top players** - Put your best players in multiple rounds
2. **Avoid repeat partnerships** - Remember the 2-game limit
3. **Balance play time** - Try to give everyone similar game counts
4. **Validate early** - Check your work as you go
5. **Review stats** - Use Info tab to ensure fairness

---

## 📞 Support

**Questions or issues?**
1. Check the `README.md` file
2. See `QUICK_START.md` for setup help
3. Review `DEPLOYMENT.md` for sharing options
4. Contact the development team

---

## 🔄 Version Information

- **Version**: 1.0.0
- **Created**: March 2, 2026
- **Python**: 3.7+ required
- **Framework**: Flask
- **Browser Compatibility**: All modern browsers

---

## 📋 Checklist

Before using with your team:

- [ ] Application runs locally without errors
- [ ] All 16 players appear in dropdowns
- [ ] Validation catches rule violations
- [ ] Stats tab displays player information
- [ ] PDF export works correctly
- [ ] Documentation is clear and accessible

---

## 🎉 You're All Set!

Your CPL Pickleball Lineup Builder is ready to use. Here's what to do next:

1. **Try it out**: Run `./run.sh` (or `run.bat`) and explore
2. **Test a lineup**: Fill in some players and click validate
3. **Check stats**: Click Info tab to see player stats
4. **Export PDF**: Try the PDF export feature
5. **Share with team**: Distribute to team members using one of the methods in `DEPLOYMENT.md`

**Happy lineup building! 🎾**

---

### Quick Command Reference

**macOS/Linux:**
```bash
cd cpl-lineup-builder
chmod +x run.sh
./run.sh
```

**Windows:**
```bash
# Double-click run.bat
# OR
run.bat
```

**Stop application:**
- Press `Ctrl+C` in terminal/command prompt
- Or close the window

---

For detailed information, see:
- `README.md` - Complete documentation
- `QUICK_START.md` - Setup guide for non-technical users
- `DEPLOYMENT.md` - Ways to share with your team
- `BUILD_EXECUTABLE.md` - Create standalone apps
