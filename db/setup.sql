
DROP DATABASE IF EXISTS wordslinger;
DROP DATABASE IF EXISTS wordslinger_test;

CREATE DATABASE wordslinger;
CREATE DATABASE wordslinger_test;

\c wordslinger;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

\c wordslinger_test;
CREATE EXTENSION IF NOT EXISTS pgcrypto;