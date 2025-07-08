# AuthApp

This is a simple web application built with Next.js that demonstrates user authentication using NextAuth.js and Auth0. It includes a basic setup for a home page, a protected page, and an admin-only area.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An [Auth0 account](https://auth0.com/)

### 🔧 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/AuthApp-main.git
    cd AuthApp-main
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following variables. You can get these values from your Auth0 application settings.

    ```
    AUTH0_CLIENT_ID=your_auth0_client_id
    AUTH0_CLIENT_SECRET=your_auth0_client_secret
    AUTH0_ISSUER=https://your-auth0-domain
    NEXTAUTH_SECRET=a_secure_random_string
    ```

    You can generate a secure random string for `NEXTAUTH_SECRET` using the following command in your terminal:

    ```bash
    openssl rand -base64 32
    ```

### ▶️ Running the Application

To start the development server, run:

```bash
npm run dev
```

Or if you are using yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ✨ Features

- **Authentication:** Users can sign in and out using Auth0.
- **Protected Routes:** Certain pages are only accessible to authenticated users.
- **Session Management:** The application manages user sessions using NextAuth.js.

## 📄 Pages

- **`/`**: The main page that welcomes authenticated users.
- **`/admin`**: A "secret" page accessible only to authenticated users.
- **`/api/auth/signin`**: The page where users are redirected to log in.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Auth0](https://auth0.com/) - Identity Platform
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
