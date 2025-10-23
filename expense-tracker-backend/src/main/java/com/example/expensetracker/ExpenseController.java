package com.example.expensetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
    
    @Autowired
    private ExpenseService expenseService;
    
    // GET /api/expenses - fetch all expenses
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        try {
            List<Expense> expenses = expenseService.getAllExpenses();
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // GET /api/expenses/{id} - fetch expense by ID
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        try {
            Optional<Expense> expense = expenseService.getExpenseById(id);
            if (expense.isPresent()) {
                return ResponseEntity.ok(expense.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // POST /api/expenses - add a new expense
    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) {
        try {
            Expense createdExpense = expenseService.createExpense(expense);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // PUT /api/expenses/{id} - update an expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expenseDetails) {
        try {
            if (!expenseService.expenseExists(id)) {
                return ResponseEntity.notFound().build();
            }
            
            Expense updatedExpense = expenseService.updateExpense(id, expenseDetails);
            return ResponseEntity.ok(updatedExpense);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // DELETE /api/expenses/{id} - delete an expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        try {
            if (!expenseService.expenseExists(id)) {
                return ResponseEntity.notFound().build();
            }
            
            expenseService.deleteExpense(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // GET /api/expenses/category/{category} - get expenses by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Expense>> getExpensesByCategory(@PathVariable String category) {
        try {
            List<Expense> expenses = expenseService.getExpensesByCategory(category);
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
