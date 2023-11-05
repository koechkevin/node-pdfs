import axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { invoice } from "./views";
import { toDataURL } from "qrcode";

export type ExpressCallBack = (
    req: Request,
    res: Response,
    next?: () => any,
) => void;

const router = Router();

export const getInvoice: ExpressCallBack = async (
    req: Request,
    res: Response,
) => {
    try {
        const {
            params: { invoiceNumber },
            body: { user },
            query: { token },
        } = req;
        const img = await toDataURL(invoiceNumber, { type: "image/jpeg" });
        const invoiceUrl = `${process.env.AUTH_URL}/profile/bills`;
        const { data } = await axios.get(invoiceUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const billsList: any[] = data?.bills_List || [];
        const invoiceDetails = billsList.find(
            ({ bill_invoice_no }) => bill_invoice_no === invoiceNumber,
        );
        if (!invoiceDetails) {
            return res.status(404).send("Invoice Not Found");
        }
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};

export const generateInvoice = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const content = await invoice({
            styles: ["/public/css/invoice.css"],
            name: "INVOICE PDF",
        });
        console.error(content);
        const file = {
            content,
        };
        const { invoiceNo } = req.query;
        req.query.file = file;
        req.query.fileName = invoiceNo;
        next();
    } catch (error) {
        res.status(500).json({ error });
    }
};

router.get("/:invoiceNo/pdf", generateInvoice);
export default router;
