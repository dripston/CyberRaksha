# CyberRaksha

**CyberRaksha** is a gamified cyber safety learning platform built with modern web technologies. The application provides interactive courses, progress tracking, and engaging UI to help users learn about cybersecurity in a fun and educational way.

🔗 **Live Demo**: [cyber-raksha-alpha.vercel.app](https://cyber-raksha-alpha.vercel.app)

## 🚀 Features

- **Interactive Learning**: Gamified cybersecurity courses with progress tracking
- **User Authentication**: Firebase Authentication with Email/Password and Google Sign-in
- **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components
- **Real-time Updates**: Express.js backend with WebSocket support
- **Database**: Drizzle ORM with Neon Database for data persistence
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Profile Management**: User profiles with badges and achievements

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Framer Motion** for animations
- **React Query** for data fetching
- **Wouter** for routing

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **Firebase Admin** for authentication
- **WebSocket** support for real-time features

### Database & Services
- **Neon Database** (PostgreSQL)
- **Firebase Authentication**
- **Firestore** for user profiles
- **Vercel** for deployment

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dripston/CyberRaksha.git
   cd CyberRaksha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your_app_id
   
   # Database Configuration
   DATABASE_URL=your_neon_database_url
   ```

4. **Firebase Setup**
   
   Follow the detailed setup guide in [FIREBASE_SETUP.md](FIREBASE_SETUP.md) to configure Firebase Authentication and Firestore.

5. **Database Setup**
   ```bash
   npm run db:push
   ```

## 🚀 Development

### Start the development server
```bash
npm run dev
```

This starts both the frontend (React + Vite) and backend (Express.js) in development mode. The app will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## 📁 Project Structure

```
CyberRaksha/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages/routes
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   └── main.tsx         # Application entry point
│   └── index.html
├── server/                   # Backend Express.js application
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── db.ts                # Database configuration
│   └── vite.ts              # Vite integration
├── shared/                  # Shared types and schemas
│   └── schema.ts
├── attached_assets/         # Project assets
├── vercel.json             # Vercel deployment configuration
├── package.json
└── README.md
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

2. **Environment Variables**
   
   Add the following environment variables in your Vercel dashboard:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `DATABASE_URL`

3. **Domain Configuration**
   
   Update your Firebase Authentication authorized domains to include your Vercel domain.

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Vercel Configuration (`vercel.json`)
The project includes a pre-configured `vercel.json` file that:
- Builds the React frontend
- Serves the Express.js backend as serverless functions
- Routes API calls to `/api/*` through the backend
- Serves static assets from the frontend

### Database Schema
The application uses Drizzle ORM with a PostgreSQL database. The schema is defined in `shared/schema.ts` and includes tables for users, courses, progress, and achievements.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/dripston/CyberRaksha](https://github.com/dripston/CyberRaksha)
- **Live Application**: [https://cyber-raksha-alpha.vercel.app](https://cyber-raksha-alpha.vercel.app)
- **Firebase Setup Guide**: [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/dripston/CyberRaksha/issues) on GitHub.

---

**Made with ❤️ for cybersecurity education**
