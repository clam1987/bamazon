DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(65) NULL,
  department_name VARCHAR(65) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_qty INTEGER(65) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
