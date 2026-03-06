#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ─── Theme Definitions ──────────────────────────────────────────────────────

const themes = {
  dracula: {
    bg: '#282a36', fg: '#f8f8f2', window: '#44475a',
    outerBg: '#1e1f29', gutter: '#6272a4',
    colors: {
      'hljs-keyword': '#ff79c6', 'hljs-built_in': '#8be9fd',
      'hljs-type': '#8be9fd', 'hljs-literal': '#bd93f9',
      'hljs-number': '#bd93f9', 'hljs-string': '#f1fa8c',
      'hljs-template-variable': '#f1fa8c', 'hljs-regexp': '#f1fa8c',
      'hljs-subst': '#f8f8f2', 'hljs-comment': '#6272a4',
      'hljs-doctag': '#6272a4', 'hljs-function': '#50fa7b',
      'hljs-title': '#50fa7b', 'hljs-title.function_': '#50fa7b',
      'hljs-params': '#f8f8f2', 'hljs-class': '#8be9fd',
      'hljs-symbol': '#ffb86c', 'hljs-attr': '#50fa7b',
      'hljs-attribute': '#50fa7b', 'hljs-meta': '#f8f8f2',
      'hljs-selector-tag': '#ff79c6', 'hljs-selector-class': '#50fa7b',
      'hljs-selector-id': '#8be9fd', 'hljs-variable': '#f8f8f2',
      'hljs-property': '#66d9ef', 'hljs-tag': '#ff79c6',
      'hljs-name': '#ff79c6', 'hljs-operator': '#ff79c6',
      'hljs-punctuation': '#f8f8f2',
    }
  },
  monokai: {
    bg: '#272822', fg: '#f8f8f2', window: '#3e3d32',
    outerBg: '#1e1e1e', gutter: '#75715e',
    colors: {
      'hljs-keyword': '#f92672', 'hljs-built_in': '#66d9ef',
      'hljs-type': '#66d9ef', 'hljs-literal': '#ae81ff',
      'hljs-number': '#ae81ff', 'hljs-string': '#e6db74',
      'hljs-template-variable': '#e6db74', 'hljs-regexp': '#e6db74',
      'hljs-subst': '#f8f8f2', 'hljs-comment': '#75715e',
      'hljs-doctag': '#75715e', 'hljs-function': '#a6e22e',
      'hljs-title': '#a6e22e', 'hljs-title.function_': '#a6e22e',
      'hljs-params': '#f8f8f2', 'hljs-class': '#66d9ef',
      'hljs-symbol': '#fd971f', 'hljs-attr': '#a6e22e',
      'hljs-attribute': '#a6e22e', 'hljs-meta': '#f8f8f2',
      'hljs-selector-tag': '#f92672', 'hljs-selector-class': '#a6e22e',
      'hljs-selector-id': '#66d9ef', 'hljs-variable': '#f8f8f2',
      'hljs-property': '#66d9ef', 'hljs-tag': '#f92672',
      'hljs-name': '#f92672', 'hljs-operator': '#f92672',
      'hljs-punctuation': '#f8f8f2',
    }
  },
  github: {
    bg: '#ffffff', fg: '#24292e', window: '#f6f8fa',
    outerBg: '#e8ecf0', gutter: '#959da5',
    colors: {
      'hljs-keyword': '#d73a49', 'hljs-built_in': '#005cc5',
      'hljs-type': '#005cc5', 'hljs-literal': '#005cc5',
      'hljs-number': '#005cc5', 'hljs-string': '#032f62',
      'hljs-template-variable': '#032f62', 'hljs-regexp': '#032f62',
      'hljs-subst': '#24292e', 'hljs-comment': '#6a737d',
      'hljs-doctag': '#6a737d', 'hljs-function': '#6f42c1',
      'hljs-title': '#6f42c1', 'hljs-title.function_': '#6f42c1',
      'hljs-params': '#24292e', 'hljs-class': '#005cc5',
      'hljs-symbol': '#e36209', 'hljs-attr': '#005cc5',
      'hljs-attribute': '#005cc5', 'hljs-meta': '#24292e',
      'hljs-selector-tag': '#22863a', 'hljs-selector-class': '#6f42c1',
      'hljs-selector-id': '#005cc5', 'hljs-variable': '#e36209',
      'hljs-property': '#005cc5', 'hljs-tag': '#22863a',
      'hljs-name': '#22863a', 'hljs-operator': '#d73a49',
      'hljs-punctuation': '#24292e',
    }
  },
  nord: {
    bg: '#2e3440', fg: '#d8dee9', window: '#3b4252',
    outerBg: '#242933', gutter: '#4c566a',
    colors: {
      'hljs-keyword': '#81a1c1', 'hljs-built_in': '#88c0d0',
      'hljs-type': '#8fbcbb', 'hljs-literal': '#81a1c1',
      'hljs-number': '#b48ead', 'hljs-string': '#a3be8c',
      'hljs-template-variable': '#a3be8c', 'hljs-regexp': '#ebcb8b',
      'hljs-subst': '#d8dee9', 'hljs-comment': '#616e88',
      'hljs-doctag': '#616e88', 'hljs-function': '#88c0d0',
      'hljs-title': '#88c0d0', 'hljs-title.function_': '#88c0d0',
      'hljs-params': '#d8dee9', 'hljs-class': '#8fbcbb',
      'hljs-symbol': '#d08770', 'hljs-attr': '#8fbcbb',
      'hljs-attribute': '#8fbcbb', 'hljs-meta': '#5e81ac',
      'hljs-selector-tag': '#81a1c1', 'hljs-selector-class': '#8fbcbb',
      'hljs-selector-id': '#88c0d0', 'hljs-variable': '#d8dee9',
      'hljs-property': '#88c0d0', 'hljs-tag': '#81a1c1',
      'hljs-name': '#81a1c1', 'hljs-operator': '#81a1c1',
      'hljs-punctuation': '#eceff4',
    }
  },
  'one-dark': {
    bg: '#282c34', fg: '#abb2bf', window: '#21252b',
    outerBg: '#1e2127', gutter: '#495162',
    colors: {
      'hljs-keyword': '#c678dd', 'hljs-built_in': '#e5c07b',
      'hljs-type': '#e5c07b', 'hljs-literal': '#d19a66',
      'hljs-number': '#d19a66', 'hljs-string': '#98c379',
      'hljs-template-variable': '#98c379', 'hljs-regexp': '#56b6c2',
      'hljs-subst': '#abb2bf', 'hljs-comment': '#5c6370',
      'hljs-doctag': '#5c6370', 'hljs-function': '#61afef',
      'hljs-title': '#61afef', 'hljs-title.function_': '#61afef',
      'hljs-params': '#abb2bf', 'hljs-class': '#e5c07b',
      'hljs-symbol': '#d19a66', 'hljs-attr': '#d19a66',
      'hljs-attribute': '#d19a66', 'hljs-meta': '#abb2bf',
      'hljs-selector-tag': '#e06c75', 'hljs-selector-class': '#e5c07b',
      'hljs-selector-id': '#61afef', 'hljs-variable': '#e06c75',
      'hljs-property': '#61afef', 'hljs-tag': '#e06c75',
      'hljs-name': '#e06c75', 'hljs-operator': '#56b6c2',
      'hljs-punctuation': '#abb2bf',
    }
  },
  'solarized-dark': {
    bg: '#002b36', fg: '#839496', window: '#073642',
    outerBg: '#001e27', gutter: '#586e75',
    colors: {
      'hljs-keyword': '#859900', 'hljs-built_in': '#268bd2',
      'hljs-type': '#b58900', 'hljs-literal': '#2aa198',
      'hljs-number': '#d33682', 'hljs-string': '#2aa198',
      'hljs-template-variable': '#2aa198', 'hljs-regexp': '#dc322f',
      'hljs-subst': '#839496', 'hljs-comment': '#586e75',
      'hljs-doctag': '#586e75', 'hljs-function': '#268bd2',
      'hljs-title': '#268bd2', 'hljs-title.function_': '#268bd2',
      'hljs-params': '#839496', 'hljs-class': '#b58900',
      'hljs-symbol': '#cb4b16', 'hljs-attr': '#b58900',
      'hljs-attribute': '#b58900', 'hljs-meta': '#839496',
      'hljs-selector-tag': '#859900', 'hljs-selector-class': '#268bd2',
      'hljs-selector-id': '#268bd2', 'hljs-variable': '#b58900',
      'hljs-property': '#268bd2', 'hljs-tag': '#859900',
      'hljs-name': '#268bd2', 'hljs-operator': '#859900',
      'hljs-punctuation': '#93a1a1',
    }
  }
};

