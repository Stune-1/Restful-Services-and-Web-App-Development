Full Stack Developer Assignment: Equipment Distribution System for Rwanda TVET Board (RTB)
Background
Rwanda TVET Board (RTB) is a government institution established in 2020 by presidential order No N° 123/01 of 15/10/2020, published in Official Gazette N° 32 bis of 19/10/2020. The institution operates under the Ministry of Education and is at the forefront of promoting Technical and Vocational Education and Training (TVET) from level one to level five of the Rwanda TVET Qualification Framework.

The organization requires an Equipment Distribution System to manage the allocation of laptops to employees. The system will track employee information along with the laptop details assigned to them.

System Requirements
Employee Information Structure
Each employee record should contain the following fields:

ID (employee identifier)

First name

Last name

National identity number

Telephone

Email

Department

Position

Laptop manufacturer

Laptop model

Laptop serial number

Example Record: 101, Samanta ISHIMWE, 12000710913307, 07888888888, samanta@gmail.com, Human Resource, Manager, HP, Envy, 3400

Technical Specifications
1. Design Phase (Figma)
You are required to create the following mockups using Figma:

Login Page: Design the interface that users will use to access the system

Employee Registration Form: Design the form for adding new employees to the system

Employee Listing Page: Design a paginated table view that displays all registered employees

2. Frontend Development (React.js)
Build the frontend application using React.js

Implement the designs created in Figma

Ensure the interface is responsive and visually appealing

Implement pagination for the employee listing table

3. Backend Development
Choose either:

Node.js (any framework)

PHP (any framework)

4. Database
Use either:

MySQL

PostgreSQL

5. Authentication & Authorization
Implement JWT (JSON Web Tokens) for authentication and authorization

All APIs except Signup and Login should be accessible only to logged-in administrators

Handle CORS properly and implement protection against common web security attacks

6. API Documentation
Document all backend APIs using Swagger UI

7. User Management
Admin users should be created manually (using Postman or directly in the database) - no frontend interface for signup required

Users need to sign in using email as username and password

8. Data Validation
Implement proper exception handling

Ensure all data validations are in place

9. Bonus Points
Good-looking and responsive design

Clean code architecture

Proper error handling and user feedback

Project Tasks Summary
Design:

Create login page mockup in Figma

Design employee registration form in Figma

Design paginated employee listing page in Figma

Development:

Build React.js frontend implementing the Figma designs

Develop backend APIs with proper authentication

Set up database with the required employee table structure

Document APIs using Swagger UI

Implementation:

Manually create admin users (using Postman/DBMS)

Implement login functionality

Build employee registration form (accessible only to logged-in admins)

Add at least three employee records through the interface

Display all saved records in a paginated table