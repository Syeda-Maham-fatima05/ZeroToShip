USE smart_service;

INSERT INTO Users (name,email,password_hash) VALUES
('Ali Khan','ali@gmail.com','hash001'),
('Sara Ahmed','sara@gmail.com','hash002'),
('Ahmed Raza','ahmed@gmail.com','hash003'),
('Fatima Noor','fatima@gmail.com','hash004'),
('Hamza Siddiqui','hamza@gmail.com','hash005');

INSERT INTO Providers (name,category,neighborhood_zone,rating) VALUES
('Usman Electric Works','electrician','Gulshan',4.8),
('Hassan Plumbing','plumber','Johar',4.6),
('Bilal Tutor','tutor','Gulshan',4.9),
('Quick Electric','electrician','PECHS',4.5),
('Master Plumber','plumber','Clifton',4.7),
('Ayesha Tutor','tutor','DHA',5.0),
('Karachi Electric','electrician','Johar',4.4),
('Home Repair','plumber','Gulistan-e-Johar',4.3);

INSERT INTO Bookings (user_id,provider_id,booking_time,status) VALUES
(1,2,'2026-07-23 10:00:00','Pending'),
(2,1,'2026-07-23 14:00:00','Confirmed'),
(3,3,'2026-07-24 11:00:00','Completed');



-- =========================================================
-- Additional Users (50)
-- Add these to the bottom of database/seed.sql
-- =========================================================

INSERT INTO Users
(name, email, password_hash, phone_number, neighborhood_zone)
VALUES
('Ali Khan','ali.khan01@gmail.com','hash001','03011234567','Gulshan-e-Iqbal'),
('Sara Ahmed','sara.ahmed01@gmail.com','hash002','03021234567','Gulistan-e-Johar'),
('Ahmed Raza','ahmed.raza01@gmail.com','hash003','03031234567','DHA Phase 6'),
('Fatima Noor','fatima.noor01@gmail.com','hash004','03041234567','Clifton'),
('Hamza Siddiqui','hamza.siddiqui01@gmail.com','hash005','03051234567','PECHS'),
('Ayesha Malik','ayesha.malik01@gmail.com','hash006','03061234567','North Nazimabad'),
('Muhammad Usman','usman01@gmail.com','hash007','03071234567','Nazimabad'),
('Hira Shah','hira.shah01@gmail.com','hash008','03081234567','Federal B Area'),
('Zain Raza','zain.raza01@gmail.com','hash009','03091234567','Korangi'),
('Mahnoor Tariq','mahnoor01@gmail.com','hash010','03101234567','Malir'),

('Bilal Hussain','bilal.hussain01@gmail.com','hash011','03111234567','Bahadurabad'),
('Noor Fatima','noor.fatima01@gmail.com','hash012','03121234567','Tariq Road'),
('Abdullah Qureshi','abdullah01@gmail.com','hash013','03131234567','Scheme 33'),
('Maham Fatima','maham01@gmail.com','hash014','03141234567','Shah Faisal Colony'),
('Areeba Khan','areeba01@gmail.com','hash015','03151234567','Garden East'),
('Taha Ahmed','taha.ahmed01@gmail.com','hash016','03161234567','DHA Phase 5'),
('Sana Ali','sana.ali01@gmail.com','hash017','03171234567','Gulshan-e-Iqbal'),
('Hassan Raza','hassan.raza01@gmail.com','hash018','03181234567','Clifton'),
('Iqra Siddiqui','iqra01@gmail.com','hash019','03191234567','PECHS'),
('Danish Khan','danish01@gmail.com','hash020','03201234567','North Nazimabad'),

('Saad Ahmed','saad01@gmail.com','hash021','03211234567','Nazimabad'),
('Anum Sheikh','anum01@gmail.com','hash022','03221234567','Federal B Area'),
('Farhan Malik','farhan01@gmail.com','hash023','03231234567','Korangi'),
('Kiran Noor','kiran01@gmail.com','hash024','03241234567','Malir'),
('Usama Javed','usama01@gmail.com','hash025','03251234567','Bahadurabad'),
('Komal Aslam','komal01@gmail.com','hash026','03261234567','Tariq Road'),
('Muneeb Akhtar','muneeb01@gmail.com','hash027','03271234567','Scheme 33'),
('Laiba Tariq','laiba01@gmail.com','hash028','03281234567','Shah Faisal Colony'),
('Shahzaib Ali','shahzaib01@gmail.com','hash029','03291234567','Garden East'),
('Rimsha Ahmed','rimsha01@gmail.com','hash030','03301234567','DHA Phase 2'),

