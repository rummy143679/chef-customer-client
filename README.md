# 🍽️ Chef-Customer Client

A multi-role food ordering and delivery management frontend application that connects **Customers, Chefs (Providers), Delivery Partners, and Admins** in a single ecosystem.

---

## 🚀 Quick Start (3 Simple Steps)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (see below)
# Create .env file

# 3. Start development server
npm run dev
```

Frontend runs at `http://localhost:5173` 🎉

---

## 📋 Project Overview

**Chef-Customer Client** is a role-based frontend application built with **React + Vite** for a complete food ordering workflow:

- 👤 Customers place food orders
- 👨‍🍳 Chefs / Providers prepare and manage orders
- 🚚 Delivery Partners deliver orders in real-time
- 🛠️ Admin manages the entire system

This project demonstrates **enterprise-level role-based architecture, API integration, and state management**.

---

## 🧑‍💼 User Roles & Features

### 👤 Customer

- ✅ Register and login with email
- ✅ Browse menu items by category
- ✅ Add items to cart
- ✅ Place orders with payment (Razorpay)
- ✅ Track order status in real-time
- ✅ View live delivery location
- ✅ View order history

---

### 👨‍🍳 Chef / Provider

- ✅ View incoming orders
- ✅ Accept / reject orders
- ✅ Update order status (Preparing → Ready → Completed)
- ✅ Manage assigned orders
- ✅ View order statistics & dashboard

---

### 🚚 Delivery Partner

- ✅ View assigned deliveries
- ✅ Accept delivery tasks
- ✅ Update real-time location on map
- ✅ Update delivery status (Picked → In Transit → Delivered)
- ✅ View active & completed deliveries

---

### 🛠️ Admin

- ✅ Manage all users (Customers, Chefs, Delivery Partners)
- ✅ Manage products / menu items
- ✅ View all orders and transactions
- ✅ System-level operations

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend Framework** | React 19.1.1 |
| **Build Tool** | Vite 7.1.7 |
| **Routing** | React Router DOM 7.9.3 |
| **State Management** | Redux Toolkit 2.9.0 |
| **HTTP Client** | Axios 1.12.2 |
| **UI Framework** | Bootstrap 5.3.8 |
| **Maps** | Leaflet 1.9.4 + React-Leaflet |
| **Payments** | Razorpay |
| **Notifications** | React-Toastify 11.0.5 |
| **Icons** | React Icons 5.5.0 |
| **Code Quality** | ESLint 9.36.0 |

---

## 🎯 Key Features

- 🔐 **Role-based authentication & authorization**
- 📦 **Complete order lifecycle management**
- 🗺️ **Real-time delivery tracking** with maps
- 💳 **Secure payment integration** (Razorpay)
- 🔄 **Real-time order status updates**
- 📱 **Fully responsive UI** (mobile + desktop)
- 🧩 **Modular and reusable components**
- ⚡ **Fast and optimized** (Vite HMR)
- 🎨 **Modern UI** with Bootstrap 5

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn** package manager

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Environment Configuration

Create a `.env` file in the root directory:

```env
# Development Environment
VITE_API_BASE_URL=http://localhost:5000/api/v1.0
VITE_RAZORPAY_KEY_ID=rzp_test_RdnclI5ujSSmVe
```

For **Production**, update with your live API:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1.0
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
```

### Step 3: Run Development Server

```bash
npm run dev
```

Open browser → `http://localhost:5173`

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint code quality check
npm run lint

# Fix linting issues automatically
npx eslint . --fix
```

---

## 📁 Project Structure

```
chef-customer-client/
├── src/
│   ├── components/                 # Reusable React components
│   │   ├── AdminDashboard.jsx     # Admin dashboard
│   │   ├── ChefDashboard.jsx      # Chef dashboard
│   │   ├── CustomerDashboard.jsx  # Customer dashboard
│   │   ├── Home.jsx               # Home page
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── chef-componenets/      # Chef-specific components
│   │   ├── customer-componenets/  # Customer-specific components
│   │   └── delivery-componenets/  # Delivery-specific components (maps)
│   ├── pages/                      # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── customer-pages/
│   │   └── delivery-page/
│   ├── routes/
│   │   └── routers.jsx            # Role-based routing config
│   ├── store/                      # Redux state management
│   │   ├── authstore.jsx          # Authentication state
│   │   ├── products.jsx           # Products/dishes state
│   │   └── store.jsx              # Main Redux store
│   ├── middleware/
│   │   ├── API.jsx                # Axios configuration
│   │   └── Authetication.jsx      # Auth middleware
│   ├── data/
│   │   └── dishes.js              # Static data
│   ├── assets/                     # Images & media
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── public/
│   └── _redirects                 # Netlify routing config
├── .env                           # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
└── README.md
```

---

## 🛣️ Routing Configuration

Routes are **role-based** and configured in `src/routes/routers.jsx`:

```javascript
/login              → Login page
/register           → Registration page
/home               → Role-based dashboard (Customer/Chef/Delivery/Admin)
/order              → Customer order placement
/delivery           → Delivery tracking
*                   → Redirects to /login
```

---

## 🔄 State Management (Redux)

### Auth Store (`authstore.jsx`)
- User authentication state
- User role & permissions
- JWT token management

### Products Store (`products.jsx`)
- Available dishes
- Categories
- Ratings & reviews

### Main Store (`store.jsx`)
- Redux configuration
- Store initialization

---

## 📡 API Integration

Axios is configured in `src/middleware/API.jsx` to communicate with the backend:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
```

