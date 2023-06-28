import { Request, Response, Router } from "express";
import models from "../database/models";
import { createBase64XLSXFromArray, getEquipmentValue } from "../utils";
import { Op } from "sequelize";

const { Furniture }: any = models as any;
const router = Router();
export const createFurniture = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { imageUrl, description, facility, equipmentId } = req.body;
        const furniture = await Furniture.create({
            imageUrl,
            description,
            facility,
            equipmentId,
        });
        res.status(201).json(furniture);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get all furniture
export const getAllFurniture = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        // Pagination parameters
        const { page = 1, limit = 10 } = req.body;
        const offset = (Number(page) - 1) * Number(limit);

        // Sorting parameters
        const { sortField = "id", sortOrder = "DESC" } = req.body;

        // Filtering parameters
        const { imageUrl = "", description = "", facility = "" } = req.body;
        const filterQuery: any = {
            imageUrl: { [Op.like]: `%${imageUrl}%` },
            description: { [Op.like]: `%${description}%` },
            facility: { [Op.like]: `%${facility}%` },
        };

        // Remove empty filters
        Object.keys(filterQuery).forEach(key => {
            if (filterQuery[key] === "") {
                delete filterQuery[key];
            }
        });

        const furniture = await Furniture.findAndCountAll({
            where: {
                [Op.and]: filterQuery,
            },
            order: [[sortField, sortOrder]],
            limit: Number(limit),
            offset: Number(offset),
        });

        const totalPages = Math.ceil(furniture.count / Number(limit));

        res.status(200).json({
            furniture: furniture.rows,
            totalCount: furniture.count,
            totalPages,
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a single furniture by ID
export const getFurnitureById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const furniture = await Furniture.findByPk(id);
        if (furniture) {
            res.status(200).json(furniture);
        } else {
            res.status(404).json({ message: "Furniture not found." });
        }
    } catch (error) {
        console.error("Error getting furniture by ID:", error);
        res.status(500).json({ message: "Failed to retrieve furniture." });
    }
};

// Update a furniture by ID
export const updateFurniture = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { imageUrl, description, facility, optionalEquipmentId } =
            req.body;
        const furniture = await Furniture.findByPk(id);
        if (furniture) {
            await furniture.update({
                imageUrl,
                description,
                facility,
                optionalEquipmentId,
            });
            res.status(200).json(furniture);
        } else {
            res.status(404).json({ message: "Furniture not found." });
        }
    } catch (error) {
        console.error("Error updating furniture:", error);
        res.status(500).json({ message: "Failed to update furniture." });
    }
};

// Delete a furniture by ID
export const deleteFurniture = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const furniture = await Furniture.findByPk(id);
        if (furniture) {
            await furniture.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Furniture not found." });
        }
    } catch (error) {
        console.error("Error deleting furniture:", error);
        res.status(500).json({ message: "Failed to delete furniture." });
    }
};

export const getBase64 = async (req: Request, res: Response) => {
    try {
        const data = await Furniture.findAll();
        const excel = createBase64XLSXFromArray(data);
        res.status(200).json({ excel });
    } catch (error) {
        console.error("Error deleting equipment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.post("/create", createFurniture);
router.post("/", getAllFurniture);
router.get("/", getBase64);
router.get("/:id", getFurnitureById);
router.put("/:id", updateFurniture);
router.delete("/:id", deleteFurniture);

export default router;
