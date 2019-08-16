create database credijusto;

use credijusto;

create table users(
	id int auto_increment NOT NULL,
    email varchar(255),
    enc_pass varchar(255),
    profile_id int,
    foreign key (profile_id) references permissions(profile_id),
    primary key (id)
);

create table permissions(
	profile_id int auto_increment not null,
	permission varchar(10),
    primary key (profile_id)
);

insert into permissions
( permission ) values
("Dirección"),
("Ejecutivo");

-- drop table users;
-- drop table permissions;
-- truncate table users;


Select * from users;
Select * from permissions;



show processlist;


