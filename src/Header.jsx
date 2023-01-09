import { LogoutLink } from "./Logout";

export function Header() {
  return (
    <header>
      <nav>
        <a className="nav-item">
          <LogoutLink />
        </a>
      </nav>
    </header>
  );
}
