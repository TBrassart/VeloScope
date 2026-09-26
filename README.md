# VeloScope

VeloScope est un guide visuel pour explorer les vélos et leurs composants, comprendre les compatibilités et comparer les prix indicatifs.

## Démarrer en local

Prérequis : Node.js 22 ou supérieur.

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Supabase

Les clients navigateur et serveur sont prêts dans `lib/supabase/`. Pour les utiliser, copier `.env.example` vers `.env.local`, puis renseigner l’URL du projet Supabase et sa clé publishable (`sb_publishable_…`). La clé `service_role` ou une clé secrète ne doit jamais être placée dans une variable `NEXT_PUBLIC_`.

La page d’accueil utilise actuellement des données d’exemple intégrées à l’interface ; elle ne requiert donc pas encore de projet Supabase configuré.

## Déploiement Vercel

Le dépôt GitHub peut être importé dans Vercel. Les commandes de production sont `npm run build` et `npm run start`. Ajouter les deux variables Supabase aux paramètres d’environnement Vercel avant de connecter les données.

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — serveur de production
- `npm run lint` — analyse ESLint
