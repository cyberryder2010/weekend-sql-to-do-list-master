-- database name weekend-to-do-app

CREATE TABLE "tasks"
(
    "id" SERIAL PRIMARY KEY,
    "item" varchar(80) NOT NULL,
    "quantity" integer,
    "completed" boolean,
    "notes" varchar(252)
);