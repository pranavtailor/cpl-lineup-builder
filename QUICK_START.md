# QUICK START GUIDE - CPL Pickleball Lineup Builder

## For Non-Technical Users

This guide will help you get the Pickleball Lineup Builder running on your computer.

---

## macOS Users

### Step 1: Download & Open the Application Folder
1. Get the `cpl-lineup-builder` folder
2. Open Finder and navigate to it

### Step 2: Run the Application
**Option A: Click & Go (Easiest)**
1. Look for a file called `run.sh` in the folder
2. Double-click it
3. A terminal window will appear with "Opening http://localhost:5000"
4. Your browser should automatically open the application

**Option B: Using Terminal**
1. Open Terminal (Applications → Utilities → Terminal)
2. Type: `cd ` (with a space at the end)
3. Drag the `cpl-lineup-builder` folder into the Terminal window
4. Press Enter
5. Type: `chmod +x run.sh`
6. Press Enter
7. Type: `./run.sh`
8. Press Enter
9. Your browser will open automatically

### Stopping the Application
- Press `Ctrl + C` in the Terminal window

---

## Windows Users

### Step 1: Download Python (First Time Only)
1. Visit https://www.python.org/downloads/
2. Click "Download Python 3.12.x" (or latest)
3. Run the installer
4. **IMPORTANT**: Check the box that says "Add Python to PATH"
5. Click "Install Now"
6. Wait for installation to complete

### Step 2: Download & Open the Application Folder
1. Get the `cpl-lineup-builder` folder
2. Right-click it and select "Open with → File Explorer" (or just open it normally)

### Step 3: Run the Application
**Option A: Double-Click (Easiest)**
1. Find the file `run.bat` in the folder
2. Double-click it
3. A window will appear with setup messages
4. Your browser should automatically open the application

**Option B: Using Command Prompt**
1. Open Command Prompt (Search → "cmd" → Enter)
2. Type: `cd ` (with a space)
3. Drag the `cpl-lineup-builder` folder into the Command Prompt window
4. Press Enter
5. Type: `run.bat`
6. Press Enter
7. Your browser will open automatically

### Stopping the Application
- Close the Command Prompt window or press `Ctrl + C`

---

## Linux Users

### Step 1: Ensure Python is Installed
Open Terminal and type:
```bash
python3 --version
```
If you see a version number, Python is installed. If not:
```bash
sudo apt-get install python3 python3-venv
```

### Step 2: Run the Application
```bash
cd /path/to/cpl-lineup-builder
chmod +x run.sh
./run.sh
```

Your browser will automatically open to `http://localhost:5000`

---

## Using the Application

Once the application opens:

1. **Lineup Tab**: Build your lineups
   - Click dropdowns to select players
   - Mixed rounds: Select 1 man and 1 woman per pair
   - Gender rounds: Select same gender for each pair

2. **Validate**: Click the validate button to check for rule violations

3. **Info & Stats**: Click the tab to see player statistics

4. **Export**: Click "Export to PDF" to save the lineup as a PDF

---

## Troubleshooting

### "Port 5000 is already in use"
Another app is using the same port. Try a different port:
1. Open `app.py` with a text editor
2. Find the line: `app.run(debug=True, port=5000)`
3. Change `5000` to `5001` and save
4. Run the application again

### Browser doesn't open automatically
1. The app is still running in Terminal/Command Prompt
2. Manually open your browser
3. Type in address bar: `http://localhost:5000`

### Still having issues?
1. Make sure Python 3.7+ is installed
2. Make sure all dependencies installed (you should see messages about this when running)
3. Check that the internet browser is working properly
4. Try a different browser (Chrome, Firefox, Safari, Edge)

---

## Getting Help

- Check the README.md file for more information
- Contact the team captain for assistance

---

**Important**: Keep the Terminal/Command Prompt window open while using the application. When you're done, close it to stop the application.
