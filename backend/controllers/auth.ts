import db from '../models'
import bcrypt from 'bcrypt'

// import jwt from 'jsonwebtoken';
import CryptoJs from 'crypto-js';
import { Request, Response } from 'express'

export const register = async (req: Request, res: Response) => {
    try {
        const userExist = await db.User.findOne({
            where: {
                userId: req.body.userId
            }
        })
        if (userExist) {
            return res.status(400).send({
                status: "failed",
                message: "unique username already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await db.User.create({
            userId: req.body.userId,
            name: req.body.name,
            role: 'user',
            password: hashedPassword,
            bankAccount: req.body.bankAccount
        })
        return res.status(201).send({
            status: 'success',
            message: 'add user success',
            data: {
                userName: newUser.userId,
                name: newUser.name,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const userExist = await db.User.findOne({
            where: {
                userId: req.body.userId
            }
        })

        if(!userExist) {
            return res.status(404).send({
                status: 'failed',
                message: 'user not found'
            })
        }
        
        const isValid = await bcrypt.compare(req.body.password, userExist.password);
        if(!isValid) {
            return res.status(400).send({
                status: 'failed',
                message: 'credential is invalid'
            })
        }

        const TOKEN_KEY = process.env.TOKEN_KEY ? process.env.TOKEN_KEY : "" 
        const token = CryptoJs.AES.encrypt(`{"userName": "${userExist.userId}", "role": "${userExist.role}", "name": "${userExist.name}", "bankAccount":"${userExist.bankAccount}"}`, TOKEN_KEY).toString()

        res.status(200).send({
            status: 'success',
            data: {
                userName: userExist.userId,
                token
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

export const getUserJoin = async (req: Request, res: Response) => {
    try {
        const users = await db.User.findAll({
            include: [
                {
                    model: db.Reimburse, as: 'reimbursements'
                }
            ]
        })
        return res.status(200).send({
            status: "success",
            data: users
        })
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}