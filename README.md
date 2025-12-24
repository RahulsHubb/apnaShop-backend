# 🛒 apnaShop Backend – Database Design & Authentication

## 🗂️ Core Collections (Must-Have)

---

## 1️⃣ Users Collection

Stores user accounts and authentication-related data.

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


{
  "productId": "ObjectId",
  "userId": "ObjectId",
  "rating": 5,
  "comment": "Great quality!",
  "createdAt": "Date"
}


{
  "productId": "ObjectId",
  "userId": "ObjectId",
  "rating": 5,
  "comment": "Great quality!",
  "createdAt": "Date"
}


/checkout
/orders
/profile


/admin/products
/admin/orders
/admin/users


```

// ??????////


## 1️⃣ AUTH API (START HERE – MUST)
Why first?

Every protected action depends on user identity

Needed for cart, orders, profile, checkout

POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me
POST   /auth/refresh-token



## 2️⃣ PRODUCT API (Second priority)
Why second?

Home page

Search

Category pages

Product details

GET    /products
GET    /products/:id
GET    /products?category=&price=&sort=
POST   /products       (admin)
PUT    /products/:id   (admin)
DELETE /products/:id   (admin)
## 3️⃣ CART API (Third)
Why now?

Needs products

Optional auth (guest vs user)

POST   /cart/add
PUT    /cart/update
DELETE /cart/remove
GET    /cart


## 4️⃣ ADDRESS API
Why?

Checkout needs address

Reusable for future orders

POST   /address
GET    /address
PUT    /address/:id
DELETE /address/:id
## 5️⃣ ORDER API (MOST IMPORTANT)

POST   /orders
GET    /orders
GET    /orders/:id
PUT    /orders/:id/status   (admin)


## 6️⃣ PAYMENT API

POST   /payment/create
POST   /payment/verify


## 7️⃣ REVIEW & RATING API

POST   /reviews
GET    /reviews/:productId

#🔥 BEST DEVELOPMENT FLOW (DO THIS)

1️⃣ Auth
2️⃣ Product
3️⃣ Cart
4️⃣ Order (COD first)
5️⃣ Payment gateway
6️⃣ Reviews
7️⃣ Admin dashboard

src/
 ├─ models/
 ├─ routes/
 ├─ controllers/
 ├─ services/
 ├─ middlewares/
 ├─ utils/
 └─ app.ts

 GET    /auth/me
POST   /auth/logout

POST   /orders
GET    /orders
GET    /orders/:id

GET    /address
POST   /address
PUT    /address/:id
DELETE /address/:id

POST   /reviews
GET    /wishlist
POST   /wishlist/add

🔵 User Authentication REQUIRED
GET    /auth/me
POST   /auth/logout

POST   /orders
GET    /orders
GET    /orders/:id

GET    /address
POST   /address
PUT    /address/:id
DELETE /address/:id

POST   /reviews
GET    /wishlist
POST   /wishlist/add



🔴 Admin Authentication REQUIRED
POST   /products
PUT    /products/:id
DELETE /products/:id

GET    /admin/orders
PUT    /admin/orders/:id/status

GET    /admin/users



##Structuure for now 


ecommerce-backend/
 ├─ src/
 │   ├─ app.ts
 │   ├─ server.ts
 │   ├─ config/
 │   │   └─ db.ts
 │   ├─ routes/
 │   ├─ controllers/
 │   ├─ models/
 │   ├─ middlewares/
 │   └─ utils/
 ├─ .env
 ├─ package.json
 └─ tsconfig.json



//******************* ENDED ******************



🗂️ Core Collections (Must-Have)
1️⃣ Users
{
  _id: ObjectId,
  name: "Rahul",
  email: "rahul@gmail.com",
  passwordHash: "...",
  phone: "98xxxxxx",
  role: "user", // or admin
  createdAt,
}

2️⃣ Products
{
  _id: ObjectId,
  title: "Men Cotton T-Shirt",
  description: "...",
  category: "men",
  brand: "Nike",
  price: 999,
  discount: 20,
  stock: 50,
  images: ["img1.jpg", "img2.jpg"],
  ratings: 4.3,
  reviewsCount: 120,
  variants: [
    { size: "M", color: "Black", stock: 10 },
    { size: "L", color: "White", stock: 5 }
  ],
  createdAt
}

3️⃣ Cart (User or Guest)
{
  userId: ObjectId, // null for guest
  items: [
    {
      productId: ObjectId,
      variantId: ObjectId,
      quantity: 2,
      priceAtThatTime: 899
    }
  ],
  updatedAt
}

4️⃣ Orders
{
  _id: ObjectId,
  userId: ObjectId,
  items: [
    {
      productId,
      name,
      price,
      quantity
    }
  ],
  totalAmount: 2499,
  paymentMethod: "COD",
  paymentStatus: "pending",
  orderStatus: "placed",
  address: {
    name,
    phone,
    city,
    pincode
  },
  createdAt
}

5️⃣ Reviews
{
  productId: ObjectId,
  userId: ObjectId,
  rating: 5,
  comment: "Great quality!",
  createdAt
}

🧠 Authentication Strategy

JWT (access + refresh)

Password hashing → bcrypt

Protect routes like:

/checkout

/orders

/profile
