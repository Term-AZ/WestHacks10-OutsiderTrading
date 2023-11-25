use hackwest_outsidertrading;

CREATE TABLE users(
	id INT auto_increment NOT NULL,
    firstname varchar(32),
    lastname varchar(32) NOT NULL,
    email varchar(64) NOT NULL,
    user_password varchar(128) NOT NULL,
    wallet_code varchar(256) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE senators(
	id varchar(16) NOT NULL,
    first_name varchar(32),
    last_name varchar(32) NOT NULL,
	party enum('Democrat','Republican'),
    state varchar(32) NOT NULL,
    PRIMARY KEY(id) 
);

CREATE TABLE senator_image(
	id INT NOT NULL,
    image BLOB,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES senators(id) ON DELETE CASCADE
);

CREATE TABLE company(
	id INT auto_increment NOT NULL,
    company_name varchar(64) NOT NULL,
    stock_price float(10, 2) NOT NULL DEFAULT 0.00,
    issue_name varchar(64) NOT NULL DEFAULT "",
    stock_ticker varchar(64) NOT NULL DEFAULT "",
    PRIMARY KEY(id)
);

CREATE TABLE company_images(
	id INT auto_increment NOT NULL,
    image BLOB,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE senator_trades(
	id INT auto_increment NOT NULL,
	senator_id INT NOT NULL,
    company_id INT NOT NULL,
    trade_date Date NOT NULL,
    trade_type ENUM('buy','sell'),
    amount float(10,2) NOT NULL DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY(senator_id) REFERENCES senators(id) ON DELETE CASCADE,
	FOREIGN KEY(company_id) REFERENCES company(id) ON DELETE CASCADE
);