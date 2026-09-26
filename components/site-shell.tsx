import Link from "next/link";
import { Bike, CircleHelp, Component, GitCompareArrows, Home, MessageSquarePlus, Wrench } from "lucide-react";

const nav = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/atelier", label: "Mon vélo", icon: Bike },
  { href: "/composants", label: "Composants", icon: Component },
  { href: "/comparateur", label: "Comparateur", icon: GitCompareArrows },
  { href: "/contribuer", label: "Contribuer", icon: MessageSquarePlus },
];

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/"><span className="brand-mark"><Bike size={21} /></span><span>velo<span className="brand-bold">scope</span><i>.</i></span></Link><nav className="main-nav" aria-label="Navigation principale">{nav.map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}</nav><Link className="button button-dark header-cta" href="/atelier">Configurer mon vélo <Wrench size={15} /></Link></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-top"><Link className="brand footer-brand" href="/"><span className="brand-mark"><Bike size={19} /></span><span>velo<span className="brand-bold">scope</span><i>.</i></span></Link><p>Composer, vérifier et faire évoluer son vélo.</p><div className="footer-nav"><Link href="/composants">Composants</Link><Link href="/comparateur">Comparateur</Link><Link href="/contribuer">Contribuer</Link><a href="https://productinfo.shimano.com/en/compatibility" target="_blank" rel="noreferrer">Sources techniques</a></div></div><div className="footer-bottom"><span>© 2026 VeloScope · Les compatibilités affichent leur source et leur niveau de confiance.</span><span><CircleHelp size={14} /> Un doute sur une pièce ? Vérifiez sa documentation fabricant.</span></div></footer>;
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return <><div className="announcement"><span className="announcement-dot" /> Des pièces réelles, des montages mieux compris</div><SiteHeader />{children}<SiteFooter /></>;
}
