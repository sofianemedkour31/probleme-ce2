// ========================================
// APPLICATION STATE
// État global de l'application
// ========================================

const AppState = {
    currentView: 'levelSelection',
    currentLevel: null,
    currentPeriod: null,
    currentProblem: null,
    selectedAnswer: null,
    isReading: false,
    editingProblem: null,
    showPasswordModal: false,
    isTeacherAuthenticated: false
};

// ========================================
// VIEWS
// Rendu des différentes vues de l'application
// ========================================

const Views = {
    /**
     * Rend la modal de mot de passe
     */
    renderPasswordModal() {
        if (!AppState.showPasswordModal) return '';
        
        return `
            <div class="modal-overlay" onclick="if(event.target === this) AppController.closePasswordModal()">
                <div class="modal-content">
                    <h2>🔐 Mode Enseignant</h2>
                    <p>Entrez le mot de passe pour accéder</p>
                    <input 
                        type="password" 
                        id="password-input" 
                        placeholder="Mot de passe"
                        onkeypress="if(event.key === 'Enter') AppController.checkPassword()"
                    >
                    <div class="modal-buttons">
                        <button class="btn btn-success" onclick="AppController.checkPassword()">
                            Valider
                        </button>
                        <button class="btn btn-back" onclick="AppController.closePasswordModal()">
                            Annuler
                        </button>
                    </div>
                    <p id="password-error" style="color: #dc3545; margin-top: 15px; display: none;">
                        ❌ Mot de passe incorrect
                    </p>
                </div>
            </div>
        `;
    },

    /**
     * Rend la vue de sélection du niveau
     */
    renderLevelSelection() {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        return `
            ${this.renderPasswordModal()}
            <h1>🎓 Compréhension d'Énoncés</h1>
            
            ${isAndroid ? `
                <div class="android-help">
                    <strong>📱 Application Web Interactive</strong>
                    Vos modifications sont sauvegardées automatiquement dans le navigateur. En mode enseignant, vous pouvez exporter vos données vers un fichier HTML permanent.
                </div>
            ` : ''}
            
            ${isIOS ? `
                <div class="ios-help">
                    <strong>📱 Application Web Interactive</strong>
                    Vos modifications sont sauvegardées automatiquement. En mode enseignant, vous pouvez exporter vos données vers un fichier HTML permanent. Utilisez Safari pour une meilleure compatibilité.
                </div>
            ` : ''}
            
            <h2 style="text-align: center; color: #764ba2; margin-bottom: 30px;">
                Choisis ton niveau de classe
            </h2>
            <div class="periods-grid">
                ${['CP', 'CE1', 'CE2', 'CM1', 'CM2'].map(level => `
                    <div class="period-card" onclick="AppController.selectLevel('${level}')">
                        ${level}
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 40px;">
                <button class="btn btn-back" onclick="AppController.openPasswordModal()">
                    👨‍🏫 Mode Enseignant
                </button>
            </div>
        `;
    },

    /**
     * Rend la page d'accueil avec les périodes
     */
    renderHome() {
        return `
            ${this.renderPasswordModal()}
            <h1>Compréhension d'Énoncés - ${AppState.currentLevel}</h1>
            <div class="nav-buttons">
                <button class="btn btn-back" onclick="AppController.goToLevelSelection()">← Changer de niveau</button>
            </div>
            <div class="periods-grid">
                ${[1, 2, 3, 4, 5].map(period => {
                    const problems = DataManager.loadProblems();
                    const problemsInPeriod = problems.filter(p => p.level === AppState.currentLevel && p.period === period);
                    return `
                        <div class="period-card" onclick="AppController.selectPeriod(${period})">
                            Période ${period}
                            <div style="font-size: 0.8em; margin-top: 10px; opacity: 0.9;">
                                ${problemsInPeriod.length} problème(s)
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    /**
     * Rend la vue d'une période avec ses problèmes
     */
    renderPeriod(period) {
        const problems = DataManager.loadProblems().filter(p => p.level === AppState.currentLevel && p.period === period);
        
        return `
            ${this.renderPasswordModal()}
            <div class="nav-buttons">
                <button class="btn btn-back" onclick="AppController.goHome()">← Retour aux périodes</button>
                <button class="btn btn-back" onclick="AppController.goToLevelSelection()">← Changer de niveau</button>
            </div>
            <h1>${AppState.currentLevel} - Période ${period}</h1>
            ${problems.length === 0 ? `
                <p style="text-align: center; padding: 40px; color: #666;">
                    Aucun problème pour le niveau ${AppState.currentLevel} dans cette période.
                </p>
            ` : `
                <ul class="problem-list">
                    ${problems.map(p => `
                        <li class="problem-item" onclick="AppController.selectProblem('${p.level}', ${p.period}, ${p.number})">
                            <div class="problem-title">Problème n°${p.number}</div>
                            ${p.title ? `<div>${p.title}</div>` : ''}
                        </li>
                    `).join('')}
                </ul>
            `}
        `;
    },

    /**
     * Rend la vue d'un problème avec son QCM
     */
    renderProblem(problem) {
        const showQCM = !AppState.isReading;
        const answered = AppState.selectedAnswer !== null;

        return `
            ${this.renderPasswordModal()}
            <div class="nav-buttons">
                <button class="btn btn-back" onclick="AppController.backToPeriod()">← Retour</button>
            </div>
            <h2>${AppState.currentLevel} - Problème n°${problem.number}${problem.title ? ` - ${problem.title}` : ''}</h2>
            
            <div class="reading-zone" id="reading-zone">
                ${problem.words.map((word, index) => 
                    `<span class="word" data-index="${index}">${word}</span>`
                ).join(' ')}
            </div>

            <div class="audio-controls">
                <button class="btn" onclick="AppController.startReading()" ${AppState.isReading ? 'disabled' : ''}>
                    ${AppState.isReading ? '🔊 Lecture en cours...' : '🔊 Écouter le problème'}
                </button>
            </div>

            ${showQCM ? `
                <div class="qcm-container">
                    <h2>Que cherche-t-on dans ce problème ?</h2>
                    ${problem.qcm.map((option, index) => {
                        const escaped = option.text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                        return `
                        <div class="qcm-option ${
                            answered ? (option.correct ? 'correct' : 
                            AppState.selectedAnswer === index ? 'incorrect' : '') :
                            AppState.selectedAnswer === index ? 'selected' : ''
                        }" 
                        ${answered ? '' : `onclick="AppController.selectAnswer(${index})"`}>
                            <button class="btn-audio" onclick="event.stopPropagation(); AppController.readText('${escaped}')">
                                🔊
                            </button>
                            <span style="flex: 1;">${option.text}</span>
                        </div>
                    `}).join('')}

                    ${!answered ? `
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="btn btn-success" 
                                    onclick="AppController.validateAnswer()"
                                    ${AppState.selectedAnswer === null ? 'disabled' : ''}>
                                ✓ Valider ma réponse
                            </button>
                        </div>
                    ` : `
                        <div class="feedback ${problem.qcm[AppState.selectedAnswer].correct ? 'success' : 'error'}">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <button class="btn-audio" onclick="AppController.readText('${problem.qcm[AppState.selectedAnswer].feedback.replace(/'/g, "\\'")}')">
                                    🔊
                                </button>
                                <strong>Explication :</strong>
                            </div>
                            ${problem.qcm[AppState.selectedAnswer].feedback}
                        </div>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="btn" onclick="AppController.nextProblem()">
                                Problème suivant →
                            </button>
                        </div>
                    `}
                </div>
            ` : ''}
        `;
    },

    /**
     * Rend la vue de l'éditeur (mode enseignant)
     */
    renderEditor() {
        if (!AppState.isTeacherAuthenticated) {
            return `
                ${this.renderPasswordModal()}
                <h1>Accès refusé</h1>
                <p style="text-align: center; padding: 40px;">Vous n'avez pas accès à cette section.</p>
                <div style="text-align: center;">
                    <button class="btn btn-back" onclick="AppController.goToLevelSelection()">← Retour</button>
                </div>
            `;
        }

        const problems = DataManager.loadProblems();
        const byLevel = {};
        ['CP', 'CE1', 'CE2', 'CM1', 'CM2'].forEach(level => {
            byLevel[level] = problems.filter(p => p.level === level);
        });

        const editing = AppState.editingProblem;

        return `
            ${this.renderPasswordModal()}
            <div class="nav-buttons">
                <button class="btn btn-back" onclick="AppController.goToLevelSelection()">← Retour</button>
                <button class="btn btn-success" onclick="AppController.exportToFile()">
                    💾 Exporter vers fichier HTML
                </button>
            </div>
            <h1>👨‍🏫 Mode Enseignant</h1>

            <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #28a745;">
                <strong style="color: #155724;">💡 Fonctionnement de la sauvegarde</strong>
                <p style="margin-top: 10px; color: #155724;">
                    • Vos modifications sont automatiquement sauvegardées dans le navigateur<br>
                    • Pour une sauvegarde permanente, cliquez sur "💾 Exporter vers fichier HTML"<br>
                    • Le fichier exporté contiendra toutes vos données et fonctionnera de manière autonome
                </p>
            </div>

            <div style="background: #e7f3ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3 style="color: #667eea; margin-bottom: 10px;">📊 Problèmes par niveau</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px;">
                    ${['CP', 'CE1', 'CE2', 'CM1', 'CM2'].map(level => `
                        <div style="text-align: center; padding: 10px; background: white; border-radius: 8px;">
                            <strong>${level}</strong><br>
                            <span style="color: #667eea; font-size: 1.5em;">${byLevel[level].length}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${this.renderProblemsManagement(byLevel)}

            <div class="editor-section">
                <h2>📥 Importer des problèmes depuis un fichier Markdown</h2>
                <p style="color: #666; margin-bottom: 15px;">
                    Importez plusieurs problèmes en une seule fois depuis un fichier .md ou .txt
                </p>
                
                <div style="background: #e7f3ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <strong style="color: #667eea;">📝 Format du fichier Markdown :</strong>
                    <pre style="background: white; padding: 10px; border-radius: 5px; margin-top: 10px; overflow-x: auto; font-size: 0.85em;">
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
Non, on sait déjà que Tom avait 12 billes au départ.</pre>
                </div>

                <input type="file" id="markdown-file" accept=".md,.txt" style="margin-bottom: 15px;">
                
                <div style="text-align: center;">
                    <button class="btn btn-success" onclick="AppController.importMarkdown()">
                        📥 Importer les problèmes
                    </button>
                    <button class="btn" onclick="AppController.downloadMarkdownTemplate()">
                        📄 Télécharger un modèle vide
                    </button>
                </div>
                
                <div id="import-result" style="margin-top: 20px;"></div>
            </div>

            <div class="editor-section">
                <h2>${editing ? '✏️ Modifier le problème' : '➕ Ajouter un problème manuellement'}</h2>
                
                <label>Niveau de classe :</label>
                <select id="editor-level">
                    ${['CP', 'CE1', 'CE2', 'CM1', 'CM2'].map(level => `
                        <option value="${level}" ${editing && editing.level === level ? 'selected' : ''}>${level}</option>
                    `).join('')}
                </select>

                <label>Période :</label>
                <select id="editor-period">
                    ${[1, 2, 3, 4, 5].map(p => `
                        <option value="${p}" ${editing && editing.period === p ? 'selected' : ''}>Période ${p}</option>
                    `).join('')}
                </select>

                <label>Titre du problème (optionnel) :</label>
                <input type="text" id="editor-title" value="${editing ? editing.title || '' : ''}">

                <label>Énoncé du problème :</label>
                <textarea id="editor-text">${editing ? editing.text : ''}</textarea>

                <h3 style="margin-top: 30px;">Reformulations (QCM)</h3>
                
                <label>✓ Reformulation correcte :</label>
                <textarea id="editor-correct">${editing ? editing.qcm.find(q => q.correct)?.text || '' : ''}</textarea>
                <label>Feedback pour la bonne réponse :</label>
                <textarea id="editor-correct-feedback">${editing ? editing.qcm.find(q => q.correct)?.feedback || '' : ''}</textarea>

                <label>✗ Reformulation incorrecte 1 :</label>
                <textarea id="editor-wrong1">${editing ? editing.qcm.filter(q => !q.correct)[0]?.text || '' : ''}</textarea>
                <label>Feedback pour cette erreur :</label>
                <textarea id="editor-wrong1-feedback">${editing ? editing.qcm.filter(q => !q.correct)[0]?.feedback || '' : ''}</textarea>

                <label>✗ Reformulation incorrecte 2 :</label>
                <textarea id="editor-wrong2">${editing ? editing.qcm.filter(q => !q.correct)[1]?.text || '' : ''}</textarea>
                <label>Feedback pour cette erreur :</label>
                <textarea id="editor-wrong2-feedback">${editing ? editing.qcm.filter(q => !q.correct)[1]?.feedback || '' : ''}</textarea>

                <div style="text-align: center; margin-top: 30px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-success" onclick="AppController.saveProblem()">
                        💾 ${editing ? 'Mettre à jour' : 'Enregistrer'} le problème
                    </button>
                    ${editing ? `
                        <button class="btn btn-back" onclick="AppController.cancelEdit()">
                            ✖ Annuler
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    },

    /**
     * Rend la gestion des problèmes existants
     */
    renderProblemsManagement(byLevel) {
        const levels = Object.keys(byLevel).filter(level => byLevel[level].length > 0);
        
        if (levels.length === 0) {
            return `
                <div style="text-align: center; padding: 40px; color: #666;">
                    Aucun problème créé. Utilisez le formulaire ci-dessous pour en ajouter.
                </div>
            `;
        }

        return `
            <div class="problems-management">
                <h2>📚 Gestion des problèmes</h2>
                ${levels.map(level => `
                    <div class="level-section">
                        <h3>${level} (${byLevel[level].length} problème${byLevel[level].length > 1 ? 's' : ''})</h3>
                        ${byLevel[level].sort((a, b) => a.period - b.period || a.number - b.number).map(problem => `
                            <div class="problem-manager-item">
                                <div class="problem-info">
                                    <strong>Période ${problem.period} - Problème n°${problem.number}</strong>
                                    ${problem.title ? `<div>${problem.title}</div>` : ''}
                                    <div style="color: #666; font-size: 0.9em; margin-top: 5px;">
                                        ${problem.text.substring(0, 80)}${problem.text.length > 80 ? '...' : ''}
                                    </div>
                                </div>
                                <div class="problem-actions">
                                    <button class="btn btn-warning btn-small" onclick="AppController.editProblem('${problem.level}', ${problem.period}, ${problem.number})">
                                        ✏️ Modifier
                                    </button>
                                    <button class="btn btn-danger btn-small" onclick="AppController.confirmDeleteProblem('${problem.level}', ${problem.period}, ${problem.number})">
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// ========================================
// APP CONTROLLER
// Contrôleur principal de l'application
// ========================================

const AppController = {
    /**
     * Initialise l'application
     */
    init() {
        DataManager.init();
        this.render();
    },

    /**
     * Rend la vue courante
     */
    render() {
        const appDiv = document.getElementById('app');
        
        switch(AppState.currentView) {
            case 'levelSelection':
                appDiv.innerHTML = Views.renderLevelSelection();
                break;
            case 'home':
                appDiv.innerHTML = Views.renderHome();
                break;
            case 'period':
                appDiv.innerHTML = Views.renderPeriod(AppState.currentPeriod);
                break;
            case 'problem':
                appDiv.innerHTML = Views.renderProblem(AppState.currentProblem);
                break;
            case 'editor':
                appDiv.innerHTML = Views.renderEditor();
                break;
        }
    },

    /**
     * Ouvre la modal de mot de passe
     */
    openPasswordModal() {
        AppState.showPasswordModal = true;
        this.render();
        setTimeout(() => {
            const input = document.getElementById('password-input');
            if (input) input.focus();
        }, 100);
    },

    /**
     * Ferme la modal de mot de passe
     */
    closePasswordModal() {
        AppState.showPasswordModal = false;
        this.render();
    },

    /**
     * Vérifie le mot de passe
     */
    checkPassword() {
        const input = document.getElementById('password-input');
        const password = input ? input.value : '';
        const errorElement = document.getElementById('password-error');
        
        if (password === 'Legouve59') {
            AppState.isTeacherAuthenticated = true;
            AppState.showPasswordModal = false;
            AppState.currentView = 'editor';
            this.render();
        } else {
            if (errorElement) {
                errorElement.style.display = 'block';
            }
            if (input) {
                input.value = '';
                input.focus();
            }
        }
    },

    /**
     * Retourne à la sélection du niveau
     */
    goToLevelSelection() {
        SpeechManager.cancel();
        AppState.currentView = 'levelSelection';
        AppState.currentLevel = null;
        AppState.currentPeriod = null;
        AppState.currentProblem = null;
        AppState.selectedAnswer = null;
        AppState.isReading = false;
        this.render();
    },

    /**
     * Sélectionne un niveau
     */
    selectLevel(level) {
        AppState.currentLevel = level;
        AppState.currentView = 'home';
        this.render();
    },

    /**
     * Retourne à l'accueil
     */
    goHome() {
        SpeechManager.cancel();
        AppState.currentView = 'home';
        AppState.currentPeriod = null;
        AppState.currentProblem = null;
        AppState.selectedAnswer = null;
        AppState.isReading = false;
        this.render();
    },

    /**
     * Sélectionne une période
     */
    selectPeriod(period) {
        AppState.currentView = 'period';
        AppState.currentPeriod = period;
        this.render();
    },

    /**
     * Retourne à la période
     */
    backToPeriod() {
        SpeechManager.cancel();
        AppState.currentView = 'period';
        AppState.currentProblem = null;
        AppState.selectedAnswer = null;
        AppState.isReading = false;
        this.render();
    },

    /**
     * Sélectionne un problème
     */
    selectProblem(level, period, number) {
        const problems = DataManager.loadProblems();
        const problem = problems.find(p => p.level === level && p.period === period && p.number === number);
        if (problem) {
            AppState.currentView = 'problem';
            AppState.currentProblem = problem;
            AppState.selectedAnswer = null;
            this.render();
        }
    },

    /**
     * Lance la lecture du problème avec surbrillance
     */
    startReading() {
        AppState.isReading = true;
        this.render();

        const problem = AppState.currentProblem;
        let currentWordIndex = 0;

        const highlightWord = (index) => {
            document.querySelectorAll('.word').forEach(w => w.classList.remove('highlight'));
            const word = document.querySelector(`[data-index="${index}"]`);
            if (word) word.classList.add('highlight');
        };

        SpeechManager.speak(
            problem.text,
            (event) => {
                if (event.name === 'word') {
                    highlightWord(currentWordIndex);
                    currentWordIndex++;
                }
            },
            () => {
                AppState.isReading = false;
                document.querySelectorAll('.word').forEach(w => w.classList.remove('highlight'));
                this.render();
            }
        );
    },

    /**
     * Sélectionne une réponse
     */
    selectAnswer(index) {
        if (AppState.selectedAnswer === null) {
            AppState.selectedAnswer = index;
            this.render();
        }
    },

    /**
     * Valide la réponse
     */
    validateAnswer() {
        if (AppState.selectedAnswer !== null) {
            this.render();
        }
    },

    /**
     * Passe au problème suivant
     */
    nextProblem() {
        const problems = DataManager.loadProblems();
        const currentLevel = AppState.currentProblem.level;
        const currentPeriod = AppState.currentProblem.period;
        const currentNumber = AppState.currentProblem.number;
        const problemsInPeriod = problems.filter(p => p.level === currentLevel && p.period === currentPeriod);
        const nextProblem = problemsInPeriod.find(p => p.number > currentNumber);

        if (nextProblem) {
            this.selectProblem(nextProblem.level, nextProblem.period, nextProblem.number);
        } else {
            this.backToPeriod();
        }
    },

    /**
     * Lit un texte avec la synthèse vocale
     */
    readText(text) {
        SpeechManager.speak(text, null, null);
    },

    /**
     * Sauvegarde un problème (nouveau ou modifié)
     */
    saveProblem() {
        const level = document.getElementById('editor-level').value;
        const period = parseInt(document.getElementById('editor-period').value);
        const title = document.getElementById('editor-title').value.trim();
        const text = document.getElementById('editor-text').value.trim();
        const correct = document.getElementById('editor-correct').value.trim();
        const correctFeedback = document.getElementById('editor-correct-feedback').value.trim();
        const wrong1 = document.getElementById('editor-wrong1').value.trim();
        const wrong1Feedback = document.getElementById('editor-wrong1-feedback').value.trim();
        const wrong2 = document.getElementById('editor-wrong2').value.trim();
        const wrong2Feedback = document.getElementById('editor-wrong2-feedback').value.trim();

        if (!text || !correct || !correctFeedback || !wrong1 || !wrong1Feedback || !wrong2 || !wrong2Feedback) {
            alert('⚠️ Veuillez remplir tous les champs obligatoires.');
            return;
        }

        const words = text.split(/\s+/);
        const qcmOptions = [
            { text: correct, correct: true, feedback: correctFeedback },
            { text: wrong1, correct: false, feedback: wrong1Feedback },
            { text: wrong2, correct: false, feedback: wrong2Feedback }
        ];
        qcmOptions.sort(() => Math.random() - 0.5);

        if (AppState.editingProblem) {
            const updatedProblem = {
                level,
                period,
                number: AppState.editingProblem.number,
                title: title || null,
                text,
                words,
                qcm: qcmOptions
            };

            if (DataManager.updateProblem(AppState.editingProblem.level, AppState.editingProblem.period, AppState.editingProblem.number, updatedProblem)) {
                alert(`✅ Problème modifié avec succès pour le niveau ${level} !`);
                AppState.editingProblem = null;
                this.render();
            }
        } else {
            const problems = DataManager.loadProblems();
            const problemsInPeriod = problems.filter(p => p.level === level && p.period === period);
            const nextNumber = problemsInPeriod.length > 0 ? Math.max(...problemsInPeriod.map(p => p.number)) + 1 : 1;

            const newProblem = {
                level,
                period,
                number: nextNumber,
                title: title || null,
                text,
                words,
                qcm: qcmOptions
            };

            if (DataManager.addProblem(newProblem)) {
                alert(`✅ Problème enregistré avec succès pour le niveau ${level} !`);
                this.render();
            }
        }
    },

    /**
     * Édite un problème existant
     */
    editProblem(level, period, number) {
        const problems = DataManager.loadProblems();
        const problem = problems.find(p => p.level === level && p.period === period && p.number === number);
        if (problem) {
            AppState.editingProblem = problem;
            this.render();
            setTimeout(() => {
                document.querySelector('.editor-section').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    },

    /**
     * Annule l'édition
     */
    cancelEdit() {
        AppState.editingProblem = null;
        this.render();
    },

    /**
     * Confirme et supprime un problème
     */
    confirmDeleteProblem(level, period, number) {
        const problems = DataManager.loadProblems();
        const problem = problems.find(p => p.level === level && p.period === period && p.number === number);
        if (!problem) return;

        const message = `⚠️ Êtes-vous sûr de vouloir supprimer ce problème ?\n\nNiveau: ${level}\nPériode ${period} - Problème n°${number}\n${problem.title ? problem.title + '\n' : ''}${problem.text.substring(0, 100)}...`;
        
        if (confirm(message)) {
            if (DataManager.deleteProblem(level, period, number)) {
                alert('✅ Problème supprimé avec succès !');
                this.render();
            }
        }
    },

    /**
     * Exporte toutes les données vers un fichier HTML permanent
     */
    exportToFile() {
        const problems = DataManager.loadProblems();
        if (problems.length === 0) {
            alert('⚠️ Aucun problème à exporter.');
            return;
        }

        if (confirm(`💾 Exporter ${problems.length} problème(s) vers un fichier HTML ?\n\nCe fichier contiendra toutes vos données et fonctionnera de manière autonome.`)) {
            DataManager.exportToFile(problems);
        }
    },

    /**
     * Télécharge un modèle Markdown
     */
    downloadMarkdownTemplate() {
        const template = `# Période 3 – Compréhension de problèmes

Niveau : CE2  
Objectif principal : Comprendre un problème mathématique avant toute résolution  
Accessibilité : non lecteurs / dysphasie / TDAH

## PROBLEME 1

### TEXTE
Un chauffeur de bus effectue 148 km par jour lorsqu'il travaille. Il ne travaille pas le samedi et le dimanche.
Quelle distance parcourt-il chaque semaine ?

## REFORMULATIONS
- [CORRECTE] On cherche la distance totale parcourue par le chauffeur pendant une semaine de travail.
- [FAUSSE] On cherche la distance parcourue par le chauffeur en une seule journée de travail.
- [FAUSSE] On cherche la distance parcourue par le chauffeur pendant toute la semaine, y compris le samedi et le dimanche.

### FEEDBACK_CORRECT
Bravo, tu as bien compris le problème : il faut additionner les distances parcourues chaque jour où le chauffeur travaille pour connaître la distance totale de la semaine
### FEEDBACK_FAUX_1
Attention, le problème ne parle pas d'une seule journée mais de plusieurs jours. Il faut réfléchir à l'ensemble de la semaine de travail, pas à un seul jour.
### FEEDBACK_FAUX_2
Relis bien l'énoncé : le chauffeur ne travaille pas le samedi ni le dimanche. Il faut donc compter uniquement les jours où il travaille, et ne pas inclure le week-end.

## PROBLEME 2

### TEXTE
Robin a acheté 12 assiettes à 7 euros l'unité.
Combien a-t-il dépensé au total ?

## REFORMULATIONS
- [CORRECTE] On cherche la somme totale que Robin a payée pour acheter toutes les assiettes.
- [FAUSSE] On cherche le prix d'une seule assiette achetée par Robin.
- [FAUSSE] On cherche combien d'assiettes Robin a achetées.

### FEEDBACK_CORRECT
Bravo, tu as bien compris : il faut déterminer l'argent dépensé pour l'ensemble des assiettes achetées, et non pour une seule.
### FEEDBACK_FAUX_1
Attention, le prix d'une assiette est déjà donné dans l'énoncé. La question porte sur l'achat de toutes les assiettes, pas sur le prix d'une seule.
### FEEDBACK_FAUX_2
Relis bien la situation : le nombre d'assiettes est déjà indiqué. Le problème demande de trouver le montant total dépensé, pas le nombre d'objets achetés.
`;

        const blob = new Blob([template], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'modele-problemes.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('📄 Modèle téléchargé !\n\nOuvrez le fichier "modele-problemes.md" avec un éditeur de texte.\n\nModifiez-le selon vos besoins, puis importez-le dans l\'application.');
    },

    /**
     * Importe des problèmes depuis un fichier Markdown
     */
    importMarkdown() {
        const fileInput = document.getElementById('markdown-file');
        const resultDiv = document.getElementById('import-result');
        
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('⚠️ Veuillez sélectionner un fichier Markdown (.md ou .txt)');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target.result;
                const parsedProblems = this.parseMarkdown(content);
                
                if (parsedProblems.length === 0) {
                    resultDiv.innerHTML = `
                        <div class="feedback error">
                            ❌ Aucun problème trouvé dans le fichier.<br>
                            Vérifiez le format du fichier Markdown.
                        </div>
                    `;
                    return;
                }

                const problems = DataManager.loadProblems();
                let addedCount = 0;

                parsedProblems.forEach(newProblem => {
                    const existingInPeriod = problems.filter(p => 
                        p.level === newProblem.level && p.period === newProblem.period
                    );
                    const nextNumber = existingInPeriod.length > 0 ? 
                        Math.max(...existingInPeriod.map(p => p.number)) + 1 : 1;
                    
                    newProblem.number = nextNumber;
                    problems.push(newProblem);
                    addedCount++;
                });

                if (DataManager.saveProblems(problems)) {
                    resultDiv.innerHTML = `
                        <div class="feedback success">
                            ✅ ${addedCount} problème(s) importé(s) avec succès !<br>
                            <small>Niveau: ${parsedProblems[0].level} - Période: ${parsedProblems[0].period}</small>
                        </div>
                    `;
                    
                    fileInput.value = '';
                    
                    // Recharger la vue pour afficher les nouveaux problèmes
                    setTimeout(() => {
                        this.render();
                    }, 500);
                }
            } catch (error) {
                console.error('Erreur lors de l\'import:', error);
                resultDiv.innerHTML = `
                    <div class="feedback error">
                        ❌ Erreur lors de l'import : ${error.message}<br>
                        Vérifiez le format du fichier.
                    </div>
                `;
            }
        };

        reader.onerror = () => {
            resultDiv.innerHTML = `
                <div class="feedback error">
                    ❌ Erreur lors de la lecture du fichier.
                </div>
            `;
        };

        reader.readAsText(file, 'UTF-8');
    },

    /**
     * Parse un fichier Markdown et extrait les problèmes
     */
    parseMarkdown(content) {
        const problems = [];
        let currentLevel = null;
        let currentPeriod = null;
        
        const levelMatch = content.match(/Niveau\s*:\s*(\w+)/i);
        const periodMatch = content.match(/^#\s*Période\s*(\d+)/m);
        
        if (!levelMatch || !periodMatch) {
            throw new Error('Le fichier doit contenir "Niveau : XX" et "# Période X"');
        }
        
        currentLevel = levelMatch[1].toUpperCase();
        currentPeriod = parseInt(periodMatch[1]);
        
        if (!['CP', 'CE1', 'CE2', 'CM1', 'CM2'].includes(currentLevel)) {
            throw new Error(`Niveau invalide: ${currentLevel}. Utilisez CP, CE1, CE2, CM1 ou CM2`);
        }
        
        if (currentPeriod < 1 || currentPeriod > 5) {
            throw new Error(`Période invalide: ${currentPeriod}. Utilisez 1, 2, 3, 4 ou 5`);
        }
        
        const problemBlocks = content.split(/^##\s*PROBLEME\s*\d+/m).slice(1);
        
        problemBlocks.forEach((block, index) => {
            try {
                let title = `Problème ${index + 1}`;
                
                const textMatch = block.match(/###\s*TEXTE\s*\n([\s\S]+?)(?=##\s*REFORMULATIONS)/);
                if (!textMatch) throw new Error('Section ### TEXTE manquante');
                const text = textMatch[1].trim();
                
                const reformulationsMatch = block.match(/##\s*REFORMULATIONS\s*\n([\s\S]+?)###\s*FEEDBACK_CORRECT/);
                if (!reformulationsMatch) throw new Error('Section ## REFORMULATIONS manquante');
                
                const reformulationsLines = reformulationsMatch[1]
                    .split('\n')
                    .filter(line => line.trim().startsWith('-'))
                    .map(line => ({
                        text: line.replace(/^-\s*\[(CORRECTE|FAUSSE)\]\s*/i, '').trim(),
                        correct: /\[CORRECTE\]/i.test(line)
                    }));
                
                if (reformulationsLines.length !== 3) {
                    throw new Error('Il faut exactement 3 reformulations (1 CORRECTE, 2 FAUSSE)');
                }
                
                const correctCount = reformulationsLines.filter(r => r.correct).length;
                if (correctCount !== 1) {
                    throw new Error('Il faut exactement 1 reformulation CORRECTE');
                }
                
                const feedbackCorrectMatch = block.match(/###\s*FEEDBACK_CORRECT\s*\n([\s\S]+?)###\s*FEEDBACK_FAUX_1/);
                const feedbackFaux1Match = block.match(/###\s*FEEDBACK_FAUX_1\s*\n([\s\S]+?)###\s*FEEDBACK_FAUX_2/);
                const feedbackFaux2Match = block.match(/###\s*FEEDBACK_FAUX_2\s*\n([\s\S]+?)(?=##|$)/);
                
                if (!feedbackCorrectMatch || !feedbackFaux1Match || !feedbackFaux2Match) {
                    throw new Error('Les 3 feedbacks sont obligatoires (FEEDBACK_CORRECT, FEEDBACK_FAUX_1, FEEDBACK_FAUX_2)');
                }
                
                const feedbackCorrect = feedbackCorrectMatch[1].trim();
                const feedbackFaux1 = feedbackFaux1Match[1].trim();
                const feedbackFaux2 = feedbackFaux2Match[1].trim();
                
                const qcm = [];
                reformulationsLines.forEach((reform) => {
                    qcm.push({
                        text: reform.text,
                        correct: reform.correct,
                        feedback: reform.correct ? feedbackCorrect : (qcm.filter(q => !q.correct).length === 0 ? feedbackFaux1 : feedbackFaux2)
                    });
                });
                
                qcm.sort(() => Math.random() - 0.5);
                
                const words = text.split(/\s+/);
                
                problems.push({
                    level: currentLevel,
                    period: currentPeriod,
                    number: 0,
                    title: title,
                    text: text,
                    words: words,
                    qcm: qcm
                });
            } catch (error) {
                throw new Error(`Erreur dans le problème ${index + 1} : ${error.message}`);
            }
        });
        
        return problems;
    }
};
