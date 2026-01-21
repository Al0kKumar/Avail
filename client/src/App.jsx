import { Routes, Route } from 'react-router-dom';
import routes from './routes';

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-app)' }}>
    <Routes>
      {routes.map(r => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
    </Routes>
    </div>
  );
}