// ─── Utilities ───────────────────────────────────────────────────────────────

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
}

/**
 * Stack-based parser that correctly handles nested <span> tags from
 * highlight.js output and tracks class context across newlines.
 * Returns an array of lines, each line being an array of { text, className } tokens.
 */
function parseHighlightedCode(html) {
  const lines = [[]];
  const classStack = [];
  let i = 0;
  let textBuf = '';

  function flushText() {
    if (!textBuf) return;
    const parts = textBuf.split('\n');
    for (let p = 0; p < parts.length; p++) {
      if (p > 0) lines.push([]);
      if (parts[p]) {
        lines[lines.length - 1].push({
          text: decodeHtmlEntities(parts[p]),
          className: classStack.length > 0 ? classStack[classStack.length - 1] : null,
        });
      }
    }
    textBuf = '';
  }

  while (i < html.length) {
    if (html[i] === '<') {
      flushText();
      const tagEnd = html.indexOf('>', i);
      if (tagEnd === -1) break;
      const tag = html.substring(i, tagEnd + 1);
      if (tag.startsWith('</')) {
        classStack.pop();
      } else {
        const classMatch = tag.match(/class="([^"]*)"/);
        classStack.push(classMatch ? classMatch[1] : null);
      }
      i = tagEnd + 1;
    } else {
      textBuf += html[i];
      i++;
    }
  }
  flushText();
  return lines;
}

