# Application de Visualisation des DPE

Application full-stack permettant de rechercher une adresse et d'afficher les Diagnostics de Performance Énergétique (DPE) sur une carte interactive.

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 18
- npm

### Installation et lancement

```bash
# Installation des dépendances backend
cd backend && npm install

# Installation des dépendances frontend
cd ../frontend && npm install
```

```bash
# Terminal 1 - Démarrer le backend (port 3001)
cd backend && npm run dev

# Terminal 2 - Démarrer le frontend (port 5173)
cd frontend && npm run dev
```

Accéder à l'application : http://localhost:5173

## 📁 Structure du projet

```
├── backend/                    # API Node.js/Express/TypeScript
│   ├── src/
│   │   ├── index.ts           # Point d'entrée Express
│   │   ├── routes/
│   │   │   └── dpe.routes.ts  # Endpoint POST /api/dpe/search
│   │   ├── services/
│   │   │   ├── ademe.service.ts    # Appels API ADEME
│   │   │   └── geocoding.service.ts # Géocodage via data.gouv.fr
│   │   └── types/
│   │       └── dpe.types.ts
│   └── package.json
│
└── frontend/                   # React/Vite/TypeScript/Chakra UI
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   │   ├── AddressSearch.tsx   # Input avec autocomplétion
    │   │   ├── DPEMap.tsx          # Carte Leaflet
    │   │   └── DPEMarker.tsx       # Marqueurs colorés
    │   ├── services/
    │   │   └── api.ts
    │   └── types/
    │       └── dpe.ts
    └── package.json
```

## 🔧 Technologies utilisées

### Backend

- **Express** - Framework web Node.js
- **TypeScript** - Typage statique
- **tsx** - Exécution TypeScript en développement

### Frontend

- **React 19** - Bibliothèque UI
- **Vite** - Build tool
- **Chakra UI** - Composants UI
- **Leaflet / React-Leaflet** - Carte interactive
- **TypeScript** - Typage statique

## 🌐 APIs externes

- **API Adresse (data.gouv.fr)** - Géocodage des adresses françaises
- **API DPE ADEME** - Données des diagnostics de performance énergétique

## 📊 Fonctionnalités

- ✅ Recherche d'adresse avec autocomplétion
- ✅ Carte interactive centrée sur l'adresse recherchée
- ✅ Marqueurs colorés selon la classe énergétique (A→G)
- ✅ Popup au clic avec détails du DPE (adresse, classe énergie, classe GES, surface, année)

## 📝 Licence

Données DPE sous [Licence Ouverte / Open Licence](https://www.etalab.gouv.fr/licence-ouverte-open-licence) (ADEME).
