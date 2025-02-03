CREATE DATABASE IF NOT EXISTS blogdb;
USE blogdb;


CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contentBlocks TEXT NOT NULL, -- 📌 Fjerner DEFAULT '[]'
    imageSize INT NOT NULL DEFAULT 50,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE posts MODIFY COLUMN images TEXT NOT NULL DEFAULT '[]';


ALTER TABLE posts MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
INSERT INTO posts (title, content, images, imageSize) 
VALUES ('Test Innlegg', 'Dette er et testinnlegg.', '[]', 50);

ALTER TABLE posts DROP COLUMN content;
ALTER TABLE posts DROP COLUMN images;
ALTER TABLE posts ADD COLUMN contentBlocks TEXT NOT NULL;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password)
VALUES ('admin', 'adminpass');


