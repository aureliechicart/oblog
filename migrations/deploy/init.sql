-- Deploy oblog:init to pg
BEGIN;

CREATE TABLE post (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category_id int NOT NULL REFERENCES category(id)
);

CREATE TABLE category (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL,
  route text NOT NULL UNIQUE
);

COMMIT;