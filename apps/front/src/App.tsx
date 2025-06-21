import { Routes, Route, Link } from 'react-router-dom';
import { routes } from './routes'; // or define directly above
import './index.css';

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        {routes.map((route) => (
          <Link key={route.path} to={route.path} className="text-blue-500 hover:underline">
            {route.label}
          </Link>
        ))}
      </nav>

      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
