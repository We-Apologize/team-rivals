create table player (
	p_id INT PRIMARY KEY,
	teamName VARCHAR(30),
	name VARCHAR(50),
	dob DATE,
	country VARCHAR(50),
	jersey_no INT,
	height INT,
	release_clause INT,
	join_date DATE,
	position VARCHAR(20),
	biography TEXT,
	injured VARCHAR(50),
	contract_end DATE,
	image VARCHAR(200)
);
