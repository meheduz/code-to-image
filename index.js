#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

try {
  const { createCanvas } = require('canvas');
  const hljs = require('highlight.js');
  const chalk = require('chalk');

  const themes = {
    dracula: { bg: '#282a36', fg: '#f8f8f2', accent: '#bd93f9', window: '#44475a' },
    monokai: { bg: '#272822', fg: '#f8f8f2', accent: '#66d9ef', window: '#3e3d32' },
    github: { bg: '#ffffff', fg: '#24292e', accent: '#0366d6', window: '#f6f8fa' },
    nord: { bg: '#2e3440', fg: '#d8dee9', accent: '#88c0d0', window: '#3b4252' }
  };

  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(chalk.cyan('\n📸 code-to-image\n'));
    console.log('Transform your code into beautiful shareable images!\n');
    console.log(chalk.yellow('Usage:'));
    console.log('  npx code-to-image <file> [options]\n');
    console.log(chalk.yellow('Options:'));
    console.log('  --theme <name>    Theme: dracula, monokai, github, nord (default: dracula)');
    console.log('  --output <file>   Output filename (default: code-screenshot.png)');
    console.log('  --lang <name>     Force language for syntax highlighting');
    console.log('  --help, -h        Show this help message');
    console.log('  --version, -v     Show version\n');
    console.log(chalk.yellow('Examples:'));
    console.log('  npx code-to-image app.js');
    console.log('  npx code-to-image code.py --theme monokai');
    console.log('  npx code-to-image index.ts --output my-code.png\n');
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    const pkg = require('./package.json');
    console.log(chalk.cyan(`v${pkg.version}`));
    process.exit(0);
  }

  const filePath = args[0];
  const theme = args.includes('--theme') ? args[args.indexOf('--theme') + 1] : 'dracula';
  const output = args.includes('--output') ? args[args.indexOf('--output') + 1] : 'code-screenshot.png';
  const lang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null;

  if (!filePath) {
    console.log(chalk.red('❌ Error: Please provide a file path'));
    console.log(chalk.cyan('\nUsage: npx code-to-image <file> [--theme dracula] [--output screenshot.png]\n'));
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`❌ Error: File not found: ${filePath}`));
    process.exit(1);
  }

  if (!themes[theme]) {
    console.log(chalk.red(`❌ Error: Invalid theme "${theme}"`));
    console.log(chalk.cyan('Available themes: dracula, monokai, github, nord\n'));
    process.exit(1);
  }

  const code = fs.readFileSync(filePath, 'utf-8');
  const selectedTheme = themes[theme];
  const ext = path.extname(filePath).slice(1);
  const language = lang || ext || 'javascript';

  console.log(chalk.cyan('📸 Generating code screenshot...\n'));

  // Canvas setup
  const padding = 60;
  const lineHeight = 22;
  const fontSize = 14;
  const headerHeight = 50;
  const lines = code.split('\n');
  
  const canvas = createCanvas(1, 1);
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px "SF Mono", "Monaco", "Consolas", monospace`;
  
  const maxWidth = Math.max(...lines.map(l => ctx.measureText(l).width));
  const width = Math.min(Math.max(maxWidth + padding * 2, 600), 1400);
  const height = lines.length * lineHeight + padding * 2 + headerHeight;
  
  canvas.width = width;
  canvas.height = height;

  // Background with shadow
  ctx.fillStyle = selectedTheme.bg;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  ctx.fillRect(0, 0, width, height);
  ctx.shadowColor = 'transparent';

  // Header bar
  ctx.fillStyle = selectedTheme.window;
  ctx.fillRect(0, 0, width, headerHeight);

  // Window controls
  const controlY = headerHeight / 2;
  const controls = [{ color: '#ff5f56', x: 20 }, { color: '#ffbd2e', x: 40 }, { color: '#27c93f', x: 60 }];
  controls.forEach(({ color, x }) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, controlY, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // Filename
  ctx.fillStyle = selectedTheme.fg;
  ctx.font = `12px "SF Pro", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(path.basename(filePath), width / 2, controlY + 4);

  // Syntax highlighting
  ctx.font = `${fontSize}px "SF Mono", "Monaco", "Consolas", monospace`;
  ctx.textAlign = 'left';
  
  let highlighted;
  try {
    highlighted = hljs.highlight(code, { language });
  } catch {
    highlighted = hljs.highlightAuto(code);
  }

  const colorMap = {
    'hljs-keyword': selectedTheme.accent,
    'hljs-string': '#a3be8c',
    'hljs-comment': '#6c7a89',
    'hljs-function': '#88c0d0',
    'hljs-number': '#d08770',
    'hljs-title': selectedTheme.accent
  };

  lines.forEach((line, i) => {
    const y = headerHeight + padding + i * lineHeight;
    const tokens = highlighted.value.split('\n')[i] || line;
    
    if (tokens.includes('<span')) {
      let x = padding;
      const regex = /<span class="([^"]+)">([^<]+)<\/span>|([^<]+)/g;
      let match;
      
      while ((match = regex.exec(tokens)) !== null) {
        const [, className, spanText, plainText] = match;
        const text = spanText || plainText;
        ctx.fillStyle = className ? (colorMap[className] || selectedTheme.fg) : selectedTheme.fg;
        ctx.fillText(text, x, y);
        x += ctx.measureText(text).width;
      }
    } else {
      ctx.fillStyle = selectedTheme.fg;
      ctx.fillText(line, padding, y);
    }
  });

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(output, buffer);

  console.log(chalk.green('✅ Screenshot saved: ') + chalk.bold(output));
  console.log(chalk.dim(`   Theme: ${theme} | Size: ${canvas.width}x${canvas.height}px`));
  console.log(chalk.dim(`   Language: ${language}\n`));

} catch (error) {
  const chalk = require('chalk');
  console.error(chalk.red('\n❌ Error: ') + error.message);
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log(chalk.yellow('\n💡 Tip: Install dependencies first:'));
    console.log(chalk.cyan('   npm install -g code-to-image\n'));
  }
  process.exit(1);
}
