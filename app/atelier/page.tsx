"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Bike, Check, List, Search, SlidersHorizontal, Wrench } from "lucide-react";
import SiteShell from "@/components/site-shell";

type Part = { id: string; brand: string; model: string; category: string; name: string };
const types = [
  { id: "route", name: "Route", image: "/bikes/route.png" },
  { id: "mtb", name: "VTT", image: "/bikes/vtt.png" },
  { id: "gravel", name: "Gravel", image: "/bikes/gravel.png" },
  { id: "clm", name: "CLM", image: "/bikes/clm.png" },
  { id: "ville", name: "Ville", image: "/bikes/ville.png" },
];
const categories = ["fork", "wheel", "tyre", "cassette", "chain", "chainrings", "cranks", "brake", "brake-rotor", "brake-pads", "pedals", "seat-post", "bottom-bracket", "shock", "stem", "handlebar", "hub", "battery"];
const names: Record<string, string> = { fork: "Fourche", wheel: "Roue", tyre: "Pneu", cassette: "Cassette", chain: "Chaîne", chainrings: "Plateau", cranks: "Manivelle", brake: "Frein", "brake-rotor": "Disque de frein", "brake-pads": "Plaquettes", pedals: "Pédales", "seat-post": "Tige de selle", "bottom-bracket": "Boîtier de pédalier", shock: "Amortisseur", stem: "Potence", handlebar: "Guidon", hub: "Moyeu", battery: "Batterie" };

export default function WorkshopPage() {
  const [type, setType] = useState("route");
  const [view, setView] = useState<"graphic" | "list">("graphic");
  const [query, setQuery] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [assigned, setAssigned] = useState<Record<string, Part>>({});
  const [activeSlot, setActiveSlot] = useState("frame");

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("type");
    if (selected && types.some((item) => item.id === selected)) {
      const timer = window.setTimeout(() => setType(selected), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    fetch("/data/component-library.json")
      .then((response) => response.json())
      .then((data: Part[]) => setParts(data))
      .catch(() => setParts([]));
  }, []);

  const matches = useMemo(() => parts.filter((part) => `${part.name} ${part.brand} ${part.model}`.toLocaleLowerCase("fr").includes(query.toLocaleLowerCase("fr").trim())).slice(0, 6), [parts, query]);
  const selectedType = types.find((item) => item.id === type) ?? types[0];
  const choosePart = (part: Part) => {
    setAssigned((current) => ({ ...current, [activeSlot]: part }));
    setQuery("");
  };

  return <SiteShell>
    <main className="page-main">
      <section className="page-heading content-wrap">
        <div><span className="eyebrow"><i/> ATELIER DE MONTAGE</span><h1>Votre vélo,<br/><em>pièce par pièce.</em></h1><p>Choisissez le type de vélo, ajoutez vos composants et gardez les informations à vérifier bien visibles.</p></div>
        <div className="page-heading-note"><span className="note-dot"/> Votre configuration est conservée dans cette session.</div>
      </section>
      <section className="workbench content-wrap">
        <div className="workbench-head">
          <div className="type-tabs" role="group" aria-label="Type de vélo">{types.map((item) => <button key={item.id} onClick={() => setType(item.id)} className={type === item.id ? "active" : ""}>{item.name}</button>)}</div>
          <div className="view-toggle"><button className={view === "graphic" ? "active" : ""} onClick={() => setView("graphic")}><Bike size={16}/> Vue graphique</button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><List size={16}/> Liste détaillée</button></div>
        </div>
        <div className={`workbench-body ${view === "list" ? "list-mode" : ""}`}>
          <div className="bike-canvas">
            <div className="workshop-bike workshop-image">
              <Image key={selectedType.id} src={selectedType.image} alt={`Illustration du vélo ${selectedType.name}`} fill priority sizes="(max-width: 700px) 100vw, 65vw" className="workshop-bike-image" />
              {categories.map((slot) => <button key={slot} className={`component-pin pin-${slot} ${activeSlot === slot ? "selected" : ""} ${assigned[slot] ? "filled" : ""}`} onClick={() => { setActiveSlot(slot); setView("list"); }} aria-label={`Ajouter ${names[slot]}`}><span>{assigned[slot] ? <Check size={13}/> : "+"}</span><small>{names[slot]}</small></button>)}
            </div>
            <div className="canvas-note"><span>ILLUSTRATION · CLIQUEZ SUR UN REPÈRE</span><span>{selectedType.name.toUpperCase()} / 01</span></div>
          </div>
          <aside className="workbench-panel">
            <div className="panel-title"><span className="panel-icon"><Wrench size={17}/></span><div><h2>Votre montage</h2><span>{Object.keys(assigned).length} pièce{Object.keys(assigned).length === 1 ? "" : "s"} ajoutée{Object.keys(assigned).length === 1 ? "" : "s"}</span></div></div>
            <label className="part-search"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Chercher ${names[activeSlot]?.toLowerCase() ?? "une pièce"}…`}/></label>
            {query && <div className="part-suggestions">{matches.length ? matches.map((part) => <button key={part.id} onClick={() => choosePart(part)}><span><b>{part.name}</b><small>{part.brand} · {part.model}</small></span><ArrowRight size={15}/></button>) : <span className="no-suggestion">Aucun résultat</span>}</div>}
            <div className="mount-list">{(view === "list" ? categories : ["frame", "wheel", "tyre", "cassette", "chain", "brake", "pedals"]).map((slot) => { const part = assigned[slot]; return <button key={slot} className={`mount-row ${activeSlot === slot ? "active" : ""}`} onClick={() => { setActiveSlot(slot); setQuery(""); }}><span className="mount-status">{part ? <Check size={13}/> : "+"}</span><span className="mount-label"><b>{slot === "frame" ? "Cadre" : names[slot] ?? slot}</b><small>{part ? `${part.brand} · ${part.name}` : "Choisir ou décrire cette pièce"}</small></span><span className={`confidence ${part ? "confidence-review" : "confidence-low"}`}>{part ? "À vérifier" : "À renseigner"}</span></button>; })}</div>
            <div className="panel-warning"><SlidersHorizontal size={16}/><p>Le catalogue ne contient pas les dimensions techniques. Aucun feu vert de compatibilité n’est déduit.</p></div>
            <button className="save-build-button" onClick={() => localStorage.setItem("veloscope-build", JSON.stringify({ type, assigned }))}><Check size={16}/> Enregistrer le projet</button>
          </aside>
        </div>
      </section>
      <section className="content-wrap workflow-hint"><span className="hint-num">01</span><div><b>Ajoutez une pièce par recherche.</b><p>La base importe marques, modèles et familles; tailles d’axe, standards et prix seront ajoutés avec leurs sources.</p></div></section>
    </main>
  </SiteShell>;
}
