# RafalW3bCraft Portfolio
**Turbulentiam amplectere, supra vola** *(Embrace the turbulence, fly above)*

A comprehensive cyberpunk-themed portfolio platform showcasing advanced cybersecurity engineering, app development, and strategic defense solutions. Built with modern web technologies and featuring autonomous AI capabilities.

## 🚀 Live Demo

Visit the live application: [RafalW3bCraft Portfolio](https://your-replit-domain.replit.app)

## 🌟 Features

### Core Platform
- **Cyberpunk UI Design**: Terminal-inspired interface with neon aesthetics and matrix effects
- **Dual Authentication**: OAuth2 (Google/GitHub) for users + secure admin credentials
- **Real-time Updates**: WebSocket-powered live statistics and monitoring
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Theme System**: Light/dark/system theme support with persistent storage

### Security & Authentication
- **Role-Based Access Control**: Strict separation between user and admin privileges  
- **OAuth2 Integration**: Secure Google and GitHub authentication
- **Admin Security**: Protected admin routes with credential validation
- **Session Management**: PostgreSQL-backed sessions with secure cookie handling
- **Audit Logging**: Comprehensive security event tracking and monitoring

### Content Management
- **AI Blog Generator**: Automated technical blog creation from GitHub repositories
- **Markdown Support**: Rich content editing with React Markdown rendering
- **SEO Optimization**: Dynamic meta tags, Open Graph, and structured data
- **Portfolio Showcase**: Professional presentation of projects and services
- **Contact System**: Secure message handling with admin notifications

### AI & Automation
- **Falcon Protocol v∞**: Supreme continuous enhancement system with 6-hour cycles
- **Content Moderation**: AI-powered community chat moderation
- **Performance Monitoring**: Automated system health tracking and optimization
- **GitHub Integration**: Live repository statistics and project synchronization
- **Smart Analytics**: Real-time user behavior and engagement tracking

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for responsive, utility-first styling
- **Radix UI** components with shadcn/ui for accessible interfaces
- **TanStack Query** for efficient server state management
- **Wouter** for lightweight client-side routing
- **Framer Motion** for smooth animations and transitions

### Backend
- **Express.js** with TypeScript for robust API development
- **PostgreSQL** via Neon for scalable database management
- **Drizzle ORM** for type-safe database operations
- **Socket.IO** for real-time communication
- **Passport.js** for authentication strategies
- **Rate Limiting** and security middleware for protection

### Infrastructure
- **Vite** for fast development and optimized builds
- **Database Migrations** with Drizzle Kit
- **Environment Configuration** for development and production
- **WebSocket Support** for real-time features
- **PostgreSQL Sessions** for secure session storage

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Google OAuth2 credentials (optional)
- GitHub OAuth2 credentials (optional)

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd rafalw3bcraft-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Session Security
SESSION_SECRET=your_secure_session_secret

# Admin Credentials (Required)
ADMIN_USERNAME=admin@rafalw3bcraft.com
ADMIN_PASSWORD=your_secure_admin_password

# OAuth2 Configuration (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
G_CLIENT_ID=your_github_client_id
G_CLIENT_SECRET=your_github_client_secret

# GitHub API (Optional)
G_TOKEN=your_github_personal_access_token
```

4. **Database Setup**
```bash
# Push database schema
npm run db:push

# Generate migrations (if needed)
npm run db:generate
```

5. **Development Server**
```bash
npm run dev
```

Visit `http://localhost:5000` to view the application.

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Database
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate database migrations
- `npm run db:studio` - Open Drizzle Studio for database management

### Utilities
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint for code quality

## 🏗 Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-based page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── styles/         # Global styles and themes
│   └── public/             # Static assets
├── server/                 # Express.js backend
│   ├── routes/             # API route handlers
│   ├── auth.ts             # Authentication logic
│   ├── storage.ts          # Database operations
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema and validation
├── components/             # Server-side rendered components
└── public/                 # Public static files
```

## 🔐 Security Features

### Admin Access Control
- **Credential-Based Admin**: Only designated admin credentials grant access
- **OAuth User Restrictions**: All OAuth users limited to standard user privileges
- **Route Protection**: Admin-only endpoints secured with middleware
- **Session Security**: Secure session handling with automatic cleanup

### Data Protection
- **Input Validation**: Zod schemas for runtime type checking
- **SQL Injection Prevention**: Drizzle ORM provides query safety
- **XSS Protection**: React's built-in XSS protection + content sanitization
- **CSRF Protection**: Session-based CSRF token validation
- **Rate Limiting**: API endpoints protected against abuse

### Security Monitoring
- **Audit Logging**: Comprehensive security event tracking
- **Failed Login Tracking**: Monitoring and alerting for suspicious activity
- **System Health Metrics**: Real-time security status monitoring
- **Unauthorized Access Alerts**: Immediate notification of security violations

## 🎨 Customization

### Theme Configuration
The application uses a cyberpunk color scheme with customizable themes:
- **Dark Theme**: Primary cyberpunk experience with neon accents
- **Light Theme**: Professional light mode for accessibility
- **System Theme**: Automatic theme based on user's system preference

### Content Management
- **Blog Posts**: Markdown-supported content with SEO optimization
- **Portfolio Projects**: Showcase development work with GitHub integration
- **Contact Forms**: Customizable contact and inquiry handling
- **Analytics**: Comprehensive user behavior and engagement tracking

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure all required environment variables are set in production:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secure session encryption key
- `ADMIN_USERNAME` & `ADMIN_PASSWORD` - Admin credentials
- OAuth credentials (if using social login)

### Database Migration
```bash
npm run db:push
```

### Security Checklist
- [ ] Admin credentials stored securely
- [ ] Database connection encrypted
- [ ] Session secrets are random and secure
- [ ] OAuth apps configured for production domains
- [ ] Rate limiting enabled
- [ ] HTTPS enforced in production

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Analysis**: Build-time bundle size optimization
- **Caching Strategy**: Efficient client-side and server-side caching
- **Database Indexing**: Optimized database queries and indexing

### Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Performance Metrics**: Request timing and resource monitoring
- **Error Tracking**: Comprehensive error logging and reporting
- **Real-time Analytics**: Live user behavior and engagement data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode requirements
- Use conventional commit messages
- Ensure all tests pass before submitting
- Update documentation for new features
- Maintain code coverage above 80%

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**RafalW3bCraft** - Cybersecurity Engineering & Development
- **Email**: thewhitefalcon13@proton.me
- **GitHub**: [@RafalW3bCraft](https://github.com/RafalW3bCraft)
- **Twitter**: [@RafalW3bCraft](https://twitter.com/RafalW3bCraft)
- **Telegram**: [@RafalW3bCraft](https://t.me/RafalW3bCraft)

## 🙏 Acknowledgments

- **Replit** - Hosting and development platform
- **Neon** - PostgreSQL database hosting
- **Vercel** - Open source project inspiration
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework

---

**Built with ❤️ by RafalW3bCraft**  
*Forging Future-Ready Cyber Solutions. Secure. Smart. Sovereign.*
