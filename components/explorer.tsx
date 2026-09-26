"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  ChevronDown,
  CircleHelp,
  Compass,
  Heart,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wrench,
} from "lucide-react";
import BikeIllustration from "@/components/bike-illustration";

const disciplines = ["Tout voir", "Route", "Gravel", "VTT", "Urbain"] as const;
type Discipline = (typeof disciplines)[number];

const builds: Array<{
  name: string;
  kind: Exclude<Discipline, "Tout voir">;
  label: string;
  maker: string;
  price: string;
  fit: string;
  components: string;
  color: string;
  art: string;
}> = [
  { name: "Endurace CF 7", kind: "Route", label: "ENDURANCE · CARBONE", maker: "Canyon", price: "2 799 €", fit: "12 pièces à vérifier", components: "Shimano 105", color: "#d7e0a4", art: "road" },
  { name: "Grizl 7", kind: "Gravel", label: "GRAVEL · AVENTURE", maker: "Canyon", price: "1 899 €", fit: "9 pièces à vérifier", components: "Shimano GRX", color: "#d5d1bf", art: "gravel" },
  { name: "Émonda SL 5", kind: "Route", label: "ROUTE · PERFORMANCE", maker: "Trek", price: "2 999 €", fit: "15 pièces à vérifier", components: "Shimano 105", color: "#dad3c5", art: "race" },
  { name: "Chisel Comp", kind: "VTT", label: "XC · TOUT-SUSPENDU", maker: "Specialized", price: "3 500 €", fit: "8 pièces à vérifier", components: "Shimano Deore", color: "#d3d8bf", art: "mtb" },
];

function MiniBike({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 240 120" fill="none" aria-hidden="true" className={`mini-bike mini-bike-${type}`}>
      <circle cx="48" cy="78" r="35" /><circle cx="190" cy="78" r="35" />
      <path d="m102 39 33 39H78l24-39Z" />
      <path d="m102 39 48-8M78 78l-30 0m87 0 55 0m-40-47-32 47m-16-39-3-10m-9 0h24m64 2-2-11m-14 0h33" />
      <circle cx="112" cy="78" r="6" />
    </svg>
  );
}

