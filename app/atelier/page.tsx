"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Bike, Check, List, Search, SlidersHorizontal, Wrench } from "lucide-react";
import SiteShell from "@/components/site-shell";

type Part = { id: string; brand: string; model: string; category: string; name: string };
type Point = { x: number; y: number };
type Slot = { id: string; category: string; name: string; defaultPoint: Point };

const types = [
  { id: "route", name: "Route", image: "/bikes/route.png" },
  { id: "mtb", name: "VTT", image: "/bikes/vtt.png" },
  { id: "gravel", name: "Gravel", image: "/bikes/gravel.png" },
  { id: "clm", name: "CLM", image: "/bikes/clm.png" },
  { id: "ville", name: "Ville", image: "/bikes/ville.png" },
];

const categoryNames: Record<string, string> = {
  fork: "Fourche", wheel: "Roue", tyre: "Pneu", chainrings: "Plateau", cassette: "Cassette", chain: "Chaîne",
  pedals: "Pédales", "brake-rotor": "Disque de frein", "brake-pads": "Plaquettes", shock: "Amortisseur",
  "seat-post": "Tige de selle", "bottom-bracket": "Boîtier de pédalier", brake: "Frein", cranks: "Manivelle",
  battery: "Batterie", chainguide: "Guide-chaîne", hub: "Moyeu", "inner-tube": "Chambre à air",
  sprocket: "Pignon", stem: "Potence", handlebar: "Guidon", sealant: "Préventif", other: "Autre",
};

const slots: Slot[] = [
  { id: "fork", category: "fork", name: "Fourche", defaultPoint: { x: 68, y: 41 } },
  { id: "wheel-rear", category: "wheel", name: "Roue arrière", defaultPoint: { x: 14, y: 59 } },
  { id: "wheel-front", category: "wheel", name: "Roue avant", defaultPoint: { x: 78, y: 59 } },
  { id: "tyre-rear", category: "tyre", name: "Pneu arrière", defaultPoint: { x: 7, y: 73 } },
  { id: "tyre-front", category: "tyre", name: "Pneu avant", defaultPoint: { x: 85, y: 73 } },
  { id: "cassette", category: "cassette", name: "Cassette", defaultPoint: { x: 12, y: 53 } },
  { id: "chain", category: "chain", name: "Chaîne", defaultPoint: { x: 38, y: 64 } },
  { id: "chainrings", category: "chainrings", name: "Plateau", defaultPoint: { x: 40, y: 57 } },
  { id: "cranks", category: "cranks", name: "Manivelle", defaultPoint: { x: 46, y: 71 } },
  { id: "brake", category: "brake", name: "Frein", defaultPoint: { x: 83, y: 50 } },
  { id: "brake-rotor", category: "brake-rotor", name: "Disque de frein", defaultPoint: { x: 12, y: 65 } },
  { id: "brake-pads", category: "brake-pads", name: "Plaquettes", defaultPoint: { x: 15, y: 45 } },
  { id: "pedals", category: "pedals", name: "Pédales", defaultPoint: { x: 45, y: 77 } },
  { id: "seat-post", category: "seat-post", name: "Tige de selle", defaultPoint: { x: 28, y: 27 } },
  { id: "bottom-bracket", category: "bottom-bracket", name: "Boîtier de pédalier", defaultPoint: { x: 40, y: 55 } },
  { id: "shock", category: "shock", name: "Amortisseur", defaultPoint: { x: 29, y: 48 } },
  { id: "chainguide", category: "chainguide", name: "Guide-chaîne", defaultPoint: { x: 35, y: 62 } },
  { id: "battery", category: "battery", name: "Batterie", defaultPoint: { x: 49, y: 47 } },
  { id: "hub", category: "hub", name: "Moyeu", defaultPoint: { x: 17, y: 60 } },
  { id: "inner-tube", category: "inner-tube", name: "Chambre à air", defaultPoint: { x: 88, y: 66 } },
  { id: "sprocket", category: "sprocket", name: "Pignon", defaultPoint: { x: 10, y: 57 } },
  { id: "stem", category: "stem", name: "Potence", defaultPoint: { x: 65, y: 30 } },
  { id: "handlebar", category: "handlebar", name: "Guidon", defaultPoint: { x: 75, y: 15 } },
  { id: "sealant", category: "sealant", name: "Préventif", defaultPoint: { x: 91, y: 77 } },
  { id: "other", category: "other", name: categoryNames.other, defaultPoint: { x: 55, y: 83 } },
];

type DragState = { id: string; pointerId: number; startX: number; startY: number; moved: boolean };

