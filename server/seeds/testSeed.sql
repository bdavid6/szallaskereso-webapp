insert into user (username, password, name, e_mail, role) values ('pelda', 'pelda','Példa', 'pelda@pelda', 'MEMBER');
insert into user (username, password, name, e_mail, role) values ('pelda2', 'pelda2','Példa2', 'pelda2@pelda', 'MEMBER');

insert into message (text1, text2, created_at, user) values ('text1', 'text2', '2022', 4);

insert into accommodation (name, place, phone_number, description, information, services, res_end_date, adult_price, child_price, image, active, confirmed, user_id) values ('name', 'place', 123456789, 'Longer description', 'Infos', "ingyen wifi,medence,saját parkoló,légkondi", '2022-10-01', 20000, 10000, 'imagepath',true, true, 1);
insert into accommodation (name, place, phone_number, description, information, services, res_end_date, adult_price, child_price, image, active, confirmed, user_id) values ('name2', 'place2', 123456789, 'Longer description', 'Infos', "ingyen wifi,medence,saját parkoló,légkondi", '2022-10-01', 20000, 10000, 'imagepath',true, true, 1);
insert into accommodation (name, place, phone_number, description, information, services, res_end_date, adult_price, child_price, image, active, confirmed, user_id) values ('name3', 'place3', 123456789, 'Longer description', 'Infos', "ingyen wifi,medence,saját parkoló,légkondi", '2025-10-01', 20000, 10000, 'imagepath',true, true, 1);

insert into reservation (start_date, end_date, adults, children, user_id, accommodation_id) values ('2022-05-08', '2022-05-15', 2, 1, 2, 3);