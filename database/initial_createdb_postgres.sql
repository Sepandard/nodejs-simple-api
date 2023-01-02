
CREATE TABLE public."role" (
	id serial2 NOT NULL,
	title varchar(5) NOT NULL,
	CONSTRAINT role_pk PRIMARY KEY (id)
);

CREATE TABLE public."gender" (
	id serial2 NOT NULL,
	title varchar(6) NOT NULL,
	CONSTRAINT gender_pk PRIMARY KEY (id)
);

CREATE TABLE public."status" (
	id serial2 NOT NULL,
	title varchar(10) NOT NULL,
	CONSTRAINT status_pk PRIMARY KEY (id)
);


CREATE TABLE public."user" (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	"lastLogin" timestamp NOT NULL,
	"roleId" int2 NOT NULL,
	"statusId" int2 NOT NULL,
	"genderId" int2 NOT NULL,
	"phoneNumber" varchar(11) NULL,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_fk FOREIGN KEY ("roleId") REFERENCES public."role"(id),
	CONSTRAINT user_fk1 FOREIGN KEY ("statusId") REFERENCES public."status"(id),
	CONSTRAINT user_fk2 FOREIGN KEY ("genderId") REFERENCES public."gender"(id)
);

CREATE TABLE public."category" (
	id serial4 NOT NULL,
	title varchar NOT NULL,
	CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE public.product (
	id serial4 NOT NULL ,
	"name" varchar NOT NULL,
	"cost" int8 NOT NULL,
	"categoryId" int4 NOT NULL,
	"image" varchar NOT NULL,
	"description" varchar NOT NULL,
	"amount" int4 NOT NULL default 0,
	"isDeleted" int2 NOT NULL default 0,
	"off" int2 NULL,
	CONSTRAINT product_pk PRIMARY KEY (id),
	CONSTRAINT product_fk FOREIGN KEY ("categoryId") REFERENCES public."category"(id)	
);


CREATE TABLE public.order (
	id serial4 NOT NULL,
	"userId" int4 NOT NULL,
	code varchar NOT NULL,
	"status" int4 NOT NULL,
	"creationTime" timestamp NOT NULL,
	"lastChanghe" timestamp NOT NULL,
	CONSTRAINT order_pk PRIMARY KEY (id),
	CONSTRAINT order_fk FOREIGN KEY ("userId") REFERENCES public."user"(id)
);

CREATE TABLE public."orderItem" (
	id serial4 NOT NULL,
	"orderId" int4 NOT NULL,
	"productId" int4 NOT NULL,
	"creationTime" timestamp NOT NULL,
	CONSTRAINT order_item_pk PRIMARY KEY (id),
	CONSTRAINT order_item_fk1 FOREIGN KEY ("productId") REFERENCES public."product"(id),	
	CONSTRAINT order_item_fk2 FOREIGN KEY ("orderId") REFERENCES public."order"(id)
);
