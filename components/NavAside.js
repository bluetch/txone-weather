import { useRouter } from 'next/router';
import Link from "next/link";
import styles from "./NavAside.module.scss";

const nav = [
  {
    name: "Data Analysis",
    url: "/data-analysis",
  },
  {
    name: "Today's Weather",
    url: "/todays-weather",
  },
];

export const NavAside = () => {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      {nav.map((link) => {
        return (
          <Link href={link.url} key={`nav-${link.url}`}>
            <a
              className={router.pathname === link.url ? styles.highlight : ""}
            >
              {link.name}
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

NavAside.displayName = "NavAside";