# 📖 CPL Pickleball Lineup Builder - Complete Documentation Index

Welcome! This document serves as a guide to all documentation and features in the CPL Pickleball Lineup Builder.

---

## 🎯 Start Here

**Choose your path based on your role:**

### 👨‍💼 I'm the Captain (You're Here!)
- **What to read**: `PROJECT_SUMMARY.md` first, then `DEPLOYMENT.md`
- **Next steps**: Share the app with your team
- **Time needed**: 5 minutes to understand options

### 👨‍💻 I'm a Developer
- **What to read**: `README.md` → `app.py` code → `static/script.js`
- **Next steps**: Customize for your needs
- **Time needed**: 30 minutes to understand structure

### 👥 I'm a Team Member (Non-technical)
- **What to read**: `QUICK_START.md`
- **Next steps**: Run the app and start building lineups
- **Time needed**: 5 minutes to get running

---

## 📚 Documentation Files

### 🚀 Getting Started
| File | Purpose | For Whom | Time |
|------|---------|----------|------|
| `QUICK_START.md` | Fast setup guide | Everyone | 3 min |
| `SETUP.md` | Detailed getting started | Team members | 5 min |
| `PROJECT_SUMMARY.md` | What was built | Captain | 5 min |

### 🔧 Technical Documentation
| File | Purpose | For Whom | Time |
|------|---------|----------|------|
| `README.md` | Complete documentation | Developers, captains | 10 min |
| `BUILD_EXECUTABLE.md` | Create standalone apps | Developers, power users | 15 min |
| `DEPLOYMENT.md` | Distribution methods | Captain, developers | 15 min |

### 📝 This File
`DOCUMENTATION_INDEX.md` - You are here! Navigation guide for all docs.

---

## 🎮 Features Overview

### Feature 1: Lineup Builder
**Files**: `app.py` (backend), `static/script.js` (frontend), `templates/index.html` (UI)

Build lineups with:
- 8 rounds
- 4 games per round
- 2 pairs per game
- 2 players per pair
- Total: 32 games, 64 player slots

**How it works**: Select players from dropdowns → App tracks all selections in memory

---

### Feature 2: Rule Validation
**Files**: `app.py` (validation logic)

Validates:
1. ✅ No player plays twice in same round
2. ✅ No partnership for more than 2 games
3. ✅ Mixed rounds have correct genders
4. ✅ Gender rounds have correct genders

**How it works**: Click "Validate" button → Backend checks all rules → Shows errors (if any)

---

### Feature 3: Player Statistics
**Files**: `app.py` (stats calculation), `static/script.js` (display)

Shows for each player:
- Total games played
- Rounds participated in
- Partnership history
- Game type breakdown (mixed vs. gender)

**How it works**: Click "Info & Stats" tab → App calculates and displays stats in real-time

---

### Feature 4: PDF Export
**Files**: `app.py` (PDF generation)

Exports:
- Professional-looking PDF
- All 8 rounds with details
- Ready to print
- Timestamped filename

**How it works**: Click "Export to PDF" → Backend generates PDF → Downloads to user

---

## 🏗️ Application Structure

```
cpl-lineup-builder/
│
├── 📄 app.py (247 lines)
│   ├── Flask app initialization
│   ├── Player data (MEN, WOMEN lists)
│   ├── Game type logic
│   ├── Validation functions
│   ├── Statistics calculation
│   ├── PDF generation
│   └── API endpoints (/api/validate, /api/stats, /api/export-pdf)
│
├── 📁 templates/
│   └── index.html (54 lines)
│       ├── Page structure
│       ├── Tab navigation
│       ├── Control buttons
│       ├── Container for rounds
│       └── JavaScript integration
│
├── 📁 static/
│   ├── style.css (400 lines)
│   │   ├── Colors and themes
│   │   ├── Responsive layout
│   │   ├── Component styling
│   │   └── Animations
│   │
│   └── script.js (354 lines)
│       ├── Lineup state management
│       ├── Round rendering
│       ├── Event handling
│       ├── Validation API calls
│       ├── Stats display
│       ├── PDF export
│       └── Tab switching
│
├── 🐚 run.sh (macOS/Linux startup)
├── 🟦 run.bat (Windows startup)
├── 🔨 build_executable.sh (Build standalone app)
├── 📋 requirements.txt (Python dependencies)
└── 📚 Documentation files (README, QUICK_START, etc.)
```

