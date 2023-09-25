# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (GET /api/products)
- Show (GET /api/products/:id)
- Create [token required] (POST /api/products)

#### Users
- Index [token required] (GET /api/users)
- Create [token required] (post /api/users)
- Authenticate (POST /api/users/authenticate)

#### Orders
- Index (GET /api/orders)
- Show (GET /api/orders/:id)
- Create order (POST /api/orders)
- Current Order by user (args: user id)[token required] (GET /api/orders/user/:userId)

#### Order Details
- Create order details of order (POST /api/orders/:id/product)
- Get order details by order ID (GET /api/orders/:id/orderdetails)

## Data Shapes
#### Product
- id 
- name
- price
# SQL Schema
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC
);

#### User
- id
- firstname
- lastname
- username
- password
# SQL Schema
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR,
    firstname VARCHAR(100),
    lastname VARCHAR(100)
);

#### Orders
- id
- status
- userId
# SQL Schema
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status BOOLEAN NOT NULL,
    user_id BIGINT REFERENCES users(id)
);

### Order Details
- id
- quantity
- userId
- productId
# SQL Schema
CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    quantity SMALLINT NOT NULL,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);
