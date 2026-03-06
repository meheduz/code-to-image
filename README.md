# @meheduz/code-to-image

[![npm version](https://img.shields.io/npm/v/@meheduz/code-to-image.svg)](https://www.npmjs.com/package/@meheduz/code-to-image)
[![npm downloads](https://img.shields.io/npm/dm/@meheduz/code-to-image.svg)](https://www.npmjs.com/package/@meheduz/code-to-image)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Transform your code into beautiful shareable images — perfect for Twitter, LinkedIn, and blogs!

## Quick Start

```bash
npx @meheduz/code-to-image myfile.js
```

Or with custom options:

```bash
npx @meheduz/code-to-image code.py --theme dracula --output screenshot.png
```

## Features

- **6 Beautiful Themes** — Dracula, Monokai, GitHub, Nord, One Dark, Solarized Dark
- **Syntax Highlighting** — 180+ languages with accurate per-theme color maps
- **Line Numbers** — Toggle with `--no-line-numbers`
- **Auto-sizing** — Perfect dimensions every time
- **Retina Ready** — `--scale 1|2|3` for crisp output (default: 2x)
- **PNG Export** — High-quality output
- **Fast** — Generate in seconds
- **Social Media Ready** — Optimized for sharing
- **macOS Window Style** — Rounded corners, shadow, traffic-light controls
- **Cross-Platform** — Works on macOS, Linux, Windows
- **Programmatic API** — Use as a library in your own projects

## Available Themes

| Theme | Style | Best For |
|-------|-------|----------|
| `dracula` | Dark purple | Twitter, Instagram |
| `monokai` | Classic dark | GitHub, Dev.to |
| `github` | Light | LinkedIn, Medium |
| `nord` | Cool blue | Personal blogs |
| `one-dark` | Atom-inspired | Clean dark look |
| `solarized-dark` | Warm dark | Terminal lovers |

## Usage Examples

### Basic Usage
```bash
npx @meheduz/code-to-image app.js
```

### Custom Theme
```bash
npx @meheduz/code-to-image code.py --theme monokai
```

### Custom Output Name
```bash
npx @meheduz/code-to-image index.ts --output my-awesome-code.png
```

### Specify Language
```bash
npx @meheduz/code-to-image script.txt --lang javascript
```

### High-res Retina Output
```bash
npx @meheduz/code-to-image app.js --scale 3
```

### Hide Line Numbers
```bash
npx @meheduz/code-to-image app.js --no-line-numbers
```

### All Options
```bash
npx @meheduz/code-to-image file.js --theme one-dark --output result.png --lang typescript --scale 2
```

## CLI Options

```
code-to-image <file> [options]

Options:
  --theme <name>      Theme (default: dracula)
                      dracula, monokai, github, nord, one-dark, solarized-dark
  --output <file>     Output filename (default: code-screenshot.png)
  --lang <name>       Force language for syntax highlighting
  --scale <number>    Resolution scale: 1, 2, or 3 (default: 2)
  --no-line-numbers   Hide line numbers
  --tab-size <n>      Tab width in spaces (default: 2)
  --help, -h          Show help
  --version, -v       Show version
```

## Supported Languages

JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, Scala, HTML, CSS, SQL, Bash, and 160+ more!

## Use Cases

- Share code snippets on Twitter/LinkedIn
- Add beautiful code examples to blog posts
- Create programming tutorials
- Include in presentations
- Portfolio projects showcase
- Documentation with visual examples

## Installation

### NPX (Recommended)
```bash
npx @meheduz/code-to-image file.js
```

### Global Install
```bash
npm install -g @meheduz/code-to-image
code-to-image file.js
```

### As a Library
```bash
npm install @meheduz/code-to-image
```

```javascript
const { generateImage, themes } = require('@meheduz/code-to-image');

const png = generateImage({
  code: 'console.log("Hello, world!");',
  language: 'javascript',
  theme: 'dracula',
  fileName: 'hello.js',
  showLineNumbers: true,
  scale: 2,
});

fs.writeFileSync('output.png', png);
```

## Contributing

Contributions welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewTheme`)
3. Commit changes (`git commit -m 'Add new theme'`)
4. Push to branch (`git push origin feature/NewTheme`)
5. Open a Pull Request

**Ideas for contributions:**
- Add new themes
- Support more languages
- Add custom fonts
- Add watermark option
- SVG / JPEG export formats
- Custom background images

## License

MIT © [meheduz](https://github.com/meheduz)

## Links

- [NPM Package](https://www.npmjs.com/package/@meheduz/code-to-image)
- [GitHub Repository](https://github.com/meheduz/code-to-image)
- [Report Issues](https://github.com/meheduz/code-to-image/issues)

---

v1.0.0
