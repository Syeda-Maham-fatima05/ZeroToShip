# Smart Local Service Orchestrator – Phase 1

## Overview

Smart Local Service Orchestrator is an AI-powered platform that connects users with local service providers such as plumbers, electricians, tutors, AC technicians, carpenters, painters, cleaners, mechanics, CCTV installers, and network technicians.

This repository contains **Phase 1** of the project, which focuses on designing and validating a relational database using MySQL.

---

## Phase 1 Objectives

- Design a relational database schema.
- Create tables with appropriate primary and foreign keys.
- Populate the database with realistic mock data.
- Validate the database using SQL queries.

---

## Project Structure

```
Phase 1/
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── validation.sql
│
└── README.md
```

---

## Database Schema

The database contains three tables:

### Users

Stores customer information.

- user_id
- name
- email
- password_hash
- phone_number
- neighborhood_zone
- created_at

### Providers

Stores service provider information.

- provider_id
- name
- category
- neighborhood_zone
- rating
- phone_number
- experience_years
- availability
- service_price
- description

### Bookings

Stores booking information.

- booking_id
- user_id (Foreign Key)
- provider_id (Foreign Key)
- booking_time
- status
- customer_address
- notes
- created_at

---

## Mock Seed Data

The database includes realistic sample data for testing.

- 50 Users
- 50 Service Providers
- 80 Bookings

Service categories include:

- Plumber
- Electrician
- Tutor
- AC Technician
- Carpenter
- Painter
- Cleaner
- Mechanic
- CCTV Installer
- Network Technician

Sample service areas include:

- Gulshan-e-Iqbal
- Gulistan-e-Johar
- Clifton
- DHA Phase 5
- DHA Phase 6
- PECHS
- Bahadurabad
- Nazimabad
- North Nazimabad
- Korangi
- Malir
- Federal B Area

---

## Validation

The `validation.sql` file contains queries to verify:

- Table creation
- Data insertion
- Foreign key relationships
- Filtering
- Sorting
- Aggregation
- JOIN operations
- Booking status
- Provider statistics

---

## How to Run

1. Create a new MySQL database:

```sql
CREATE DATABASE smart_service;
USE smart_service;
```

2. Execute the SQL files in the following order:

- `schema.sql`
- `seed.sql`
- `validation.sql`

---

## Future Work

Upcoming phases will include:

- FastAPI backend
- REST APIs
- AI-based intent extraction
- Provider recommendation
- Booking orchestration
- React Native mobile application

---

Summer Coding Activity 2026

CIS Community, NED University
