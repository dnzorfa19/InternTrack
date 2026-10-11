# InternTrack — Internship & Job Application Tracker

InternTrack is a web application designed to help students and job seekers organize, manage, and track their internship and job applications in one place.

## Features

- **Login Page:** Demo login system with input validation.
- **Dashboard:** View application statistics and recent applications.
- **Application Management:** Add, view, edit, and delete applications.
- **Search:** Search applications by company or position.
- **Status Filtering:** Filter applications by their current status.
- **Application Details:** Record company name, position, application date, status, type, and notes.
- **Local Storage:** Save application data in the browser.
- **Responsive Interface:** Modern interface designed for different screen sizes.
- **Protected Navigation:** Redirect unauthenticated visitors to the login page.

## Technologies Used

- React
- JavaScript
- Vite
- React Router
- Bootstrap 5
- HTML5
- CSS3
- Browser Local Storage

## Demo Account

Use the following credentials to access the demo:

- **Email:** `demo@interntrack.com`
- **Password:** `intern123`

> **Note:** This is a demonstration authentication system. The credentials are hardcoded in the client-side application and should not be used for real user accounts.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your computer.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dnzorfa19/InternTrack.git
   ```

2. Navigate to the project directory:

   ```bash
   cd InternTrack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## Production Build

To create an optimized production build, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

The generated production files are placed in the `dist` directory.

## Data Storage

Application records are stored in the browser's Local Storage. Data is associated with the browser and origin being used; it is not automatically synchronized across devices or browsers.

The demo authentication mechanism is intended for educational purposes and is not a substitute for secure server-side authentication.

## Project Structure

```text
InternTrack/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── StatCard.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── Applications.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Deployment

The project is configured for deployment as a Vite application. It can be hosted on Netlify or another static hosting platform.

- **Build command:** `npm run build`
- **Publish directory:** `dist`

## Repository

GitHub: https://github.com/dnzorfa19/InternTrack

## License

This project was developed for educational purposes.
