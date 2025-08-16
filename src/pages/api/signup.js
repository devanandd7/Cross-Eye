import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('crosseye');
      const usersCollection = db.collection('users');

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await usersCollection.insertOne({
        email,
        password: hashedPassword,
      });

      if (result.acknowledged) {
        res.status(201).json({ message: 'Signup successful!', userId: result.insertedId });
      } else {
        res.status(500).json({ message: 'Failed to create user.' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'An error occurred during signup.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
