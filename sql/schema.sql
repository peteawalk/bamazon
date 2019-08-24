DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create new table
CREATE TABLE items (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(60) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);
