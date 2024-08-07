Node.js CI

### This project is an API for managing products, reviews, and orders for an e-commerce application. It is built with Node.js, Express, and MongoDB.

# API link https://documenter.getpostman.com/view/27560525/2sA3rxqD9d

# Table of Contents
* Features
* Installation
* Usage
* API Endpoints
* Contributing
* License

# Features
* User authentication and authorization
* Product management (CRUD operations)
* Review management (CRUD operations)
* Order management (CRUD operations)
* Email verification using Nodemailer with Gmail


# Installation
* Clone the repository:

#### git clone https://github.com/OdilovMM/server-api.git 
#### cd your-repo


# Install dependencies:
#### npm install

# Set up environment variables:
#### Create a .env file in the root directory and add the following:

* MONGODB_URI=your_mongodb_uri
* JWT_SECRET=your_jwt_secret
* GMAIL_USER=your_gmail_user
* GMAIL_PASS=your_gmail_password

# Start the server:
#### npm start

# Usage
#### Use the following base URL for all API requests:

#### http://localhost:5000/api/v1


# API Endpoints
* Auth
* Register

#### POST /auth/register
* Registers a new user.
* Login

#### POST /auth/login
* Logs in a user.
* Products
* Get All Products

#### GET /products
* Retrieves a list of all products.
* Create Product

#### POST /products
* Creates a new product.
* Get Product by ID

#### GET /products/:id
* Retrieves a product by its ID.
* Update Product

#### PUT /products/:id
* Updates a product by its ID.
* Delete Product

#### DELETE /products/:id
* Deletes a product by its ID.
* Reviews
* Get All Reviews

#### GET /reviews
* Retrieves a list of all reviews.
* Create Review

#### POST /reviews
* Creates a new review.
* Get Review by ID

#### GET /reviews/:id
* Retrieves a review by its ID.
* Update Review

#### PUT /reviews/:id
* Updates a review by its ID.
* Delete Review

#### DELETE /reviews/:id
* Deletes a review by its ID.
* Orders
* Get All Orders

#### GET /orders
* Retrieves a list of all orders.
* Create Order

#### POST /orders
* Creates a new order.
* Get Order by ID

#### GET /orders/:id
* Retrieves an order by its ID.
* Update Order

#### PUT /orders/:id
* Updates an order by its ID.
* Delete Order

#### DELETE /orders/:id
* Deletes an order by its ID.
* Contributing
* Fork the repository.
* Create a new branch: git checkout -b my-feature-branch
* Make your changes and commit them: git commit -m 'Add some feature'
* Push to the branch: git push origin my-feature-branch
* Submit a pull request.


## Feel free to adjust the content and add more details as needed for your project.