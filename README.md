# 🛒 apnaShop Backend

A modern, scalable **eCommerce backend** built using **Node.js, TypeScript, Express, and MongoDB**.

---

## 📖 Overview

This backend handles:
- User authentication & authorization
- Product catalog management
- Cart & checkout flow
- Order & payment processing
- Reviews & admin management

Designed with **clean architecture**, **security**, and **scalability** in mind.

---

## 🗂️ Core Collections (Database Design)

### 1️⃣ Users

```json
{
  "_id": "ObjectId",
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "passwordHash": "********",
  "phone": "98xxxxxx",
  "role": "user", // user | admin
  "createdAt": "Date"
}
```
### 2️⃣ Products

```json
{
  "_id": "ObjectId",
  "title": "Men Cotton T-Shirt",
  "description": "Premium quality cotton T-shirt",
  "category": "men",
  "brand": "Nike",
  "price": 999,
  "discount": 20,
  "stock": 50,
  "images": ["img1.jpg", "img2.jpg"],
  "ratings": 4.3,
  "reviewsCount": 120,
  "variants": [
    { "size": "M", "color": "Black", "stock": 10 },
    { "size": "L", "color": "White", "stock": 5 }
  ],
  "createdAt": "Date"
}
```

3️⃣ Cart (User / Guest)


```json
{
  "userId": "ObjectId", // null for guest users
  "items": [
    {
      "productId": "ObjectId",
      "variantId": "ObjectId",
      "quantity": 2,
      "priceAtThatTime": 899
    }
  ],
  "updatedAt": "Date"
}
```
### 4️⃣ Orders

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [
    {
      "productId": "ObjectId",
      "name": "Men Cotton T-Shirt",
      "price": 999,
      "quantity": 2
    }
  ],
  "totalAmount": 2499,
  "paymentMethod": "COD",
  "paymentStatus": "pending", // pending | paid | failed
  "orderStatus": "placed", // placed | shipped | delivered | cancelled
  "address": {
    "name": "Rahul",
    "phone": "98xxxxxx",
    "city": "Noida",
    "pincode": "201301"
  },
  "createdAt": "Date"
}
```
### 5️⃣ Reviews

```json
{
  "productId": "ObjectId",
  "userId": "ObjectId",
  "rating": 5,
  "comment": "Great quality!",
  "createdAt": "Date"
}
```
## 🧠 Authentication Strategy
### JWT (Access Token + Refresh Token)

### Password hashing using bcrypt

### Role-based access control (User / Admin)

### 🔒 Protected Routes
bash
Copy code
/checkout
/orders
/profile
🔴 Admin Routes
bash
Copy code
/admin/products
/admin/orders
/admin/users
## 🔌 API Modules & Endpoints
### 1️⃣ Authentication API

POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me
POST   /auth/refresh-token
### 2️⃣ Product API
#### http

GET    /products
GET    /products/:id
GET    /products?category=&price=&sort=
POST   /products            (admin)
PUT    /products/:id        (admin)
DELETE /products/:id        (admin)
### 3️⃣ Cart API
http
Copy code
POST   /cart/add
PUT    /cart/update
DELETE /cart/remove
GET    /cart
### 4️⃣ Address API
http
Copy code
POST   /address
GET    /address
PUT    /address/:id
DELETE /address/:id
### 5️⃣ Order API
http
Copy code
POST   /orders
GET    /orders
GET    /orders/:id
PUT    /orders/:id/status   (admin)
### 6️⃣ Payment API
http
Copy code
POST   /payment/create
POST   /payment/verify
### 7️⃣ Reviews & Wishlist API
http
Copy code
POST   /reviews
GET    /reviews/:productId

GET    /wishlist
POST   /wishlist/add
## 🔥 Recommended Development Flow
1️⃣ Authentication
2️⃣ Products
3️⃣ Cart
4️⃣ Orders (COD first)
5️⃣ Payment Gateway
6️⃣ Reviews & Ratings
7️⃣ Admin Dashboard

## 📁 Project Structure
bash
Copy code

```json
ecommerce-backend/
├── src/
│ ├── app.ts
│ ├── server.ts
│ ├── config/
│ │ └── db.ts
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── services/
│ ├── middlewares/
│ └── utils/
├── .env
├── package.json
└── tsconfig.json
```
 
## ✅ Best Practices
Validate inputs (Zod / Joi)

Use MongoDB indexes wisely

Snapshot product data in orders

Secure refresh tokens via HTTP-only cookies

Keep controllers thin, move logic to services
