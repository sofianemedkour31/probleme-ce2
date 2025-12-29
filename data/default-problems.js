// ========================================
// DONNÉES PAR DÉFAUT
// ========================================
const DEFAULT_PROBLEMS = [
    {
        level: 'CP',
        period: 1,
        number: 1,
        title: "Les billes de Tom",
        text: "Tom a 12 billes. Il en donne 5 à son ami Lucas. Combien de billes lui reste-t-il ?",
        words: ["Tom", "a", "12 billes.", "Il", "en", "donne", "5", "à", "son", "ami", "Lucas.", "Combien", "de", "billes", "lui", "reste-t-il ?"],
        qcm: [
            {
                text: "Tom veut savoir combien de billes il possède maintenant après en avoir donné à Lucas.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème ! Tom cherche effectivement à connaître le nombre de billes qu'il lui reste."
            },
            {
                text: "Tom veut savoir combien de billes Lucas possède au total.",
                correct: false,
                feedback: "Non, le problème ne parle pas du nombre total de billes de Lucas. On cherche combien de billes il reste à Tom."
            },
            {
                text: "Tom veut savoir combien de billes il avait au départ.",
                correct: false,
                feedback: "Non, on sait déjà que Tom avait 12 billes au départ. On cherche combien il lui en reste après en avoir donné."
            }
        ]
    },
    {
        level: 'CP',
        period: 1,
        number: 2,
        title: "Le goûter",
        text: "Marie achète 3 paquets de gâteaux. Chaque paquet contient 8 gâteaux. Combien de gâteaux a-t-elle en tout ?",
        words: ["Marie", "achète", "3 paquets", "de", "gâteaux.", "Chaque", "paquet", "contient", "8 gâteaux.", "Combien", "de", "gâteaux", "a-t-elle", "en", "tout ?"],
        qcm: [
            {
                text: "Marie veut connaître le nombre total de gâteaux qu'elle a achetés.",
                correct: true,
                feedback: "Bravo, tu as bien compris ! Marie cherche à savoir combien elle a de gâteaux au total dans ses 3 paquets."
            },
            {
                text: "Marie veut savoir combien coûtent les paquets de gâteaux.",
                correct: false,
                feedback: "Non, le problème ne parle pas d'argent. On cherche à savoir combien de gâteaux elle a en tout."
            },
            {
                text: "Marie veut savoir combien de gâteaux il y a dans un seul paquet.",
                correct: false,
                feedback: "Non, on sait déjà qu'il y a 8 gâteaux dans chaque paquet. On cherche le nombre total de gâteaux."
            }
        ]
    },
    {
        level: 'CE1',
        period: 1,
        number: 1,
        title: "La bibliothèque",
        text: "La bibliothèque de l'école a 156 livres. On en ajoute 48 nouveaux. Combien de livres y a-t-il maintenant ?",
        words: ["La", "bibliothèque", "de", "l'école", "a", "156 livres.", "On", "en", "ajoute", "48 nouveaux.", "Combien", "de", "livres", "y a-t-il", "maintenant ?"],
        qcm: [
            {
                text: "On cherche le nombre total de livres dans la bibliothèque après l'ajout des nouveaux livres.",
                correct: true,
                feedback: "Excellent ! On veut effectivement connaître le nombre total de livres après avoir ajouté les 48 nouveaux."
            },
            {
                text: "On cherche combien de livres il y avait avant l'ajout.",
                correct: false,
                feedback: "Non, on sait déjà qu'il y avait 156 livres avant. On cherche le total après l'ajout."
            },
            {
                text: "On cherche combien de livres ont été ajoutés.",
                correct: false,
                feedback: "Non, on sait déjà qu'on a ajouté 48 livres. On cherche le nouveau total."
            }
        ]
    }
];

// Variable qui contiendra les problèmes sauvegardés
window.SAVED_PROBLEMS = null;
