DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER CHECK (age > 0) NOT NULL,
    is_best_friend BOOLEAN NOT NULL,
    hidden_talent TEXT
);