import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'query', // Default to general query
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', type: 'query', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred.');
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Head>
        <title>Contact Us - CrossEye</title>
        <meta name="description" content="Contact CrossEye for issues, website inquiries, or general queries." />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Contact Us - CrossEye" />
        <meta property="og:description" content="Contact CrossEye for issues, website inquiries, or general queries." />
        <meta property="og:image" content="/hero-crosseye.jpg" /> {/* Consider a more specific image for contact page */}
        <meta property="og:url" content="https://www.crosseye.com/contact" /> {/* Replace with actual domain */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - CrossEye" />
        <meta name="twitter:description" content="Contact CrossEye for issues, website inquiries, or general queries." />
        <meta name="twitter:image" content="/hero-crosseye.jpg" /> {/* Consider a more specific image for contact page */}
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">CrossEye</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900">About Us</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
            <Link href="/contact" className="text-gray-900 font-semibold">Contact Us</Link>
            <Link href="/#advantage" className="text-gray-600 hover:text-gray-900">Advantage</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center py-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question, an issue, or a website inquiry? Reach out to us!
          </p>
        </section>

        <section className="py-12 bg-white rounded-lg shadow-lg max-w-2xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-lg font-medium text-gray-700">Contact Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="query">General Query</option>
                <option value="issue">Report an Issue</option>
                <option value="website">Website Inquiry</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Send Message
              </button>
            </div>
            {status && <p className="text-center text-lg mt-4">{status}</p>}
          </form>
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