**Key API Endpoints:**
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /dishes` - Fetch all dishes
- `POST /order` - Create order
- `POST /payment/create` - Initiate Razorpay payment
- `POST /payment/verify` - Verify payment
- `PUT /delivery/:id/location` - Update delivery location

---

## 🗺️ Real-time Delivery Tracking

Uses **Leaflet** for interactive maps:
- Real-time location updates
- Route optimization
- Live tracking for customers

---

## 💳 Payment Integration

**Razorpay** integration:
- Secure payment processing
- Multiple payment methods
- Payment verification
- Transaction tracking

---

## 🌐 Deployment (Netlify)

### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Select repository and branch

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   - Netlify Dashboard → Site Settings → Build & Deploy
   - Add `VITE_API_BASE_URL` and `VITE_RAZORPAY_KEY_ID`

5. **Deploy**
   ```bash
   npm run build
   npm run preview  # Test before deploying
   ```

Netlify auto-deploys on every push! 🚀

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **CORS Errors** | Verify `VITE_API_BASE_URL` is correct; check backend CORS config |
| **Login Fails** | Check backend is running; verify cookies are enabled |
| **Map Not Loading** | Ensure Leaflet CSS in `index.html`; check browser console |
| **Build Errors** | Clear `node_modules` & `dist`; run `npm install` again |
| **API Connection Failed** | Test backend connectivity; check `VITE_API_BASE_URL` |
| **Blank Page** | Check browser console for errors; verify routing config |

---

## 📝 Code Quality & Best Practices

```bash
# Check code quality
npm run lint

# Automatically fix linting issues
npx eslint . --fix
```

**Best Practices:**
- Keep components small and focused
- Use Redux for global state
- Use hooks for component logic
- Follow ESLint rules
- Test in multiple browsers
- Use browser DevTools for debugging

---

## 🚀 Performance Tips

- ⚡ **Vite** provides instant HMR (Hot Module Replacement)
- 🔀 **React Router** handles code splitting automatically
- 📦 **Redux** optimizes state updates
- 📱 **Bootstrap** ensures responsive design
- 🖼️ **Lazy loading** improves initial load time

---

## 📚 Dependencies Overview

```json
{
  "react": "^19.1.1",                    // UI library
  "react-router-dom": "^7.9.3",          // Routing
  "@reduxjs/toolkit": "^2.9.0",          // State management
  "axios": "^1.12.2",                    // API calls
  "bootstrap": "^5.3.8",                 // UI components
  "leaflet": "^1.9.4",                   // Maps
  "react-toastify": "^11.0.5",           // Notifications
  "razorpay": "^2.9.6",                  // Payments
  "vite": "^7.1.7"                       // Build tool
}
```

---

## 📞 Support & Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **React Router**: https://reactrouter.com
- **Bootstrap**: https://getbootstrap.com
- **Leaflet**: https://leafletjs.com
- **Axios**: https://axios-http.com
- **Razorpay**: https://razorpay.com/docs

---

## 💡 Developer Tips

1. 🔥 **Hot Module Replacement (HMR)** - Changes reflect instantly
2. 🔍 **Redux DevTools** - Browser extension for state debugging
3. ⚛️ **React DevTools** - Inspect React components easily
4. 💾 **localStorage** - Persist user preferences locally
5. 🧪 **API Testing** - Use Postman/Insomnia for backend testing

---

## 📄 License

ISC License

---

## 👨‍💻 Author

**Matteda Ramesh**

---

**Happy Coding! 🎉**

For backend setup, refer to the backend repository documentation.
or repo https://github.com/rummy143679/chef-customer-server.git
