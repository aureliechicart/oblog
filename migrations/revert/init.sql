-- Revert oblog:init from pg
BEGIN;

DROP TABLE post,
category;

COMMIT;