CREATE TABLE order_products (
    order_id INT REFERENCES orders,
    product_id INT REFERENCES products,
    quantity INT,
    PRIMARY KEY(order_id, product_id));