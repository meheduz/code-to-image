# 📸 code-to-image

[![npm version](https://img.shields.io/npm/v/code-to-image.svg)](https://www.npmjs.com/package/code-to-image)
[![npm downloads](https://img.shields.io/npm/dm/code-to-image.svg)](https://www.npmjs.com/package/code-to-image)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 📸 Transform your code into beautiful shareable images - perfect for Twitter, LinkedIn, and blogs!

## 🚀 Quick Start

```bash
npx code-to-image myfile.js
```

Or with custom options:

```bash
npx code-to-image code.py --theme dracula --output screenshot.png
```

## ✨ Features

- 🎨 **4 Beautiful Themes** - Dracula, Monokai, GitHub, Nord
- 🌈 **Syntax Highlighting** - 180+ languages supported
- 📐 **Auto-sizing** - Perfect dimensions every time
- 💾 **PNG Export** - High-quality output
- ⚡ **Lightning Fast** - Generate in seconds
- 🎯 **Social Media Ready** - Optimized for sharing
- 🪟 **macOS Window Style** - Beautiful window controls
- 💻 **Cross-Platform** - Works on macOS, Linux, Windows

## 🎨 Available Themes

| Theme | Style | Best For |
|-------|-------|----------|
| `dracula` | Dark purple | Twitter, Instagram |
| `monokai` | Classic dark | GitHub, Dev.to |
| `github` | Light | LinkedIn, Medium |
| `nord` | Cool blue | Personal blogs |

## 📖 Usage Examples

### Basic Usage
```bash
npx code-to-image app.js
```

### Custom Theme
```bash
npx code-to-image code.py --theme monokai
```

### Custom Output Name
```bash
npx code-to-image index.ts --output my-awesome-code.png
```

### Specify Language
```bash
npx code-to-image script.txt --lang javascript
```

### All Options
```bash
npx code-to-image file.js --theme nord --output result.png --lang typescript
```

## 🛠️ CLI Options

```
code-to-image <file> [options]

Options:
  --theme <name>    Theme: dracula, monokai, github, nord (default: dracula)
  --output <file>   Output filename (default: code-screenshot.png)
  --lang <name>     Force language for syntax highlighting
  --help, -h        Show help
  --version, -v     Show version
```

## 🌍 Supported Languages

JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, Scala, HTML, CSS, SQL, Bash, and 160+ more!

## 🎯 Use Cases

- 📱 Share code snippets on Twitter/LinkedIn
- 📝 Add beautiful code examples to blog posts
- 🎓 Create programming tutorials
- 📊 Include in presentations
- 💼 Portfolio projects showcase
- 📚 Documentation with visual examples

## 🚀 Installation

### NPX (Recommended)
```bash
npx code-to-image file.js
```

### Global Install
```bash
npm install -g code-to-image
code-to-image file.js
```

### As Dependency
```bash
npm install code-to-image
```

## 🤝 Contributing

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
- Add line numbers

## 📄 License

MIT © [meheduz](https://github.com/meheduz)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/code-to-image)
- [GitHub Repository](https://github.com/meheduz/code-to-image)
- [Report Issues](https://github.com/meheduz/code-to-image/issues)

---

**Made with ❤️ for developers who love to share beautiful code**

*Star ⭐ this repo if you find it useful!*
