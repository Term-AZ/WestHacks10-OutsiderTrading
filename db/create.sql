CREATE TABLE users(
	id INT auto_increment NOT NULL,
    firstname varchar(32),
    lastname varchar(32) NOT NULL,
    email varchar(64) NOT NULL,
    user_password varchar(128) NOT NULL,
    wallet_code varchar(256) NOT NULL,
    net_deposited float(10,2) NOT NULL DEFAULT 0.00,
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
    company_name varchar(128) NOT NULL,
    stock_price float(10, 2) NOT NULL DEFAULT 0.00,
    issue_name varchar(64) NOT NULL DEFAULT "",
    stock_ticker varchar(64) NOT NULL DEFAULT "",
    PRIMARY KEY(company_name)
);

CREATE TABLE company_images(
	id INT auto_increment NOT NULL,
    image BLOB,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE senator_trades(
	id INT auto_increment NOT NULL,
	senator_id varchar(32) NOT NULL,
    company_id varchar(128) NOT NULL,
    trade_date varchar(16) NOT NULL,
    trade_type ENUM('buy','sell','exchange'),
    amount varchar(32) NOT NULL DEFAULT "0",
    PRIMARY KEY(id),
    FOREIGN KEY(senator_id) REFERENCES senators(id) ON DELETE CASCADE,
	FOREIGN KEY(company_id) REFERENCES company(company_name) ON DELETE CASCADE
);
CREATE TABLE investment_history(
	id INT auto_increment NOT NULL,
    user_id INT NOT NULL,
    investment_worth float(10,2) NOT NULL,
    history_date Date NOT NULL
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE user_followers(
	user_id INT NOT NULL,
    senator_id varchar(16) NOT NULL,
    PRIMARY KEY(user_id, senator_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(senator_id) REFERENCES senators(id)
);