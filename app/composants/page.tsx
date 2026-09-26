import Link from "next/link";
import { ArrowUpRight, GitCompareArrows } from "lucide-react";
import SiteShell from "@/components/site-shell";
import CatalogBrowser from "@/components/catalog-browser";

export default function ComponentsPage() {
  return <SiteShell><main className="page-main catalog-page"><section className="page-heading content-wrap"><div><span className="eyebrow"><i/> BIBLIOTHÈQUE DE PIÈCES</span><h1>Les composants,<br/><em>en clair.</em></h1><p>La bibliothèque de départ contient les pièces que tu avais réunies. Recherche par nom, marque ou modèle puis ajoute une référence à ton projet.</p></div><Link className="button button-dark" href="/comparateur">Ouvrir le comparateur <GitCompareArrows size={16}/></Link></section><section className="content-wrap catalog-content"><CatalogBrowser/></section><aside className="content-wrap catalog-source-note"><span>À COMPLÉTER AVEC LES SOURCES</span><p>Le fichier fournit l’identifiant, la marque, le modèle, la catégorie, une durée de vie indicative et le nom de la pièce. Il n’inclut ni prix, ni dimensions standardisées, ni relations de compatibilité.</p><a href="https://productinfo.shimano.com/en" target="_blank" rel="noreferrer">Consulter les documents Shimano <ArrowUpRight size={14}/></a></aside></main></SiteShell>;
}
