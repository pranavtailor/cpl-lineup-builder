# Deployment Guide - CPL Pickleball Lineup Builder

## Overview

This guide covers how to deploy the CPL Pickleball Lineup Builder for your team members.

---

## Method 1: Simple Git Clone (For Technical Users)

### Steps:
1. Install Git (if not already installed)
2. Clone the repository:
   ```bash
   git clone https://github.com/pranavtailor/cpl-lineup-builder.git
   cd cpl-lineup-builder
   ```
3. Run the startup script:
   - **macOS/Linux**: `./run.sh`
   - **Windows**: `run.bat`

---

## Method 2: ZIP File Distribution (For Most Users)

### Prepare:
1. Zip the entire `cpl-lineup-builder` folder
2. Share via email, Google Drive, Dropbox, etc.

### For Recipients:
1. Download and extract the ZIP file
2. Run:
   - **macOS/Linux**: Open `run.sh` and double-click OR use Terminal: `./run.sh`
   - **Windows**: Double-click `run.bat`
3. Your browser will automatically open the application

---

## Method 3: Standalone Executable (Best UX - No Python Required)

### For macOS/Linux:

1. **Build the executable:**
   ```bash
   pip install pyinstaller
   chmod +x build_executable.sh
   ./build_executable.sh
   ```

2. **Share the executable:**
   - Find the executable in the `dist/` folder
   - Create a `.dmg` file (optional, for easier distribution):
     ```bash
     hdiutil create -volname "CPL Lineup Builder" \
         -srcfolder dist/CPL\ Lineup\ Builder \
         -ov -format UDZO "CPL_Lineup_Builder.dmg"
     ```
   - Share the `.dmg` file

3. **For users:**
   - Double-click the `.dmg` file
   - Drag to Applications folder
   - Open from Applications

### For Windows:

1. **Build the executable:**
   ```bash
   pip install pyinstaller
   pyinstaller --onefile ^
       --name "CPL Lineup Builder" ^
       --add-data "templates;templates" ^
       --add-data "static;static" ^
       --icon icon.ico ^
       app.py
   ```

2. **Share the executable:**
   - Find `CPL Lineup Builder.exe` in the `dist/` folder
   - Zip it with a README
   - Share via email or cloud storage

3. **For users:**
   - Extract the ZIP file
   - Double-click `CPL Lineup Builder.exe`
   - Application opens in browser

### For Linux:

1. **Build the executable:**
   ```bash
   pip install pyinstaller
   pyinstaller --onefile \
       --name "CPL Lineup Builder" \
       --add-data "templates:templates" \
       --add-data "static:static" \
       app.py
   ```

2. **Create an AppImage (optional):**
   ```bash
   pip install linuxdeploy appimage
   linuxdeploy --appdir AppDir --executable dist/CPL\ Lineup\ Builder \
       --desktop-file=pickleball.desktop \
       --output appimage
   ```

3. **For users:**
   - Make the file executable: `chmod +x CPL_Lineup_Builder.AppImage`
   - Double-click to run OR run from terminal: `./CPL_Lineup_Builder.AppImage`

---

## Method 4: Cloud Deployment (Advanced)

### Deploy to Heroku (Free tier):

1. **Install Heroku CLI**
   - Download from https://devcenter.heroku.com/articles/heroku-cli

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   heroku create cpl-lineup-builder
   ```

4. **Add Procfile**
   ```bash
   echo "web: python app.py" > Procfile
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Share the link**
   - Your app is now at: `https://cpl-lineup-builder.herokuapp.com`
   - Anyone with the link can use it
   - No installation needed!

### Deploy to PythonAnywhere (Also Free):

1. Visit https://www.pythonanywhere.com
2. Create account and sign in
3. Upload the project files
4. Configure the web app
5. Share the link with your team

### Deploy to AWS, Google Cloud, or Azure:

See respective documentation for Flask app deployment.

**Note**: Requires some cloud knowledge. Cloud deployment is best for shared, always-available access.

---

## Recommended Distribution Method

| **Use Case** | **Method** | **Pros** | **Cons** |
|---|---|---|---|
| **Easy sharing with non-tech users** | Standalone Executable | No Python needed, just run | Larger file size, OS-specific |
| **For developers/tech-savvy team** | Git Clone | Easy updates, version control | Requires Git and Python |
| **Quick distribution** | ZIP File | Simple to share, works everywhere | Users need Python installed |
| **Always-online access** | Cloud Deployment | Accessible anywhere, no setup | Requires hosting, internet-only |
| **Mixed team** | Executables + ZIP | Flexibility for different users | Multiple distribution packages |

---

## Customizing for Distribution

### Add Team Logo/Icon:

Create a simple PNG image and convert to ICO (Windows) or ICNS (macOS):

**For Windows:**
```bash
pip install pillow
python3 -c "
from PIL import Image
img = Image.open('logo.png')
img.save('icon.ico')
"
```

**For macOS:**
```bash
sips -s format icns logo.png --out icon.icns
```

Then include in PyInstaller command:
```bash
pyinstaller --icon=icon.icns app.py  # macOS
pyinstaller --icon=icon.ico app.py   # Windows
```

---

## Support for Distributed Users

### Setup Documentation:
Include these files with your distribution:
- `README.md` - Full documentation
- `QUICK_START.md` - Quick setup guide
- `BUILD_EXECUTABLE.md` - How to build executables

### FAQ:

**Q: Port 5000 is already in use. What do I do?**
A: Edit `app.py`, find `port=5000`, change to `port=5001` and save.

**Q: I don't see my players in the dropdown**
A: Refresh your browser (Cmd+R or Ctrl+R)

**Q: The PDF export isn't working**
A: Ensure reportlab is installed. Run: `pip install reportlab`

**Q: The app keeps crashing**
A: Check browser console (F12 → Console) for error messages. Contact the developer.

---

## Updating the Application

### For Git Users:
```bash
git pull origin main
```

### For ZIP File Users:
- Download the latest version
- Extract to a new folder
- Run the latest version

### For Executable Users:
- Check for updates
- Download latest executable
- Replace old version

---

## Security Considerations

⚠️ **Important**: This application runs locally on `localhost:5000` and is only accessible on the same machine or local network.

### For Cloud Deployment:
- Add password protection
- Use HTTPS/SSL certificates
- Monitor access logs
- Regular security updates

### Sensitive Data:
- Lineups are stored in browser's local storage (not permanently saved)
- No player data is sent to external servers
- All data stays on user's machine

---

## Troubleshooting Distribution

### Issue: "Module not found" when running standalone
**Solution**: Ensure all dependencies are included with `--hidden-import`:
```bash
pyinstaller --hidden-import=flask --hidden-import=reportlab app.py
```

### Issue: Executable won't run on some computers
**Solution**: 
- Build on the target OS (Windows executable on Windows machine, etc.)
- Or use platform-specific Python versions

### Issue: Users report slow performance
**Solution**: 
- This is typically browser performance, not app issue
- Recommend Chrome or Firefox
- Clear browser cache

---

## Getting Help

For deployment questions or issues:
1. Check `README.md` and `QUICK_START.md`
2. Review troubleshooting section above
3. Contact the development team
4. Create an issue on GitHub

---

**Last Updated**: March 2, 2026
