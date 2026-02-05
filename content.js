// Content script for Google Flow page interaction
let isProcessing = false;
let shouldStop = false;
let currentPromptIndex = 0;
let totalPrompts = 0;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startBulkGeneration') {
    startBulkGeneration(message.prompts, message.autoDownload, message.delay);
    sendResponse({ started: true });
  } else if (message.action === 'stopBulkGeneration') {
    shouldStop = true;
    sendResponse({ stopped: true });
  }
  return true;
});

async function startBulkGeneration(prompts, autoDownload, delay) {
  if (isProcessing) {
    sendStatusUpdate('Already processing...', 'warning');
    return;
  }

  isProcessing = true;
  shouldStop = false;
  currentPromptIndex = 0;
  totalPrompts = prompts.length;

  sendStatusUpdate(`Processing ${totalPrompts} prompts...`, 'success');

  for (let i = 0; i < prompts.length; i++) {
    if (shouldStop) {
      sendStatusUpdate('Stopped by user', 'warning');
      break;
    }

    currentPromptIndex = i + 1;
    const prompt = prompts[i];

    sendStatusUpdate(`Processing prompt ${currentPromptIndex}/${totalPrompts}: "${prompt}"`, 'success');
    sendProgressUpdate(currentPromptIndex - 1, totalPrompts);

    try {
      // Enter the prompt in the input field
      await enterPrompt(prompt);
      
      // Wait a moment for UI to update
      await sleep(500);
      
      // Click the generate button
      await clickGenerateButton();
      
      // Wait for image generation (delay specified by user)
      sendStatusUpdate(`Generating image ${currentPromptIndex}/${totalPrompts}...`, 'success');
      await sleep(delay);
      
      // Download the image if auto-download is enabled
      if (autoDownload) {
        await downloadGeneratedImage(prompt, currentPromptIndex);
      }
      
      // Small delay between prompts
      await sleep(1000);
      
    } catch (error) {
      console.error('Error processing prompt:', error);
      sendStatusUpdate(`Error with prompt "${prompt}": ${error.message}`, 'error');
      
      // Continue with next prompt despite error
      await sleep(2000);
    }
  }

  if (!shouldStop) {
    sendProgressUpdate(totalPrompts, totalPrompts);
    chrome.runtime.sendMessage({
      action: 'complete',
      total: totalPrompts
    });
  }

  isProcessing = false;
}

async function enterPrompt(prompt) {
  // Look for the prompt input field - adjust selectors based on actual Flow page structure
  const selectors = [
    'textarea[placeholder*="prompt" i]',
    'textarea[placeholder*="describe" i]',
    'input[type="text"][placeholder*="prompt" i]',
    'textarea',
    'input[type="text"]'
  ];

  let inputField = null;
  for (const selector of selectors) {
    inputField = document.querySelector(selector);
    if (inputField) break;
  }

  if (!inputField) {
    throw new Error('Could not find prompt input field. Make sure you are on the Flow page.');
  }

  // Clear existing text
  inputField.value = '';
  inputField.focus();

  // Trigger input events to simulate user typing
  inputField.value = prompt;
  inputField.dispatchEvent(new Event('input', { bubbles: true }));
  inputField.dispatchEvent(new Event('change', { bubbles: true }));
  
  // Also try setting the value using React's way if it's a React component
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    'value'
  ).set;
  nativeInputValueSetter.call(inputField, prompt);
  inputField.dispatchEvent(new Event('input', { bubbles: true }));
}

async function clickGenerateButton() {
  // Look for the generate/create button - adjust selectors based on actual Flow page structure
  const selectors = [
    'button[type="submit"]',
    'button[aria-label*="generate" i]',
    'button[aria-label*="create" i]'
  ];

  // First try standard selectors
  let generateButton = null;
  for (const selector of selectors) {
    generateButton = document.querySelector(selector);
    if (generateButton) break;
  }

  // If not found, try to find button by text content
  if (!generateButton) {
    const buttons = Array.from(document.querySelectorAll('button'));
    generateButton = buttons.find(btn => {
      const text = btn.textContent.toLowerCase();
      return text.includes('generate') || text.includes('create') || text.includes('submit');
    });
  }

  if (!generateButton) {
    throw new Error('Could not find generate button. The page structure may have changed.');
  }

  generateButton.click();
}

async function downloadGeneratedImage(prompt, index) {
  // Wait a bit for the image to be fully loaded
  await sleep(2000);

  // Look for generated image - adjust selectors based on actual Flow page structure
  const imageSelectors = [
    'img[alt*="generated" i]',
    'img[alt*="result" i]',
    'canvas',
    'img[src*="blob:"]',
    'img[src*="data:image"]'
  ];

  let imageElement = null;
  for (const selector of imageSelectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      // Get the last one (most recently generated)
      imageElement = elements[elements.length - 1];
      break;
    }
  }

  if (!imageElement) {
    // Try to find any visible image that might be the result
    const allImages = Array.from(document.querySelectorAll('img'));
    imageElement = allImages[allImages.length - 1];
  }

  if (!imageElement) {
    throw new Error('Could not find generated image to download');
  }

  // Download the image
  let imageUrl;
  
  if (imageElement.tagName === 'CANVAS') {
    // If it's a canvas, convert to blob
    imageUrl = imageElement.toDataURL('image/png');
  } else {
    imageUrl = imageElement.src;
  }

  // Send message to background script to download
  chrome.runtime.sendMessage({
    action: 'downloadImage',
    url: imageUrl,
    filename: generateFilename(prompt, index)
  });
}

function generateFilename(prompt, index) {
  // Create a safe filename from the prompt
  const safePrompt = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .substring(0, 50)
    .replace(/^_+|_+$/g, '');
  
  const timestamp = new Date().getTime();
  return `flow_${index}_${safePrompt}_${timestamp}.png`;
}

function sendStatusUpdate(message, type) {
  chrome.runtime.sendMessage({
    action: 'updateStatus',
    message: message,
    type: type
  });
}

function sendProgressUpdate(current, total) {
  chrome.runtime.sendMessage({
    action: 'updateProgress',
    current: current,
    total: total
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Notify that content script is loaded
console.log('Flow Nano content script loaded');
