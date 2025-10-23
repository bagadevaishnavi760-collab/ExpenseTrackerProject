# Expense Tracker Backend

A Spring Boot REST API backend for the Expense Tracker application.

## Features

- **CRUD Operations**: Create, Read, Update, Delete expenses
- **MySQL Database**: Persistent storage with JPA/Hibernate
- **CORS Support**: Configured for frontend integration
- **Validation**: Input validation for all expense fields
- **RESTful API**: Clean REST endpoints

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/{id}` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/category/{category}` | Get expenses by category |

## Expense Model

Each expense has the following fields:
- `id` (Long) - Auto-generated primary key
- `title` (String) - Expense title (required)
- `category` (String) - Expense category (required)
- `amount` (BigDecimal) - Expense amount (required, must be positive)
- `date` (LocalDate) - Expense date (required)
- `description` (String) - Optional description

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## Setup Instructions

### 1. Database Setup

1. Install MySQL if not already installed
2. Create a database named `expense_tracker`:
   ```sql
   CREATE DATABASE expense_tracker;
   ```
3. Update database credentials in `src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 2. Running the Application

1. Navigate to the project directory:
   ```bash
   cd expense-tracker-backend
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   Or build and run the JAR:
   ```bash
   mvn clean package
   java -jar target/expense-tracker-backend-0.0.1-SNAPSHOT.jar
   ```

3. The application will start on `http://localhost:8080`

### 3. Testing the API

You can test the API using curl, Postman, or any HTTP client:

#### Create an expense:
```bash
curl -X POST http://localhost:8080/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Groceries",
    "category": "Food",
    "amount": 50.00,
    "date": "2024-01-15",
    "description": "Weekly grocery shopping"
  }'
```

#### Get all expenses:
```bash
curl -X GET http://localhost:8080/api/expenses
```

#### Update an expense:
```bash
curl -X PUT http://localhost:8080/api/expenses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Groceries",
    "category": "Food",
    "amount": 55.00,
    "date": "2024-01-15",
    "description": "Updated description"
  }'
```

#### Delete an expense:
```bash
curl -X DELETE http://localhost:8080/api/expenses/1
```

## CORS Configuration

The application is configured to allow CORS requests from any origin. This allows your frontend to make requests to the backend at `http://localhost:8080`.

## Project Structure

```
src/
├── main/
│   ├── java/com/example/expensetracker/
│   │   ├── Expense.java                 # JPA Entity
│   │   ├── ExpenseRepository.java      # Data Access Layer
│   │   ├── ExpenseService.java         # Business Logic
│   │   ├── ExpenseController.java      # REST Controller
│   │   └── ExpenseTrackerApplication.java # Main Application Class
│   └── resources/
│       └── application.properties       # Configuration
└── test/
    └── java/com/example/expensetracker/
        └── (test files)
```

## Dependencies

- Spring Boot 3.2.0
- Spring Web
- Spring Data JPA
- MySQL Connector
- Spring Boot Validation
- Spring Boot Test (for testing)
