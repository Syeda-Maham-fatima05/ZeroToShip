USE smart_service;

-- View all users
SELECT * FROM Users;

-- View all providers
SELECT * FROM Providers;

-- View all bookings
SELECT * FROM Bookings;

-- Find all electricians
SELECT * FROM Providers
WHERE category='electrician';

-- Find all providers in Gulshan
SELECT * FROM Providers
WHERE neighborhood_zone='Gulshan';

-- Find tutors with rating above 4.8
SELECT * FROM Providers
WHERE category='tutor'
AND rating>=4.8;

-- Show booking details
SELECT
    b.booking_id,
    u.name AS Customer,
    p.name AS Provider,
    p.category,
    b.booking_time,
    b.status
FROM Bookings b
JOIN Users u ON b.user_id=u.user_id
JOIN Providers p ON b.provider_id=p.provider_id;

-- Count providers by area
SELECT neighborhood_zone, COUNT(*) AS TotalProviders
FROM Providers
GROUP BY neighborhood_zone;

-- Average rating by category
SELECT category, AVG(rating) AS AverageRating
FROM Providers
GROUP BY category;



USE smart_service;

-- =====================================================
-- BASIC VALIDATION
-- =====================================================

-- 1. Show all users
SELECT * FROM Users;

-- 2. Show all providers
SELECT * FROM Providers;

-- 3. Show all bookings
SELECT * FROM Bookings;

-- =====================================================
-- USERS
-- =====================================================

-- 4. Users from Gulshan-e-Iqbal
SELECT *
FROM Users
WHERE neighborhood_zone='Gulshan-e-Iqbal';

-- 5. Total users
SELECT COUNT(*) AS TotalUsers
FROM Users;

-- =====================================================
-- PROVIDERS
-- =====================================================

-- 6. All electricians
SELECT *
FROM Providers
WHERE category='electrician';

-- 7. All plumbers
SELECT *
FROM Providers
WHERE category='plumber';

-- 8. All tutors
SELECT *
FROM Providers
WHERE category='tutor';

-- 9. Providers in Clifton
SELECT *
FROM Providers
WHERE neighborhood_zone='Clifton';

-- 10. Providers in DHA Phase 6
SELECT *
FROM Providers
WHERE neighborhood_zone='DHA Phase 6';

-- 11. Providers available in Morning
SELECT *
FROM Providers
WHERE availability='Morning';

-- 12. Providers available Full Day
SELECT *
FROM Providers
WHERE availability='Full Day';

-- =====================================================
-- RATINGS
-- =====================================================

-- 13. Top 10 rated providers
SELECT *
FROM Providers
ORDER BY rating DESC
LIMIT 10;

-- 14. Lowest rated providers
SELECT *
FROM Providers
ORDER BY rating ASC
LIMIT 10;

-- 15. Providers with rating above 4.8
SELECT *
FROM Providers
WHERE rating>=4.8;

-- =====================================================
-- PRICE
-- =====================================================

-- 16. Cheapest providers
SELECT *
FROM Providers
ORDER BY service_price ASC;

-- 17. Most expensive providers
SELECT *
FROM Providers
ORDER BY service_price DESC;

-- 18. Providers charging less than Rs.2500
SELECT *
FROM Providers
WHERE service_price<2500;

-- =====================================================
-- EXPERIENCE
-- =====================================================

-- 19. Most experienced providers
SELECT *
FROM Providers
ORDER BY experience_years DESC;

-- 20. Providers with 10+ years experience
SELECT *
FROM Providers
WHERE experience_years>=10;

-- =====================================================
-- GROUP BY
-- =====================================================

-- 21. Providers in each category
SELECT
category,
COUNT(*) AS TotalProviders
FROM Providers
GROUP BY category;

-- 22. Providers in each area
SELECT
neighborhood_zone,
COUNT(*) AS TotalProviders
FROM Providers
GROUP BY neighborhood_zone;

-- 23. Average rating by category
SELECT
category,
ROUND(AVG(rating),2) AS AverageRating
FROM Providers
GROUP BY category;

-- 24. Average service price by category
SELECT
category,
ROUND(AVG(service_price),2) AS AveragePrice
FROM Providers
GROUP BY category;

-- =====================================================
-- BOOKINGS
-- =====================================================

-- 25. Pending bookings
SELECT *
FROM Bookings
WHERE status='Pending';

-- 26. Confirmed bookings
SELECT *
FROM Bookings
WHERE status='Confirmed';

-- 27. Completed bookings
SELECT *
FROM Bookings
WHERE status='Completed';

-- 28. Cancelled bookings
SELECT *
FROM Bookings
WHERE status='Cancelled';

-- =====================================================
-- JOINS
-- =====================================================

-- 29. Complete booking history
SELECT
b.booking_id,
u.name AS Customer,
u.neighborhood_zone AS CustomerArea,
p.name AS Provider,
p.category,
p.neighborhood_zone AS ProviderArea,
b.booking_time,
b.status
FROM Bookings b
JOIN Users u
ON b.user_id=u.user_id
JOIN Providers p
ON b.provider_id=p.provider_id
ORDER BY b.booking_time;

-- 30. Number of bookings handled by each provider
SELECT
p.name,
COUNT(b.booking_id) AS TotalBookings
FROM Providers p
LEFT JOIN Bookings b
ON p.provider_id=b.provider_id
GROUP BY p.provider_id
ORDER BY TotalBookings DESC;



-- Best-rated electrician
SELECT *
FROM Providers
WHERE category='electrician'
ORDER BY rating DESC
LIMIT 1;

-- Cheapest AC technician
SELECT *
FROM Providers
WHERE category='AC technician'
ORDER BY service_price
LIMIT 1;

-- Highest-rated tutor in Gulshan-e-Iqbal
SELECT *
FROM Providers
WHERE category='tutor'
AND neighborhood_zone='Gulshan-e-Iqbal'
ORDER BY rating DESC
LIMIT 1;

-- Count bookings by status
SELECT
status,
COUNT(*) AS Total
FROM Bookings
GROUP BY status;

-- Providers with rating above average
SELECT *
FROM Providers
WHERE rating >
(
SELECT AVG(rating)
FROM Providers
);