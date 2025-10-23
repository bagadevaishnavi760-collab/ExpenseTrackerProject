import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import type { Expense } from '../App';

interface AddExpenseProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onCancel: () => void;
}

export function AddExpense({ onAddExpense, onCancel }: AddExpenseProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description || !date) {
      alert('Please fill in all fields');
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-[#B0B0B0]/20">
        <CardHeader className="border-b border-[#B0B0B0]/20">
          <CardTitle className="text-black">Add New Expense</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-black">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]">
                  ₹
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7 border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946]"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-black">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-black">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter expense description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946] resize-none"
                rows={3}
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-black">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946]"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#E63946] hover:bg-[#C62E39] text-white"
              >
                Save Expense
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-[#B0B0B0]/30 text-black hover:bg-[#F5F5F5]"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}