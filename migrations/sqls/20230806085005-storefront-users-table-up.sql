CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR,
    firstname VARCHAR(100),
    lastname VARCHAR(100)
);

-- INSERT INTO users (username, password, firstname, lastname) VALUES ('admin', 'password', 'Admin', 'Super');