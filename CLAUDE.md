# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a static website project deployed to GitHub Pages. No build process is required.

### Local Development
```bash
# Serve locally using any HTTP server
# Option 1: Using VS Code Live Server extension (recommended)
# Option 2: Using Python
python -m http.server 8000

# Option 3: Using Node.js http-server (if available)
npx http-server
```

### Testing
```bash
# Open test pages for assistant functionality
# Test basic assistant: open test-assistant.html in browser
# Test advanced features: open test-chapi-pro.html in browser
```

### Deployment
- Automatic deployment via GitHub Pages when pushing to `main` branch
- Site available at: https://chapibot.pro
- Custom domain configured via CNAME file

## Architecture Overview

This is a single-page landing website for CHAPI chatbot services with an integrated AI assistant widget.

### Core Structure

- **Static HTML Site**: Single `index.html` with embedded CSS and responsive design
- **CHAPI Assistant Widget**: Interactive chat widget for customer support
- **GitHub Pages Hosting**: Automatic deployment from main branch

### Key Components

#### 1. Main Landing Page (`index.html`)
- Modern dark theme with CSS variables
- Responsive design with mobile-first approach
- Animated background and smooth transitions
- Integrated testimonials, pricing, and contact sections
- All main site styles embedded in `<style>` tag within HTML

#### 2. CHAPI Assistant System (`assets/js/`)
- **`chapi-config.js`**: Main configuration file - modify this for most customizations
- **`chapi-assistant.js`**: Core widget logic with keyword-based responses
- **`chapi-assistant-improved.js`**: Enhanced version with additional features
- **`chapi-persuasion-engine.js`**: Advanced persuasion logic for conversions
- **`assets/css/chapi-assistant.css`**: Base styles for the chat widget
- **`assets/css/chapi-assistant-pro.css`**: Enhanced styles for pro version

#### 3. Testing Pages
- **`test-assistant.html`**: Test basic assistant functionality
- **`test-chapi-pro.html`**: Test advanced pro features

#### 4. Documentation (`docs/`)
- Multiple markdown files with feature descriptions
- Implementation guides for the assistant
- Pricing and setup instructions

### Assistant Configuration

The CHAPI assistant is fully configurable through `assets/js/chapi-config.js`:

```javascript
const CHAPI_CONFIG = {
    botName: 'CHAPI',
    enableAI: false,  // Set to true for OpenAI integration
    welcomeMessage: 'Custom welcome message',
    customResponses: {
        'keyword|synonym': 'Response with HTML support'
    }
}
```

Key features:
- Keyword-based response matching using regex patterns
- Quick action buttons for common queries
- Optional OpenAI integration for advanced responses
- Fully customizable styling and positioning
- Business hours configuration
- Multi-channel contact integration (WhatsApp, Telegram, Email)

### Content Management

#### Pricing Information
Pricing is configured in the assistant config and should be updated in:
- `chapi-config.js` → `customResponses['precio|costo|plan']`
- Main HTML pricing section

#### Contact Information
Contact details are centralized in:
- `chapi-config.js` → `links` object
- Assistant responses for support queries
- Main HTML contact sections

#### Brand Colors
Brand colors are defined in CSS variables:
```css
:root {
    --brand: #2f7afe;        /* Primary blue */
    --accent: #00d4a6;       /* Secondary green */
    --bg: #0a0d14;          /* Dark background */
}
```

### File Organization

```
├── index.html                           # Main landing page
├── test-assistant.html                  # Basic assistant testing
├── test-chapi-pro.html                 # Pro features testing
├── assets/
│   ├── css/
│   │   ├── chapi-assistant.css         # Base assistant styles
│   │   └── chapi-assistant-pro.css     # Enhanced assistant styles
│   ├── js/
│   │   ├── chapi-config.js             # Main configuration (edit this!)
│   │   ├── chapi-assistant.js          # Core assistant logic
│   │   ├── chapi-assistant-improved.js # Enhanced assistant features
│   │   └── chapi-persuasion-engine.js  # Conversion optimization
│   ├── data/
│   │   └── casos-exito.js              # Success stories data
│   └── images/                         # Static assets
├── docs/                               # Documentation files
│   ├── CHAPI_ASSISTANT_GUIDE.md       # Main assistant documentation
│   ├── CHAPI_ASSISTANT_IMPROVEMENTS.md # Feature improvements
│   ├── FEATURES.md                     # Feature descriptions
│   └── PRICING.md                      # Pricing information
├── CLAUDE.md                           # This file
└── CNAME                              # Custom domain config
```

## Customization Guidelines

### Modifying Assistant Responses
1. Edit `assets/js/chapi-config.js`
2. Update `customResponses` object with new keyword patterns
3. Test locally before deployment
4. Keywords use regex patterns: `'keyword1|keyword2|phrase'`

### Styling Changes
1. Main site styles are in `<style>` tag in `index.html`
2. Assistant styles are in `assets/css/chapi-assistant.css`
3. Use CSS variables for consistent theming
4. Maintain mobile responsiveness

### Adding New Sections
1. Follow existing HTML structure patterns
2. Use CSS variables for colors
3. Maintain semantic HTML5 structure
4. Test across different screen sizes

## Important Notes

### Production Considerations
- This is a production website - test changes locally first
- Git commits to `main` branch deploy automatically to production at https://chapibot.pro
- Use test pages (`test-assistant.html`, `test-chapi-pro.html`) to verify assistant functionality

### Technical Details  
- Assistant responses support basic HTML formatting (`<strong>`, `<br>`, `<a>`)
- All paths use relative references for GitHub Pages compatibility
- No build process required - direct file editing
- Configuration changes in `chapi-config.js` take effect immediately
- Keywords in `customResponses` use regex patterns with pipe separators (`|`)

### Assistant Development
- Most customization should be done through `chapi-config.js`
- Multiple assistant versions available (basic, improved, pro)
- OpenAI integration available but disabled by default (`enableAI: false`)
- Contact information is centralized in config file for easy updates