# 🎓 Compréhension d'Énoncés - Application Éducative

Application web interactive pour aider les élèves de primaire (CP à CM2) à comprendre les énoncés mathématiques avant de les résoudre.

## 📋 Fonctionnalités

### Pour les élèves
- ✅ Interface adaptée aux enfants avec design coloré et intuitif
- 🔊 Synthèse vocale pour lire les énoncés et les questions
- 📝 QCM avec reformulations pour vérifier la compréhension
- 💡 Feedbacks pédagogiques personnalisés
- 📱 Compatible mobile, tablette et ordinateur
- 🎯 Progression par périodes et niveaux

### Pour les enseignants (Mode Enseignant)
- 👨‍🏫 Accès protégé par mot de passe
- ➕ Création et modification de problèmes
- 📥 Import de problèmes via fichiers Markdown
- 📊 Vue d'ensemble des problèmes par niveau
- 💾 Sauvegarde permanente dans le fichier HTML
- 🗑️ Gestion complète (ajout, modification, suppression)

## 🚀 Installation et Utilisation

### Version simple (fichier unique)
1. Ouvrez simplement `index.html` dans votre navigateur
2. Aucune installation requise
3. Fonctionne hors ligne

### Version avec serveur local (recommandée pour le développement)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## 📁 Structure du Projet

```
comprehension-enonces-app/
│
├── index.html              # Page HTML principale
│
├── css/
│   └── styles.css          # Tous les styles de l'application
│
├── js/
│   ├── app.js              # Logique principale (vues + contrôleur)
│   ├── data-manager.js     # Gestion des données et sauvegarde
│   └── speech-manager.js   # Gestion de la synthèse vocale
│
├── data/
│   └── default-problems.js # Données par défaut des problèmes
│
└── README.md               # Ce fichier
```

## 🎨 Technologies Utilisées

- **HTML5** - Structure de l'application
- **CSS3** - Styles et animations (design responsive)
- **JavaScript ES6** - Logique applicative
- **Web Speech API** - Synthèse vocale pour la lecture
- **LocalStorage** - Sauvegarde des données (optionnelle)

## 🔐 Mode Enseignant

### Accès
Mot de passe par défaut : `Legouve59`

Pour changer le mot de passe, modifiez la ligne dans `js/app.js` :
```javascript
if (password === 'Legouve59') {  // Changez ici
```

### Fonctionnalités enseignant

#### 1. Ajout manuel de problèmes
- Sélectionner le niveau (CP à CM2)
- Choisir la période (1 à 5)
- Saisir l'énoncé
- Créer 3 reformulations (1 correcte, 2 incorrectes)
- Ajouter les feedbacks correspondants

#### 2. Import par fichier Markdown
Format du fichier `.md` :

```markdown
# Période 3 – Compréhension de problèmes

Niveau : CE2

## PROBLEME 1

### TEXTE
Tom a 12 billes. Il en donne 5 à Lucas.
Combien de billes lui reste-t-il ?

## REFORMULATIONS
- [CORRECTE] On cherche combien de billes Tom possède après en avoir donné.
- [FAUSSE] On cherche combien de billes Lucas possède au total.
- [FAUSSE] On cherche combien de billes Tom avait au départ.

### FEEDBACK_CORRECT
Bravo, tu as bien compris le problème !
### FEEDBACK_FAUX_1
Non, le problème ne parle pas du nombre total de billes de Lucas.
### FEEDBACK_FAUX_2
Non, on sait déjà que Tom avait 12 billes au départ.
```

## 💾 Système de Sauvegarde

L'application utilise un **double système de sauvegarde** :

### 🔄 Sauvegarde Automatique (localStorage)
- **Instantanée** : Toutes vos modifications sont sauvegardées immédiatement
- **Persistante** : Les données sont conservées entre les sessions
- **Pratique** : Idéal pour l'édition quotidienne
- **Limitation** : Spécifique au navigateur et à l'appareil