export default function Explorer() {
  const [discipline, setDiscipline] = useState<Discipline>("Tout voir");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedBuilds, setSavedBuilds] = useState<string[]>([]);
  const filteredBuilds = useMemo(() => builds.filter((build) => {
    const matchesDiscipline = discipline === "Tout voir" || build.kind === discipline;
    const haystack = `${build.name} ${build.kind} ${build.maker} ${build.components}`.toLocaleLowerCase("fr");
    return matchesDiscipline && haystack.includes(query.toLocaleLowerCase("fr").trim());
  }), [discipline, query]);

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> Le configurateur vélo arrive bientôt <a href="#configurateur">Découvrir <ArrowUpRight size={13} /></a></div>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="VeloScope, accueil"><span className="brand-mark"><Bike size={22} strokeWidth={2.2} /></span><span>velo<span className="brand-bold">scope</span><i>.</i></span></a>
        <nav className="main-nav" aria-label="Navigation principale"><a className="nav-active" href="#explorer">Explorer</a><a href="#compatibilite">Compatibilité</a><a href="#prix">Prix & pièces</a></nav>
        <div className="header-actions"><button className="button button-light login-button">Se connecter</button><a className="button button-dark header-cta" href="#configurateur">Monter mon vélo <ArrowUpRight size={15} /></a></div>
        <a className="mobile-cta" href="#configurateur" aria-label="Créer un vélo"><ArrowUpRight size={18} /></a>
      </header>

      <section className="hero wrap" id="accueil">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> LE BON MONTAGE, SANS DEVINETTE</div>
          <h1>Votre vélo.<br />Toutes ses <span>possibilités.</span></h1>
          <p className="hero-description">Explorez les pièces, vérifiez qu’elles s’accordent et trouvez le juste prix pour votre prochain montage.</p>
          <div className="hero-search">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") document.querySelector("#explorer")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="Marque, vélo ou composant…" aria-label="Rechercher un vélo, une marque ou un composant" />
            <button aria-label="Lancer la recherche" onClick={() => document.querySelector("#explorer")?.scrollIntoView({ behavior: "smooth" })}><ArrowRight size={18} /></button>
          </div>
          <div className="popular-searches"><span>À LA UNE</span><button onClick={() => setQuery("Shimano")}>Shimano 105</button><button onClick={() => setQuery("Gravel")}>Gravel</button><button onClick={() => setQuery("Canyon")}>Canyon</button></div>
          <div className="hero-proof"><div className="avatar-stack"><span>R</span><span>G</span><span>V</span><span>U</span></div><p><strong>Route, gravel, VTT, urbain.</strong> Chaque pratique a ses standards.</p></div>
        </div>
        <div className="hero-visual">
          <div className="visual-grain" />
          <div className="visual-topline"><span>UNE MONTURE, À LA LOUPE</span><button onClick={() => setSaved(!saved)} aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"} className={saved ? "favorite saved" : "favorite"}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button></div>
          <div className="hero-bike-label"><span className="tiny-label">ROUTE · ENDURANCE</span><strong>Canyon Endurace CF</strong><span>Notre montage du moment</span></div>
          <BikeIllustration />
          <div className="visual-price"><div><span>PRIX INDICATIF</span><strong>2 799 €</strong></div></div>
          <div className="compat-float"><span className="compat-check"><Check size={15} /></span><div><strong>Compatibilité à vérifier.</strong><span>12 standards à explorer</span></div><ArrowUpRight size={15} />
          </div>
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
        </div>
      </section>

      <section className="trust-strip"><div className="wrap trust-inner"><div><span className="trust-icon"><ShieldCheck size={20} /></span><p><strong>Compatibilité expliquée</strong><span>Standards et mesures à vérifier</span></p></div><div><span className="trust-icon"><SlidersHorizontal size={20} /></span><p><strong>Comparaison simple</strong><span>Les critères qui changent le montage</span></p></div><div><span className="trust-icon"><Compass size={20} /></span><p><strong>Prix indicatifs</strong><span>Des repères avant l’achat</span></p></div><span className="trust-note">EXEMPLES VISUELS · DONNÉES À COMPLÉTER</span></div></section>

      <section className="explore-section wrap" id="explorer">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> TROUVEZ VOTRE POINT DE DÉPART</div><h2>Le vélo qu’il vous faut,<br className="desktop-break" /> à portée de regard.</h2><p className="demo-note">Sélection de démonstration · modèles, compatibilités et prix à confirmer</p></div><a className="text-link" href="#compatibilite">Voir tous les vélos <ArrowUpRight size={16} /></a></div>
        <div className="explore-toolbar"><div className="filter-pills" role="group" aria-label="Filtrer par pratique">{disciplines.map((item) => <button key={item} onClick={() => setDiscipline(item)} className={discipline === item ? "filter-pill active" : "filter-pill"}>{item}{item === "Tout voir" && <span className="filter-count">4</span>}</button>)}</div><span className="results-count">{filteredBuilds.length} modèle{filteredBuilds.length > 1 ? "s" : ""}</span></div>
        <div className="bike-grid">{filteredBuilds.length ? filteredBuilds.slice(0, 3).map((build, index) => <article className="bike-card" key={build.name}>
          <div className="bike-card-image" style={{ "--bike-card": build.color } as React.CSSProperties}><span className="bike-card-label">{build.label}</span><button className={savedBuilds.includes(build.name) ? "card-heart saved" : "card-heart"} onClick={() => setSavedBuilds((current) => current.includes(build.name) ? current.filter((name) => name !== build.name) : [...current, build.name])} aria-label={savedBuilds.includes(build.name) ? "Retirer des favoris" : "Ajouter aux favoris"}><Heart size={17} fill={savedBuilds.includes(build.name) ? "currentColor" : "none"} /></button><MiniBike type={build.art} /><span className="art-index">0{index + 1} <span>/</span> 04</span></div>
          <div className="bike-card-body"><div className="bike-maker">{build.maker} <span>·</span> {build.kind}</div><div className="bike-title-row"><h3>{build.name}</h3><span className="bike-card-price">{build.price}</span></div><div className="bike-card-foot"><span className="fit-mark"><Check size={13} />{build.fit}</span><a href="#compatibilite" aria-label={`Voir la compatibilité du ${build.name}`}><ArrowUpRight size={18} /></a></div></div>
        </article>) : <div className="empty-state"><Search size={20} /><strong>Aucun vélo trouvé</strong><span>Essayez une autre marque ou discipline.</span><button onClick={() => { setQuery(""); setDiscipline("Tout voir"); }}>Réinitialiser la recherche</button></div>}</div>
        <div className="catalog-cta"><span><Sparkles size={16} /> LA SUITE DU CATALOGUE</span><p>Les données de vélos et de composants arrivent dans les prochaines étapes.</p><a href="#compatibilite">Voir la compatibilité <ArrowRight size={16} /></a></div>
      </section>

      <section className="checker-section" id="compatibilite"><div className="wrap checker-layout"><div className="checker-copy"><div className="eyebrow"><span className="eyebrow-line" /> VOTRE PROCHAIN BON CHOIX</div><h2>Une pièce en tête ?<br /><span>On vérifie ensemble.</span></h2><p>Un standard de boîtier, une cassette ou une paire de roues : découvrez les critères à contrôler sur votre vélo avant de passer commande.</p><a href="#configurateur" className="button button-dark">Vérifier une pièce <ArrowUpRight size={16} /></a></div><div className="compat-card"><div className="compat-card-head"><div className="compat-card-title"><span className="compat-symbol"><Wrench size={19} /></span><div><strong>Vérification de montage</strong><span>EXEMPLE · DONNÉES DE DÉMONSTRATION</span></div></div><button aria-label="Plus d’informations"><CircleHelp size={18} /></button></div><div className="compat-bike"><span className="bike-thumb"><Bike size={25} /></span><div><strong>Canyon Endurace CF 7</strong><span>Route · Freins à disque</span></div><span className="badge-ready"><span /> Votre vélo</span></div><div className="component-row"><span className="component-icon"><span className="cassette-art">◎</span></span><div><strong>Cassette Shimano 105</strong><span>12 vitesses · 11–34 dents</span></div><span className="badge-compatible"><Check size={12} /> Exemple</span></div><div className="compat-explainer"><span className="explainer-dot" /><p><strong>À confirmer.</strong> Vérifiez le corps de roue libre, le nombre de vitesses et les recommandations du fabricant.</p><ChevronDown size={17} /></div><div className="compat-card-bottom"><span><ShieldCheck size={15} /> Démonstration visuelle, non vérifiée</span><a href="#prix">Voir les repères <ArrowUpRight size={14} /></a></div></div></div></section>

      <section className="how-section wrap" id="configurateur"><div className="how-intro"><div className="eyebrow"><span className="eyebrow-line" /> DU PREMIER CLIC AU PREMIER TOUR DE ROUE</div><h2>Votre montage,<br />en trois temps.</h2><p>Quelques repères concrets pour avancer sereinement, pièce après pièce.</p></div><div className="steps-grid"><article><span className="step-number">01 <span>—</span> CHOISIR</span><div className="step-icon"><Bike size={24} /></div><h3>Votre vélo, votre pratique.</h3><p>Partez d’un modèle connu ou indiquez vos mesures pour cadrer votre projet.</p><a href="#explorer">Trouver mon vélo <ArrowRight size={15} /></a></article><article><span className="step-number">02 <span>—</span> VÉRIFIER</span><div className="step-icon"><Wrench size={23} /></div><h3>Chaque pièce à sa place.</h3><p>Comprenez les standards et les compatibilités qui comptent pour votre montage.</p><a href="#compatibilite">Vérifier mes pièces <ArrowRight size={15} /></a></article><article><span className="step-number">03 <span>—</span> COMPARER</span><div className="step-icon"><SlidersHorizontal size={23} /></div><h3>Le prix qui vous convient.</h3><p>Comparez les pièces, les gammes et les prix indicatifs en un clin d’œil.</p><a href="#prix">Comparer les prix <ArrowRight size={15} /></a></article></div></section>

      <section className="final-cta wrap" id="prix"><div className="final-cta-art"><div className="final-circle circle-a" /><div className="final-circle circle-b" /><div className="final-circle circle-c" /><Wrench size={82} strokeWidth={1.05} /></div><div className="final-cta-copy"><div className="eyebrow"><span className="eyebrow-line" /> À VOUS DE JOUER</div><h2>Le prochain montage<br />commence ici.</h2><p>Votre vélo est déjà quelque part. On vous aide à le trouver.</p><a href="#explorer" className="button button-dark">Explorer VeloScope <ArrowUpRight size={16} /></a></div><div className="final-stamp"><span>CONÇU<br />POUR ROULER</span><Bike size={27} /></div></section>

      <footer className="site-footer"><div className="wrap footer-top"><a className="brand footer-brand" href="#accueil"><span className="brand-mark"><Bike size={20} /></span><span>velo<span className="brand-bold">scope</span><i>.</i></span></a><p>Les bons composants. Le bon vélo.<br />Et la route qui vous attend.</p><div className="footer-nav"><a href="#explorer">Explorer</a><a href="#compatibilite">Compatibilité</a><a href="#configurateur">Le guide</a><a href="mailto:bonjour@veloscope.fr">Nous écrire</a></div></div><div className="wrap footer-bottom"><span>© 2026 VeloScope · Fait pour les amoureux du vélo.</span><span>À LA CROISÉE DE LA MÉCANIQUE ET DE LA ROUTE <span className="footer-star">✳</span></span></div></footer>
    </main>
  );
}
