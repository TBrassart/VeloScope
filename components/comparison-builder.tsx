"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft, Search, X } from "lucide-react";

type Part = { id: string; brand: string; model: string; category: string; lifespan_km: string | number; name: string };
const typeNames: Record<string, string> = { tyre: "Pneu", wheel: "Roue", fork: "Fourche", chainrings: "Plateau", cassette: "Cassette", chain: "Chaîne", pedals: "Pédales", "brake-rotor": "Disque de frein", "brake-pads": "Plaquettes", shock: "Amortisseur", "seat-post": "Tige de selle", "bottom-bracket": "Boîtier de pédalier", brake: "Frein", cranks: "Manivelle", battery: "Batterie", chainguide: "Guide-chaîne", hub: "Moyeu", "inner-tube": "Chambre à air", sprocket: "Pignon", stem: "Potence", handlebar: "Guidon", sealant: "Préventif", other: "Autre" };

export default function ComparisonBuilder() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Part[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    fetch("/data/component-library.json")
      .then((response) => response.json())
      .then((data: Part[]) => setParts(data))
      .catch(() => setParts([]));
  }, []);

  const suggestions = useMemo(() => parts
    .filter((part) => `${part.name} ${part.brand} ${part.model}`.toLocaleLowerCase("fr").includes(query.toLocaleLowerCase("fr").trim()))
    .filter((part) => !items.some((item) => item.id === part.id))
    .slice(0, 7), [parts, query, items]);

  const addPart = (part: Part) => {
    setItems((current) => [...current, part].slice(0, 4));
    setQuery("");
  };
  const cells = (render: (part: Part) => React.ReactNode, empty = "—") => <>{items.map((item) => <td key={item.id}>{render(item)}</td>)}{items.length < 2 && <td>{empty}</td>}</>;

  return <div className="compare-builder">
    <div className="compare-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une pièce à comparer…" aria-label="Rechercher une pièce à comparer"/></div>
    {query && <div className="compare-suggestions">{suggestions.map((part) => <button key={part.id} onClick={() => addPart(part)}><span><b>{part.name}</b><small>{part.brand} · {typeNames[part.category] ?? part.category}</small></span><ArrowRightLeft size={15}/></button>)}</div>}
    <div className="compare-table-wrap"><table className="compare-table">
      <thead><tr><th>Caractéristique</th>{items.map((item, index) => <th key={item.id}><span>OPTION 0{index + 1}</span><button onClick={() => setItems((current) => current.filter((part) => part.id !== item.id))} aria-label={`Retirer ${item.name}`}><X size={14}/></button></th>)}{items.length < 2 && <th className="compare-empty-head">AJOUTER UNE PIÈCE</th>}</tr></thead>
      <tbody>
        <tr><th>Pièce</th>{cells((part) => <b>{part.name}</b>, "Utilisez la recherche ci-dessus")}</tr>
        <tr><th>Marque</th>{cells((part) => part.brand)}</tr>
        <tr><th>Modèle</th>{cells((part) => part.model)}</tr>
        <tr><th>Type de composant</th>{cells((part) => typeNames[part.category] ?? part.category)}</tr>
        <tr><th>Durée indicative</th>{cells((part) => Number(part.lifespan_km) > 0 ? `${Number(part.lifespan_km).toLocaleString("fr-FR")} km` : "Non renseignée")}</tr>
        <tr><th>Prix</th>{cells(() => "Non disponible dans la source")}</tr>
        <tr><th>Compatibilité</th>{cells(() => <span className="confidence confidence-low">À documenter</span>)}</tr>
      </tbody>
    </table></div>
    <div className="compare-footnote">Maximum 4 pièces. Les champs affichés correspondent aux données présentes; aucun prix ou résultat de compatibilité n’est fabriqué.</div>
  </div>;
}
