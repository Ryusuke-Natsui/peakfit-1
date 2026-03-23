import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { InstallButton } from '../pwa/InstallButton';

const navItems = [
  { to: '/', label: 'ホーム', end: true },
  { to: '/search', label: '検索' },
  { to: '/glossary', label: '用語集' },
  { to: '/bookmarks', label: '保存' },
  { to: '/about', label: 'About' }
];

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Companion PWA</p>
          <h1>PeakFit Companion</h1>
        </div>
        <InstallButton />
      </header>

      <nav className="top-nav" aria-label="主要ナビゲーション">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="page-content">{children}</main>
    </div>
  );
}
