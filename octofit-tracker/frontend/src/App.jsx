import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { API_BASE_URL } from './api.js';
import './tracker.css';
import logo from '../../../docs/octofitapp-small.png';

const links = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function AppFrame() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <NavLink className="brand-lockup" to="/users" aria-label="OctoFit Tracker home">
            <img src={logo} alt="" />
            <span>
              <span className="brand-name">OctoFit Tracker</span>
              <span className="brand-caption">Mergington Athletics</span>
            </span>
          </NavLink>

          <nav className="primary-nav" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="api-target">
            <span>API target</span>
            <strong title={API_BASE_URL}>{new URL(API_BASE_URL).host}</strong>
          </div>
        </div>
      </header>

      <main className="page-frame">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}