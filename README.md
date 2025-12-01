# WAWCD - WhatsApp CRM Website
 
> **WAWCD** (WhatsApp CRM with Contact Saver, Broadcasting & more) - The most powerful WhatsApp solution for businesses. A comprehensive Chrome extension that transforms WhatsApp Web into a full-featured CRM with automation, broadcasting, contact management, and AI-powered features.

## 🌟 About WAWCD 

WAWCD is a revolutionary Chrome extension that enhances WhatsApp Web with powerful CRM features, making it the ultimate business communication tool. From contact management and broadcasting to AI-powered automation and integrations, WAWCD transforms your WhatsApp experience.

### Key Features

- **📞 Contact Management**: Advanced contact saver and organization
- **📢 Broadcasting**: Send messages to multiple contacts efficiently
- **🤖 AI Integration**: ChatGPT-powered smart replies and automation
- **📋 Templates**: Pre-built message templates for common scenarios
- **🏷️ Labels & Organization**: Smart inbox with contact categorization
- **🔄 Workflows**: Automated task sequences and responses
- **🔗 Integrations**: Seamless connection with HubSpot and other tools
- **🌐 Multi-language Support**: Available in multiple languages
- **📊 Analytics**: Comprehensive insights and reporting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Docker (for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wawcd-website-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   STRAPI_BE_URL=http://localhost:1337
   STRAPI_ACCESS_TOKEN=your_strapi_token
   NEXT_PUBLIC_STRAPI_POST_TOKEN=your_post_token
   WAWCD_URL=https://wawcd.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Material Tailwind React
- **Animations**: Framer Motion, AOS (Animate On Scroll)
- **State Management**: SWR for data fetching
- **Forms**: Formik with Yup validation

### Key Libraries
- **Icons**: Lucide React
- **Carousels**: Swiper, React Slick
- **Notifications**: React Hot Toast
- **WhatsApp Integration**: React Floating WhatsApp
- **HTTP Client**: Axios
- **Progress Indicators**: Next Top Loader

### Development Tools
- **Language**: JavaScript/JSX
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript support
- **Bundle Analysis**: Next.js Bundle Analyzer

## 🌍 Internationalization

WAWCD supports multiple languages with automatic IP-based language detection:

- **Supported Languages**: English, French, Arabic, Portuguese, Russian
- **Auto-detection**: Based on user's country (via Cloudflare headers)
- **Manual Selection**: Users can manually switch languages
- **SEO Optimized**: Each language has proper meta tags and structured data

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [lang]/            # Internationalized routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── layout/                # Layout components (header, footer)
├── views/                 # Page-specific view components
├── utils/                 # Utility functions and API clients
├── hooks/                 # Custom React hooks
├── animations/            # Animation components
└── icons/                 # Custom icon components
```

## 🚀 Deployment

### Docker Deployment

1. **Build and run with Docker**
   ```bash
   # Development
   ./deploy.sh dev
   
   # Production
   ./deploy.sh prod
   ```

2. **Manual Docker commands**
   ```bash
   # Build image
   docker build -t wawcd-website .
   
   # Run container
   docker run -d --name wawcd-website -p 3000:3000 wawcd-website
   ```

### Docker Compose

```bash
docker-compose up -d
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRAPI_BE_URL` | Strapi backend URL | Yes |
| `STRAPI_ACCESS_TOKEN` | Strapi API access token | Yes |
| `NEXT_PUBLIC_STRAPI_POST_TOKEN` | Public Strapi token | Yes |
| `WAWCD_URL` | Main WAWCD website URL | Yes |

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 📱 Features Overview

### Core Pages
- **Home**: Landing page with feature highlights
- **Features**: Detailed feature descriptions
- **Pricing**: Subscription plans and pricing
- **FAQ**: Frequently asked questions
- **Blog**: Latest updates and tutorials
- **Contact**: Customer support and inquiries
- **Comparison**: Feature comparisons with competitors

### Advanced Features
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Performance**: Image optimization, lazy loading
- **Analytics**: Google Analytics and Tag Manager integration
- **Security**: Content Security Policy headers
- **Accessibility**: ARIA labels and keyboard navigation

## 🔗 Integration

### Strapi CMS
- Content management for all website content
- Multi-language content support
- Dynamic page generation
- API-driven architecture

### Third-party Services
- Google Analytics & Tag Manager
- WhatsApp Business API
- HubSpot CRM integration
- Chrome Web Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by WAWCD. All rights reserved.

## 🆘 Support

- **Website**: [https://wawcd.com](https://wawcd.com)
- **Chrome Extension**: [Chrome Web Store](https://chromewebstore.google.com/detail/wawcd-chatgpt-powered-wha/gbbpfmmjcaakdmhlnjfdlhlehoeikbic)
- **Documentation**: Available on the website
- **Contact**: Use the contact form on the website

---

**Built with ❤️ by the WAWCD Team**
