import * as XLSX from "xlsx";

interface ExportToExcelOptions {
  data: any[];
  fileName: string;
  sheetName?: string;
}

export const exportToExcel = ({
  data,
  fileName,
  sheetName = "Sheet1",
}: ExportToExcelOptions) => {
  // 1. Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // 2. Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // 3. Generate buffer and trigger download
  const fullFileName = fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`;
  XLSX.writeFile(workbook, fullFileName, { bookType: "xlsx", type: "buffer" });
};
