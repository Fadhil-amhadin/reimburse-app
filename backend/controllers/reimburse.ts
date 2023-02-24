import db from "../models";
import fs from 'fs';
import path from 'path';
import { Request, Response } from "express";

export const requestReimbursements = async (req: Request, res: Response) => {
    try {
        await db.Reimburse.create({
            id: req.body.id,
            employeeName: req.body.employeeName,
            departement: req.body.departement,
            bussinessPurpose: req.body.bussinessPurpose,
            userId: req.body.userId,
            notes: "",
            approverId: "",
            totalCost: 0,
            status: "INITIATED",
            reimburseProof: "",
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo
        })

        if (Array.isArray(req.body.items)) {
            for (let i = 0; i < req.body.items.length; i++) {
                await db.Item.create({
                    id: req.body.items[i].id,
                    date: req.body.items[i].date,
                    description: req.body.items[i].description,
                    category: req.body.items[i].category,
                    cost: req.body.items[i].cost,
                    transactionProof: req.body.items[i].transactionProof,
                    userId: req.body.userId,
                    reimburseId: req.body.id,
                    status: "INITIATED"
                })
            }
        }

        return res.status(201).send({
            status: "success",
            message: "reimbursements request success"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

export const getReimbursements = async (req: Request, res: Response) => {
    try {
        const reimbursementsData = await db.Reimburse.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            include: [{
                model: db.Item, as: 'items'
            }]
        });
        return res.status(200).send({
            status: "success",
            data: reimbursementsData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

export const getReimburse = async (req: Request, res: Response) => {
    try {
        const reimburseData = await db.Reimburse.findOne({
            include: [{
                model: db.Item, as: 'items'
            }],
            where: {id: req.body.id}
        })
        if (reimburseData) {
            return res.status(200).send({
                status: 'success',
                data: reimburseData
            })
        } else {
            return res.status(404).send({
                status: 'failed',
                message: 'data not found'
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

export const getReimburseWithUser = async (req: Request, res: Response) => {
    try {
        const reimburseData = await db.Reimburse.findOne({
            include: [{
                model: db.Item, as: 'items'
            }],
            where: {
                userId: req.body.userId,
                status: req.body.status
            }
        })
        if (reimburseData) {
            return res.status(200).send({
                status: 'success',
                data: reimburseData
            })
        } else {
            return res.status(404).send({
                status: 'failed',
                message: 'data not found'
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

export const getReimbursementsForSuper = async (req: Request, res: Response) => {
    try {
        const reimburseData = await db.Reimburse.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            include: [{
                model: db.Item, as: 'items'
            }],
            where: {
                status: req.body.status
            }
        })
        if (reimburseData?.length > 0) {
            return res.status(200).send({
                status: 'success',
                data: reimburseData
            })
        } else {
            return res.status(404).send({
                status: 'failed',
                message: 'data not found'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

export const updateReimbursments = async (req: Request, res: Response) => {
    try {
        await db.Reimburse.update({
            status: req.body.status,
            approverId: req.body.approverId,
            notes: req.body.notes,
            totalCost: req.body.totalCost,
            reimburseProof: req.body.reimburseProof
        },
        {
            where: {id: req.body.id}
        })

        if (Array.isArray(req.body.items)) {
            for (let i = 0; i < req.body.items.length; i++) {
                await db.Item.update(
                    {
                        status: req.body.items[i].status,
                    },
                    {
                        where: {id: req.body.items[i].id}
                    }
                )
            }
        }
        return res.status(200).send({
            status: 'success',
            message: `reimburse have been ${req.body.status}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'failse',
            message: 'server error'
        })
    }
}

export const getImage = (req: Request, res: Response) => {
    
    const imagePath = path.join(__dirname, '../uploads', req.params.filename);
    const buffer = fs.readFileSync(imagePath);

    // Set the response headers to indicate that the response is binary data
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=' + req.params.filename);

    res.send(buffer);
}