('Haris Khan','haris01@gmail.com','hash031','03311234567','DHA Phase 1'),
('Maryam Iqbal','maryam01@gmail.com','hash032','03321234567','Gulistan-e-Johar'),
('Fahad Sheikh','fahad01@gmail.com','hash033','03331234567','Gulshan-e-Iqbal'),
('Amna Yousuf','amna01@gmail.com','hash034','03341234567','Clifton'),
('Talha Raza','talha01@gmail.com','hash035','03351234567','PECHS'),
('Hafsa Malik','hafsa01@gmail.com','hash036','03361234567','North Nazimabad'),
('Owais Ahmed','owais01@gmail.com','hash037','03371234567','Korangi'),
('Eman Fatima','eman01@gmail.com','hash038','03381234567','Malir'),
('Waleed Khan','waleed01@gmail.com','hash039','03391234567','Federal B Area'),
('Rabia Noor','rabia01@gmail.com','hash040','03401234567','Nazimabad'),

('Shayan Siddiqui','shayan01@gmail.com','hash041','03411234567','Bahadurabad'),
('Nimra Ali','nimra01@gmail.com','hash042','03421234567','Tariq Road'),
('Ammar Hussain','ammar01@gmail.com','hash043','03431234567','Scheme 33'),
('Sidra Khan','sidra01@gmail.com','hash044','03441234567','Garden East'),
('Zohaib Ahmed','zohaib01@gmail.com','hash045','03451234567','DHA Phase 6'),
('Mehwish Raza','mehwish01@gmail.com','hash046','03461234567','DHA Phase 5'),
('Huzaifa Khan','huzaifa01@gmail.com','hash047','03471234567','Gulistan-e-Johar'),
('Bushra Malik','bushra01@gmail.com','hash048','03481234567','Gulshan-e-Iqbal'),
('Adnan Sheikh','adnan01@gmail.com','hash049','03491234567','Clifton'),
('Alina Fatima','alina01@gmail.com','hash050','03501234567','PECHS');



-- =====================================================
-- Providers 1 - 25
-- =====================================================

INSERT INTO Providers
(name, category, neighborhood_zone, rating, phone_number, experience_years, availability, service_price, description)
VALUES

('Ali Electric Works','electrician','Gulshan-e-Iqbal',4.9,'03011234501',10,'Full Day',1800,'Certified residential and commercial electrician.'),

('Bright Spark Electric','electrician','PECHS',4.8,'03011234502',8,'Morning',1600,'Home wiring and electrical maintenance specialist.'),

('Karachi Electric Solutions','electrician','Clifton',4.7,'03011234503',12,'Evening',2200,'Experienced electrician for homes and offices.'),

('Noor Electrical Services','electrician','North Nazimabad',4.6,'03011234504',6,'Afternoon',1500,'Electrical repair and installation expert.'),

('PowerFix Electricians','electrician','DHA Phase 6',4.9,'03011234505',15,'Full Day',2500,'Premium electrical maintenance services.'),

('Hassan Plumbing Experts','plumber','Gulistan-e-Johar',4.8,'03011234506',9,'Morning',2000,'Leakage and pipe installation specialist.'),

('AquaFix Plumbing','plumber','Clifton',4.7,'03011234507',11,'Full Day',2300,'Professional plumbing and drainage services.'),

('PipeCare Karachi','plumber','PECHS',4.5,'03011234508',7,'Evening',1700,'Affordable plumbing repairs.'),

('BlueFlow Plumbers','plumber','Malir',4.6,'03011234509',10,'Afternoon',1900,'Bathroom and kitchen plumbing expert.'),

('SmartPipe Solutions','plumber','Korangi',4.8,'03011234510',13,'Full Day',2400,'Complete residential plumbing solutions.'),

('Noor Home Tutors','tutor','Gulshan-e-Iqbal',5.0,'03011234511',8,'Evening',3000,'Mathematics and Science tutor for O/A Levels.'),

('Bright Minds Academy','tutor','DHA Phase 5',4.9,'03011234512',6,'Afternoon',2800,'Experienced home tuition services.'),

('Alpha Tutors','tutor','North Nazimabad',4.8,'03011234513',5,'Evening',2500,'Computer Science and Mathematics tutor.'),

