import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Edit2, Trash2 } from 'lucide-react';
import { ExportButton } from './ExportButton';
import type { Expense } from '../App';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  onUpdateExpense: (id: string, expense: Omit<Expense, 'id'>) => void;
}

export function ExpenseList({
  expenses,
  onDeleteExpense,
  onUpdateExpense,
}: ExpenseListProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDescription(expense.description);
    setDate(expense.date);
  };

  const handleUpdate = () => {
    if (!editingExpense || !amount || !category || !description || !date) {
      alert('Please fill in all fields');
      return;
    }

    onUpdateExpense(editingExpense.id, {
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    setEditingExpense(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      onDeleteExpense(id);
    }
  };

  return (
    <>
      <Card className="shadow-lg border-[#B0B0B0]/20">
        <CardHeader className="border-b border-[#B0B0B0]/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-black">All Expenses</CardTitle>
            <ExportButton />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-lg border border-[#B0B0B0]/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F5F5] hover:bg-[#F5F5F5]">
                  <TableHead className="text-black">Date</TableHead>
                  <TableHead className="text-black">Category</TableHead>
                  <TableHead className="text-black">Amount</TableHead>
                  <TableHead className="text-black">Description</TableHead>
                  <TableHead className="text-black text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-[#F5F5F5]/50">
                    <TableCell className="text-black">
                      {new Date(expense.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E63946]/10 text-[#E63946]">
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#E63946]">
                      ₹{expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-[#B0B0B0]">
                      {expense.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(expense)}
                          className="text-black hover:text-[#E63946] hover:bg-[#E63946]/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(expense.id)}
                          className="text-black hover:text-[#E63946] hover:bg-[#E63946]/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {expenses.length === 0 && (
            <div className="text-center py-12 text-[#B0B0B0]">
              No expenses found. Add your first expense to get started!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-black">Edit Expense</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-amount" className="text-black">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]">
                  ₹
                </span>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7 border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-black">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-black">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946] resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-date" className="text-black">
                Date
              </Label>
              <Input
                id="edit-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-[#B0B0B0]/30 focus:border-[#E63946] focus:ring-[#E63946]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingExpense(null)}
              className="border-[#B0B0B0]/30 text-black hover:bg-[#F5F5F5]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-[#E63946] hover:bg-[#C62E39] text-white"
            >
              Update Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}