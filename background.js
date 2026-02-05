// Background service worker for handling downloads

// Listen for download requests from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadImage') {
    downloadImage(message.url, message.filename)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error('Download error:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep the message channel open for async response
  }
});

async function downloadImage(url, filename) {
  try {
    // If it's a data URL or blob URL, download directly
    if (url.startsWith('data:') || url.startsWith('blob:')) {
      await chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: false
      });
    } else {
      // For regular URLs, we might need to fetch and convert to blob
      // This helps avoid CORS issues
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        await chrome.downloads.download({
          url: blobUrl,
          filename: filename,
          saveAs: false
        });
        
        // Clean up the blob URL after a delay
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      } catch (fetchError) {
        // If fetch fails, try direct download
        await chrome.downloads.download({
          url: url,
          filename: filename,
          saveAs: false
        });
      }
    }
    
    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Failed to download ${filename}:`, error);
    throw error;
  }
}

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Flow Nano extension installed');
});

console.log('Flow Nano background service worker loaded');
