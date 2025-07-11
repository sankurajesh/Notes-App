import { Response } from 'express';
import { client } from '../db';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { ObjectId } from 'mongodb';
import { Note } from '../models/user.model';

export const addNote = async (req: AuthenticatedRequest, res: Response) => {
  const { category, title, content, date } = req.body;
  const userId = new ObjectId(req.user.userId);

  try {
    const db = client.db('Rajesh05');
    const notes = db.collection<Note>('notes');

    const newNote: Note = {
      userId,
      category,
      title,
      content,
      date,
    };

    await notes.insertOne(newNote);

    // Fetch all notes for the user
    const userNotes = await notes.find({ userId }).toArray();

    res.status(201).json({ success: true, notes: userNotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const allNotes = async (req: AuthenticatedRequest, res: Response) => {
  const userId = new ObjectId(req.user.userId);  // <-- convert here!
  try {
    const db = client.db('Rajesh05');
    const notes = db.collection<Note>('notes');

    const userId = new ObjectId(req.user.userId);  // <-- convert here!

    // Fetch all notes for the user
    const userNotes = await notes.find({ userId }).toArray();

    res.status(200).json({ success: true, notes: userNotes });
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};