---

## 🔄 Data Flow Diagram

```
User Interface
    ↓
    ├→ Selects players in dropdowns
    ├→ JavaScript stores in 'lineups' object
    ├→ Clicks "Validate" button
    │
    ↓
    Backend (Flask)
    ├→ Receives JSON lineup data
    ├→ Runs validation functions
    ├→ Returns errors (or "valid")
    │
    ↓
    Frontend
    ├→ Displays validation message
    ├→ Shows errors in red (if any)
    ├→ Shows "valid" in green (if no errors)
    │
    ↓
    User clicks "Export PDF"
    ├→ Sends lineup data to backend
    ├→ Backend generates PDF
    ├→ Returns PDF file to browser
    └→ Browser downloads PDF
```

---

## 🚀 Quick Reference

### To Run the App
```bash
# macOS/Linux
./run.sh

# Windows
run.bat

# Manual
python3 app.py  # Then open http://localhost:5000
```

### To Validate Setup
```bash
chmod +x verify.sh
./verify.sh
```

### To Build Standalone Executable
```bash
# See BUILD_EXECUTABLE.md for detailed steps
chmod +x build_executable.sh
./build_executable.sh
```

### To Share with Team
See `DEPLOYMENT.md` for 4 different methods:
1. ZIP file (easiest)
2. Git clone (for developers)
3. Standalone executable (best UX)
4. Cloud deployment (online access)

---

## 🎯 Common Tasks

### "I want to change the players list"
1. Open `app.py`
2. Find lines with `MEN = [...]` and `WOMEN = [...]`
3. Edit player names
4. Save and restart app

### "I want to customize colors"
1. Open `static/style.css`
2. Find color definitions (e.g., `#667eea`)
3. Change to your preferred colors
4. Refresh browser

### "I want to deploy online"
1. Read `DEPLOYMENT.md` section "Method 4: Cloud Deployment"
2. Choose Heroku, PythonAnywhere, or similar
3. Follow their setup instructions
4. Get a public URL to share

### "I want to share without Python installation"
1. Run `./build_executable.sh` (macOS/Linux) or follow `BUILD_EXECUTABLE.md` (Windows)
2. Share the `.exe` file (Windows) or app file (macOS)
3. Users double-click to run - no Python needed!

---

## 🐛 Troubleshooting Guide

### Problem: "ModuleNotFoundError: No module named 'flask'"
**Solution**: 
```bash
pip install -r requirements.txt
```
See: `README.md` → Troubleshooting

### Problem: "Port 5000 is already in use"
**Solution**: 
1. Edit `app.py`
2. Change `port=5000` to `port=5001`
3. Run again
See: `README.md` → Troubleshooting

### Problem: Players don't show in dropdowns
**Solution**: 
1. Refresh browser (Ctrl+R or Cmd+R)
2. Clear browser cache
See: `QUICK_START.md` → Troubleshooting

### Problem: PDF export not working
**Solution**:
```bash
pip install reportlab
```
See: `README.md` → Troubleshooting

---

## 📊 Statistics About the Application

| Metric | Value |
|--------|-------|
| **Python lines of code** | 247 |
| **HTML lines** | 54 |
| **CSS lines** | 400 |
| **JavaScript lines** | 354 |
| **Total lines** | 1,055 |
| **Time to build** | Efficient |
| **Setup time** | < 5 minutes |
| **Learning curve** | Easy |
| **Disk space** | ~220 KB |

---

## 🎓 Learning the Code

### For Beginners
1. Start with `templates/index.html` - understand HTML structure
2. Read `static/style.css` - understand styling
3. Read `static/script.js` - understand frontend logic
4. Read `app.py` - understand backend logic

### For Intermediate
1. Modify player names in `app.py`
2. Change colors in `style.css`
3. Add new validation rules in `app.py`
4. Customize UI in `index.html`

### For Advanced
1. Add database storage (instead of memory)
2. Add user authentication
3. Deploy to cloud platform
4. Add mobile app version

