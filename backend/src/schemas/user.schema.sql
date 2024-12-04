create table public.users(
    id serial primary key,
    email varchar(100) unique not null,
    password varchar(255) not null,
    username varchar(50) not null
);