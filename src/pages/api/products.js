import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('crosseye'); // Replace with your database name

  switch (req.method) {
    case 'GET':
      const products = await db.collection('products').find({}).toArray();
      res.status(200).json(products);
      break;
    case 'POST':
      const newProduct = await db.collection('products').insertOne({ ...req.body, price: Number(req.body.price) });
      res.status(201).json(newProduct);
      break;
    case 'DELETE':
      const { id } = req.query;
      const deleteResult = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(deleteResult);
      break;
    case 'PUT':
      const { id: updateId } = req.query;
      const { _id, price, ...updateData } = req.body;
      const updateResult = await db.collection('products').updateOne({ _id: new ObjectId(updateId) }, { $set: { ...updateData, price: Number(price) } });
      res.status(200).json(updateResult);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