function resolveColor(className, themeColors, fallback) {
  if (!className) return fallback;
  if (themeColors[className]) return themeColors[className];
  // Handle multi-class like "hljs-title function_" → try "hljs-title.function_" then "hljs-title"
  const parts = className.split(/\s+/);
  if (parts.length > 1) {
    const dotted = parts.join('.');
    if (themeColors[dotted]) return themeColors[dotted];
  }
  if (themeColors[parts[0]]) return themeColors[parts[0]];
  return fallback;
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─── Core Image Generation ──────────────────────────────────────────────────

function generateImage(options) {
  const { createCanvas } = require('canvas');
  const hljs = require('highlight.js');

  const {
    code,
    language = 'javascript',
    theme = 'dracula',
    fileName = '',
    showLineNumbers = true,
    scale = 2,
    tabSize = 2,
  } = options;

  const selectedTheme = themes[theme];
  if (!selectedTheme) {
    throw new Error(`Invalid theme "${theme}". Available: ${Object.keys(themes).join(', ')}`);
  }

  // Normalize tabs and prepare lines
  const normalizedCode = code.replace(/\t/g, ' '.repeat(tabSize));
  const lines = normalizedCode.split('\n');
  if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();

  // ── Layout constants (all scaled) ──
  const s = (v) => v * scale;
  const fontSize     = s(14);
  const lineHeight   = s(22);
  const codePadding  = s(24);
  const headerHeight = s(40);
  const outerPadding = s(40);
  const cornerRadius = s(10);
  const fontFamily   = '"SF Mono", "Fira Code", "Cascadia Code", "JetBrains Mono", "Consolas", "Monaco", monospace';
  const uiFont       = '"SF Pro", "Inter", "Segoe UI", system-ui, sans-serif';

  // ── Measure text ──
  const tmp = createCanvas(1, 1);
  const tctx = tmp.getContext('2d');
  tctx.font = `${fontSize}px ${fontFamily}`;

  const gutterText = String(lines.length).padStart(3, ' ');
  const lineNumWidth = showLineNumbers ? tctx.measureText(gutterText).width + codePadding : 0;

  const maxLineWidth = Math.max(...lines.map(l => tctx.measureText(l).width), s(200));
  const windowWidth  = Math.min(Math.max(maxLineWidth + codePadding * 2 + lineNumWidth, s(500)), s(1200));
  const windowHeight = lines.length * lineHeight + codePadding * 2 + headerHeight;
  const canvasWidth  = windowWidth + outerPadding * 2;
  const canvasHeight = windowHeight + outerPadding * 2;

  // ── Create canvas ──
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Outer background
  ctx.fillStyle = selectedTheme.outerBg;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Window shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = s(30);
  ctx.shadowOffsetY = s(8);
  ctx.fillStyle = selectedTheme.bg;
  roundedRect(ctx, outerPadding, outerPadding, windowWidth, windowHeight, cornerRadius);
  ctx.fill();
  ctx.restore();

  // Clip to rounded window
  ctx.save();
  roundedRect(ctx, outerPadding, outerPadding, windowWidth, windowHeight, cornerRadius);
  ctx.clip();

  // Window background
  ctx.fillStyle = selectedTheme.bg;
  ctx.fillRect(outerPadding, outerPadding, windowWidth, windowHeight);

  // Header bar
  ctx.fillStyle = selectedTheme.window;
  ctx.fillRect(outerPadding, outerPadding, windowWidth, headerHeight);

  // Traffic-light controls
  const ctrlY = outerPadding + headerHeight / 2;
  const ctrlR = s(6);
  const ctrlStart = outerPadding + s(16);
  const ctrlGap = s(20);
  [
    { color: '#ff5f56', x: ctrlStart },
    { color: '#ffbd2e', x: ctrlStart + ctrlGap },
    { color: '#27c93f', x: ctrlStart + ctrlGap * 2 },
  ].forEach(({ color, x }) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, ctrlY, ctrlR, 0, Math.PI * 2);
    ctx.fill();
  });

  // Filename in header
  if (fileName) {
    ctx.fillStyle = selectedTheme.fg + 'aa';
    ctx.font = `${s(12)}px ${uiFont}`;
    ctx.textAlign = 'center';
    ctx.fillText(fileName, outerPadding + windowWidth / 2, ctrlY + s(4));
    ctx.textAlign = 'left';
  }

  // ── Syntax highlighting ──
  let highlighted;
  try {
    highlighted = hljs.highlight(normalizedCode, { language });
  } catch {
    highlighted = hljs.highlightAuto(normalizedCode);
  }

  const parsedLines = parseHighlightedCode(highlighted.value);
  ctx.font = `${fontSize}px ${fontFamily}`;

  const codeX = outerPadding + codePadding + lineNumWidth;
  const codeY = outerPadding + headerHeight + codePadding;

  lines.forEach((line, i) => {
    const y = codeY + i * lineHeight + fontSize;

    // Line number
    if (showLineNumbers) {
      ctx.fillStyle = selectedTheme.gutter;
      ctx.textAlign = 'right';
      ctx.fillText(String(i + 1), outerPadding + codePadding + lineNumWidth - codePadding * 0.6, y);
      ctx.textAlign = 'left';
    }

    // Render highlighted tokens
    const tokens = parsedLines[i];
    if (tokens && tokens.length > 0) {
      let x = codeX;
      for (const token of tokens) {
        ctx.fillStyle = resolveColor(token.className, selectedTheme.colors, selectedTheme.fg);
        ctx.fillText(token.text, x, y);
        x += ctx.measureText(token.text).width;
      }
    } else {
      ctx.fillStyle = selectedTheme.fg;
      ctx.fillText(line, codeX, y);
    }
  });

  ctx.restore();
  return canvas.toBuffer('image/png');
}

