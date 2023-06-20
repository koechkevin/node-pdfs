import { utils, write } from "xlsx";
import PDFDocument from "pdfkit";

export function createBase64XLSXFromArray(data: any[]): string {
    // Create a new workbook and worksheet
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to an XLSX file
    const excelBuffer = write(workbook, { type: "buffer" });

    // Convert the XLSX buffer to base64
    const base64 = Buffer.from(excelBuffer).toString("base64");

    return base64;
}

export function excelToPdf(data: any[]): string {
    const doc = new PDFDocument();

    // Set up the font size and line spacing
    doc.fontSize(12);
    doc.lineGap(10);

    // Iterate through the rows of data and add content to the PDF
    data.forEach(row => {
        row.forEach((cell: any) => {
            doc.text(cell.toString());
        });
        doc.moveDown();
    });
    const buffers: any[] = [];
    doc.on("data", buffer => buffers.push(buffer));
    doc.end();

    // Convert the PDF buffer to base64
    const base64PDF = Buffer.concat(buffers).toString("base64");

    return base64PDF;
}

export function getEquipmentValue(
    initialValue: number,
    depreciationRate: number,
    yearOfManufacture: number,
): number {
    const currentYear = new Date().getFullYear();
    const yearsSinceManufacture = currentYear - yearOfManufacture;
    const depreciationFactor = (100 - depreciationRate) / 100;

    // Calculate the current value of the equipment
    const currentValue =
        initialValue * Math.pow(depreciationFactor, yearsSinceManufacture);

    return Math.max(0, currentValue);
}
