-- Revert oblog:better_post from pg

BEGIN;

DROP VIEW post_with_category;

COMMIT;