('EduPoint Tutors','tutor','Federal B Area',4.7,'03011234514',9,'Morning',3200,'Professional academic coaching.'),

('LearnHub Karachi','tutor','Bahadurabad',4.9,'03011234515',11,'Full Day',3500,'Personalized tutoring for school and college students.'),

('Cool Breeze AC','AC technician','DHA Phase 6',4.8,'03011234516',12,'Morning',2500,'AC installation and maintenance specialist.'),

('ChillTech Services','AC technician','Clifton',4.7,'03011234517',10,'Afternoon',2300,'Split and inverter AC repair expert.'),

('AirCare Karachi','AC technician','PECHS',4.6,'03011234518',7,'Full Day',2100,'Complete AC servicing solutions.'),

('FrostFix','AC technician','Gulistan-e-Johar',4.9,'03011234519',13,'Evening',2700,'Cooling system diagnostics and repair.'),

('Climate Experts','AC technician','Nazimabad',4.8,'03011234520',15,'Full Day',2900,'Commercial and residential AC technician.'),

('WoodCraft Karachi','carpenter','Gulshan-e-Iqbal',4.8,'03011234521',14,'Morning',3500,'Custom furniture and woodwork specialist.'),

('Master Carpentry','carpenter','Clifton',4.7,'03011234522',12,'Full Day',3800,'Doors, cabinets and furniture repair.'),

('FineWood Interiors','carpenter','DHA Phase 5',4.9,'03011234523',16,'Afternoon',4200,'Luxury furniture and interior woodwork.'),

('Elite Furniture Works','carpenter','PECHS',4.6,'03011234524',9,'Evening',3300,'Furniture assembly and repair services.'),

('Home Wood Experts','carpenter','North Nazimabad',4.8,'03011234525',11,'Full Day',3600,'Professional wooden furniture solutions.');



-- =====================================================
-- Providers 26 - 50
-- =====================================================

INSERT INTO Providers
(name, category, neighborhood_zone, rating, phone_number, experience_years, availability, service_price, description)
VALUES

('ColorCraft Painters','painter','Gulshan-e-Iqbal',4.8,'03011234526',10,'Full Day',4500,'Professional interior and exterior painting services.'),

('Royal Paint Solutions','painter','Clifton',4.7,'03011234527',8,'Morning',4200,'Residential and commercial painting experts.'),

('Fresh Coat Painters','painter','PECHS',4.6,'03011234528',7,'Afternoon',3900,'Affordable home painting specialists.'),

('Prime Wall Designers','painter','DHA Phase 6',4.9,'03011234529',12,'Full Day',5200,'Premium wall textures and decorative painting.'),

('Bright Colors Karachi','painter','North Nazimabad',4.7,'03011234530',9,'Evening',4100,'Complete home renovation painting services.'),

('Sparkle Cleaning Services','cleaner','Gulistan-e-Johar',4.9,'03011234531',8,'Morning',2500,'Deep cleaning for homes and offices.'),

('Neat & Clean Karachi','cleaner','Malir',4.6,'03011234532',6,'Full Day',2200,'Professional housekeeping and sanitization.'),

('PureHome Cleaners','cleaner','Korangi',4.7,'03011234533',7,'Afternoon',2300,'Kitchen, bathroom and apartment cleaning.'),

('FreshSpace Cleaning','cleaner','Federal B Area',4.8,'03011234534',10,'Evening',2700,'Move-in and move-out cleaning services.'),

('Elite Cleaning Crew','cleaner','Bahadurabad',5.0,'03011234535',12,'Full Day',3000,'Premium residential and commercial cleaning.'),

('AutoCare Mechanics','mechanic','PECHS',4.8,'03011234536',11,'Morning',3500,'General car maintenance and engine diagnostics.'),

('City Auto Garage','mechanic','Clifton',4.7,'03011234537',9,'Full Day',3800,'Brake, suspension and oil change specialists.'),

('FastFix Mechanics','mechanic','Korangi',4.6,'03011234538',8,'Afternoon',3200,'Quick automotive repair services.'),

('DrivePro Workshop','mechanic','Nazimabad',4.9,'03011234539',14,'Full Day',4500,'Complete engine overhaul and repair.'),

('Prime Auto Solutions','mechanic','DHA Phase 5',4.8,'03011234540',13,'Evening',4300,'Professional vehicle servicing and diagnostics.'),

