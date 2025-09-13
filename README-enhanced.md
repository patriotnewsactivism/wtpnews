# WTP News - Enhanced React Application

This is an enhanced version of the WTP News React application built with Next.js 15.5.3 and Tailwind CSS.

## Features

- Modern, clean design with emphasis on readability
- Responsive navigation that adapts to mobile screens
- Article listing and detail pages with dynamic content
- Document library with PDF viewing capabilities
- Constitutional Rights Legal Research Tool information
- Bad Actors Album details
- Performance optimizations for faster loading
- Proper Netlify deployment configuration

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The application is configured for deployment to Netlify. The `netlify.toml` file contains the necessary build configuration.

To deploy, simply push to your GitHub repository connected to Netlify, or use the Netlify CLI:

```bash
netlify deploy
```

## Performance Optimizations

- Optimized build configuration with Next.js compiler options
- CSS optimization through experimental features
- Console removal in production builds (except errors)
- Responsive design for all screen sizes
- Loading indicators for better user experience

## Components

- `Header`: Navigation header with logo
- `Footer`: Footer with contact information and links
- `HeroSection`: Main hero section with mission statement
- `FeaturedArticles`: Section highlighting featured articles
- `RecentArticles`: Section showing recent articles
- `PDFViewer`: Component for displaying PDF documents
- `ConstitutionalToolPromo`: Promotional section for the Constitutional Rights Tool
- `BadActorsPromo`: Promotional section for the Bad Actors Album
- `LoadingIndicator`: Simple loading spinner component

## Pages

- Home (`/`)
- Articles (`/articles`)
- Individual Articles (`/articles/[slug]`)
- Documents (`/documents`)
- Individual Documents (`/documents/[slug]`)
- Constitutional Rights Tool (`/constitutional-rights-tool`)
- Bad Actors Album (`/bad-actors-album`)
- About (`/about`)
- Contact (`/contact`)

## Styling

The application uses Tailwind CSS with a custom color scheme based on blue tones:
- Primary: blue-800 (#1e40af)
- Secondary: blue-500 (#3b82f6)
- Accent: red-500 (#ef4444)

All components are styled consistently with responsive design principles.