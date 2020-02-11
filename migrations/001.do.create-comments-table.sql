CREATE TABLE if not exists comments (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username TEXT NOT NULL,
  comment TEXT NOT NULL,
  date TIMESTAMP NOT NULL
);
