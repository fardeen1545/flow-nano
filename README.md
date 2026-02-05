# Flow Nano - Bulk Image Downloader for Google Flow

A Chrome extension that enables bulk image generation and downloading from [Google Flow](https://labs.google/fx/tools/flow). Generate multiple images from a list of prompts and automatically download them all.

## Features

🚀 **Bulk Generation** - Process multiple prompts in one go  
📥 **Auto Download** - Automatically save generated images  
⚡ **Customizable Delays** - Adjust wait times between generations  
💾 **Save Settings** - Your preferences are remembered  
📊 **Progress Tracking** - Visual progress bar and status updates  
🎨 **Beautiful UI** - Modern, gradient-styled interface

## Installation

### From Source (Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/fardeen1545/flow-nano.git
   cd flow-nano
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" using the toggle in the top right corner

4. Click "Load unpacked" and select the `flow-nano` directory

5. The Flow Nano extension should now appear in your extensions list

## Usage

### Step 1: Navigate to Google Flow
Visit [Google Flow](https://labs.google/fx/tools/flow) in your Chrome browser.

### Step 2: Open the Extension
Click the Flow Nano icon in your Chrome toolbar to open the popup.

### Step 3: Enter Your Prompts
Type or paste your image prompts in the text area, one per line. For example:
```
a sunset over mountains
a futuristic city at night
a cat wearing a wizard hat
an underwater castle
```

### Step 4: Configure Options (Optional)
- **Auto-download**: Toggle to automatically download generated images (enabled by default)
- **Download delay**: Set the wait time (in seconds) between generations (default: 5 seconds)

### Step 5: Start Bulk Generation
Click the "🚀 Start Bulk Generation" button. The extension will:
1. Enter each prompt into Google Flow
2. Click the generate button
3. Wait for the image to be created
4. Download the image (if auto-download is enabled)
5. Move to the next prompt

You can monitor progress through the status messages and progress bar.

### Step 6: Stop if Needed
Click the "⏹️ Stop" button at any time to halt the process.

## Configuration

- **Auto-download generated images**: Enable or disable automatic downloading
- **Download delay (seconds)**: Time to wait for image generation (1-30 seconds, default: 5)
  - Increase if images aren't fully generated
  - Decrease for faster processing if generation is quick

## File Naming

Downloaded images are saved with descriptive filenames in the format:
```
flow_{index}_{prompt_snippet}_{timestamp}.png
```

Example: `flow_1_sunset_over_mountains_1738748123456.png`

## Permissions

This extension requires the following permissions:
- **activeTab**: To interact with the Google Flow page
- **downloads**: To save generated images
- **scripting**: To inject content scripts
- **storage**: To save your settings
- **host_permissions (labs.google/*)**: To access Google Flow

## Troubleshooting

### "Please navigate to Google Flow first"
Make sure you're on the https://labs.google/fx/tools/flow page before starting.

### Images aren't downloading
- Ensure "Auto-download" is enabled
- Check your browser's download settings
- Try increasing the delay to allow more time for generation

### "Could not find prompt input field"
The Google Flow page structure may have changed. Please report this issue.

### Extension not working
1. Refresh the Google Flow page
2. Reload the extension from `chrome://extensions/`
3. Check the browser console for errors (F12)

## Development

### Project Structure
```
flow-nano/
├── manifest.json       # Extension configuration
├── popup.html          # Popup interface
├── popup.css           # Popup styles
├── popup.js            # Popup logic
├── content.js          # Content script for Flow page
├── background.js       # Background service worker
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

### Key Components

**manifest.json**: Chrome extension configuration with permissions and scripts

**popup.html/css/js**: User interface for entering prompts and controlling the extension

**content.js**: Injected into Google Flow page to interact with the UI
- Finds and fills the prompt input field
- Clicks the generate button
- Locates and downloads generated images

**background.js**: Service worker handling downloads

### Making Changes

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Flow Nano extension
4. Test your changes

## Privacy

This extension:
- ✅ Only runs on Google Flow pages
- ✅ Stores settings locally in your browser
- ✅ Does not collect or transmit any data
- ✅ Does not require account login
- ✅ Open source - you can review all code

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use and modify as needed.

## Support

If you encounter any issues or have suggestions:
1. Check the Troubleshooting section above
2. Open an issue on GitHub
3. Provide details about your browser version and the specific problem

## Disclaimer

This is an unofficial tool and is not affiliated with Google. Use responsibly and respect Google's terms of service.

---

Made with ❤️ for the creative community