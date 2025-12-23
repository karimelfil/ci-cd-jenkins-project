IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'testdb')
    CREATE DATABASE testdb;
USE testdb;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'messages')
    CREATE TABLE messages (
        id INT PRIMARY KEY IDENTITY(1,1),
        message VARCHAR(255) NOT NULL
    );

INSERT INTO messages (message) VALUES ('hello world');