import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-baseline p-4">
        <Link to="/" className="text-xl font-bold mx-2">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
