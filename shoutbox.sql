CREATE DATABASE shoutbox;

USE shoutbox;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    images TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    user_ip VARCHAR(512) NOT NULL,
    user_agent VARCHAR(512) NOT NULL,
    display_name VARCHAR(512) NOT NULL
)  ENGINE=INNODB;
