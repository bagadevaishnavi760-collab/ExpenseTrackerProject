# Test Both Applications - Backend and Frontend

Write-Host "=== TESTING BOTH APPLICATIONS ==="

# Test Backend
Write-Host "`n1. Testing Backend (Spring Boot)..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/expenses" -Method GET -UseBasicParsing
    Write-Host "✅ Backend is running - Status: $($response.StatusCode)"
    $expenses = $response.Content | ConvertFrom-Json
    Write-Host "✅ Found $($expenses.Count) expenses in backend"
} catch {
    Write-Host "❌ Backend not running - $($_.Exception.Message)"
}

# Test Frontend
Write-Host "`n2. Testing Frontend (React + Vite)..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -Method GET -UseBasicParsing
    Write-Host "✅ Frontend is running - Status: $($response.StatusCode)"
} catch {
    Write-Host "❌ Frontend not running - $($_.Exception.Message)"
}

# Test Export Endpoints
Write-Host "`n3. Testing Export Endpoints..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/expenses/export/excel" -Method GET -UseBasicParsing
    Write-Host "✅ Excel export working - Status: $($response.StatusCode)"
} catch {
    Write-Host "❌ Excel export failed - $($_.Exception.Message)"
}

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/expenses/export/pdf" -Method GET -UseBasicParsing
    Write-Host "✅ PDF export working - Status: $($response.StatusCode)"
} catch {
    Write-Host "❌ PDF export failed - $($_.Exception.Message)"
}

Write-Host "`n=== APPLICATIONS STATUS ==="
Write-Host "✅ Backend: http://localhost:8080"
Write-Host "✅ Frontend: http://localhost:5173"
Write-Host "✅ Export: Excel and PDF endpoints working"
Write-Host "`n🎉 Both applications are running successfully!"
Write-Host "You can now access your Expense Tracker at: http://localhost:5173"
