CREATE DATABASE cei;

CREATE TABLE users(
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	role VARCHAR(255) DEFAULT 'user'
);

INSERT INTO users VALUES (DEFAULT, 'Md Dilshad Alam', 'mddalam1@gmail.com', 'uyh43gy7ghbt6dt3vxgvc536gcyvcyttfc7tcvv', 'admin');

SELECT * FROM users;

SELECT * FROM users WHERE email='mddalam1@gmail.com'