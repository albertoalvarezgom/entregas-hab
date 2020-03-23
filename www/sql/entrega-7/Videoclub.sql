create database videoclub;
use videoclub;


create table actor (
id int primary key auto_increment,
first_name VARCHAR(15),
last_name VARCHAR (15)
);

create table director (
id int primary key auto_increment,
first_name VARCHAR(15),
last_name VARCHAR (15)
);

create table film (
id int primary key auto_increment,
title varchar(255) not null,
summary text,
PEGI enum ('TP', '+13', '+16', '+18') not null
);

create table copy (
id int primary key auto_increment,
id_film int not null,
format enum ('VHS', 'DVD')
);

alter table copy
add constraint fk_film_copy foreign key (id_film) references film(id);


create table member (
id int primary key auto_increment,
first_name varchar (255) not null,
last_name varchar (255) not null,
email varchar (255) not null,
phone int(9) not null
);

create table supplier (
id int primary key auto_increment,
name varchar (255) not null,
email varchar (255) not null,
phone int(9) not null
);

alter table copy add column id_supplier int;
alter table copy add constraint fk_copy_supplier foreign key (id_supplier) references supplier(id);

create table category (
id int primary key auto_increment,
name enum ('NEW', 'CLASSIC', 'STANDARD') not null default 'STANDARD',
price int not null
);

alter table copy add column id_category int;
alter table copy add constraint fk_copy_category foreign key (id_category) references category(id);

create table rental (
id int primary key auto_increment,
id_member int not null,
id_copy int not null, 
rental_date date not null,
return_date date,
constraint fk_member_rental foreign key (id_member) references member(id),
constraint fk_copy_rental foreign key (id_copy) references copy(id)
);

create table rating (
id int primary key auto_increment,
id_member int not null,
id_film int not null,
constraint fk_member_rating foreign key (id_member) references member(id),
constraint fk_film_rating foreign key (id_film) references film(id),
comment text,
rate enum ('1', '2', '3', '4', '5')
);

create table film_cast (
id_actor int not null,
id_film int not null,
constraint fk_film_cast_actor foreign key (id_actor) references actor(id),
constraint fk_film_cast_film foreign key (id_film) references film(id)
);

create table film_director (
id_director int not null,
id_film int not null,
constraint fk_film_director foreign key (id_director) references director(id),
constraint fk_film_director_film foreign key (id_film) references film(id)
);

insert into actor values(1, 'JOAQUIN', 'PHOENIX');
insert into actor values(2, 'EMMA', 'WATSON');
insert into actor values(3, 'AMY', 'ADAMS');
insert into actor values(4, 'CHRISTIAN', 'BALE');
insert into actor values(5, 'EMMA', 'STONE');
insert into actor values(6, 'DANIEL', 'DAY-LEWIS');
insert into actor values(7, 'LEONARDO', 'DI CAPRIO');
insert into actor values(8, 'KATE', 'WINSLET');


insert into director values(1, 'QUENTIN', 'TARANTINO');
insert into director values(2, 'ETHAN', 'COEN');
insert into director values(3, 'PAUL THOMAS', 'ANDERSON');
insert into director values(4, 'DAVID', 'LYNCH');
insert into director values(5, 'ERIC', 'ROHMER');

insert into film values(
		1, 
        'ANTES DEL AMANECER', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.',
        '+13');

insert into film values(
		2, 
        'LOS OTROS', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.',
        '+18');
        
insert into film values(
		3, 
        'NEBRASKA', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.',
        'TP');
        
insert into film values(
		4, 
        '10.000 KM', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.',
        '+16');
        

insert into supplier values (1, 'UNIVERSAL', 'info@universal.com', 981121212);
insert into supplier values (2, 'PARAMOUNT', 'info@paramount.com', 981222222);

insert into category values (1, 'STANDARD', 3.5);
insert into category values (2, 'NEW', 4.5);
insert into category values (3, 'CLASSIC', 2.5);

insert into copy values (1, 1, 'DVD', 1, 1);
insert into copy values (2, 1, 'VHS', 1, 1);
insert into copy values (3, 2, 'DVD', 2, 2);
insert into copy values (4, 2, 'DVD', 2, 2);
insert into copy values (5, 3, 'DVD', 2, 3);
insert into copy values (6, 3, 'VHS', 2, 3);
insert into copy values (7, 3, 'VHS', 2, 3);
insert into copy values (8, 4, 'DVD', 1, 2);
insert into copy values (9, 4, 'DVD', 1, 2);
insert into copy values (10, 4, 'VHS', 1, 2);

insert into member values (1, 'PAUL','SMITH', 'paul@smith.com', 98140440);
insert into member values (2, 'LAURA','DERN', 'laura@dern.com', 981999999);

insert into rental values (1, 1, 1, DATE_SUB(CURRENT_DATE(), INTERVAL 10 DAY), null);
insert into rental values (2, 1, 10, DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY), DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY));
insert into rental values (3, 2, 8, DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY), DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY));
insert into rental values (4, 2, 3, DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), null);
insert into rental values (5, 1, 4, DATE_SUB(CURRENT_DATE(), INTERVAL 12 DAY),DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY));
insert into rental values (6, 1, 6, DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), null);
insert into rental values (7, 2, 2, DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY), null);
insert into rental values (8, 1, 8, DATE_SUB(CURRENT_DATE(), INTERVAL 12 DAY), DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY));
insert into rental values (9, 2, 2, DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), null);
insert into rental values (10, 2, 7, DATE_SUB(CURRENT_DATE(), INTERVAL 9 DAY), DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY));


insert into rating values (1, 1, 1,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','4');
insert into rating values (2, 1, 4,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','5');
insert into rating values (3, 1, 3,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','5');
insert into rating values (4, 1, 3,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','3');
insert into rating values (5, 1, 4,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','2');
insert into rating values (6, 2, 4,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','4');
insert into rating values (7, 2, 3,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','4');
insert into rating values (8, 2, 2,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','4');
insert into rating values (9, 2, 1,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet odio nec risus vehicula maximus. Quisque aliquet, urna a posuere placerat, ipsum diam facilisis nisi, ut fermentum dolor ipsum vitae ligula. In finibus tempus turpis, et accumsan tortor blandit vel. Maecenas fringilla nulla et nulla blandit, eu feugiat nisi iaculis.','4');


insert into film_cast values (1, 1);
insert into film_cast values (2, 1);
insert into film_cast values (3, 2);
insert into film_cast values (4, 2);
insert into film_cast values (5, 2);
insert into film_cast values (6, 3);
insert into film_cast values (7, 4);
insert into film_cast values (8, 4);

insert into film_director values (1, 1);
insert into film_director values (2, 2);
insert into film_director values (3, 3);
insert into film_director values (4, 4);
insert into film_director values (5, 4);
