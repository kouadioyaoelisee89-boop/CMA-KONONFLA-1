# KingdomHub — CMA Kononfla I

Système de gestion communautaire — déployé sur Vercel via GitHub.

---

## 📁 Structure du projet

```
kingdomhub/
├── public/
│   └── index.html        ← Application complète (auto-contenu)
├── vercel.json           ← Configuration Vercel (headers, routing)
├── .gitignore
└── README.md
```

---

## 🚀 Déploiement GitHub → Vercel (étape par étape)

### 1. Créer le dépôt GitHub

```bash
# Dans ce dossier :
git init
git add .
git commit -m "feat: KingdomHub v61 — déploiement initial"

# Sur GitHub.com → New repository → nom : "kingdomhub-cma"
# Puis :
git remote add origin https://github.com/TON_USER/kingdomhub-cma.git
git branch -M main
git push -u origin main
```

### 2. Connecter Vercel

1. Aller sur **[vercel.com](https://vercel.com)** → **Add New Project**
2. Importer le dépôt GitHub `kingdomhub-cma`
3. Réglages Vercel :
   - **Framework Preset** → `Other`
   - **Root Directory** → `.` (racine)
   - **Build Command** → *(laisser vide)*
   - **Output Directory** → `public`
4. Cliquer **Deploy** ✅

### 3. Mises à jour futures

```bash
# À chaque nouvelle version du HTML :
cp nouveau_KingdomHub.html public/index.html
git add public/index.html
git commit -m "feat: KingdomHub vXX — description"
git push
# → Vercel redéploie automatiquement en ~30 secondes
```

---

## 🌐 Domaine personnalisé (optionnel)

Dans Vercel → **Settings → Domains** → ajouter votre domaine.  
Vercel génère automatiquement le certificat HTTPS.

---

## 🔥 Firebase RTDB

Les clés Firebase sont déjà configurées dans `index.html`.  
Aucune variable d'environnement n'est nécessaire (SDK côté client).

> ⚠️ Si vous souhaitez sécuriser les clés à l'avenir, utilisez les **Firebase Security Rules**
> directement dans la console Firebase — les clés client sont publiques par conception.

---

## 📱 PWA (Progressive Web App)

L'app est installable sur mobile :
- **Android** : bannière automatique "Ajouter à l'écran d'accueil"
- **iOS** : Safari → Partager → Sur l'écran d'accueil

Le Service Worker est généré dynamiquement via Blob — compatible Vercel (HTTPS).

---

## ✅ Checklist avant mise en ligne

- [ ] `public/index.html` présent
- [ ] `vercel.json` à la racine
- [ ] Dépôt GitHub créé et pushé
- [ ] Projet importé dans Vercel
- [ ] URL de production testée sur mobile
- [ ] PWA installable vérifiée (Chrome DevTools → Application)
