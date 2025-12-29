// ========================================
// DATA MANAGER
// Gestion du chargement et de la sauvegarde des problèmes
// ========================================

const DataManager = {
    /**
     * Initialise le gestionnaire de données
     */
    init() {
        console.log('📂 Mode sauvegarde activé (localStorage + export HTML)');
    },

    /**
     * Charge les problèmes depuis localStorage ou les données sauvegardées ou les données par défaut
     * @returns {Array} Liste des problèmes
     */
    loadProblems() {
        // Priorité 1 : localStorage (pour les modifications en cours)
        const storedProblems = localStorage.getItem('comprehension-problems');
        if (storedProblems) {
            try {
                console.log('📂 Chargement depuis localStorage');
                return JSON.parse(storedProblems);
            } catch (e) {
                console.error('Erreur de lecture localStorage:', e);
            }
        }
        
        // Priorité 2 : données sauvegardées dans le fichier
        if (window.SAVED_PROBLEMS) {
            console.log('📂 Chargement depuis le fichier');
            return window.SAVED_PROBLEMS;
        }
        
        // Priorité 3 : données par défaut
        console.log('📂 Chargement des données par défaut');
        return window.DEFAULT_PROBLEMS;
    },

    /**
     * Sauvegarde les problèmes dans localStorage
     * @param {Array} problems - Liste des problèmes à sauvegarder
     * @returns {boolean} Succès de la sauvegarde
     */
    saveProblems(problems) {
        try {
            localStorage.setItem('comprehension-problems', JSON.stringify(problems));
            console.log('✅ Sauvegarde dans localStorage réussie');
            return true;
        } catch (e) {
            console.error('Erreur de sauvegarde:', e);
            alert('⚠️ Erreur lors de la sauvegarde. Essayez d\'exporter vos données.');
            return false;
        }
    },

    /**
     * Exporte les données vers un fichier HTML permanent
     * @param {Array} problems - Liste des problèmes à exporter
     */
    exportToFile(problems) {
        this.downloadUpdatedFile(problems);
    },

    /**
     * Télécharge un fichier HTML mis à jour avec les nouvelles données
     * @param {Array} problems - Liste des problèmes à inclure dans le fichier
     */
    downloadUpdatedFile(problems) {
        const currentHTML = document.documentElement.outerHTML;
        const problemsString = JSON.stringify(problems, null, 12);
        
        // Remplacer les données dans le fichier HTML
        const updatedHTML = currentHTML.replace(
            /const DEFAULT_PROBLEMS = \[[\s\S]*?\];[\s\S]*?window\.SAVED_PROBLEMS = null;/,
            `const DEFAULT_PROBLEMS = ${problemsString};\n\nwindow.SAVED_PROBLEMS = DEFAULT_PROBLEMS;`
        );

        // Créer le blob et le télécharger
        const blob = new Blob([updatedHTML], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Générer un nom de fichier avec la date
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
        a.download = `comprehension-enonces-${dateStr}.html`;
        
        // Détection Android/iOS pour message adapté
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        this.showSaveInstructions(isAndroid, isIOS, dateStr, problems.length);
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Afficher des instructions supplémentaires après un délai
        this.showFollowUpInstructions(isAndroid, isIOS, dateStr, problems.length);
    },

    /**
     * Affiche les instructions de sauvegarde selon la plateforme
     */
    showSaveInstructions(isAndroid, isIOS, dateStr, problemCount) {
        if (isIOS) {
            alert(`💾 EXPORT RÉUSSI !\n\n✅ Le fichier va se télécharger\n\n📱 Sur iPad/iPhone :\n1. Appuyez sur l'icône ↓ en haut de Safari\n2. Ouvrez le fichier téléchargé\n3. Utilisez-le à la place de l'ancien\n\n💡 Vos ${problemCount} problèmes sont maintenant sauvegardés de façon permanente !`);
        } else if (isAndroid) {
            alert(`💾 EXPORT RÉUSSI !\n\n✅ Le fichier se télécharge dans "Téléchargements"\n\n📱 Sur Android :\n1. Ouvrez vos "Téléchargements"\n2. Trouvez : comprehension-enonces-${dateStr}.html\n3. Utilisez ce fichier à la place de l'ancien\n\n💡 Vos ${problemCount} problèmes sont sauvegardés !`);
        } else {
            alert(`💾 EXPORT RÉUSSI !\n\n✅ Fichier téléchargé : comprehension-enonces-${dateStr}.html\n\n📥 Ce fichier contient vos ${problemCount} problème(s).\n\n🔄 Utilisez ce nouveau fichier à la place de l'ancien.`);
        }
    },

    /**
     * Affiche des instructions supplémentaires après le téléchargement
     */
    showFollowUpInstructions(isAndroid, isIOS, dateStr, problemCount) {
        // Instructions simplifiées - le message principal suffit
    },

    /**
     * Ajoute un nouveau problème
     * @param {Object} problem - Le problème à ajouter
     * @returns {boolean} Succès de l'ajout
     */
    addProblem(problem) {
        const problems = this.loadProblems();
        problems.push(problem);
        return this.saveProblems(problems);
    },

    /**
     * Met à jour un problème existant
     * @param {string} oldLevel - Ancien niveau
     * @param {number} oldPeriod - Ancienne période
     * @param {number} oldNumber - Ancien numéro
     * @param {Object} updatedProblem - Problème mis à jour
     * @returns {boolean} Succès de la mise à jour
     */
    updateProblem(oldLevel, oldPeriod, oldNumber, updatedProblem) {
        const problems = this.loadProblems();
        const index = problems.findIndex(p => 
            p.level === oldLevel && p.period === oldPeriod && p.number === oldNumber
        );
        if (index !== -1) {
            problems[index] = updatedProblem;
            return this.saveProblems(problems);
        }
        return false;
    },

    /**
     * Supprime un problème
     * @param {string} level - Niveau du problème
     * @param {number} period - Période du problème
     * @param {number} number - Numéro du problème
     * @returns {boolean} Succès de la suppression
     */
    deleteProblem(level, period, number) {
        const problems = this.loadProblems();
        const index = problems.findIndex(p => 
            p.level === level && p.period === period && p.number === number
        );
        if (index !== -1) {
            problems.splice(index, 1);
            // Renuméroter les problèmes suivants
            problems
                .filter(p => p.level === level && p.period === period && p.number > number)
                .forEach(p => p.number--);
            return this.saveProblems(problems);
        }
        return false;
    }
};
