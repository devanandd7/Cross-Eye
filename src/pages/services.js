import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps() {
  const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${API_URL}/api/services`);
  const services = await res.json();
  return { props: { services } };
}

export default function Services({ services }) {
  const stripMarkdown = (input) => {
    if (!input) return '';
    let s = input.replace(/`{1,3}[^`]*`{1,3}/g, '');
    s = s.replace(/!\[[^\]]*\]\([^\)]*\)/g, '');
    s = s.replace(/\[[^\]]*\]\([^\)]*\)/g, '');
    s = s.replace(/^\s{0,3}(#{1,6})\s+/gm, '');
    s = s.replace(/^\s{0,3}[-*+]\s+/gm, '');
    s = s.replace(/^\s{0,3}\d+\.\s+/gm, '');
    s = s.replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, '$1$2');
    s = s.replace(/\*([^*]+)\*|_([^_]+)_/g, '$1$2');
    s = s.replace(/>\s?/g, '');
    s = s.replace(/\n+/g, ' ');
    return s.trim();
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Head>
        <title>Our Services - CrossEye</title>
        <meta name="description" content="Discover the wide range of software and hardware services offered by CrossEye." />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Our Services - CrossEye" />
        <meta property="og:description" content="Discover the wide range of software and hardware services offered by CrossEye." />
        <meta property="og:image" content="/hero-crosseye.jpg" /> {/* Consider a more specific image for services page */}
        <meta property="og:url" content="https://www.crosseye.com/services" /> {/* Replace with actual domain */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services - CrossEye" />
        <meta name="twitter:description" content="Discover the wide range of software and hardware services offered by CrossEye." />
        <meta name="twitter:image" content="/hero-crosseye.jpg" /> {/* Consider a more specific image for services page */}
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">CrossEye</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900">About Us</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/services" className="text-gray-900 font-semibold">Services</Link>
            <Link href="/#advantage" className="text-gray-600 hover:text-gray-900">Advantage</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center py-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From embedded software to industrial design, we offer end-to-end solutions to bring your ideas to life.
          </p>
        </section>

        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link href={`/services/${service._id}`} key={service._id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <div className="relative h-48 w-full">
                    <img
                      src={service.mainImageUrl || 'https://via.placeholder.com/400x200'}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{service.division}</h3>
                    <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">{service.title}</h2>
                    <p className="text-gray-700 text-base flex-grow">{stripMarkdown(service.description).slice(0, 180)}{stripMarkdown(service.description).length > 180 ? '…' : ''}</p>
                  </div>
                  <div className="p-6 bg-gray-50 mt-auto">
                    <div className="w-full bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300">
                      Learn More
                    </div>
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
