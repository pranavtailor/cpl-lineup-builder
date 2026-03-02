#!/bin/bash
# Build standalone executables for the CPL Pickleball Lineup Builder

echo "Building standalone executable..."
echo ""

# Check if PyInstaller is installed
if ! command -v pyinstaller &> /dev/null; then
    echo "Installing PyInstaller..."
    pip install -q pyinstaller
fi

# Create a temporary directory for building
mkdir -p build_temp

# Create a standalone version of the app
cat > build_temp/app_standalone.py << 'EOF'
import sys
import os
import webbrowser
import threading
import time

# Add the app directory to path
app_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, app_dir)

from app import app

def open_browser():
    """Open the browser after a short delay"""
    time.sleep(2)
    webbrowser.open('http://localhost:5000')

if __name__ == '__main__':
    # Start browser in background thread
    browser_thread = threading.Thread(target=open_browser, daemon=True)
    browser_thread.start()
    
    print("🎾 CPL Pickleball Lineup Builder")
    print("Starting server... Open http://localhost:5000 in your browser")
    print("Press Ctrl+C to stop")
    print("")
    
    # Run the Flask app
    app.run(debug=False, port=5000, use_reloader=False)
EOF

# Build the executable
echo "Building for macOS/Linux..."
pyinstaller --onefile \
    --windowed \
    --icon=build_temp/icon.icns 2>/dev/null || \
pyinstaller --onefile \
    --name "CPL Lineup Builder" \
    build_temp/app_standalone.py

echo ""
echo "✓ Executable built!"
echo "Location: dist/app_standalone (or similar)"
echo ""
echo "Clean up build files? (y/n)"
read -r response
if [ "$response" = "y" ]; then
    rm -rf build build_temp
fi
