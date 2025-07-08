# Frontend - Student Management System

A modern React application built with TypeScript, Material-UI, and Redux Toolkit for managing school operations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

### Demo Credentials
- **Username**: `admin@school-admin.com`
- **Password**: `3OU4zn3q6Zh9`

## 🛠️ Technology Stack

### Core Technologies
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Material-UI (MUI) v6** - Comprehensive React component library

### State Management
- **Redux Toolkit** - Modern Redux with simplified API
- **RTK Query** - Powerful data fetching and caching solution
- **Redux Persist** - State persistence across browser sessions

### Form Handling & Validation
- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── api/                    # API configuration and base setup
│   ├── api.ts             # RTK Query API configuration
│   └── types.ts           # API response types
├── assets/                 # Static assets
│   ├── images/            # Image files
│   └── styles/            # Global styles
├── components/             # Shared/reusable components
│   ├── ui/                # Basic UI components
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── domains/               # Feature-based modules
│   ├── auth/              # Authentication module
│   │   ├── api/           # Auth API endpoints
│   │   ├── pages/         # Auth pages (login, setup-password)
│   │   ├── slice/         # Redux slice for auth state
│   │   └── types/         # Auth-related types
│   ├── dashboard/         # Dashboard module
│   ├── students/          # Student management
│   ├── notices/           # Notice system
│   ├── leave/             # Leave management
│   ├── staff/             # Staff management
│   └── role-and-permission/ # Role & permission management
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts        # Authentication hook
│   └── use-api.ts         # API interaction hooks
├── routes/                # Application routing
│   ├── routes.tsx         # Route definitions
│   └── protected-route.tsx # Route protection
├── store/                 # Redux store configuration
│   ├── store.ts           # Store setup
│   └── root-reducer.ts    # Root reducer
├── theme/                 # MUI theme customization
│   ├── theme.ts           # Theme configuration
│   └── components.ts      # Component overrides
├── utils/                 # Utility functions
│   ├── constants.ts       # App constants
│   ├── helpers.ts         # Helper functions
│   └── validators.ts      # Validation schemas
├── app.tsx                # Main application component
├── main.tsx               # Application entry point
└── vite-env.d.ts          # Vite type definitions
```

## 🎯 Key Features

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Protected routes and components
- Password setup and reset functionality
- Email verification system

### Dashboard
- User statistics and analytics
- Recent notices and announcements
- Birthday and anniversary celebrations
- Leave request overview
- Quick action buttons

### Student Management
- Student registration and profile management
- Class and section assignment
- Academic record tracking
- Parent/guardian information

### Notice System
- Create and manage notices
- Role-based notice distribution
- Approval workflow for notices
- Rich text editor for content

### Leave Management
- Leave policy configuration
- Leave request submission
- Approval workflow
- Leave history and reporting

### Staff Management
- Employee profile management
- Department assignment
- Role and permission management
- Staff directory

## 🔧 Development Guidelines

### Code Standards
- **File Naming**: Use `kebab-case` for files and directories
- **Component Naming**: Use `PascalCase` for React components
- **Variable Naming**: Use `camelCase` for variables and functions
- **Absolute Imports**: Use absolute imports from `src/` directory

### Component Structure
```typescript
// Example component structure
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from 'hooks/use-app-selector';

interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({ title, children }) => {
  const state = useAppSelector((state) => state.example);

  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      {children}
    </Box>
  );
};
```

### State Management Patterns
```typescript
// RTK Query API slice example
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // Add auth token
      return headers;
    },
  }),
  tagTypes: ['Student', 'Notice'],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => '/students',
      providesTags: ['Student'],
    }),
  }),
});
```

### Form Handling
```typescript
// React Hook Form with Zod validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;

const MyForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing Guidelines
- Write unit tests for utility functions
- Test React components with React Testing Library
- Mock API calls in tests
- Aim for high test coverage on critical paths

## 🚀 Deployment

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5007
VITE_APP_NAME=Student Management System
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🐛 Known Issues & Solutions

### Issue 1: Notice Description Not Saving
**Problem**: When creating a new notice, the description field doesn't get saved.
**Location**: `/src/domains/notice/pages/add-notice.tsx`
**Solution**: Check form field binding and API payload structure.

### Issue 2: Student CRUD Operations
**Problem**: Some CRUD operations for students may be incomplete.
**Location**: `/src/domains/students/`
**Solution**: Implement missing API endpoints and form handlers.

## 📚 Useful Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## 🤝 Contributing

1. Follow the established code standards
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages
5. Ensure all linting and formatting checks pass

## 📄 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run prettier` | Check code formatting |
| `npm run prettier:fix` | Fix code formatting |
| `npm run format` | Run both prettier and lint fixes |

---

For backend API documentation, see [../backend/README.md](../backend/README.md)
