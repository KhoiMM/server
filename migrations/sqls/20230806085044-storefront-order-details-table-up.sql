CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    quantity SMALLINT NOT NULL,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);