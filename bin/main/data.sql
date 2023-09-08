--INSERT INTO calendar_event(emp_num, calendar_event_title, emp_name, start, end, description)
--VALUES
--    (4, '홍준이 - 연차 휴가 신청', '홍준이', '2023-09-01 09:00:00', '2023-09-02 18:00:00', '연차 휴가 신청'),
--    (2, '김자겸 - 리액트를 활용한 프로젝트 2차 완료', '김자겸', '2023-09-07 10:00:00', '2023-09-20 18:00:00', '리액트를 활용한 프로젝트 2차 완료'),
--    (1, '김솔비 - IT 분야 취업특강 참석', '김솔비', '2023-09-07 14:00:00', '2023-09-07 15:00:00', '국제커리어센터 방문 및 상담'),
--    (3, '조정원 - 프로젝트 관련 회의', '조정원', '2023-09-18 15:30:00', '2023-09-18 17:00:00', 'IT 분야 취업특강 참석'),
--    (4, '홍준이 - 클라이언트와의 중요한 업무 미팅', '홍준이', '2023-09-12 10:30:00', '2023-09-12 12:30:00', '프로젝트 관련 회의'),
--    (2, '김자겸 - 업무 미팅을 위한 워킹 런치', '김자겸', '2023-09-12 14:00:00', '2023-09-12 16:00:00', '클라이언트와의 중요한 업무 미팅'),
--    (3, '조정원 - 주간 업무 리뷰 및 보고', '조정원', '2023-09-12 12:00:00', '2023-09-12 13:00:00', '업무 미팅을 위한 워킹 런치'),
--    (1, '김솔비 - 일일 업무 마무리', '김솔비', '2023-09-12 17:00:00', '2023-09-12 17:30:00', '주간 업무 리뷰 및 보고'),
--    (4, '홍준이 - 마무리', '홍준이', '2023-09-12 19:00:00', '2023-09-12 20:00:00', '일일 업무 마무리'),
--    (2, '김자겸 - 클라이언트와의 저녁 약속', '김자겸', '2023-09-17 18:30:00', '2023-09-17 22:00:00', '클라이언트와의 저녁 약속'),
--    (3, '조정원 - 프로젝트 완료를 기념하는 팀 회식', '조정원', '2023-09-26 19:30:00', '2023-09-26 23:00:00', '프로젝트 완료를 기념하는 팀 회식'),
--    (1, '김솔비 - 중요한 클라이언트와의 미팅', '김솔비', '2023-09-30 09:30:00', '2023-09-30 17:00:00', '중요한 클라이언트와의 미팅');
--
----------------vacation 기본 제공-----------
--INSERT INTO vacation 
--(emp_name, dept, position, vaca_type, vaca_start, vaca_end, vaca_reason, vaca_etc) 
--VALUES 
--
--('김솔비', '개발팀', '사원', '특별 휴가', CURRENT_DATE, CURRENT_DATE, '꽈당', '1일'),
--('홍준이', '개발팀', '사원', '휴가', CURRENT_DATE, CURRENT_DATE, '정모', '1일'),
--('김자겸', '개발팀', '사원', '일반 휴가', CURRENT_DATE, CURRENT_DATE, '생일', '1일'),
--('조정원', '개발팀', '사원', '병가', CURRENT_DATE, CURRENT_DATE, '턱 날아감', '1일');


--INSERT INTO staff
--(emp_id, emp_pwd, dept, position, emp_name, birth_date, phone_number, address, email,
--bank_name,
--account_number)
--VALUES ('a01', '1234', 'IT', '사장', 'John Doe', '1990-01-01',
--'1234567890',
--'123 Main St',
--'john@example.com',
--'Bank A',
--'123456789');

--ALTER TABLE staff MODIFY emp_num INT AUTO_INCREMENT;
--INSERT INTO staff
--(emp_num, emp_id, emp_pwd, dept, position, emp_name,
--birth_date,
--phone_number,
--address,
--email,
--bank_name,
--account_number)
--VALUES (1,'a01', '1234', 'IT', '사장', 'John Doe',
--'1990-01-01',
--'1234567890',
--'123 Main St',
--'john@example.com',
--'Bank A',
--'123456789');
--
--INSERT INTO role (staff_id,
--authority_name)
--VALUES ((SELECT emp_num FROM staff WHERE emp_id = 'a01'),
--'ROLE_ADMIN');
