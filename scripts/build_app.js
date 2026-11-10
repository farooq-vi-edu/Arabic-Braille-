// scripts/build_app.js
const fs = require('fs');
const path = require('path');
const babel = require('./vendor/babel.min.js');

const sourceFile = path.resolve(__dirname, '../src/UrduBrailleApp.jsx');
const outputFile = path.resolve(__dirname, '../app/src/main/assets/arabic_braille/app.bundle.js');

console.log('Reading source file:', sourceFile);
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

console.log('Transpiling with Babel...');
try {
  const result = babel.transform(sourceCode, {
    presets: ['react']
  });

  // Wrap in immediate execution and error handling
  const bundleCode = `
/** Urdu Braille Master App Bundle - Precompiled */
(function() {
  try {
    ${result.code}
    console.log('[UrduBraille] App initialized successfully.');
  } catch (err) {
    console.error('[UrduBraille] Initialization error:', err);
    var root = document.getElementById('root');
    if (root) {
      root.innerHTML = '<div style="padding: 20px; color: #f87171; font-family: sans-serif; text-align: center;"><h2>ایپ لوڈ کرنے میں دشواری پیش آئی</h2><p>' + (err && err.message ? err.message : err) + '</p><button onclick="window.location.reload()" style="padding: 10px 20px; background: #fbbf24; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">دوبارہ کوشش کریں</button></div>';
    }
  }
})();
`;

  fs.writeFileSync(outputFile, bundleCode, 'utf8');
  console.log('Successfully written app.bundle.js! Length:', bundleCode.length);
} catch (err) {
  console.error('Build failed with error:', err);
  process.exit(1);
}
