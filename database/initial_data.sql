INSERT INTO public."role"(title)
VALUES ('admin');

INSERT INTO public."role"(title)
VALUES ('user');


INSERT INTO public."status"(title)
VALUES ('unactive');

INSERT INTO public."status"(title)
VALUES ('active');


INSERT INTO public."status"(title)
VALUES ('banned');


INSERT INTO public."gender"(title)
VALUES ('male');

INSERT INTO public."gender"(title)
VALUES ('female');

INSERT INTO public."user"("name",email,"genderId","lastLogin","roleId","statusId","password")
VALUES ('admin','admin@gmail.com',1,Now(),1,2,'admin');






