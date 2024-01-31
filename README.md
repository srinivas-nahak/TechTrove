# TechTrove

It's a full-stack e-commerce react app where users can place orders by creating accounts. Also, through the admin account orders can be marked as delivered and new products can be added.

## Demo

https://techtroveinf.vercel.app/

## Demo Credentials

Admin Credendetials
john@email.com
123456

User Credendetials
lorem@email.com
123456

## Challenges

- CORS error couldn't be solved just by adding proxy in the frontend, so I had to add app.use(cors()) to solve this problem.
- JWT token and cookie were not being fetched in the backend due to sameSite:"strict" and from frontend react I had add "credentials:include" from rtk query.
- Entire screen was shaking while adding close-open animation to the orders accordion, then put it inside a parent container with width:100% and height:100vh to solve the problem.
- JSON.stringify() is not allowed with rtk query and it's not clearly mentioned anywhere, so detected it with trial-error.
- Generally we configure build folder in the backend for default path but vite creates dist so configured accordingly "/frontend/dist".

## Features

- [x] User creation and authentication using JWT Token.
- [x] Users can place orders.
- [x] Users can check order status.
- [x] Admins can update the order status.
- [ ] Admins can upload products.

## Main Plugins Used

Plugin Name  
:-------------------------|
|Rect
|Node.js
|MongoDB
|Typescript
