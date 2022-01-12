USE product_overview;

DROP TABLE products, features, styles, photos, sku;

CREATE TABLE products (
  product_id int primary key,
  "name" varchar(45),
  slogan text,
  "description" text,
  category varchar(20),
  default_price int
);

CREATE TABLE features (
  feature_id int primary key,
  product_id int references products(product_id),
  feature varchar(50),
  "value" varchar(75)
);

CREATE TABLE styles (
  product_id int references products(product_id),
  style_id int primary key,
  "name" varchar(35),
  original_price int,
  sale_price int,
  "default?" boolean
);

CREATE TABLE photos (
  style_id int references styles(style_id),
  photo_id int primary key,
  thumbnail_url text,
  "url" text
);

CREATE TABLE sku (
  style_id int references styles(style_id),
  sku_id int primary key,
  quantity int,
  size varchar(5)
);

COPY products(product_id, "name", slogan, "description", category, default_price) FROM '/Users/Alex/HackReactor/RFP57/SDC/Abuela-Fashion/server/ProductOverview/database/product.csv'
DELIMITER ','
CSV HEADER;