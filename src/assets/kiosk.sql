CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT ,employee_id TEXT , email TEXT,image TEXT,sync TEXT,click_time TEXT,location TEXT);
CREATE TABLE IF NOT EXISTS location(id INTEGER PRIMARY KEY AUTOINCREMENT,location TEXT);
CREATE TABLE IF NOT EXISTS place(id INTEGER PRIMARY KEY AUTOINCREMENT,place TEXT);
INSERT INTO people(name,email,image,sync,click_time,location) VALUES ('Mr sumit','Mr sumit','mehra@g.com','image@path','0','2012-02-10','jaipur');
INSERT INTO location(location) VALUES ('jaipur');
INSERT INTO place(place) VALUES ('jaipur rayqube');