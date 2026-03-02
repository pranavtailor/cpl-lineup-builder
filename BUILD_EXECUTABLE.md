# Building Standalone Executables

For easier distribution to non-technical users, you can create standalone executables that don't require Python to be installed.

## Option 1: Using PyInstaller (Recommended)

### Prerequisites
```bash
pip install pyinstaller
```

### macOS/Linux
```bash
# Make the build script executable
chmod +x build_executable.sh

# Run the build script
./build_executable.sh
```

The executable will be in the `dist/` folder.

### Windows
```bash
# Install PyInstaller
pip install pyinstaller

# Run PyInstaller directly
pyinstaller --onefile --name "CPL Lineup Builder" app.py
```

The executable will be in the `dist/` folder.

## Option 2: Using PyInstaller Manually

### Step 1: Install PyInstaller
```bash
pip install pyinstaller
```

### Step 2: Create the executable
**macOS/Linux:**
```bash
pyinstaller --onefile \
    --name "CPL Lineup Builder" \
    --add-data "templates:templates" \
    --add-data "static:static" \
    app.py
```

**Windows:**
```bash
pyinstaller --onefile ^
    --name "CPL Lineup Builder" ^
    --add-data "templates;templates" ^
    --add-data "static;static" ^
    app.py
```

### Step 3: Find your executable
- **macOS/Linux**: `dist/CPL Lineup Builder`
- **Windows**: `dist/CPL Lineup Builder.exe`

## Option 3: Using Nuitka (Faster, Smaller)

Nuitka compiles Python to C++, creating faster, smaller executables.

```bash
pip install nuitka

nuitka --onefile \
    --windows-company-name="CPL" \
    --windows-product-name="CPL Lineup Builder" \
    app.py
```

## Distributing the Executable

### macOS
1. Build the executable using the steps above
2. Create a `.dmg` file for distribution (optional):
   ```bash
   hdiutil create -volname "CPL Lineup Builder" \
       -srcfolder dist/ \
       -ov -format UDZO "CPL_Lineup_Builder.dmg"
   ```

### Windows
1. Build the executable
2. Zip the `dist/CPL Lineup Builder.exe` file
3. Share the zip file

### Linux
1. Build the executable
2. Create a AppImage (optional):
   ```bash
   pip install appimagetool
   appimagetool dist/CPL\ Lineup\ Builder CPL_Lineup_Builder.AppImage
   ```

## Troubleshooting

### "templates not found" or "static not found"
Make sure you include the `--add-data` flags when building.

### Executable is too large
- Use Nuitka instead of PyInstaller
- Use UPX compression:
  ```bash
  pip install upx
  pyinstaller --onefile --upx-dir=/path/to/upx app.py
  ```

### "Port 5000 is already in use"
Edit the port number in the built executable or modify `app.py` before building.

### macOS "not able to be opened because it is from an unidentified developer"
This is a security warning. Users can:
1. Right-click the executable
2. Click "Open"
3. Click "Open" again in the dialog

Or they can run:
```bash
xattr -d com.apple.quarantine "path/to/executable"
```

## For End Users

Once you've distributed the executable:

1. **macOS**: Double-click the executable to run
2. **Windows**: Double-click the `.exe` file
3. **Linux**: Double-click the executable or run `./CPL_Lineup_Builder` in terminal

The application will:
- Automatically open your default browser
- Start a local web server
- Be accessible at `http://localhost:5000`

To stop the application, close the window or the terminal.
