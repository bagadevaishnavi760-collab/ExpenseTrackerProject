# API Testing Examples

Here are some examples of how to test the Expense Tracker API endpoints:

## 1. Create a New Expense

```bash
curl -X POST http://localhost:8080/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Coffee",
    "category": "Food & Drink",
    "amount": 4.50,
    "date": "2024-01-15",
    "description": "Morning coffee at Starbucks"
  }'
```

## 2. Get All Expenses

```bash
curl -X GET http://localhost:8080/api/expenses
```

## 3. Get Expense by ID

```bash
curl -X GET http://localhost:8080/api/expenses/1
```

## 4. Update an Expense

```bash
curl -X PUT http://localhost:8080/api/expenses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Coffee",
    "category": "Food & Drink",
    "amount": 5.00,
    "date": "2024-01-15",
    "description": "Updated description"
  }'
```

## 5. Delete an Expense

```bash
curl -X DELETE http://localhost:8080/api/expenses/1
```

## 6. Get Expenses by Category

```bash
curl -X GET http://localhost:8080/api/expenses/category/Food
```

## Sample JSON Responses

### Successful POST Response (201 Created):
```json
{
  "id": 1,
  "title": "Coffee",
  "category": "Food & Drink",
  "amount": 4.50,
  "date": "2024-01-15",
  "description": "Morning coffee at Starbucks"
}
```

### GET All Expenses Response (200 OK):
```json
[
  {
    "id": 1,
    "title": "Coffee",
    "category": "Food & Drink",
    "amount": 4.50,
    "date": "2024-01-15",
    "description": "Morning coffee at Starbucks"
  },
  {
    "id": 2,
    "title": "Gas",
    "category": "Transportation",
    "amount": 45.00,
    "date": "2024-01-14",
    "description": "Fuel for car"
  }
]
```

## Error Responses

### 404 Not Found (when expense doesn't exist):
```json
{
  "timestamp": "2024-01-15T10:30:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "path": "/api/expenses/999"
}
```

### 400 Bad Request (validation error):
```json
{
  "timestamp": "2024-01-15T10:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "path": "/api/expenses"
}
```

## Frontend Integration

Your frontend can make requests to these endpoints. The CORS configuration allows requests from any origin, so you can test with your HTML/CSS/JS frontend running on any port.

Example JavaScript fetch:
```javascript
// Get all expenses
fetch('http://localhost:8080/api/expenses')
  .then(response => response.json())
  .then(data => console.log(data));

// Create a new expense
fetch('http://localhost:8080/api/expenses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Expense',
    category: 'Misc',
    amount: 25.00,
    date: '2024-01-15',
    description: 'Test expense'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```
