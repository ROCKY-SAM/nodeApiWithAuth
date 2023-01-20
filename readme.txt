----------------------------------------------------------------------------------

DATABASE

CREATE DATABASE node_app
CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
) 
ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
----------------------------------------------------------------------------------

npm init -y
----------------------------------------------------------------------------------

MYSQL_USER: MYSQL_USER
MYSQL_PASSWORD: MYSQL_PASSWORD
----------------------------------------------------------------------------------

npm install express express-validator mysql body-parser jsonwebtoken bcryptjs cors --save
----------------------------------------------------------------------------------

Express — Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
Express-validator — Express Validator is a set of Express. js middleware that wraps validator. js, a library that provides validator and sanitizer functions. Simply said, Express Validator is an Express middleware library that you can incorporate into your apps for server-side data validation.
MySQL — MySQL is an open-source relational database management system (RDBMS).
body-parser — Express body-parser is an npm library used to process data sent through an HTTP request body. It exposes four express middlewares for parsing text, JSON, URL-encoded, and raw data set through an HTTP request body.
jsonwebtoken — This module provides Express middleware for validating JWTs (JSON Web Tokens) through the JSON web token module. The decoded JWT payload is available on the request object.
bcryptjs — The bcrypt hashing function allows us to build a password security platform that scales with computation power and always hashes every password with a salt.
cors — CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
----------------------------------------------------------------------------------