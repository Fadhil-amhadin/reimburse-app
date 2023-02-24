import express, { Request, Response } from 'express';
import db from './models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import router from './router';
import { users } from './seeders/users';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 5000;

const createSuperUsers = () => {
    users.map(async user => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            await db.User.create({
            userId: user.userId,
            name: user.name,
            role: user.role,
            password: hashedPassword,
            bankAccount: user.bankAccount
        });
        } catch (error) {
            console.log('super user already exist')
        }
    })
}

createSuperUsers();

dotenv.config();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json({limit: '50mb'}));
app.use(express.static('uploads'));
app.use(express.urlencoded({ limit:'50mb', extended: true }));

app.use('/api/v1/', router);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('App listening on port:', port);
    })
})