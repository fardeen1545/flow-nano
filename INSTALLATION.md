# Installation Guide

## Prerequisites
- Google Chrome browser (version 88 or higher)
- Access to https://labs.google/fx/tools/flow

## Step-by-Step Installation

### Method 1: Install from Source (Recommended)

1. **Download the Extension**
   ```bash
   git clone https://github.com/fardeen1545/flow-nano.git
   cd flow-nano
   ```
   
   Or download and extract the ZIP file from GitHub.

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Type `chrome://extensions/` in the address bar and press Enter
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Look for the "Developer mode" toggle in the top-right corner
   - Click it to enable (it should turn blue/on)

4. **Load the Extension**
   - Click the "Load unpacked" button that appears
   - Navigate to the `flow-nano` folder you downloaded
   - Select the folder and click "Select Folder" (or "Open")

5. **Verify Installation**
   - You should see "Flow Nano - Bulk Image Downloader" in your extensions list
   - The extension icon should appear in your Chrome toolbar
   - If you don't see the icon, click the puzzle piece icon and pin Flow Nano

### Method 2: Load from ZIP (Alternative)

1. Download the repository as ZIP
2. Extract to a permanent location (don't extract to Downloads or Temp)
3. Follow steps 2-5 from Method 1

## First-Time Setup

After installation:

1. **Navigate to Google Flow**
   - Go to https://labs.google/fx/tools/flow
   
2. **Open the Extension**
   - Click the Flow Nano icon in your toolbar
   - The popup should appear

3. **Test with a Single Prompt**
   - Enter one prompt to test: "a beautiful sunset"
   - Click "Start Bulk Generation"
   - Wait for the image to generate and download

## Permissions Explained

The extension will request these permissions:

- **Read and change data on labs.google**: Required to interact with the Flow page
- **Manage downloads**: Required to save generated images
- **Storage**: To remember your settings and prompts

All data stays local on your device. No data is sent to external servers.

## Troubleshooting Installation

### Extension doesn't appear in toolbar
- Click the puzzle piece icon in Chrome toolbar
- Find "Flow Nano" and click the pin icon

### "Load unpacked" button is grayed out
- Make sure Developer mode is enabled (toggle in top-right)

### Extension shows errors
- Make sure all files are present in the folder
- Try refreshing the extension (click refresh icon on extension card)
- Check that you're using Chrome version 88 or higher

### Cannot find the folder to load
- Make sure you extracted the ZIP file
- Note the exact location where you saved the folder
- Don't load from inside a ZIP file - extract first

## Updating the Extension

To update to a newer version:

1. Download the new version
2. Extract to the same location (or a new one)
3. Go to `chrome://extensions/`
4. Find Flow Nano
5. Click the refresh icon
6. Or remove the old version and load the new one

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find "Flow Nano - Bulk Image Downloader"
3. Click "Remove"
4. Confirm removal
5. Optionally delete the extension folder from your computer

## Need Help?

If you encounter issues:
- Check the main README.md for usage instructions
- Open an issue on GitHub
- Make sure you're on the correct page (https://labs.google/fx/tools/flow)
