-- Create database
CREATE DATABASE IF NOT EXISTS audit_db;
USE audit_db;

-- Main table
CREATE TABLE IF NOT EXISTS students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    dob DATE,
    department VARCHAR(20),
    phone VARCHAR(15)
);

-- Log table
CREATE TABLE IF NOT EXISTS student_logs(
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    action VARCHAR(10),
    action_time DATETIME,
    old_data TEXT,
    new_data TEXT
);

-- Trigger for INSERT
DELIMITER $$
CREATE TRIGGER log_student_insert
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_logs(student_id, action, action_time, new_data)
    VALUES (NEW.id, 'INSERT', NOW(), CONCAT('Name:', NEW.name, ', Email:', NEW.email, ', Dept:', NEW.department, ', DOB:', NEW.dob, ', Phone:', NEW.phone));
END$$
DELIMITER ;

-- Trigger for UPDATE
DELIMITER $$
CREATE TRIGGER log_student_update
AFTER UPDATE ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_logs(student_id, action, action_time, old_data, new_data)
    VALUES (
        OLD.id,
        'UPDATE',
        NOW(),
        CONCAT('Name:', OLD.name, ', Email:', OLD.email, ', Dept:', OLD.department, ', DOB:', OLD.dob, ', Phone:', OLD.phone),
        CONCAT('Name:', NEW.name, ', Email:', NEW.email, ', Dept:', NEW.department, ', DOB:', NEW.dob, ', Phone:', NEW.phone)
    );
END$$
DELIMITER ;

-- View for today's activity
CREATE OR REPLACE VIEW today_student_activity AS
SELECT *
FROM student_logs
WHERE DATE(action_time) = CURDATE();