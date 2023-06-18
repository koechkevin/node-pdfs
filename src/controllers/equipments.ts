/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, Router } from "express";
import models from "../database/models";
import { Op } from "sequelize";

const { Equipments }: any = models as any;

const router = Router();
export const createAnEquipment = async (req: Request, res: Response) => {
    try {
        const equipment = await Equipments.create(req.body);
        res.status(201).json(equipment);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error });
    }
};

export const listEquipment = async (req: Request, res: Response) => {
    try {
        const { page, limit, sort, filters = {}, search, order: _sortOrder } = req.body;

        // Set default values for pagination and sorting
        const pageNumber = page ? parseInt(page as string) : 1;
        const pageSize = limit ? parseInt(limit as string) : 10;
        const sortBy = sort ? (sort as string) : "id";
        const sortOrder = _sortOrder?.toUpperCase() || "ASC";
        const searchTerm = search ? (search as string) : "";

        // Prepare pagination parameters
        const offset = (pageNumber - 1) * pageSize;
        const limitItems = pageSize;

        // Prepare sorting parameters
        const order = [[sortBy, sortOrder]];

        // Prepare filtering parameters
        const where = Object.keys(filters).length
            ? {
                  [Op.or]: Object.keys(filters).map(key => ({
                      [key]: key === "status" ? filters[key] :{ [Op.like]: `%${filters[key]}%` },
                  })),
              }
            : {};

        // Prepare search parameter
        const searchQuery = searchTerm
            ? {
                  [Op.or]: [
                      { facilityName: { [Op.iLike]: `%${searchTerm}%` } },
                      { subCounty: { [Op.iLike]: `%${searchTerm}%` } },
                      { department: { [Op.iLike]: `%${searchTerm}%` } },
                      { status: { [Op.iLike]: `%${searchTerm}%` } },
                      { inventoryNo: { [Op.iLike]: `%${searchTerm}%` } },
                      { description: { [Op.iLike]: `%${searchTerm}%` } },
                      { make: { [Op.iLike]: `%${searchTerm}%` } },
                      { model: { [Op.iLike]: `%${searchTerm}%` } },
                      { serialNumber: { [Op.iLike]: `%${searchTerm}%` } },
                      { manufacturer: { [Op.iLike]: `%${searchTerm}%` } },
                      { yearOfManufacture: { [Op.iLike]: `%${searchTerm}%` } },
                      { dateOfService: { [Op.iLike]: `%${searchTerm}%` } },
                      { nextServiceDate: { [Op.iLike]: `%${searchTerm}%` } },
                      { supplier: { [Op.iLike]: `%${searchTerm}%` } },
                      { procurementSource: { [Op.iLike]: `%${searchTerm}%` } },
                  ],
              }
            : {};

        // Fetch equipment with pagination, sorting, filtering, and search
        const { count, rows } = await Equipments.findAndCountAll({
            where: {
                ...where,
                ...searchQuery,
            },
            order,
            offset,
            limit: limitItems,
        });

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: pageNumber,
            pageSize: limitItems,
            items: rows,
        });
    } catch (error) {
        console.error("Error retrieving equipment:", error);
        res.status(500).json({ error });
    }
};
// Get a specific equipment record by ID
export const getEquipment = async (req: Request, res: Response) => {
    try {
        const equipment = await Equipments.findByPk(req.params.id);
        if (equipment) {
            res.json(equipment);
        } else {
            res.status(404).json({ error: "Equipment not found" });
        }
    } catch (error) {
        console.error("Error retrieving equipment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update an equipment record
export const updateEquipment = async (req: Request, res: Response) => {
    try {
        const equipment = await Equipments.findByPk(req.params.id);
        if (equipment) {
            await Equipments.update(req.body, { where:{ id: req.params.id } });
            res.json(equipment);
        } else {
            res.status(404).json({ error: "Equipment not found" });
        }
    } catch (error) {
        console.error("Error updating equipment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete an equipment record
export const deleteEquipment = async (req: Request, res: Response) => {
    try {
        const equipment = await Equipments.findByPk(req.params.id);
        if (equipment) {
            await Equipments.destroy();
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: "Equipment not found" });
        }
    } catch (error) {
        console.error("Error deleting equipment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.post("/create", createAnEquipment);
router.post("/", listEquipment);
router.get("/:id", getEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);
export default router;
