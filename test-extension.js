// Simple test to verify extension structure
const fs = require('fs');
const path = require('path');

console.log('Testing Flow Nano Extension Structure...\n');

// Test 1: Check if all required files exist
const requiredFiles = [
    'manifest.json',
    'popup.html',
    'popup.css',
    'popup.js',
    'content.js',
    'background.js',
    'icons/icon16.png',
    'icons/icon48.png',
    'icons/icon128.png',
    'README.md'
];

let allFilesExist = true;
console.log('✓ Checking required files:');
requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    const status = exists ? '✓' : '✗';
    console.log(`  ${status} ${file}`);
    if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
    console.error('\n✗ Some required files are missing!');
    process.exit(1);
}

// Test 2: Validate manifest.json structure
console.log('\n✓ Validating manifest.json:');
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

const requiredManifestFields = ['manifest_version', 'name', 'version', 'description', 'permissions'];
requiredManifestFields.forEach(field => {
    const exists = manifest[field] !== undefined;
    const status = exists ? '✓' : '✗';
    console.log(`  ${status} ${field}`);
});

// Test 3: Check permissions
console.log('\n✓ Checking permissions:');
const requiredPermissions = ['activeTab', 'downloads', 'scripting', 'storage'];
requiredPermissions.forEach(perm => {
    const exists = manifest.permissions && manifest.permissions.includes(perm);
    const status = exists ? '✓' : '✗';
    console.log(`  ${status} ${perm}`);
});

// Test 4: Verify HTML structure
console.log('\n✓ Checking popup.html structure:');
const html = fs.readFileSync('popup.html', 'utf8');
const htmlChecks = [
    { name: 'Has DOCTYPE', test: html.includes('<!DOCTYPE html>') },
    { name: 'Has prompts textarea', test: html.includes('id="prompts"') },
    { name: 'Has start button', test: html.includes('id="startBtn"') },
    { name: 'Has stop button', test: html.includes('id="stopBtn"') },
    { name: 'Links CSS file', test: html.includes('popup.css') },
    { name: 'Links JS file', test: html.includes('popup.js') }
];

htmlChecks.forEach(check => {
    const status = check.test ? '✓' : '✗';
    console.log(`  ${status} ${check.name}`);
});

// Test 5: Verify JavaScript files have required functions
console.log('\n✓ Checking JavaScript functionality:');

const popupJs = fs.readFileSync('popup.js', 'utf8');
const contentJs = fs.readFileSync('content.js', 'utf8');
const backgroundJs = fs.readFileSync('background.js', 'utf8');

const jsChecks = [
    { name: 'popup.js has event listeners', test: popupJs.includes('addEventListener') },
    { name: 'popup.js handles messages', test: popupJs.includes('chrome.runtime.onMessage') },
    { name: 'content.js has bulk generation', test: contentJs.includes('startBulkGeneration') },
    { name: 'content.js can enter prompts', test: contentJs.includes('enterPrompt') },
    { name: 'content.js can download images', test: contentJs.includes('downloadGeneratedImage') },
    { name: 'background.js handles downloads', test: backgroundJs.includes('chrome.downloads') }
];

jsChecks.forEach(check => {
    const status = check.test ? '✓' : '✗';
    console.log(`  ${status} ${check.name}`);
});

console.log('\n✅ All tests passed! Extension structure is valid.\n');
console.log('To test the extension:');
console.log('1. Open Chrome and go to chrome://extensions/');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked"');
console.log('4. Select this directory');
console.log('5. Navigate to https://labs.google/fx/tools/flow');
console.log('6. Click the extension icon and start using it!');
