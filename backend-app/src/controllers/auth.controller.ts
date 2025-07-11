import { client } from "../db";
import { User } from "../models/user.model";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
export const register = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {firstName, lastName, email, phone, userName, password} = req.body;
        const db = client.db('Rajesh05');
        const users = db.collection<User>('users');
        // 1. Check if user already exists
        const existing = await users.findOne({userName})
        if(existing){
            res.status(400).json({ success: false, message: 'User already exists' });
        }
        //hash passpwd for security
        const hashedPassword = await bcrypt.hash(password,10);
        // 2. Insert new user
        const newUser: User = { firstName, lastName, email, phone, userName, password: hashedPassword };
        const result = await users.insertOne(newUser);

        res.status(201).json({ success: true, message: 'User registered', userId: result.insertedId });
    }catch(err){
        console.error('Registration Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const login = async (req: Request, res: Response): Promise<void> =>{
try{
const {userName, password} = req.body;
const db = client.db('Rajesh05');
const users = db.collection<User>('users');
const user = await users.findOne({userName});
if(!user){
    res.status(401).json({status: false, message: 'Invalid Credentials'});
    return;
}
const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch){
    res.status(401).json({status: false, message: 'Incorrect Password'})
}
const token = jwt.sign({ userId: user._id, userName: user.userName }, JWT_SECRET, { expiresIn: '5m' });
 res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: { userName: user.userName, email: user.email }
  });
}catch(err){
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
}
}

export const refreshToken = (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const newToken = jwt.sign(
      { userId: decoded.userId, userName: decoded.userName },
      JWT_SECRET,
      { expiresIn: '5m' }
    );

    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ message: 'Token expired or invalid' });
  }
};
