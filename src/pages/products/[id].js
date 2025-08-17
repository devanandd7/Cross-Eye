import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export async function getServerSideProps(context) {
  const { id } = context.params;

  if (!id || !ObjectId.isValid(id)) {
    return {
      notFound: true,
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db('crosseye');
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true, // Or redirect to an error page, depending on desired behavior
    };
  }
}

export default function ProductPage({ product }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assuming initial state is not authenticated

  // Function to check authentication status (placeholder)
  const checkAuthentication = async () => {
    try {
      const res = await fetch('/api/check-auth'); // Replace with your actual auth check API
      if (res.ok) {
        const data = await res.json();
        return data.isAuthenticated; // Assuming API returns { isAuthenticated: true/false }
      }
      return false;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };

  const handleBuyNow = async () => {
    const authenticated = await checkAuthentication();
    if (authenticated) {
      router.push(`/checkout?amount=${product.price}`);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Head>
        <title>{product.title} - CrossEye</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`${product.title} - CrossEye`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.mainImageUrl || 'https://via.placeholder.com/800x400'} />
        <meta property="og:url" content={`https://www.crosseye.com/products/${product._id}`} /> {/* Replace with actual domain */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.title} - CrossEye`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.mainImageUrl || 'https://via.placeholder.com/800x400'} />
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
              src={product.mainImageUrl || 'https://via.placeholder.com/800x400'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <h3 className="text-lg font-semibold text-indigo-600 uppercase tracking-wide">{product.category}</h3>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{product.title}</h1>
            {product.price && <p className="text-2xl font-bold text-gray-900 mb-4">Price: ${product.price}</p>}
            <p className="text-xl text-gray-700 leading-relaxed">{product.description}</p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Image Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(product.subImageUrls || []).map((url, i) => (
                <img key={i} src={url} alt={`Sub Image ${i}`} className="w-full h-auto object-cover rounded-lg" />
              ))}
            </div>
          </div>
            <div className="mt-8">
              <button
                onClick={handleBuyNow}
                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded hover:bg-indigo-700 transition-colors duration-300"
              >
                Buy Now
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
