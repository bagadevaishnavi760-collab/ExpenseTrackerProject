package com.example.expensetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    
    @Autowired
    private ExpenseRepository expenseRepository;
    
    // Get all expenses
    public List<Expense> getAllExpenses() {
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
