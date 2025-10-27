package com.example.expensetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    
    @Autowired
    private ExpenseRepository expenseRepository;
    
    // Initialize sample data if database is empty
    public void initializeSampleData() {
        if (expenseRepository.count() == 0) {
            System.out.println("Initializing sample expense data...");
            
            Expense expense1 = new Expense("Lunch at Restaurant", "Food", new BigDecimal("45.50"), LocalDate.now().minusDays(1), "Had lunch with colleagues");
            Expense expense2 = new Expense("New Shoes", "Shopping", new BigDecimal("120.00"), LocalDate.now().minusDays(2), "Bought new running shoes");
            Expense expense3 = new Expense("Internet Bill", "Bills", new BigDecimal("85.00"), LocalDate.now().minusDays(3), "Monthly internet subscription");
            Expense expense4 = new Expense("Flight Tickets", "Travel", new BigDecimal("200.00"), LocalDate.now().minusDays(4), "Flight to Mumbai for business trip");
            Expense expense5 = new Expense("Groceries", "Food", new BigDecimal("35.00"), LocalDate.now().minusDays(5), "Weekly grocery shopping");
            
            expenseRepository.save(expense1);
            expenseRepository.save(expense2);
            expenseRepository.save(expense3);
            expenseRepository.save(expense4);
            expenseRepository.save(expense5);
            
            System.out.println("Sample data initialized with 5 expenses");
        }
    }
    
    // Get all expenses
    public List<Expense> getAllExpenses() {
        // Initialize sample data if needed
        initializeSampleData();
        return expenseRepository.findAll();
    }
    
    // Get expense by ID
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }
    
    // Create a new expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }
    
    // Update an existing expense
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        
        if (optionalExpense.isPresent()) {
            Expense expense = optionalExpense.get();
            expense.setTitle(expenseDetails.getTitle());
            expense.setCategory(expenseDetails.getCategory());
            expense.setAmount(expenseDetails.getAmount());
            expense.setDate(expenseDetails.getDate());
            expense.setDescription(expenseDetails.getDescription());
            
            return expenseRepository.save(expense);
        } else {
            throw new RuntimeException("Expense not found with id: " + id);
        }
    }
    
    // Delete an expense
    public void deleteExpense(Long id) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        
        if (optionalExpense.isPresent()) {
            expenseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Expense not found with id: " + id);
        }
    }
    
    // Check if expense exists
    public boolean expenseExists(Long id) {
        return expenseRepository.existsById(id);
    }
    
    // Get expenses by category
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }
    
    // Get all expenses ordered by date (newest first)
    public List<Expense> getAllExpensesOrderedByDate() {
        return expenseRepository.findAllByOrderByDateDesc();
    }
}
