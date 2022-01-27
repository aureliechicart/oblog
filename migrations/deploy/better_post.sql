-- Deploy oblog:better_post to pg

BEGIN;

CREATE VIEW post_with_category AS
-- étape 1 : on écrit notre select
SELECT post.*, category.label category
FROM post
JOIN category ON post.category_id = category.id;

COMMIT;