### 💾 Export vers Fichier HTML (Permanent)
- **Autonome** : Fichier HTML indépendant avec toutes vos données
- **Partageable** : Peut être transféré à d'autres enseignants
- **Compatible** : Fonctionne sur tous les navigateurs et appareils
- **Sur demande** : Cliquez sur "💾 Exporter vers fichier HTML" en mode enseignant

### Workflow Recommandé
1. Travaillez normalement (modifications automatiquement sauvegardées)
2. Quand vous avez terminé une session d'édition importante, exportez vers un fichier
3. Conservez les fichiers exportés comme backups
4. Partagez les fichiers exportés si vous collaborez avec d'autres enseignants

### ⚠️ Important
- **localStorage** = temporaire (données du navigateur)
- **Export HTML** = permanent (fichier que vous possédez)
- Exportez régulièrement pour sécuriser vos données !

## 🎯 Niveaux et Périodes

### Niveaux disponibles
- **CP** - Cours Préparatoire
- **CE1** - Cours Élémentaire 1
- **CE2** - Cours Élémentaire 2
- **CM1** - Cours Moyen 1
- **CM2** - Cours Moyen 2

### Organisation
- **5 périodes** par niveau scolaire
- Plusieurs problèmes par période
- Progression adaptée à chaque niveau

## 🌐 Compatibilité

### Navigateurs supportés
- ✅ Chrome / Edge (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Appareils
- 💻 Ordinateurs (Windows, Mac, Linux)
- 📱 Smartphones (iOS, Android)
- 📱 Tablettes (iPad, Android)

### Synthèse vocale
- Nécessite un navigateur avec support de Web Speech API
- Fonctionne mieux sur Chrome/Edge
- Langue française (fr-FR)

## 🛠️ Personnalisation

### Couleurs
Les couleurs principales peuvent être modifiées dans `css/styles.css` :
```css
/* Couleurs principales */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Structure des problèmes
Chaque problème contient :
- **level** : Niveau (CP, CE1, CE2, CM1, CM2)
- **period** : Période (1 à 5)
- **number** : Numéro du problème
- **title** : Titre optionnel
- **text** : Énoncé du problème
- **words** : Tableau des mots (pour la lecture)
- **qcm** : Tableau de 3 reformulations avec feedbacks

## 📝 Exemples de Problèmes

### CP - Les billes
```javascript
{
    level: 'CP',
    period: 1,
    number: 1,
    title: "Les billes de Tom",
    text: "Tom a 12 billes. Il en donne 5 à son ami Lucas. Combien de billes lui reste-t-il ?",
    qcm: [
        {
            text: "Tom veut savoir combien de billes il possède maintenant...",
            correct: true,
            feedback: "Bravo, tu as bien compris !"
        },
        // ... 2 autres reformulations incorrectes
    ]
}
```

## 🐛 Résolution de Problèmes

### La synthèse vocale ne fonctionne pas
- Vérifiez que votre navigateur supporte Web Speech API
- Testez avec Chrome ou Edge
- Assurez-vous que le son n'est pas coupé

### Le fichier ne se télécharge pas
- Vérifiez les autorisations de téléchargement
- Essayez un autre navigateur
- Vérifiez l'espace disque disponible

### Les données ne sont pas sauvegardées
- Assurez-vous d'utiliser le nouveau fichier téléchargé
- Ne pas utiliser le mode navigation privée

## 📄 Licence

Ce projet est libre d'utilisation pour un usage éducatif.

## 👥 Contribution

Pour contribuer au projet :
1. Créez des problèmes pédagogiques
2. Partagez vos fichiers Markdown
3. Proposez des améliorations

## 📞 Support

Pour toute question ou suggestion :
- Créez un ticket sur le dépôt du projet
- Contactez l'équipe pédagogique

## 🎓 Objectifs Pédagogiques

- Développer la compréhension de lecture
- Identifier l'information recherchée dans un problème
- Différencier les données utiles et inutiles
- Reformuler un énoncé avec ses propres mots
- Acquérir de l'autonomie dans la résolution de problèmes

---

**Développé avec ❤️ pour l'éducation**
