import axios from "axios";
import { Request, Response } from "express";
export type ExpressCallBack = (
    req: Request,
    res: Response,
    next?: () => any,
) => void;

export const getUserDetails: ExpressCallBack = async (
    req: Request,
    res: Response,
    next?: any,
) => {
    const {
        query: { token },
    } = req;
    const profile = `${process.env.AUTH_URL}/profile/`;
    try {
        console.log(req.headers["x-forwarded-for"], req.ips, req.path, token);
        const { data } = await axios.get(profile, {
            headers: { Authorization: `Bearer ${token}` },
        });
        req.body.user = data;
        next();
    } catch (e) {
        return res.status(500).json({ error: e });
    }
};
