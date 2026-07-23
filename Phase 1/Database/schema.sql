USE smart_service;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE Providers (
    provider_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    neighborhood_zone VARCHAR(100) NOT NULL,
    rating DECIMAL(2,1) NOT NULL
);

CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    provider_id INT NOT NULL,
    booking_time DATETIME NOT NULL,
    status ENUM('Pending','Confirmed','Completed','Cancelled') DEFAULT 'Pending',

    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (provider_id) REFERENCES Providers(provider_id)
);


ALTER TABLE Providers
ADD COLUMN phone_number VARCHAR(15),
ADD COLUMN experience_years INT,
ADD COLUMN availability ENUM('Morning','Afternoon','Evening','Full Day'),
ADD COLUMN service_price DECIMAL(10,2);


ALTER TABLE Bookings
ADD COLUMN customer_address VARCHAR(255),
ADD COLUMN notes VARCHAR(255),
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


ALTER TABLE Users
ADD COLUMN phone_number VARCHAR(15),
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Users
ADD COLUMN neighborhood_zone VARCHAR(100);


ALTER TABLE Providers
ADD COLUMN  description VARCHAR(500);