('Secure Vision CCTV','CCTV installer','Gulshan-e-Iqbal',4.9,'03011234541',10,'Morning',5500,'Home and office CCTV installation specialist.'),

('SafeHome Security','CCTV installer','PECHS',4.8,'03011234542',9,'Full Day',5200,'IP camera and DVR installation services.'),

('VisionTech CCTV','CCTV installer','North Nazimabad',4.7,'03011234543',8,'Afternoon',4900,'Complete surveillance system setup.'),

('Guardian Security Systems','CCTV installer','DHA Phase 6',5.0,'03011234544',15,'Full Day',6500,'Advanced CCTV and security solutions.'),

('Smart Surveillance','CCTV installer','Clifton',4.8,'03011234545',11,'Evening',5600,'Wireless and smart camera installations.'),

('NetConnect Solutions','internet technician','Federal B Area',4.8,'03011234546',10,'Morning',2000,'WiFi setup and internet troubleshooting.'),

('FiberLink Experts','internet technician','Gulistan-e-Johar',4.9,'03011234547',12,'Full Day',2500,'Fiber optic installation and maintenance.'),

('Broadband Masters','internet technician','DHA Phase 5',4.7,'03011234548',8,'Afternoon',2200,'Router setup and network optimization.'),

('WiFi Care Karachi','internet technician','Malir',4.6,'03011234549',7,'Evening',1800,'Home WiFi repair and configuration.'),

('Rapid Net Services','internet technician','Bahadurabad',4.8,'03011234550',9,'Full Day',2400,'Internet connectivity and LAN solutions.');



-- =====================================================
-- BOOKINGS 1–30
-- =====================================================

INSERT INTO Bookings
(user_id, provider_id, booking_time, status, customer_address, notes)
VALUES

(1,1,'2026-07-24 09:00:00','Confirmed','House 12, Block 10, Gulshan-e-Iqbal','Repair bedroom wiring.'),
(2,6,'2026-07-24 10:30:00','Pending','House 45, Johar Block 13','Kitchen sink leakage.'),
(3,11,'2026-07-24 04:00:00','Completed','Apartment 5B, Clifton','Math tuition for O Levels.'),
(4,16,'2026-07-25 11:00:00','Confirmed','House 90, DHA Phase 6','AC servicing before summer.'),
(5,21,'2026-07-25 02:00:00','Pending','Flat 3C, PECHS','Repair wooden wardrobe.'),

(6,26,'2026-07-25 09:30:00','Completed','House 20, Gulshan-e-Iqbal','Paint living room walls.'),
(7,31,'2026-07-25 03:00:00','Confirmed','House 7, Malir','Deep cleaning service.'),
(8,36,'2026-07-26 10:00:00','Pending','Apartment 8A, Clifton','Car engine inspection.'),
(9,41,'2026-07-26 01:30:00','Confirmed','House 51, DHA Phase 6','Install CCTV cameras.'),
(10,46,'2026-07-26 05:00:00','Completed','Office 15, Federal B Area','WiFi troubleshooting.'),

(11,2,'2026-07-27 09:00:00','Pending','House 33, PECHS','Replace switch board.'),
(12,7,'2026-07-27 11:00:00','Confirmed','House 18, Clifton','Bathroom pipe replacement.'),
(13,12,'2026-07-27 04:30:00','Completed','Apartment 2D, DHA Phase 5','Physics tuition.'),
(14,17,'2026-07-28 12:00:00','Cancelled','House 60, Clifton','AC installation postponed.'),
(15,22,'2026-07-28 03:00:00','Confirmed','House 88, Gulshan-e-Iqbal','Custom bookshelf.'),

(16,27,'2026-07-28 10:00:00','Completed','House 14, North Nazimabad','Exterior house painting.'),
(17,32,'2026-07-29 09:30:00','Pending','Flat 9A, Korangi','Apartment cleaning.'),
(18,37,'2026-07-29 02:00:00','Confirmed','House 25, Nazimabad','Oil and filter change.'),
(19,42,'2026-07-29 05:00:00','Completed','Office 8, PECHS','Install office CCTV.'),
(20,47,'2026-07-30 11:00:00','Pending','House 17, Gulistan-e-Johar','Fiber internet setup.'),

