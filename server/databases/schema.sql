


-- CREATE TABLE reviews (
--   id serial not null primary key,
--   product_id int not null,
--   rating int not null,
--   "date" bigint not null,
--   summary varchar(1000) not null,
--   body varchar(1000) not null,
--   recommend boolean not null,
--   reported boolean not null,
--   reviewer_name varchar(60) not null,
--   reviewer_email varchar(60) not null,
--   response varchar(1000) default null,
--   helpfulness int not null
-- );

-- CREATE TABLE characteristics (
--   id serial primary key not null,
--   product_id int not null,
--   "name" varchar(60) not null
-- );

-- CREATE TABLE characteristics_reviews (
--   id serial primary key not null,
--   characteristic_id int not null,
--   review_id int not null,
--   value varchar(60) not null
-- );


-- CREATE TABLE photos (
--   id int primary key not null,
--   review_id int not null,
--   "url" varchar(1000) not null
-- );


-- alter table characteristics_reviews add foreign key (characteristic_id) references characteristics(id);
-- alter table characteristics_reviews add foreign key (review_id) references reviews(id);
-- alter table photos add foreign key (review_id) references reviews(id);


-- copy reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) from '/Users/justinmitchell/Desktop/Programming/Hack Reactor/Immersive RFP57/SDC/Abuela-Fashion/server/databases/csv_data/reviews.csv' delimiter ',' csv header;
-- copy characteristics(id, product_id, name) from '/Users/justinmitchell/Desktop/Programming/Hack Reactor/Immersive RFP57/SDC/Abuela-Fashion/server/databases/csv_data/characteristics.csv' delimiter ',' csv header;
-- copy characteristics_reviews(id, characteristic_id, review_id, value) from '/Users/justinmitchell/Desktop/Programming/Hack Reactor/Immersive RFP57/SDC/Abuela-Fashion/server/databases/csv_data/characteristic_reviews.csv' delimiter ',' csv header;
copy photos(id, review_id, url) from '/Users/justinmitchell/Desktop/Programming/Hack Reactor/Immersive RFP57/SDC/Abuela-Fashion/server/databases/csv_data/reviews_photos.csv' delimiter ',' csv header;

