// DOM Elements
const promptsTextarea = document.getElementById('prompts');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const autoDownloadCheckbox = document.getElementById('autoDownload');
const delayInput = document.getElementById('delay');
const statusMessage = document.getElementById('statusMessage');
const statusDiv = document.getElementById('status');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

let isRunning = false;

// Load saved settings
chrome.storage.local.get(['prompts', 'autoDownload', 'delay'], (result) => {
  if (result.prompts) {
    promptsTextarea.value = result.prompts;
  }
  if (result.autoDownload !== undefined) {
    autoDownloadCheckbox.checked = result.autoDownload;
  }
  if (result.delay) {
    delayInput.value = result.delay;
  }
});

// Save settings on change
promptsTextarea.addEventListener('input', () => {
  chrome.storage.local.set({ prompts: promptsTextarea.value });
});

autoDownloadCheckbox.addEventListener('change', () => {
  chrome.storage.local.set({ autoDownload: autoDownloadCheckbox.checked });
});

delayInput.addEventListener('change', () => {
  chrome.storage.local.set({ delay: delayInput.value });
});

// Start button handler
startBtn.addEventListener('click', async () => {
  const prompts = promptsTextarea.value
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (prompts.length === 0) {
    updateStatus('Please enter at least one prompt', 'error');
    return;
  }

  // Check if we're on the Flow page
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab.url || !tab.url.includes('labs.google/fx/tools/flow')) {
    updateStatus('Please navigate to Google Flow first', 'warning');
    return;
  }

  isRunning = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  promptsTextarea.disabled = true;
  progressContainer.style.display = 'block';
  
  updateStatus('Starting bulk generation...', 'success');
  updateProgress(0, prompts.length);

  // Send message to content script to start processing
  try {
    await chrome.tabs.sendMessage(tab.id, {
      action: 'startBulkGeneration',
      prompts: prompts,
      autoDownload: autoDownloadCheckbox.checked,
      delay: parseInt(delayInput.value) * 1000
    });
  } catch (error) {
    updateStatus(`Error: ${error.message}`, 'error');
    resetUI();
  }
});

// Stop button handler
stopBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  try {
    await chrome.tabs.sendMessage(tab.id, {
      action: 'stopBulkGeneration'
    });
    updateStatus('Stopped by user', 'warning');
    resetUI();
  } catch (error) {
    console.error('Error stopping:', error);
    resetUI();
  }
});

// Listen for status updates from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateStatus') {
    updateStatus(message.message, message.type);
  } else if (message.action === 'updateProgress') {
    updateProgress(message.current, message.total);
  } else if (message.action === 'complete') {
    updateStatus(`✅ Completed! Generated ${message.total} images`, 'success');
    resetUI();
  } else if (message.action === 'error') {
    updateStatus(`❌ Error: ${message.message}`, 'error');
    resetUI();
  }
  
  sendResponse({ received: true });
  return true;
});

function updateStatus(message, type = '') {
  statusMessage.textContent = message;
  statusDiv.className = 'status';
  if (type) {
    statusDiv.classList.add(type);
  }
}

function updateProgress(current, total) {
  const percentage = (current / total) * 100;
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${current} / ${total}`;
}

function resetUI() {
  isRunning = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  promptsTextarea.disabled = false;
}