(21,3,'2026-07-30 09:00:00','Confirmed','House 70, Clifton','Electrical inspection.'),
(22,8,'2026-07-30 01:00:00','Completed','House 5, Korangi','Drain blockage removal.'),
(23,13,'2026-07-31 04:00:00','Confirmed','Apartment 7B, Federal B Area','Computer Science tuition.'),
(24,18,'2026-07-31 10:30:00','Pending','House 19, PECHS','AC gas refill.'),
(25,23,'2026-07-31 03:00:00','Completed','House 81, DHA Phase 5','Dining table repair.'),

(26,28,'2026-08-01 09:30:00','Confirmed','House 9, Gulshan-e-Iqbal','Bedroom repainting.'),
(27,33,'2026-08-01 02:30:00','Pending','Apartment 6C, Malir','Office cleaning.'),
(28,38,'2026-08-01 11:00:00','Completed','House 43, Korangi','Brake pad replacement.'),
(29,43,'2026-08-02 01:30:00','Confirmed','Office 12, North Nazimabad','Install CCTV DVR.'),
(30,48,'2026-08-02 04:00:00','Pending','House 28, Bahadurabad','Router configuration and WiFi optimization.');

-- =====================================================
-- BOOKINGS 31–55
-- =====================================================

INSERT INTO Bookings
(user_id, provider_id, booking_time, status, customer_address, notes)
VALUES
(31,4,'2026-08-02 09:30:00','Completed','House 14, DHA Phase 5','Install ceiling fan wiring.'),
(32,9,'2026-08-02 11:00:00','Confirmed','House 22, Malir','Repair bathroom leakage.'),
(33,14,'2026-08-02 03:00:00','Pending','Apartment 11B, Bahadurabad','Chemistry tuition for intermediate student.'),
(34,19,'2026-08-03 10:00:00','Confirmed','House 77, Gulistan-e-Johar','AC cooling issue and gas refill.'),
(35,24,'2026-08-03 02:30:00','Completed','House 41, Clifton','Repair wooden dining chairs.'),
(36,29,'2026-08-03 09:00:00','Pending','House 90, North Nazimabad','Paint childrens bedroom.'),
(37,34,'2026-08-03 04:00:00','Confirmed','Flat 5C, Korangi','Complete apartment cleaning.'),
(38,39,'2026-08-04 11:30:00','Completed','House 62, Nazimabad','Replace brake pads and oil change.'),
(39,44,'2026-08-04 01:00:00','Confirmed','Office 17, DHA Phase 6','Install 6 CCTV cameras.'),
(40,49,'2026-08-04 05:00:00','Pending','House 31, Federal B Area','Internet speed optimization.'),
(41,5,'2026-08-05 09:00:00','Completed','House 15, Gulshan-e-Iqbal','Replace electrical distribution board.'),
(42,10,'2026-08-05 12:00:00','Confirmed','House 49, Korangi','Water tank pipe replacement.'),
(43,15,'2026-08-05 04:30:00','Pending','Apartment 9A, Clifton','English language tuition.'),
(44,20,'2026-08-06 10:00:00','Completed','House 81, Nazimabad','Annual AC maintenance.'),
(45,25,'2026-08-06 03:30:00','Confirmed','House 24, PECHS','Repair office furniture.'),
(46,30,'2026-08-06 09:30:00','Pending','House 65, North Nazimabad','Exterior wall painting.'),
(47,35,'2026-08-06 02:00:00','Completed','Apartment 8B, Bahadurabad','Office deep cleaning.'),
(48,40,'2026-08-07 11:00:00','Confirmed','House 92, DHA Phase 5','Engine tuning and inspection.'),
(49,45,'2026-08-07 01:30:00','Pending','Office 21, Clifton','Upgrade CCTV recording system.'),
(50,50,'2026-08-07 05:00:00','Completed','House 38, Malir','Configure dual-band WiFi router.'),
(1,6,'2026-08-08 10:00:00','Confirmed','House 12, Gulshan-e-Iqbal','Fix water leakage in kitchen.'),
(7,17,'2026-08-08 03:00:00','Pending','House 44, Clifton','Install new inverter AC.'),
(12,22,'2026-08-09 09:30:00','Completed','Apartment 2C, DHA Phase 5','Build custom study table.'),
(18,33,'2026-08-09 01:00:00','Confirmed','House 56, Korangi','Monthly office cleaning service.'),
(25,46,'2026-08-09 04:30:00','Pending','House 71, Gulistan-e-Johar','Install new fiber internet connection.');