// ─── CLI ────────────────────────────────────────────────────────────────────

function run() {
  const chalk = require('chalk');
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(chalk.cyan('\ncode-to-image\n'));
    console.log('Transform your code into beautiful shareable images!\n');
    console.log(chalk.yellow('Usage:'));
    console.log('  npx code-to-image <file> [options]\n');
    console.log(chalk.yellow('Options:'));
    console.log('  --theme <name>      Theme (default: dracula)');
    console.log('                      dracula, monokai, github, nord, one-dark, solarized-dark');
    console.log('  --output <file>     Output filename (default: code-screenshot.png)');
    console.log('  --lang <name>       Force language for syntax highlighting');
    console.log('  --scale <number>    Resolution scale: 1, 2, or 3 (default: 2)');
    console.log('  --no-line-numbers   Hide line numbers');
    console.log('  --tab-size <n>      Tab width in spaces (default: 2)');
    console.log('  --help, -h          Show this help message');
    console.log('  --version, -v       Show version\n');
    console.log(chalk.yellow('Examples:'));
    console.log('  npx code-to-image app.js');
    console.log('  npx code-to-image code.py --theme monokai');
    console.log('  npx code-to-image index.ts --output my-code.png');
    console.log('  npx code-to-image main.go --scale 3 --no-line-numbers\n');
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    const pkg = require('./package.json');
    console.log(chalk.cyan(`v${pkg.version}`));
    process.exit(0);
  }

  // Parse arguments
  const getArg = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
  };

  const filePath        = args.find(a => !a.startsWith('-'));
  const theme           = getArg('--theme') || 'dracula';
  const output          = getArg('--output') || 'code-screenshot.png';
  const lang            = getArg('--lang');
  const scale           = Number(getArg('--scale')) || 2;
  const showLineNumbers = !args.includes('--no-line-numbers');
  const tabSize         = Number(getArg('--tab-size')) || 2;

  if (!filePath) {
    console.error(chalk.red('Error: Please provide a file path'));
    console.log(chalk.cyan('\nUsage: npx code-to-image <file> [options]\n'));
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`Error: File not found: ${filePath}`));
    process.exit(1);
  }

  if (!themes[theme]) {
    console.error(chalk.red(`Error: Invalid theme "${theme}"`));
    console.log(chalk.cyan(`Available themes: ${Object.keys(themes).join(', ')}\n`));
    process.exit(1);
  }

  if (scale < 1 || scale > 3) {
    console.error(chalk.red('Error: Scale must be 1, 2, or 3'));
    process.exit(1);
  }

  const code     = fs.readFileSync(filePath, 'utf-8');
  const ext      = path.extname(filePath).slice(1);
  const language = lang || ext || 'javascript';

  console.log(chalk.cyan('Generating code screenshot...\n'));

  const buffer = generateImage({
    code,
    language,
    theme,
    fileName: path.basename(filePath),
    showLineNumbers,
    scale,
    tabSize,
  });

  fs.writeFileSync(output, buffer);

  const sizeKb = (buffer.length / 1024).toFixed(1);
  console.log(chalk.green('Screenshot saved: ') + chalk.bold(output));
  console.log(chalk.dim(`   Theme: ${theme} | Scale: ${scale}x | Size: ${sizeKb} KB`));
  console.log(chalk.dim(`   Language: ${language} | Line numbers: ${showLineNumbers ? 'on' : 'off'}\n`));
}

// ─── Entry Point ────────────────────────────────────────────────────────────

module.exports = { generateImage, themes };

if (require.main === module) {
  try {
    run();
  } catch (error) {
    try {
      const chalk = require('chalk');
      console.error(chalk.red('\nError: ') + error.message);
      if (error.code === 'MODULE_NOT_FOUND') {
        console.log(chalk.yellow('\nTip: Install dependencies first:'));
        console.log(chalk.cyan('   npm install -g code-to-image\n'));
      }
    } catch {
      console.error('\nError:', error.message);
    }
    process.exit(1);
  }
}
