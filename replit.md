# CyberRaksha - Gamified Cyber Safety Learning Platform

## Overview

CyberRaksha is a gamified cyber safety learning platform that teaches users about cybersecurity through interactive courses, XP systems, badges, and gamification elements. The platform features a retro/pixel-art inspired design with courses covering topics like UPI payment safety, phishing detection, and social media security. Users progress through levels, earn experience points, maintain streaks, and unlock achievements as they complete cybersecurity training modules.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Built with React 18 using TypeScript for type safety
- **Routing**: Uses Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Styling**: Tailwind CSS with custom cyberpunk/retro theme variables and Radix UI components
- **Typography**: Pixel-art font ("Press Start 2P") for headings and Inter for body text
- **Animations**: Framer Motion for smooth transitions and interactive elements

### Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **API Structure**: Organized route handlers for courses, user progress, badges, and leaderboards

### Data Storage
- **PostgreSQL Database**: Primary data store using Neon serverless PostgreSQL
- **Schema Design**: 
  - Users table with gamification fields (XP, level, streak, rank)
  - Courses table with difficulty levels and XP rewards
  - User progress tracking with completion percentages
  - Badge system with user achievements
  - Session storage for authentication state

### Authentication & Authorization
- **Replit Auth**: Integrated OpenID Connect authentication
- **Session-based Auth**: Secure session management with PostgreSQL storage
- **Protected Routes**: Middleware for API route protection
- **User Management**: Automatic user creation and profile management

### UI Component System
- **Design System**: ShadCN UI components with custom cyberpunk theme
- **Component Architecture**: Reusable components for courses, badges, progress tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: Radix UI primitives ensure WCAG compliance

### Development Architecture
- **Monorepo Structure**: Shared schema between client and server
- **Build System**: Vite for frontend bundling, ESBuild for server compilation
- **Type Safety**: Full TypeScript coverage with shared types
- **Development Server**: Integrated Vite dev server with HMR

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL database hosting
- **WebSocket Support**: Real-time database connections via Neon's serverless driver

### Authentication Services
- **Replit Auth**: OpenID Connect authentication provider
- **Session Storage**: PostgreSQL-based session persistence with connect-pg-simple

### Frontend Libraries
- **UI Framework**: React 18 with TypeScript
- **Component Library**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter for lightweight routing
- **Animations**: Framer Motion for interactive animations
- **Forms**: React Hook Form with Zod validation

### Backend Libraries
- **Web Framework**: Express.js with TypeScript
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Authentication**: Passport.js with OpenID Connect strategy
- **Session Management**: Express-session with PostgreSQL store
- **Validation**: Zod for runtime type checking and validation

### Development Tools
- **Build Tools**: Vite for frontend, ESBuild for backend
- **Type Checking**: TypeScript compiler
- **Linting & Formatting**: ESLint and Prettier integration
- **Database Migrations**: Drizzle Kit for schema management

### Fonts & Assets
- **Pixel Font**: Google Fonts "Press Start 2P" for retro gaming aesthetic
- **Body Font**: Inter for modern readability
- **Icons**: Lucide React for consistent iconography