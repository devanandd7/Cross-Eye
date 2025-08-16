import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();
  return { props: { products } };
}

export default function Products({ products }) {
  const router = useRouter();

  const handleBuyNowClick = (e, price) => {
    e.stopPropagation(); // Prevent the card's Link from triggering
    router.push(`/checkout?amount=${price}`);
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Head>
        <title>Our Products - CrossEye</title>
        <meta name="description" content="Explore the innovative product ecosystem of CrossEye, from our Smart Home Suite to Industrial IoT Solutions." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">CrossEye</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900">About Us</Link>
            <Link href="/products" className="text-gray-900 font-semibold">Products</Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
            <Link href="/#advantage" className="text-gray-600 hover:text-gray-900">Advantage</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center py-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our ecosystem of integrated software and hardware solutions designed for modern living and industry.
          </p>
        </section>

        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(products || []).map((product) => (
              <Link href={`/products/${product._id.toString()}`} key={product._id.toString()}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <div className="relative h-48 w-full">
                    <img
                      src={product.mainImageUrl || 'https://via.placeholder.com/400x200'}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{product.category}</h3>
                    <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">{product.title}</h2>
                    <p className="text-gray-700 text-base flex-grow">{product.description}</p>
                    {product.price && <p className="text-lg font-bold text-gray-900 mt-2">Price: ${product.price}</p>}
                  </div>
                  <div className="p-6 bg-gray-50 mt-auto">
                    <button
                      onClick={(e) => handleBuyNowClick(e, product.price)}
                      className="w-full bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
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
