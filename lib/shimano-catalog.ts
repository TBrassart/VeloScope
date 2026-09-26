export type ShimanoDiscipline = "Route" | "VTT" | "Gravel" | "E-bike" | "Trekking" | "Lifestyle";

export type ShimanoGroup = {
  name: string;
  discipline: ShimanoDiscipline[];
  families: string[];
  source: string;
  sourceLabel: string;
  dataKind: "series" | "component";
  note: string;
};

const lineupSource = "https://productinfo.shimano.com/en/lineup";
const specSource = "https://productinfo.shimano.com/en/spec";

// Shimano's official Line-up chart groups products by bicycle discipline and series.
// This is a navigable official-series index, not a claim that every spare part is listed.
export const shimanoGroups: ShimanoGroup[] = [
  { name: "DURA-ACE", discipline: ["Route"], families: ["Transmission", "Freinage", "Pédales", "Roues"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La liste des pièces et variantes dépend des familles et générations." },
  { name: "ULTEGRA", discipline: ["Route"], families: ["Transmission", "Freinage", "Pédales", "Roues"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La liste des pièces et variantes dépend des familles et générations." },
  { name: "105", discipline: ["Route"], families: ["Transmission", "Freinage", "Pédales", "Roues"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La liste des pièces et variantes dépend des familles et générations." },
  { name: "TIAGRA", discipline: ["Route"], families: ["Transmission", "Freinage", "Pédales"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La liste des pièces et variantes dépend des familles et générations." },
  { name: "SORA", discipline: ["Route"], families: ["Transmission", "Freinage", "Pédales"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La liste des pièces et variantes dépend des familles et générations." },
  { name: "CLARIS", discipline: ["Route"], families: ["Transmission", "Freinage", "Pédales"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La liste des pièces et variantes dépend des familles et générations." },
  { name: "GRX", discipline: ["Gravel"], families: ["Transmission", "Freinage", "Pédales", "Roues"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "Vérifier la série et la génération dans les documents techniques." },
  { name: "XTR", discipline: ["VTT"], families: ["Transmission", "Freinage", "Pédales", "Roues"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "Vérifier la série et la génération dans les documents techniques." },
  { name: "DEORE XT", discipline: ["VTT", "Trekking"], families: ["Transmission", "Freinage", "Pédales", "Roues"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "Vérifier la série et la génération dans les documents techniques." },
  { name: "DEORE", discipline: ["VTT", "Trekking"], families: ["Transmission", "Freinage", "Pédales"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "Vérifier la série et la génération dans les documents techniques." },
  { name: "SAINT", discipline: ["VTT"], families: ["Transmission", "Freinage", "Pédales"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "Gamme VTT gravity; contrôler chaque référence et sa disponibilité." },
  { name: "ZEE", discipline: ["VTT"], families: ["Transmission", "Freinage", "Pédales"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "Gamme VTT gravity; contrôler chaque référence et sa disponibilité." },
  { name: "CUES", discipline: ["Route", "VTT", "Trekking", "Lifestyle"], families: ["Transmission", "Freinage", "Pédales"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La compatibilité dépend des composants LINKGLIDE et de leurs spécifications." },
  { name: "STEPS", discipline: ["E-bike"], families: ["Transmission", "Freinage", "Assistance électrique", "Batteries"], source: lineupSource, sourceLabel: "Gamme officielle Shimano", dataKind: "series", note: "La compatibilité du système électrique doit être vérifiée par génération." },
  { name: "SHIMANO TOTAL ELECTRIC POWER SYSTEM", discipline: ["E-bike"], families: ["Moteurs", "Batteries", "Écrans", "Commandes"], source: specSource, sourceLabel: "Spécifications Shimano", dataKind: "series", note: "Voir les spécifications E-bike officielles selon le système et sa génération." },
  { name: "PEDAL SYSTEMS", discipline: ["Route", "VTT", "Gravel", "Trekking"], families: ["Pédales", "Cales"], source: specSource, sourceLabel: "Spécifications Shimano", dataKind: "component", note: "Consulter le tableau PEDALS pour les références et données techniques." },
  { name: "WHEELS", discipline: ["Route", "VTT", "Gravel"], families: ["Roues", "Moyeux", "Corps de roue libre"], source: specSource, sourceLabel: "Spécifications Shimano", dataKind: "component", note: "Standards et variantes à vérifier sur la fiche technique du modèle." },
];

export const shimanoDisciplines: Array<"Tout voir" | ShimanoDiscipline> = ["Tout voir", "Route", "VTT", "Gravel", "E-bike", "Trekking", "Lifestyle"];
export const shimanoFamilies = ["Toutes les familles", "Transmission", "Freinage", "Pédales", "Roues", "Assistance électrique", "Batteries", "Moteurs", "Écrans", "Commandes", "Cales", "Moyeux", "Corps de roue libre"];
