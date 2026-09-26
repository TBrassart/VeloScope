"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  CircleHelp,
  Compass,
  Heart,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wrench,
} from "lucide-react";
import PartIllustration from "@/components/part-illustration";
import { shimanoDisciplines, shimanoFamilies, shimanoGroups } from "@/lib/shimano-catalog";

const priceChecked = "26 sept. 2026";
const components = [
  {
    name: "Cassette Shimano 105",
    model: "CS-R7101-12",
    category: "Cassettes",
    group: "105 · route",
    specs: "12 vitesses · 11–34 dents",
    price: "39,99 €",
    priceNote: "BIKE24 · relevé le " + priceChecked,
    manufacturerUrl: "https://bike.shimano.com/fr-FR/products/components/pdp.P-CS-R7101-12.html",
    retailerUrl: "https://www.bike24.fr/produits/759128?origin=PP",
    art: "cassette",
    color: "#dce3c5",
  },
  {
    name: "Pédalier Shimano 105",
    model: "FC-R7100",
    category: "Pédaliers",
    group: "105 · route",
    specs: "50/34 dents · manivelles 172,5 mm",
    price: "169,00 €",
    priceNote: "Alltricks · variante 172,5 mm · relevé le " + priceChecked,
    manufacturerUrl: "https://bike.shimano.com/fr-FR/products/components/pdp.P-FC-R7100.html",
    retailerUrl: "https://www.alltricks.fr/F-11932-pedaliers/P-2764073-pedalier_shimano_105_fc_r7100_50_34_dents_12v_noir",
    art: "crankset",
    color: "#e6dfd0",
  },
  {
    name: "Chaîne Shimano SLX",
    model: "CN-M7100",
    category: "Chaînes",
    group: "SLX · VTT / gravel",
    specs: "12 vitesses · Hyperglide+ · maillon rapide",
    price: "dès 20,99 €",
    priceNote: "BIKE24 · selon longueur · relevé le " + priceChecked,
    manufacturerUrl: "https://bike.shimano.com/fr-FR/products/components/pdp.P-CN-M7100.html",
    retailerUrl: "https://www.bike24.fr/produits/325352",
    art: "chain",
    color: "#d8dfd0",
  },
] as const;

type Component = (typeof components)[number];
type ComponentArt = "cassette" | "crankset" | "chain";

