package com.example.expensetracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    
    // Find expenses by category
    List<Expense> findByCategory(String category);
    
    // Find expenses by date range
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    // Find expenses by category and date range
    List<Expense> findByCategoryAndDateBetween(String category, LocalDate startDate, LocalDate endDate);
    
    // Find expenses ordered by date (newest first)
    List<Expense> findAllByOrderByDateDesc();
    
    // Find expenses ordered by amount (highest first)
    List<Expense> findAllByOrderByAmountDesc();
}