---

## 🔗 External Resources

### Python & Flask
- Flask Documentation: https://flask.palletsprojects.com/
- Python Official: https://www.python.org/
- ReportLab: https://www.reportlab.com/

### Deployment Options
- Heroku: https://www.heroku.com/
- PythonAnywhere: https://www.pythonanywhere.com/
- AWS: https://aws.amazon.com/
- Google Cloud: https://cloud.google.com/
- Azure: https://azure.microsoft.com/

### Web Technologies
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/
- CSS: https://developer.mozilla.org/en-US/docs/Web/CSS/
- HTML: https://developer.mozilla.org/en-US/docs/Web/HTML/

---

## ❓ FAQ

**Q: Do my team members need Python installed?**
A: Only if using the basic setup. You can build a standalone executable so they don't need Python.
Reference: `BUILD_EXECUTABLE.md`

**Q: Can multiple people use it at the same time?**
A: Yes, each person gets their own browser session. Each builds their own lineups.
Note: Changes don't sync between users (by design).

**Q: Is my data saved?**
A: Data is saved in your browser's local storage for the session. Not permanently saved to a server.
To make it permanent, follow `DEPLOYMENT.md` → Method 4 for cloud deployment.

**Q: Can I modify the rules?**
A: Yes! Edit the validation functions in `app.py`. See code comments for details.
Reference: `app.py` → `validate_lineups()` function

**Q: How do I backup my lineups?**
A: Use the "Export to PDF" feature to save as PDF. Or take screenshots.
Advanced: Add database storage (see learning resources).

**Q: Can I use this for other sports?**
A: Yes! Modify the rules and player names in `app.py`. It's very flexible.

**Q: Where is my data stored?**
A: All data stays on your computer (browser). Not sent anywhere unless you deploy to cloud.

**Q: Can I host this on my website?**
A: Yes, see `DEPLOYMENT.md` → Method 4 for cloud hosting options.

---

## 📞 Getting Help

### Self-Help Steps
1. Check `README.md` → Troubleshooting section
2. Check `QUICK_START.md` → Troubleshooting section
3. Run `verify.sh` to check system setup
4. Check browser console (F12 → Console) for errors

### Contact
- Reach out to the development team
- Include error messages and steps to reproduce
- Mention your operating system and browser

---

## ✅ Quick Checklist

Before sharing with team:
- [ ] Run `./run.sh` (or `run.bat`) and verify it starts
- [ ] Test adding players to lineups
- [ ] Click "Validate" and verify it works
- [ ] Check "Info & Stats" tab
- [ ] Try "Export to PDF"
- [ ] Read `QUICK_START.md` and `DEPLOYMENT.md`
- [ ] Choose distribution method from `DEPLOYMENT.md`
- [ ] Share chosen documentation with team

---

## 🎉 Final Thoughts

This is a **complete, production-ready application**. All features work. All documentation is included.

**What to do next:**
1. ✅ Run the app: `./run.sh`
2. ✅ Test it out with sample data
3. ✅ Read `DEPLOYMENT.md` for sharing options
4. ✅ Share with your team using one of the methods

**You're all set! Happy lineup building! 🎾**

---

## 📋 Documentation Map

```
START HERE
    ↓
┌─────────────────────────────────────────┐
│ QUICK_START.md (5 min)                 │
│ Fast setup guide for all users         │
└─────────────────────────────────────────┘
    ↓
    Choose your path:
    
    ├→ I want to USE it
    │  └→ SETUP.md
    │  └→ Then start building lineups!
    │
    ├→ I want to SHARE it
    │  └→ PROJECT_SUMMARY.md
    │  └→ DEPLOYMENT.md
    │  └→ Choose distribution method
    │
    ├→ I want to UNDERSTAND it
    │  └→ README.md
    │  └→ PROJECT_SUMMARY.md
    │
    └→ I want to CUSTOMIZE it
       └→ README.md
       └→ app.py (read the code)
       └→ static/script.js (read the code)
       └→ Modify as needed
```

---

**Last Updated**: March 2, 2026
**Version**: 1.0.0
**Status**: ✅ Complete and Ready
