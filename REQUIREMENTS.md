# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
## ROUTES
#### Products
- Index 
Get all products `/product/all [GET]`
- Show
Show a certain product `/product/:id [GET]`
- Create  
Create a product`/product [POST]`  [token required]

#### Users
- Index 
Get all users `/user/all` [token required]
- Show
Show a certain user `/user/:id` [token required]
- Create
Create a user `/user` 

#### Orders
- Index 
Get all orders `/order/all` [token required]
-Show 
Show a certain order `order/:id` [token required]
- Create
Create an `/order` [token required]

## Data Shapes
#### Product
Table: *products*
 - id `SERIAL PRIMARY KEY`
 - name `VARCHAR`
 - price `NUMERIC`
 - category `VARCHAR` 

#### User
TABLE: *users* 
- id `SERIAL PRIMARY KEY`
- first_name `VARCHAR`
- last_name `VARCHAR`
- pass `VARCHAR`
#### Orders
TABLE: *orders*
- id `SERIAL PRIMARY KEY`
- user_id `INT` REFERENCES users(id)`
- order_status `VARCHAR`

Table: *order_products*
- order_id `INT` `REFERENCES orders`
- product_id `INT` `REFERENCES products`
- quantity `INT`
- `PRIMARY KEY`(order_id, product_id)

