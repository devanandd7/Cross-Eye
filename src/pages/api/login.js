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

      const user = await usersCollection.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // In a real application, you would create a session or JWT here
        res.status(200).json({ message: 'Login successful!', user: { email: user.email } });
      } else {
        res.status(401).json({ message: 'Invalid credentials.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
