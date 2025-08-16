import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('crosseye'); // Replace with your database name

  switch (req.method) {
    case 'GET':
      const services = await db.collection('services').find({}).toArray();
      res.status(200).json(services);
      break;
    case 'POST':
      const newService = await db.collection('services').insertOne(req.body);
      res.status(201).json(newService);
      break;
    case 'DELETE':
      const { id } = req.query;
      const deleteResult = await db.collection('services').deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(deleteResult);
      break;
    case 'PUT':
      const { id: updateId } = req.query;
      const { _id, ...updateData } = req.body;
      const updateResult = await db.collection('services').updateOne({ _id: new ObjectId(updateId) }, { $set: updateData });
      res.status(200).json(updateResult);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
