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
    next,
) => {
    try {
        const {
            params: { invoiceNo },
            body: { user },
            query: { token },
        } = req;
        const img = await toDataURL(invoiceNo, { type: "image/jpeg" });
        const invoiceUrl = `${process.env.AUTH_URL}/profile/bills`;
        const { data } = await axios.get(invoiceUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const billsList: any[] = data?.bills_List || [];
        const invoiceDetails = billsList.find(
            ({ bill_invoice_no }) => bill_invoice_no === invoiceNo,
        );
        const billsGroupedByAmount = (invoiceDetails?.billDetails || []).reduce(
            (a: any, b: any) => {
                a[b.Amount] = [...(a[b.Amount] || []), b.Description];
                return a;
            },
            {},
        );
        const billed: any[] = [];
        Object.keys(billsGroupedByAmount).forEach(amount => {
            if (amount.toString().trim()) {
                billed.push({
                    amount,
                    //parcel,
                    description: billsGroupedByAmount[amount].join(", "),
                    qty: billsGroupedByAmount[amount].length,
                });
            }
        });
        const invoice = {
            billNo: invoiceDetails?.bill_no,
            externalDoc: invoiceDetails?.external_doc,
            billDate: invoiceDetails?.bill_date,
            customerName: user?.erp_data?.customerName,
            customerNo: user?.erp_data?.customerno,
            billed,
            quantity: invoiceDetails?.Qty,
            unitPrice: invoiceDetails?.Unit_Price,
            description: invoiceDetails?.bill_name,
            billAmount: invoiceDetails?.bill_amount,
            qrCode: img,
        };
        console.error(invoiceDetails, user);
        req.body.invoice = invoice;
        if (!invoiceDetails) {
            return res.status(404).send("Invoice Not Found");
        }
        next();
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
            ...req.body.invoice,
        });
        const file = {
            content,
        };
        const { invoiceNo } = req.params;
        req.query.file = file;
        req.query.fileName = invoiceNo;
        next();
    } catch (error) {
        res.status(500).json({ error });
    }
};

router.get("/:invoiceNo/pdf", getInvoice, generateInvoice);
export default router;
