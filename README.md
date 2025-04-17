# 🧠 Résolution de Problèmes d'Optimisation avec l'Algorithme PSO

Ce projet met en œuvre l'algorithme **PSO (Particle Swarm Optimization)** dans un contexte interactif (interface React), pour résoudre deux problèmes d'optimisation classiques :
- Le **problème du sac à dos** avec contrainte de capacité
- Le **problème pondéré personnalisé**, sans contrainte de capacité

---

## 🚀 Installation et démarrage

1. **Cloner le projet** :

```bash
git clone https://github.com/ton-nom/ton-projet.git
cd ton-projet
```

2. **Installer les dépendances** :

```bash
npm install
```

3. **Démarrer l'application** :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`.

4. (Optionnel) **Lancer les tests** :

```bash
npm run test
```

---

## 🎠 Qu’est-ce que l’algorithme PSO ?

L’algorithme **PSO (Particle Swarm Optimization)** est une technique d’optimisation inspirée du comportement collectif des animaux (essaims d’oiseaux, bancs de poissons...).

### 🔧 Principe de fonctionnement :

- Chaque **solution potentielle** est appelée une **particule**.
- Les particules **explorent l’espace de recherche** en se déplaçant dans différentes directions.
- Chaque particule retient :
  - sa **meilleure position** individuelle (`pBest`)
  - la **meilleure position globale** trouvée par l’ensemble de l’essaim (`gBest`)
- Le déplacement de chaque particule est influencé par :
  - ce qu’elle a trouvé de mieux,
  - ce que les autres ont trouvé de mieux.

> Le but est de **converger** vers la **meilleure solution possible** au fil des itérations.

### ⚙️ Paramètres clés de l’algorithme

- `populationSize` : nombre de particules dans l’essaim
- `iterations` : nombre de générations à simuler
- `inertiaWeight` : facteur d’inertie (influence du mouvement précédent)
- `cognitiveCoeff` : influence de la mémoire individuelle
- `socialCoeff` : influence de la mémoire collective

---

## ✅ Problèmes résolus avec PSO

### 1. 🎒 Problème du Sac à Dos (Knapsack Problem)

#### 📘 Définition

> Sélectionner un sous-ensemble d’objets pour **maximiser la valeur totale**, sans dépasser une **capacité maximale** en poids.

Chaque objet est défini par deux propriétés :
- `weight` : son poids
- `value` : sa valeur

#### 🔢 Exemple

```ts
const items = [
  [10, 60],  // poids: 10, valeur: 60
  [20, 100], // poids: 20, valeur: 100
  [30, 120], // poids: 30, valeur: 120
  [15, 80],  // poids: 15, valeur: 80
  [25, 90],  // poids: 25, valeur: 90
]

const capacity = 50
```

#### ✅ Résultat attendu

```ts
{
  best: [1, 1, 0, 1, 0],
  score: 240
}
```

- Objets pris : 1, 2 et 4
- Poids total : 10 + 20 + 15 = 45 (\u2264 50)
- Valeur totale : 60 + 100 + 80 = **240**

#### 🔒 Contrainte (appliquée uniquement dans l’algorithme) :

> Le poids total des objets sélectionnés ne doit pas dépasser la capacité maximale.

Cette contrainte **ne limite pas** l’utilisateur dans le formulaire.  
Il peut entrer autant d’objets qu’il veut.  
C’est l’algorithme qui se charge de **ne pas dépasser la capacité**.

---

### 2. ⚖️ Problème de Sélection Pondérée (sans contrainte)

#### 📘 Définition

> L’objectif est ici de calculer la somme **obtenue** (poids/valeurs) des objets sélectionnés. Il n’y a **aucune contrainte de capacité**.

Chaque objet est représenté par :

```ts
{
  obj: "string",       // nom ou description
  weight: number,      // poids
  value: number        // valeur
}
```

#### 🔢 Exemple

```ts
const items = [
  { obj: "Livre", weight: 5, value: 20 },
  { obj: "PC", weight: 8, value: 100 },
  { obj: "Téléphone", weight: 2, value: 60 },
]



const result = [1, 0, 1] // Livre et Téléphone sont sélectionnés
```

#### ✅ Résultat attendu

```ts
{
  totalWeight: 7,  // 5 + 2
  totalValue: 80   // 20 + 60
}
```

Ce problème est utile lorsqu’on veut analyser les sélections sans contrainte rigide.

---

## 💻 Interface utilisateur (React)

L’utilisateur peut :

- Ajouter autant d’objets qu’il souhaite (nom, poids, valeur)
- Choisir une capacité pour le sac à dos
- Lancer l’algorithme pour voir la **meilleure combinaison d’objets**
- Voir le **poids utilisé**, la **valeur totale**, et les objets sélectionnés

---

## 📁 Structure du Projet

```
src/
├── algorithm/
│   ├── algorithm.ts         # Implémentation du PSO
│   ├── knapsack.ts          # Problème du sac à dos
│   └── custom-weight.ts     # Problème pondéré personnalisé
├── components/
│   ├── WeightValueInput.tsx # Composant de saisie
│   ├── ResultDisplay.tsx    # Affichage du résultat
tests/
│   └── algorithm.test.ts    # Tests unitaires avec Vitest
```

---

## 📌 Remarques

- PSO est un algorithme **stochastique** : les résultats peuvent légèrement varier à chaque exécution.
- Le projet peut être étendu à d'autres types de problèmes d'optimisation.
- Le code est modulaire : vous pouvez changer les formules de fitness, les contraintes, etc.

---

## ✨ Résumé

| Problème | Contrainte | But | Algo utilisé |
|----------|------------|-----|--------------|
| Sac à dos | Capacité maximale | Maximiser la valeur | PSO |
| Pondéré sans contrainte | Aucune | Mesurer sélection | Aucun, juste calcul |

---

## 🧪 Exemple de test avec Vitest

```ts
import { knapsackFitness } from "@/algorithm/knapsack"

test("knapsack fitness with valid result", () => {
  const items = [
    [10, 60],
    [20, 100],
    [30, 120],
  ]
  const capacity = 50
  const result = [1, 1, 0]

  expect(knapsackFitness(items, result, capacity)).toEqual(160)
})
```

---

## 👨‍💼 Auteur

Développé avec ❤️ par Labeya
