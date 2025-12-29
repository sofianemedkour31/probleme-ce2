// ========================================
// SPEECH MANAGER
// Gestion de la synthèse vocale
// ========================================

const SpeechManager = {
    utterance: null,
    synthesis: window.speechSynthesis,

    /**
     * Lance la lecture d'un texte avec synthèse vocale
     * @param {string} text - Le texte à lire
     * @param {Function} onBoundary - Callback pour chaque mot (optionnel)
     * @param {Function} onEnd - Callback de fin de lecture (optionnel)
     */
    speak(text, onBoundary, onEnd) {
        // Annuler toute lecture en cours
        this.cancel();
        
        // Créer une nouvelle utterance
        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.lang = 'fr-FR';
        this.utterance.rate = 0.9;  // Vitesse de lecture légèrement ralentie
        this.utterance.pitch = 1;   // Tonalité normale
        
        // Attacher les callbacks si fournis
        if (onBoundary) {
            this.utterance.onboundary = onBoundary;
        }
        
        if (onEnd) {
            this.utterance.onend = onEnd;
        }

        // Lancer la lecture
        this.synthesis.speak(this.utterance);
    },

    /**
     * Annule la lecture en cours
     */
    cancel() {
        this.synthesis.cancel();
    },

    /**
     * Met en pause la lecture
     */
    pause() {
        this.synthesis.pause();
    },

    /**
     * Reprend la lecture
     */
    resume() {
        this.synthesis.resume();
    },

    /**
     * Vérifie si une lecture est en cours
     * @returns {boolean} True si une lecture est en cours
     */
    isSpeaking() {
        return this.synthesis.speaking;
    }
};
