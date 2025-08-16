import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <Head>
        <title>CrossEye - Integrated Software & Hardware Solutions</title>
        <meta name="description" content="CrossEye specializes in creating seamless, integrated IoT solutions that combine the power of software and hardware to build a smarter, more connected world." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">CrossEye</div>
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
          
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/LlhmzVL5bm8?autoplay=1&mute=1&loop=1&playlist=LlhmzVL5bm8&controls=0&showinfo=0&modestbranding=1"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for better text readability */}
          </div>
          <div className="relative z-10 text-white text-left w-full px-6 md:px-12">
            <h1 className="text-7xl md:text-8xl font-extrabold mb-4 leading-tight">CROSSEYE</h1>
            <p className="text-2xl md:text-3xl max-w-2xl">
              We are an innovative startup at the intersection of software and hardware, creating seamless, integrated solutions to build a smarter, more connected world. We are not just a software or hardware company; we are a solutions company.
            </p>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 bg-white rounded-lg shadow-lg mb-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">The CrossEye Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The idea for CrossEye was born from a simple observation: the world of technology is fragmented. Hardware devices often lack intuitive software, and powerful software applications are limited by the physical devices they can interact with. We saw an opportunity to bridge this gap, to create a synergy where software and hardware work in perfect harmony. CrossEye is our answer to this challenge, a company dedicated to building a future where technology is a seamless extension of our lives.
            </p>
          </div>
        </section>


        {/* Vision & Mission Section */}
        <section id="vision-mission" className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-700">To be the leading provider of integrated software and hardware solutions, driving innovation and shaping the future of the Internet of Things.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700">To design, develop, and deliver high-quality, user-centric products that simplify lives, enhance efficiency, and create a more connected and intelligent world.</p>
              </div>
            </div>
          </div>
        </section>



        {/* Core Competencies Section */}
        <section id="competencies" className="py-16 bg-white rounded-lg shadow-lg mb-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Competencies</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Software Division</h3>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                  <li>Embedded Systems Software</li>
                  <li>Mobile & Web Application Development</li>
                  <li>Cloud & Data Analytics</li>
                  <li>AI & Machine Learning</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hardware & IoT Division</h3>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                  <li>IoT Device Prototyping & Manufacturing</li>
                  <li>Sensor Integration</li>
                  <li>Connectivity Solutions</li>
                  <li>Industrial Design & Enclosure Engineering</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Product Ecosystem Section */}
        <section id="products" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Product Ecosystem</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">CrossEye Smart Home Suite</h3>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                  <li>CrossEye Smart Hub</li>
                  <li>CrossEye Smart Plugs & Switches</li>
                  <li>CrossEye Smart Sensors</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">CrossEye Industrial IoT Solutions</h3>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                  <li>Asset Tracking System</li>
                  <li>Predictive Maintenance Sensors</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Solutions</h3>
              <p className="text-lg text-gray-700">We also offer bespoke software and hardware development services for businesses with specific needs.</p>
            </div>
          </div>
        </section>

        {/* Target Market & Business Model Section */}
        <section id="market" className="py-16 bg-white rounded-lg shadow-lg mb-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Target Market & Business Model</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Target Market</h3>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                  <li><strong>B2C:</strong> Tech-savvy homeowners and individuals seeking smart home solutions.</li>
                  <li><strong>B2B:</strong> Small to large enterprises in manufacturing, logistics, and retail.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Model</h3>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                  <li>Product Sales</li>
                  <li>Subscription Services</li>
                  <li>Custom Development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The CrossEye Advantage Section */}
        <section id="advantage" className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">The CrossEye Advantage</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="bg-white p-6 rounded-lg shadow-md"><strong>End-to-End Solutions:</strong> We own the entire product lifecycle, from the circuit board to the mobile app.</li>
              <li className="bg-white p-6 rounded-lg shadow-md"><strong>Seamless Integration:</strong> Our software and hardware are designed to work together perfectly, eliminating compatibility issues.</li>
              <li className="bg-white p-6 rounded-lg shadow-md"><strong>User-Centric Design:</strong> We prioritize a simple, intuitive user experience.</li>
              <li className="bg-white p-6 rounded-lg shadow-md"><strong>Innovation at Our Core:</strong> We are constantly researching and developing new technologies to stay ahead of the curve.</li>
              <li className="bg-white p-6 rounded-lg shadow-md"><strong>Expert Team:</strong> Our team brings together diverse expertise in software, hardware, and business.</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} CrossEye. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
