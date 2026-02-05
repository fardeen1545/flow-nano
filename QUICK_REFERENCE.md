# Quick Reference Card

## 🚀 Quick Start (30 seconds)
1. Load extension in Chrome → `chrome://extensions/` → Developer mode → Load unpacked
2. Go to https://labs.google/fx/tools/flow
3. Click Flow Nano icon → Enter prompts → Start!

## 📝 Prompt Format
```
a beautiful sunset over mountains
a futuristic city at night
a cat wearing glasses
```
**One prompt per line**

## ⚙️ Default Settings
- Auto-download: ✅ Enabled
- Delay: 5 seconds
- Save location: Downloads folder

## 🔥 Pro Tips
- **Increase delay** if images aren't fully generated
- **Decrease delay** for faster processing (if generation is quick)
- **Use descriptive prompts** for better filenames
- **Test with 1-2 prompts** before running large batches

## 📥 Downloaded Files
Format: `flow_{number}_{prompt-snippet}_{timestamp}.png`
Example: `flow_1_beautiful_sunset_1738748123456.png`

## ⌨️ Keyboard Shortcuts
- None yet (coming in future version)

## 🛑 How to Stop
- Click the "Stop" button in the extension popup
- Or close the extension popup (process continues in background)
- Or refresh the Flow page (hard stop)

## ❗ Troubleshooting (Common Issues)

| Problem | Solution |
|---------|----------|
| "Navigate to Google Flow first" | Go to https://labs.google/fx/tools/flow |
| Images not downloading | Enable auto-download, check Chrome download settings |
| Can't find input field | Page structure changed, report issue |
| Extension not in toolbar | Click puzzle icon, pin Flow Nano |
| Generation seems stuck | Increase delay time |

## 📊 Status Messages

| Message | Meaning |
|---------|---------|
| "Ready to start" | Extension initialized |
| "Processing prompt N/M" | Currently working on prompt N out of M total |
| "Generating image..." | Waiting for image to be created |
| "Completed!" | All images generated and downloaded |
| "Stopped by user" | You clicked Stop |
| "Error: ..." | Something went wrong (check message) |

## 🔐 Privacy & Security
- ✅ All data stored locally
- ✅ No telemetry or tracking
- ✅ No external servers
- ✅ No account required
- ✅ Open source code

## 📦 File Locations
- Extension: Where you extracted it
- Downloads: Default Chrome downloads folder
- Settings: chrome.storage.local (in your browser)

## 🆘 Need Help?
1. Read full README.md
2. Check INSTALLATION.md
3. Review ARCHITECTURE.md
4. Open GitHub issue

## 🔗 Quick Links
- Repository: https://github.com/fardeen1545/flow-nano
- Google Flow: https://labs.google/fx/tools/flow
- Extensions page: chrome://extensions/

## 📄 Files in This Extension
```
Essential:
  manifest.json    - Extension config
  popup.html       - User interface  
  popup.js         - UI logic
  content.js       - Page interaction
  background.js    - Download handler
  icons/           - Extension icons

Documentation:
  README.md        - Full guide
  INSTALLATION.md  - Setup instructions
  ARCHITECTURE.md  - Technical details
  SUMMARY.md       - Implementation overview
  
Development:
  test-extension.js - Validation tests
  preview.html      - Visual preview
```

## 🎯 Best Practices
1. **Start small**: Test with 2-3 prompts first
2. **Be specific**: Detailed prompts = better results
3. **Respect limits**: Don't overwhelm the service
4. **Check quality**: Review first few images before batch processing
5. **Organize**: Create folders for different prompt batches

## ⏱️ Typical Processing Times
- 1 prompt: ~5-10 seconds
- 10 prompts: ~1-2 minutes
- 50 prompts: ~5-10 minutes
- 100 prompts: ~10-20 minutes

*Times vary based on generation speed and your delay setting*

## 🎨 Filename Tips
- Prompts are automatically converted to safe filenames
- Max 50 characters from prompt used
- Special characters replaced with underscores
- Timestamp prevents duplicates

Example transformations:
- "A beautiful sunset!" → "a_beautiful_sunset"
- "Cat wearing a hat 🎩" → "cat_wearing_a_hat"

## 💡 Feature Requests?
Open an issue on GitHub with:
- Clear description of feature
- Use case / why you need it
- Example of how it would work

---

**Version**: 1.0.0 | **License**: MIT | **Made with** ❤️
