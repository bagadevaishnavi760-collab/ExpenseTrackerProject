package com.example.expensetracker.export;

import com.example.expensetracker.Expense;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class ExpenseExcelExporter {
    public static ByteArrayInputStream exportToExcel(List<Expense> expenses) throws IOException {
        System.out.println("Starting Excel export with " + expenses.size() + " expenses");
        
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Expenses");

            // Create styles
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 12);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);

            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setBorderBottom(BorderStyle.THIN);
            dataStyle.setBorderTop(BorderStyle.THIN);
            dataStyle.setBorderRight(BorderStyle.THIN);
            dataStyle.setBorderLeft(BorderStyle.THIN);

            CellStyle currencyStyle = workbook.createCellStyle();
            currencyStyle.cloneStyleFrom(dataStyle);
            currencyStyle.setDataFormat(workbook.createDataFormat().getFormat("₹#,##0.00"));

            // Create header row
            Row header = sheet.createRow(0);
            String[] headers = {"ID", "Title", "Category", "Amount", "Date", "Description"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Fill rows with expense data
            int rowIdx = 1;
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");
            
            for (Expense expense : expenses) {
                System.out.println("Processing expense: " + expense.toString());
                
                Row row = sheet.createRow(rowIdx++);
                
                // ID
                Cell idCell = row.createCell(0);
                idCell.setCellValue(expense.getId() != null ? expense.getId().toString() : "");
                idCell.setCellStyle(dataStyle);
                
                // Title
                Cell titleCell = row.createCell(1);
                titleCell.setCellValue(expense.getTitle() != null ? expense.getTitle() : "");
                titleCell.setCellStyle(dataStyle);
                
                // Category
                Cell categoryCell = row.createCell(2);
                categoryCell.setCellValue(expense.getCategory() != null ? expense.getCategory() : "");
                categoryCell.setCellStyle(dataStyle);
                
                // Amount
                Cell amountCell = row.createCell(3);
                if (expense.getAmount() != null) {
                    amountCell.setCellValue(expense.getAmount().doubleValue());
                } else {
                    amountCell.setCellValue(0.0);
                }
                amountCell.setCellStyle(currencyStyle);
                
                // Date
                Cell dateCell = row.createCell(4);
                dateCell.setCellValue(expense.getDate() != null ? expense.getDate().format(dateFormatter) : "");
                dateCell.setCellStyle(dataStyle);
                
                // Description
                Cell descCell = row.createCell(5);
                descCell.setCellValue(expense.getDescription() != null ? expense.getDescription() : "");
                descCell.setCellStyle(dataStyle);
            }

            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Convert workbook to InputStream
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            System.out.println("Excel export completed successfully");
            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
            System.err.println("Error in Excel export: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}

