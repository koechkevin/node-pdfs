import { NextFunction, Request, Response, Router } from "express";
import { generatePdf as generate } from "html-pdf-node";

export const generatePdf = async (
    req: Request<any>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { fileName, file } = req.query as any;
        const pdfBuffer = await generate(file, {
            format: "A4",
            printBackground: true,
        } as any);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `inline; filename=${fileName}.pdf`,
        );
        res.send(pdfBuffer);
    } catch (error) {
        next(error);
    }
};
