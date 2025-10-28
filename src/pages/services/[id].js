import Head from 'next/head';
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = await clientPromise;
  const db = client.db('crosseye');
  const service = await db.collection('services').findOne({ _id: new ObjectId(id) });

  return {
    props: {
      service: JSON.parse(JSON.stringify(service)),
    },
  };
}

export default function ServicePage({ service }) {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Head>
        <title>{service.title} - CrossEye</title>
        <meta name="description" content={service.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`${service.title} - CrossEye`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={service.mainImageUrl || 'https://via.placeholder.com/800x400'} />
        <meta property="og:url" content={`https://www.crosseye.com/services/${service._id}`} /> {/* Replace with actual domain */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.title} - CrossEye`} />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image" content={service.mainImageUrl || 'https://via.placeholder.com/800x400'} />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">CrossEye</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900">About Us</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
            <Link href="/#advantage" className="text-gray-600 hover:text-gray-900">Advantage</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 w-full">
            <img
              src={service.mainImageUrl || 'https://via.placeholder.com/800x400'}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <h3 className="text-lg font-semibold text-indigo-600 uppercase tracking-wide">{service.division}</h3>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{service.title}</h1>
            <div className="markdown-body text-gray-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{service.description || ''}</ReactMarkdown>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Image Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.subImageUrls && service.subImageUrls.map((url, i) => (
                  <img key={i} src={url} alt={`Sub Image ${i}`} className="w-full h-auto object-cover rounded-lg" />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded hover:bg-indigo-700 transition-colors duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} CrossEye. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
