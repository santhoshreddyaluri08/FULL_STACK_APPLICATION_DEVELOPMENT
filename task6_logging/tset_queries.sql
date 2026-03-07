USE audit_db;

-- Insert student (should trigger INSERT log)
INSERT INTO students(name,email,dob,department,phone)
VALUES('Alice','alice@example.com','2005-01-01','CSE','9999999999');

-- Update student (should trigger UPDATE log)
UPDATE students SET phone='8888888888' WHERE name='Alice';

-- View all logs
SELECT * FROM student_logs;

-- View today's activity
SELECT * FROM today_student_activity;