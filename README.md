E-Commerce Backend API

A production-ready E-Commerce Backend built using Node.js, Express, and MongoDB.
The project includes authentication, role-based access, product management, cart operations, and order processing.

---

Features

### User Module
- User Registration & Login
- JWT Authentication
- Role-Based Access (Admin / Customer)

### Product Module
- Add / Update / Delete Products (Admin)
- Search by name & category
- Filter by price & rating
- Pagination support

### Cart Module
- Add product to cart
- Update quantity
- Remove product
- Auto total price calculation

### Order Module
- Place order from cart
- Order history per user
- Cart cleared after checkout

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

---

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Products
- GET /api/products
- POST /api/products (Admin)
- PUT /api/products/:id (Admin)
- DELETE /api/products/:id (Admin)

### Cart
- POST /api/cart/add
- PUT /api/cart/update
- DELETE /api/cart/remove/:productId
- GET /api/cart

### Orders
- POST /api/orders/place
- GET /api/orders/my-orders

---

## Project Structure

src/
├── models/
├── controllers/
├── routes/
├── middleware/
└── server.js

yaml
Copy code

---

## Deployment
Deployed on Render / Railway

Live API: https://your-deployed-link
