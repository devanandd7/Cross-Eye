import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const navItems = [
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/services', label: 'Services' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Menu</h1>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2 px-4 rounded-lg transition-colors ${
                    router.pathname === item.href
                      ? 'bg-indigo-600'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
             <li className="mt-8">
                <Link href="/" className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    View Site
                </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 text-gray-800">
        {children}
      </main>
    </div>
  );
}