export default function WorkshopPage() {
  const [type, setType] = useState("route");
  const [view, setView] = useState<"graphic" | "list">("graphic");
  const [query, setQuery] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [assigned, setAssigned] = useState<Record<string, Part>>({});
  const [activeSlot, setActiveSlot] = useState("fork");
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const positionsRef = useRef<Record<string, Point>>({});
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef<string | null>(null);

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
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem("veloscope-marker-positions");
        if (stored) {
          const loaded = JSON.parse(stored) as Record<string, Point>;
          positionsRef.current = loaded;
          setPositions(loaded);
        }
      } catch {
        localStorage.removeItem("veloscope-marker-positions");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const currentSlot = slots.find((slot) => slot.id === activeSlot) ?? slots[0];
  const matches = useMemo(() => parts
    .filter((part) => part.category === currentSlot.category)
    .filter((part) => `${part.name} ${part.brand} ${part.model}`.toLocaleLowerCase("fr").includes(query.toLocaleLowerCase("fr").trim()))
    .slice(0, 6), [parts, query, currentSlot.category]);
  const selectedType = types.find((item) => item.id === type) ?? types[0];

  const choosePart = (part: Part) => {
    setAssigned((current) => ({ ...current, [activeSlot]: part }));
    setQuery("");
  };

  const moveMarker = (event: React.PointerEvent<HTMLButtonElement>, slot: Slot) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== slot.id || drag.pointerId !== event.pointerId) return;
    if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 3) drag.moved = true;
    if (!drag.moved) return;
    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!bounds) return;
    const key = `${type}:${slot.id}`;
    const next = {
      ...positionsRef.current,
      [key]: {
        x: Math.min(97, Math.max(1, ((event.clientX - bounds.left) / bounds.width) * 100)),
        y: Math.min(96, Math.max(2, ((event.clientY - bounds.top) / bounds.height) * 100)),
      },
    };
    positionsRef.current = next;
    setPositions(next);
  };

  const finishDrag = (event: React.PointerEvent<HTMLButtonElement>, slot: Slot) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== slot.id || drag.pointerId !== event.pointerId) return;
    if (drag.moved) {
      suppressClickRef.current = slot.id;
      localStorage.setItem("veloscope-marker-positions", JSON.stringify(positionsRef.current));
    }
    dragRef.current = null;
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
              {slots.map((slot) => {
                const markerKey = `${type}:${slot.id}`;
                const point = positions[markerKey] ?? slot.defaultPoint;
                return <button key={slot.id} type="button" className={`component-pin movable-pin ${activeSlot === slot.id ? "selected" : ""} ${assigned[slot.id] ? "filled" : ""}`} style={{ left: `${point.x}%`, top: `${point.y}%`, right: "auto" }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); dragRef.current = { id: slot.id, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false }; }} onPointerMove={(event) => moveMarker(event, slot)} onPointerUp={(event) => finishDrag(event, slot)} onPointerCancel={(event) => finishDrag(event, slot)} onClick={() => { if (suppressClickRef.current === slot.id) { suppressClickRef.current = null; return; } setActiveSlot(slot.id); setView("list"); }} aria-label={`Déplacer ou ajouter ${slot.name}`} title={`Déplacez ce repère · ${slot.name}`}><span>{assigned[slot.id] ? <Check size={13}/> : "+"}</span><small>{slot.name}</small></button>;
              })}
            </div>
            <div className="canvas-note"><span>FAITES GLISSER LES + POUR REPOSITIONNER · POSITIONS ENREGISTRÉES SUR CET APPAREIL</span><span>{selectedType.name.toUpperCase()} / 01</span></div>
          </div>
          <aside className="workbench-panel">
            <div className="panel-title"><span className="panel-icon"><Wrench size={17}/></span><div><h2>Votre montage</h2><span>{Object.keys(assigned).length} pièce{Object.keys(assigned).length === 1 ? "" : "s"} ajoutée{Object.keys(assigned).length === 1 ? "" : "s"}</span></div></div>
            <div className="active-slot-note">Type de composant sélectionné : <strong>{currentSlot.name.toLocaleLowerCase("fr")}</strong>. La recherche reste limitée à ce type.</div>
            <label className="part-search"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Chercher ${currentSlot.name.toLowerCase()}…`}/></label>
            {query && <div className="part-suggestions">{matches.length ? matches.map((part) => <button key={part.id} onClick={() => choosePart(part)}><span><b>{part.name}</b><small>{part.brand} · {part.model}</small></span><ArrowRight size={15}/></button>) : <span className="no-suggestion">Aucune pièce trouvée pour le type « {currentSlot.name.toLowerCase()} ».</span>}</div>}
            <div className="mount-list">{slots.map((slot) => { const part = assigned[slot.id]; return <button key={slot.id} className={`mount-row ${activeSlot === slot.id ? "active" : ""}`} onClick={() => { setActiveSlot(slot.id); setQuery(""); }}><span className="mount-status">{part ? <Check size={13}/> : "+"}</span><span className="mount-label"><b>{slot.name}</b><small>{part ? `${part.brand} · ${part.name}` : "Choisir une pièce de ce type"}</small></span><span className={`confidence ${part ? "confidence-review" : "confidence-low"}`}>{part ? "À vérifier" : "À renseigner"}</span></button>; })}</div>
            <div className="panel-warning"><SlidersHorizontal size={16}/><p>Chaque repère accepte uniquement sa catégorie de pièces. Les dimensions restent à contrôler.</p></div>
            <button className="save-build-button" onClick={() => localStorage.setItem("veloscope-build", JSON.stringify({ type, assigned }))}><Check size={16}/> Enregistrer le projet</button>
          </aside>
        </div>
      </section>
      <section className="content-wrap workflow-hint"><span className="hint-num">01</span><div><b>Déplacez les repères selon votre image.</b><p>Leur position est sauvegardée sur cet appareil pour chaque type de vélo. Les roues et les pneus avant/arrière ont chacun leur propre repère.</p></div></section>
    </main>
  </SiteShell>;
}
