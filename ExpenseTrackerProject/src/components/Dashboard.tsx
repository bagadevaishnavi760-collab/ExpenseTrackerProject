import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ShoppingBag, Utensils, Plane, Receipt } from 'lucide-react';
import type { Expense } from '../App';

interface DashboardProps {
  expenses: Expense[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  Food: <Utensils className="w-5 h-5" />,
  Shopping: <ShoppingBag className="w-5 h-5" />,
  Travel: <Plane className="w-5 h-5" />,
  Bills: <Receipt className="w-5 h-5" />,
};

const COLORS = ['#E63946', '#000000', '#B0B0B0', '#6C757D'];

export function Dashboard({ expenses }: DashboardProps) {
  // Calculate total spent this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTotal = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate category totals
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Get recent transactions (last 5)
  const recentTransactions = [...expenses].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Monthly Spent Card */}
      <Card className="bg-gradient-to-br from-[#E63946] to-[#C62E39] border-none text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-white/90">This Month's Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl">₹{monthlyTotal.toFixed(2)}</div>
          <p className="text-white/70 mt-2">October 2025</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="shadow-md border-[#B0B0B0]/20">
          <CardHeader>
            <CardTitle className="text-black">Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `₹${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-md border-[#B0B0B0]/20">
          <CardHeader>
            <CardTitle className="text-black">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg hover:bg-[#EBEBEB] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#E63946] border border-[#B0B0B0]/20">
                      {categoryIcons[transaction.category] || <Receipt className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-black">{transaction.description}</p>
                      <p className="text-[#B0B0B0] text-sm">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-[#E63946]">
                    ₹{transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}