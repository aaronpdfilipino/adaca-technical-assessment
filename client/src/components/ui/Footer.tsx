import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-600 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Patient Management. All rights reserved.</p>

        <nav className="flex gap-4">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-900">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-900">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