export default function Explorer() {
  const [discipline, setDiscipline] = useState<(typeof shimanoDisciplines)[number]>("Tout voir");
  const [family, setFamily] = useState("Toutes les familles");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [featuredSaved, setFeaturedSaved] = useState(false);

  const filteredGroups = useMemo(() => shimanoGroups.filter((group) => {
    const matchesDiscipline = discipline === "Tout voir" || group.discipline.includes(discipline);
    const matchesFamily = family === "Toutes les familles" || group.families.includes(family);
    const searchableText = `${group.name} ${group.discipline.join(" ")} ${group.families.join(" ")}`.toLocaleLowerCase("fr");
    return matchesDiscipline && matchesFamily && searchableText.includes(query.toLocaleLowerCase("fr").trim());
  }), [discipline, family, query]);
  const filteredComponents = useMemo(() => components.filter((part) => `${part.name} ${part.model} ${part.group} ${part.specs}`.toLocaleLowerCase("fr").includes(query.toLocaleLowerCase("fr").trim())), [query]);

  const toggleSaved = (part: Component) => {
    setSaved((current) => current.includes(part.model)
      ? current.filter((model) => model !== part.model)
      : [...current, part.model]);
  };

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> Les prix sont liés à des offres marchandes <a href="#catalogue">Voir les références <ArrowUpRight size={13} /></a></div>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="VeloScope, accueil"><span className="brand-mark"><Bike size={22} strokeWidth={2.2} /></span><span>velo<span className="brand-bold">scope</span><i>.</i></span></a>
        <nav className="main-nav" aria-label="Navigation principale"><a className="nav-active" href="#catalogue">Composants</a><a href="#compatibilite">Compatibilité</a><a href="#prix">Prix & sources</a></nav>
        <div className="header-actions"><a className="button button-light login-button" href="#catalogue">Parcourir les pièces</a><a className="button button-dark header-cta" href="#compatibilite">Vérifier une compatibilité <ArrowUpRight size={15} /></a></div>
        <a className="mobile-cta" href="#catalogue" aria-label="Parcourir les pièces"><ArrowUpRight size={18} /></a>
      </header>

      <section className="hero wrap" id="accueil">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> LES PIÈCES, AVEC LEURS VRAIES RÉFÉRENCES</div>
          <h1>Un composant précis.<br />Tout ce qu’il faut <span>vérifier.</span></h1>
          <p className="hero-description">Partez d’une référence fabricant, consultez ses caractéristiques et comparez les prix chez des marchands identifiés.</p>
          <div className="hero-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") document.querySelector("#catalogue")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="Référence, marque ou standard…" aria-label="Rechercher une pièce vélo" /><button aria-label="Lancer la recherche" onClick={() => document.querySelector("#catalogue")?.scrollIntoView({ behavior: "smooth" })}><ArrowRight size={18} /></button></div>
          <div className="popular-searches"><span>GAMMES</span><button onClick={() => setQuery("105")}>105</button><button onClick={() => setQuery("GRX")}>GRX</button><button onClick={() => setQuery("CUES")}>CUES</button></div>
          <div className="hero-proof"><span className="proof-check"><ShieldCheck size={17} /></span><p><strong>Références fabricant.</strong> Prix liés à la fiche du vendeur.</p></div>
        </div>
        <div className="hero-visual">
          <div className="visual-grain" />
          <div className="visual-topline"><span>PIÈCE EN VEDETTE · SHIMANO 105</span><button onClick={() => setFeaturedSaved(!featuredSaved)} aria-label={featuredSaved ? "Retirer des favoris" : "Ajouter aux favoris"} className={featuredSaved ? "favorite saved" : "favorite"}><Heart size={17} fill={featuredSaved ? "currentColor" : "none"} /></button></div>
          <div className="hero-bike-label"><span className="tiny-label">CASSETTE · ROUTE · 12 VITESSES</span><strong>CS-R7101-12</strong><span>11–34 dents · corps HG route</span></div>
          <PartIllustration type="cassette" large />
          <div className="visual-price"><div><span>RÉFÉRENCE FABRICANT</span><strong>CS-R7101-12</strong></div></div>
          <a className="compat-float" href={components[0].manufacturerUrl} target="_blank" rel="noreferrer"><span className="compat-check"><Check size={15} /></span><div><strong>Fiche fabricant</strong><span>Shimano · CS-R7101-12</span></div><ArrowUpRight size={15} /></a>
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
        </div>
      </section>

      <section className="trust-strip"><div className="wrap trust-inner"><div><span className="trust-icon"><ShieldCheck size={20} /></span><p><strong>Modèles identifiables</strong><span>Références et liens fabricant</span></p></div><div><span className="trust-icon"><SlidersHorizontal size={20} /></span><p><strong>Prix traçables</strong><span>Marchand et date affichés</span></p></div><div><span className="trust-icon"><Compass size={20} /></span><p><strong>Compatibilité contextualisée</strong><span>Les standards à contrôler</span></p></div><span className="trust-note">PRIX VARIABLES · VÉRIFIER CHEZ LE VENDEUR</span></div></section>

      <section className="explore-section wrap" id="catalogue">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> CATALOGUE OFFICIEL SHIMANO</div><h2>Explorez les gammes.<br className="desktop-break" /> Trouvez la bonne pièce.</h2><p className="demo-note">Disciplines, familles et séries officielles. Les pièces détachées et variantes se vérifient dans les documents Shimano.</p></div><a className="text-link" href="https://productinfo.shimano.com/en/lineup" target="_blank" rel="noreferrer">Catalogue Shimano <ArrowUpRight size={16} /></a></div>
        <div className="explore-toolbar"><div className="filter-pills" role="group" aria-label="Filtrer par discipline">{shimanoDisciplines.map((item) => <button key={item} onClick={() => setDiscipline(item)} className={discipline === item ? "filter-pill active" : "filter-pill"}>{item}</button>)}</div><span className="results-count">{filteredGroups.length} gammes / familles</span></div>
        <div className="explore-toolbar family-toolbar"><label htmlFor="family-filter">Famille de composants</label><select id="family-filter" value={family} onChange={(event) => setFamily(event.target.value)}>{shimanoFamilies.map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="shimano-grid">{filteredGroups.map((group, index) => <article className="shimano-card" key={group.name}><div className="shimano-card-top"><span className="shimano-card-index">{String(index + 1).padStart(2, "0")}</span><span>{group.discipline.join(" · ").toUpperCase()}</span></div><h3>{group.name}</h3><div className="shimano-family-list">{group.families.map((item) => <span key={item}>{item}</span>)}</div><p>{group.note}</p><div className="shimano-card-foot"><span>{group.sourceLabel}</span><a href={group.source} target="_blank" rel="noreferrer">Fiche officielle <ArrowUpRight size={14} /></a></div></article>)}</div>
        {filteredComponents.length > 0 && <><h3 className="verified-parts-title">Quelques références Shimano vérifiées chez des marchands</h3><div className="bike-grid part-grid">{filteredComponents.map((part, index) => <article className="bike-card part-card" key={part.model}>
          <div className="bike-card-image part-card-image" style={{ "--bike-card": part.color } as React.CSSProperties}><span className="bike-card-label">{part.category.toUpperCase()} · {part.group.toUpperCase()}</span><button className={saved.includes(part.model) ? "card-heart saved" : "card-heart"} onClick={() => toggleSaved(part)} aria-label={saved.includes(part.model) ? "Retirer des favoris" : "Ajouter aux favoris"}><Heart size={17} fill={saved.includes(part.model) ? "currentColor" : "none"} /></button><PartIllustration type={part.art as ComponentArt} /><span className="art-index">0{index + 1} <span>/</span> 0{filteredComponents.length}</span></div>
          <div className="bike-card-body part-card-body"><div className="bike-maker">SHIMANO <span>·</span> {part.group}</div><div className="bike-title-row"><h3>{part.name}</h3><span className="bike-card-price">{part.price}</span></div><div className="component-model">Réf. fabricant <strong>{part.model}</strong></div><div className="part-specs">{part.specs}</div><div className="part-source-row"><span>{part.priceNote}</span><a href={part.retailerUrl} target="_blank" rel="noreferrer" aria-label={`Voir ${part.name} chez le marchand`}><ArrowUpRight size={17} /></a></div><a className="manufacturer-link" href={part.manufacturerUrl} target="_blank" rel="noreferrer">Fiche Shimano <ArrowUpRight size={13} /></a></div>
        </article>)}</div></>}
        {filteredGroups.length === 0 && <div className="empty-state"><Search size={20} /><strong>Aucune gamme trouvée</strong><span>Essayez un autre nom de gamme ou réinitialisez les filtres.</span><button onClick={() => { setQuery(""); setDiscipline("Tout voir"); setFamily("Toutes les familles"); }}>Réinitialiser la recherche</button></div>}
        <div className="catalog-cta" id="prix"><span><Sparkles size={16} /> SOURCES ET PRIX</span><p>Les prix sont affichés uniquement pour des offres marchandes identifiées; aucune estimation n’est inventée.</p><a href="https://productinfo.shimano.com/en/spec" target="_blank" rel="noreferrer">Voir les spécifications <ArrowRight size={16} /></a></div>
      </section>

      <section className="checker-section" id="compatibilite"><div className="wrap checker-layout"><div className="checker-copy"><div className="eyebrow"><span className="eyebrow-line" /> AVANT D’AJOUTER AU PANIER</div><h2>Une même référence.<br /><span>Pas toujours le même montage.</span></h2><p>Une pièce se vérifie avec le vélo et les composants déjà montés. Ces repères orientent la recherche ; ils ne remplacent pas une vérification complète du montage.</p><a href="https://productinfo.shimano.com/" target="_blank" rel="noreferrer" className="button button-dark">Consulter l’outil Shimano <ArrowUpRight size={16} /></a></div><div className="compat-card"><div className="compat-card-head"><div className="compat-card-title"><span className="compat-symbol"><Wrench size={19} /></span><div><strong>À contrôler pour une transmission</strong><span>REPÈRES GÉNÉRAUX · PAS UN FEU VERT DE COMPATIBILITÉ</span></div></div><CircleHelp size={18} /></div><div className="compat-bike"><span className="bike-thumb"><span className="cassette-art">12</span></span><div><strong>Cassette 12 vitesses</strong><span>Interface du corps de roue libre</span></div><span className="badge-ready"><span /> À vérifier</span></div><div className="component-row"><span className="component-icon"><Wrench size={19} /></span><div><strong>Denture et dérailleur</strong><span>Grand pignon maximal admis</span></div><span className="badge-compatible">Selon modèle</span></div><div className="component-row"><span className="component-icon"><SlidersHorizontal size={18} /></span><div><strong>Chaîne et plateaux</strong><span>Nombre de vitesses et compatibilité fabricant</span></div><span className="badge-compatible">Selon modèle</span></div><div className="compat-explainer"><span className="explainer-dot" /><p><strong>À confirmer sur la fiche technique.</strong> Cadre, moyeu, transmission et version exacte peuvent changer la réponse.</p></div><div className="compat-card-bottom"><span><ShieldCheck size={15} /> Références et standards fabricant</span><a href="https://productinfo.shimano.com/" target="_blank" rel="noreferrer">Shimano Product Info <ArrowUpRight size={14} /></a></div></div></div></section>

      <section className="how-section wrap" id="configurateur"><div className="how-intro"><div className="eyebrow"><span className="eyebrow-line" /> PARTIR DU CONCRET</div><h2>Votre pièce,<br />puis le bon montage.</h2><p>On commence par des composants qu’on peut identifier et documenter.</p></div><div className="steps-grid"><article><span className="step-number">01 <span>—</span> IDENTIFIER</span><div className="step-icon"><Search size={23} /></div><h3>La référence fabricant.</h3><p>Nom, modèle, version et fiche technique pour éviter les pièces approchantes.</p><a href="#catalogue">Parcourir les références <ArrowRight size={15} /></a></article><article><span className="step-number">02 <span>—</span> CONTEXTUALISER</span><div className="step-icon"><Wrench size={23} /></div><h3>Le vélo et ses standards.</h3><p>Un nombre de vitesses seul ne suffit pas : il faut les autres composants et mesures.</p><a href="#compatibilite">Voir les repères <ArrowRight size={15} /></a></article><article><span className="step-number">03 <span>—</span> COMPARER</span><div className="step-icon"><SlidersHorizontal size={23} /></div><h3>Les offres marchandes.</h3><p>Un prix lisible avec son vendeur, sa variante et la date de consultation.</p><a href="#prix">Voir les prix relevés <ArrowRight size={15} /></a></article></div></section>

      <section className="final-cta wrap"><div className="final-cta-art"><div className="final-circle circle-a" /><div className="final-circle circle-b" /><div className="final-circle circle-c" /><Wrench size={82} strokeWidth={1.05} /></div><div className="final-cta-copy"><div className="eyebrow"><span className="eyebrow-line" /> LE CATALOGUE COMMENCE ICI</div><h2>Des références fiables.<br />Des choix plus simples.</h2><p>Le catalogue s’étoffera à partir de fiches fabricant et d’offres vérifiables.</p><a href="#catalogue" className="button button-dark">Explorer les composants <ArrowUpRight size={16} /></a></div><div className="final-stamp"><span>SOURCES<br />À L’APPUI</span><ShieldCheck size={25} /></div></section>

      <footer className="site-footer"><div className="wrap footer-top"><a className="brand footer-brand" href="#accueil"><span className="brand-mark"><Bike size={20} /></span><span>velo<span className="brand-bold">scope</span><i>.</i></span></a><p>Les bonnes pièces.<br />Les bons repères pour les choisir.</p><div className="footer-nav"><a href="#catalogue">Composants</a><a href="#compatibilite">Compatibilité</a><a href="#prix">Prix & sources</a><a href="mailto:bonjour@veloscope.fr">Nous écrire</a></div></div><div className="wrap footer-bottom"><span>© 2026 VeloScope · Références et prix à revalider chez le fabricant et le marchand.</span><span>FAIT POUR LES AMOUREUX DU VÉLO <span className="footer-star">✳</span></span></div></footer>
    </main>
  );
}
