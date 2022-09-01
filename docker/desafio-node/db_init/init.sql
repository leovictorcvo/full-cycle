CREATE DATABASE IF NOT EXISTS nodedb;
USE nodedb;
CREATE TABLE IF NOT EXISTS logs (
    id int not null auto_increment,
    description varchar(255),
    primary key (id)
)