import { Download } from 'lucide-react';
import { Button } from './ui/button';

const API_BASE_URL = 'http://localhost:8080/api/expenses';

export function ExportButton() {
  const downloadExcel = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/export/excel`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'expenses.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      console.log('Excel file downloaded successfully!');
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      alert('Failed to download Excel file. Please try again.');
    }
  };

  return (
    <Button
      onClick={downloadExcel}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      <Download className="mr-2 h-4 w-4" />
      Export to Excel
    </Button>
  );
}

