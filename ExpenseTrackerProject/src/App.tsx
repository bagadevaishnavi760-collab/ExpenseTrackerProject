import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { AddExpense } from './components/AddExpense';
import { ExpenseList } from './components/ExpenseList';
import { LoginForm } from './components/LoginForm';

type Page = 'dashboard' | 'add-expense' | 'expense-list';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // Check for existing authentication token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 45.50,
      category: 'Food',
      description: 'Lunch at restaurant',
      date: '2025-10-20',
    },
    {
      id: '2',
      amount: 120.00,
      category: 'Shopping',
      description: 'New shoes',
      date: '2025-10-19',
    },
    {
      id: '3',
      amount: 85.00,
      category: 'Bills',
      description: 'Internet bill',
      date: '2025-10-18',
    },
    {
      id: '4',
      amount: 200.00,
      category: 'Travel',
      description: 'Flight tickets',
      date: '2025-10-17',
    },
    {
      id: '5',
      amount: 35.00,
      category: 'Food',
      description: 'Groceries',
      date: '2025-10-16',
    },
  ]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setCurrentPage('dashboard');
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    setCurrentPage('dashboard');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navigation Bar */}
      <nav className="bg-black border-b border-[#B0B0B0]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E63946] rounded-lg flex items-center justify-center">
                <span className="text-white">₹</span>
              </div>
              <span className="text-white">Expense Tracker</span>
            </div>
            <div className="flex gap-6 items-center">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-[#E63946] text-white'
                    : 'text-[#B0B0B0] hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('add-expense')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'add-expense'
                    ? 'bg-[#E63946] text-white'
                    : 'text-[#B0B0B0] hover:text-white'
                }`}
              >
                Add Expense
              </button>
              <button
                onClick={() => setCurrentPage('expense-list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'expense-list'
                    ? 'bg-[#E63946] text-white'
                    : 'text-[#B0B0B0] hover:text-white'
                }`}
              >
                Expense List
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg transition-colors text-[#B0B0B0] hover:text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentPage === 'dashboard' && <Dashboard expenses={expenses} />}
        {currentPage === 'add-expense' && (
          <AddExpense
            onAddExpense={addExpense}
            onCancel={() => setCurrentPage('dashboard')}
          />
        )}
        {currentPage === 'expense-list' && (
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={deleteExpense}
            onUpdateExpense={updateExpense}
          />
        )}
      </main>
    </div>
  );
}