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
    },
    {
        level: 'CE2',
        period: 3,
        number: 1,
        title: "Problème 1",
        text: "Un chauffeur de bus effectue 148 km par jour lorsqu'il travaille. Il ne travaille pas le samedi et le dimanche. Quelle distance parcourt-il chaque semaine ?",
        words: ["Un", "chauffeur", "de", "bus", "effectue", "148", "km", "par", "jour", "lorsqu'il", "travaille.", "Il", "ne", "travaille", "pas", "le", "samedi", "et", "le", "dimanche.", "Quelle", "distance", "parcourt-il", "chaque", "semaine", "?"],
        qcm: [
            {
                text: "On cherche la distance totale parcourue par le chauffeur pendant une semaine de travail.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut additionner les distances parcourues chaque jour où le chauffeur travaille pour connaître la distance totale de la semaine."
            },
            {
                text: "On cherche la distance parcourue par le chauffeur en une seule journée de travail.",
                correct: false,
                feedback: "Attention, le problème ne parle pas d'une seule journée mais de plusieurs jours. Il faut réfléchir à l'ensemble de la semaine de travail, pas à un seul jour."
            },
            {
                text: "On cherche la distance parcourue par le chauffeur pendant toute la semaine, y compris le samedi et le dimanche.",
                correct: false,
                feedback: "Relis bien l'énoncé : le chauffeur ne travaille pas le samedi ni le dimanche. Il faut donc compter uniquement les jours où il travaille, et ne pas inclure le week-end."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 2,
        title: "Problème 2",
        text: "Robin a acheté 12 assiettes à 7 euros l'unité. Combien a-t-il dépensé au total ?",
        words: ["Robin", "a", "acheté", "12", "assiettes", "à", "7", "euros", "l'unité.", "Combien", "a-t-il", "dépensé", "au", "total", "?"],
        qcm: [
            {
                text: "On cherche la somme totale que Robin a payée pour acheter toutes les assiettes.",
                correct: true,
                feedback: "Bravo, tu as bien compris : il faut déterminer l'argent dépensé pour l'ensemble des assiettes achetées, et non pour une seule."
            },
            {
                text: "On cherche le prix d'une seule assiette achetée par Robin.",
                correct: false,
                feedback: "Attention, le prix d'une assiette est déjà donné dans l'énoncé. La question porte sur l'achat de toutes les assiettes, pas sur le prix d'une seule."
            },
            {
                text: "On cherche combien d'assiettes Robin a achetées.",
                correct: false,
                feedback: "Relis bien la situation : le nombre d'assiettes est déjà indiqué. Le problème demande de trouver le montant total dépensé, pas le nombre d'objets achetés."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 3,
        title: "Problème 3",
        text: "Une fermière a rempli 8 boîtes de 12 œufs. Combien d'œufs a-t-elle rangés dans les boîtes ?",
        words: ["Une", "fermière", "a", "rempli", "8", "boîtes", "de", "12", "œufs.", "Combien", "d'œufs", "a-t-elle", "rangés", "dans", "les", "boîtes", "?"],
        qcm: [
            {
                text: "On cherche combien d'œufs il y a en tout dans toutes les boîtes.",
                correct: true,
                feedback: "Bravo, tu as bien compris : il faut s'intéresser à la quantité totale d'œufs rangés dans l'ensemble des boîtes."
            },
            {
                text: "On cherche combien d'œufs il y a dans une seule boîte.",
                correct: false,
                feedback: "Attention, le nombre d'œufs par boîte est déjà indiqué. La question ne porte pas sur une seule boîte mais sur toutes les boîtes réunies."
            },
            {
                text: "On cherche combien de boîtes la fermière a remplies.",
                correct: false,
                feedback: "Relis bien le problème : le nombre de boîtes est donné. Ce qui est demandé, c'est le nombre total d'œufs, pas le nombre de boîtes."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 4,
        title: "Problème 4",
        text: "Une piste d'athlétisme mesure 325 mètres. Un coureur dit : « Aujourd'hui, je veux faire 4000 mètres. » Aura-t-il parcouru cette distance après avoir effectué 12 tours de piste ?",
        words: ["Une", "piste", "d'athlétisme", "mesure", "325", "mètres.", "Un", "coureur", "dit", ":", "«", "Aujourd'hui,", "je", "veux", "faire", "4000", "mètres.", "»", "Aura-t-il", "parcouru", "cette", "distance", "après", "avoir", "effectué", "12", "tours", "de", "piste", "?"],
        qcm: [
            {
                text: "On cherche à savoir si le nombre de tours réalisés permet d'atteindre la distance annoncée par le coureur.",
                correct: true,
                feedback: "Bravo, tu as bien compris : il faut vérifier si la distance parcourue après plusieurs tours correspond à l'objectif que le coureur s'est fixé."
            },
            {
                text: "On cherche la longueur d'un tour de piste.",
                correct: false,
                feedback: "Attention, la longueur d'un tour est déjà donnée dans le problème. La question porte sur la distance totale après plusieurs tours, pas sur la longueur d'un seul tour."
            },
            {
                text: "On cherche combien de tours le coureur doit faire pour atteindre son objectif.",
                correct: false,
                feedback: "Relis bien la question : le nombre de tours est déjà indiqué. Il faut vérifier si ces tours suffisent pour atteindre la distance annoncée, pas en chercher un autre nombre."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 5,
        title: "Problème 5",
        text: "Max a 29 euros. Il veut acheter des paquets de gâteaux à 3 euros l'un. Combien de paquets de gâteaux peut-il acheter ? Combien lui reste-t-il d'euros ?",
        words: ["Max", "a", "29", "euros.", "Il", "veut", "acheter", "des", "paquets", "de", "gâteaux", "à", "3", "euros", "l'un.", "Combien", "de", "paquets", "de", "gâteaux", "peut-il", "acheter", "?", "Combien", "lui", "reste-t-il", "d'euros", "?"],
        qcm: [
            {
                text: "On cherche combien de paquets de gâteaux Max peut acheter et combien d'euros il lui restera après ses achats.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut déterminer le nombre maximum de paquets que Max peut acheter avec son argent, puis calculer la somme restante."
            },
            {
                text: "On cherche combien d'euros Max dépensera pour un seul paquet de gâteaux.",
                correct: false,
                feedback: "Attention, le problème ne demande pas le prix d'un seul paquet : le prix est déjà donné. Il faut réfléchir à l'ensemble des paquets qu'il peut acheter avec ses 29 euros."
            },
            {
                text: "On cherche combien de gâteaux Max peut acheter si le prix des paquets change chaque semaine.",
                correct: false,
                feedback: "Relis bien l'énoncé : le prix est fixé à 3 euros par paquet. Il ne faut pas inventer des changements de prix qui n'apparaissent pas dans le problème."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 6,
        title: "Problème 6",
        text: "Dans la salle de cinéma, il y a 15 sièges par rangée. Au total, la salle peut accueillir 90 spectateurs. Combien de rangées y a-t-il dans cette salle de cinéma ?",
        words: ["Dans", "la", "salle", "de", "cinéma,", "il", "y", "a", "15", "sièges", "par", "rangée.", "Au", "total,", "la", "salle", "peut", "accueillir", "90", "spectateurs.", "Combien", "de", "rangées", "y", "a-t-il", "dans", "cette", "salle", "de", "cinéma", "?"],
        qcm: [
            {
                text: "On cherche le nombre de rangées dans la salle de cinéma.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut déterminer combien de rangées de 15 sièges sont nécessaires pour accueillir les 90 spectateurs."
            },
            {
                text: "On cherche combien de sièges sont dans chaque rangée de la salle de cinéma.",
                correct: false,
                feedback: "Attention, le nombre de sièges par rangée est déjà donné dans l'énoncé (15 sièges). Il ne faut pas recalculer ce qui est déjà précisé, mais trouver le nombre de rangées."
            },
            {
                text: "On cherche combien de spectateurs peuvent s'asseoir dans chaque rangée si la salle contient 90 rangées.",
                correct: false,
                feedback: "Relis bien l'énoncé : la salle contient 90 spectateurs, pas 90 rangées. L'erreur vient d'inverser les informations données et de poser une question qui ne correspond pas à l'objectif initial."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 7,
        title: "Problème 7",
        text: "Madama Alacoque est fermière. Ce matin, elle a ramassé 56 œufs qu'elle range dans des boîtes de 6. Combien de boîtes de 6 œufs a-t-elle remplies ?",
        words: ["Madama", "Alacoque", "est", "fermière.", "Ce", "matin,", "elle", "a", "ramassé", "56", "œufs", "qu'elle", "range", "dans", "des", "boîtes", "de", "6.", "Combien", "de", "boîtes", "de", "6", "œufs", "a-t-elle", "remplies", "?"],
        qcm: [
            {
                text: "On cherche combien de boîtes de 6 œufs Madama Alacoque a pu remplir avec les œufs qu'elle a ramassés.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut partager le nombre total d'œufs par la capacité d'une boîte pour savoir combien de boîtes complètes on peut remplir."
            },
            {
                text: "On cherche combien d'œufs Madama Alacoque a ramassés ce matin.",
                correct: false,
                feedback: "Attention, le nombre total d'œufs est déjà donné (56 œufs). Il ne faut pas recalculer ce qui est précisé, mais déterminer combien de boîtes peuvent être remplies."
            },
            {
                text: "On cherche combien de boîtes Madama Alacoque devra remplir si chaque boîte contient 8 œufs.",
                correct: false,
                feedback: "Relis bien l'énoncé : chaque boîte contient 6 œufs, pas 8. Modifier le nombre d'œufs par boîte change complètement le problème et la solution attendue."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 8,
        title: "Problème 8",
        text: "Capucine a 40 euros dans son porte-monnaie. Elle veut acheter des sachets de billes à 5 euros l'unité. Combien de sachets peut-elle acheter ?",
        words: ["Capucine", "a", "40", "euros", "dans", "son", "porte-monnaie.", "Elle", "veut", "acheter", "des", "sachets", "de", "billes", "à", "5", "euros", "l'unité.", "Combien", "de", "sachets", "peut-elle", "acheter", "?"],
        qcm: [
            {
                text: "On cherche combien de sachets de billes Capucine peut acheter avec ses 40 euros.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut déterminer le nombre maximum de sachets qu'elle peut se permettre d'acheter avec l'argent disponible."
            },
            {
                text: "On cherche combien d'euros coûte un sachet de billes.",
                correct: false,
                feedback: "Attention, le prix d'un sachet est déjà indiqué dans l'énoncé (5 euros). La question du problème porte sur le nombre de sachets qu'elle peut acheter, pas sur le prix."
            },
            {
                text: "On cherche combien de sachets Capucine pourra acheter si le prix des billes change chaque semaine.",
                correct: false,
                feedback: "Relis bien l'énoncé : le prix est fixé à 5 euros par sachet. Introduire un changement de prix inventé modifie le problème et détourne l'objectif initial."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 9,
        title: "Problème 9",
        text: "Enzo achète 7 ballons identiques. Il paie 56 euros. Quel est le prix d'un ballon ?",
        words: ["Enzo", "achète", "7", "ballons", "identiques.", "Il", "paie", "56", "euros.", "Quel", "est", "le", "prix", "d'un", "ballon", "?"],
        qcm: [
            {
                text: "On cherche le prix d'un seul ballon acheté par Enzo.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut déterminer le coût d'un seul ballon à partir du montant total payé pour les 7 ballons identiques."
            },
            {
                text: "On cherche combien de ballons Enzo a achetés.",
                correct: false,
                feedback: "Attention, le nombre de ballons est déjà donné (7 ballons). La question porte sur le prix d'un ballon, pas sur la quantité achetée."
            },
            {
                text: "On cherche combien Enzo paierait pour 10 ballons au lieu de 7.",
                correct: false,
                feedback: "Relis bien l'énoncé : il s'agit de trouver le prix d'un seul ballon à partir du paiement de 7 ballons. Changer la quantité modifie le problème et ne correspond pas à l'objectif initial."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 10,
        title: "Problème 10",
        text: "5 joueurs se partagent équitablement 32 cartes. Chaque joueur doit recevoir le plus grand nombre de cartes possible. Combien de cartes chaque joueur recevra-t-il ? Combien de cartes restera-t-il dans la pioche ?",
        words: ["5", "joueurs", "se", "partagent", "équitablement", "32", "cartes.", "Chaque", "joueur", "doit", "recevoir", "le", "plus", "grand", "nombre", "de", "cartes", "possible.", "Combien", "de", "cartes", "chaque", "joueur", "recevra-t-il", "?", "Combien", "de", "cartes", "restera-t-il", "dans", "la", "pioche", "?"],
        qcm: [
            {
                text: "On cherche combien de cartes chaque joueur recevra et combien de cartes resteront dans la pioche après le partage équitable.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut partager les 32 cartes de manière équitable entre les 5 joueurs et déterminer à la fois le nombre de cartes par joueur et le reste."
            },
            {
                text: "On cherche combien de cartes il y a en tout dans le jeu.",
                correct: false,
                feedback: "Attention, le nombre total de cartes est déjà donné (32 cartes). La question porte sur le partage et le reste, pas sur le total de cartes."
            },
            {
                text: "On cherche combien de cartes chaque joueur recevra si le partage n'était pas équitable.",
                correct: false,
                feedback: "Relis bien l'énoncé : le partage doit être équitable. Modifier ce critère change complètement le problème et ne correspond pas à l'objectif initial."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 11,
        title: "Problème 11",
        text: "Un camion transporte cinq bidons identiques qui pèsent 550 kg au total. Combien pèse un bidon ?",
        words: ["Un", "camion", "transporte", "cinq", "bidons", "identiques", "qui", "pèsent", "550", "kg", "au", "total.", "Combien", "pèse", "un", "bidon", "?"],
        qcm: [
            {
                text: "On cherche le poids d'un bidon transporté par le camion.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut déterminer le poids d'un seul bidon à partir du poids total des cinq bidons identiques."
            },
            {
                text: "On cherche combien de bidons le camion transporte.",
                correct: false,
                feedback: "Attention, le nombre de bidons est déjà donné (5 bidons). La question porte sur le poids d'un bidon, pas sur la quantité transportée."
            },
            {
                text: "On cherche combien pèse le camion avec les bidons à l'intérieur.",
                correct: false,
                feedback: "Relis bien l'énoncé : il s'agit uniquement du poids des bidons, pas du camion entier. Modifier l'objectif du problème change la question posée."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 12,
        title: "Problème 12",
        text: "Anouk achète 8 ballons qui coûtent 4 euros chacun. Combien doit-elle payer ?",
        words: ["Anouk", "achète", "8", "ballons", "qui", "coûtent", "4", "euros", "chacun.", "Combien", "doit-elle", "payer", "?"],
        qcm: [
            {
                text: "On cherche combien Anouk doit payer pour les 8 ballons.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut calculer le montant total à payer en multipliant le prix d'un ballon par le nombre de ballons achetés."
            },
            {
                text: "On cherche combien de ballons Anouk a achetés.",
                correct: false,
                feedback: "Attention, le nombre de ballons est déjà indiqué dans l'énoncé (8 ballons). La question porte sur le total à payer, pas sur la quantité achetée."
            },
            {
                text: "On cherche combien coûte un seul ballon acheté par Anouk.",
                correct: false,
                feedback: "Relis bien l'énoncé : le prix d'un ballon est déjà donné (4 euros). Il faut déterminer le montant total pour les 8 ballons, pas le prix d'un seul."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 13,
        title: "Problème 13",
        text: "Un fleuriste réalise 11 bouquets de 9 roses. Combien de roses a-t-elle utilisées ?",
        words: ["Un", "fleuriste", "réalise", "11", "bouquets", "de", "9", "roses.", "Combien", "de", "roses", "a-t-elle", "utilisées", "?"],
        qcm: [
            {
                text: "On cherche combien de roses le fleuriste a utilisées pour réaliser les 11 bouquets.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut calculer le nombre total de roses en multipliant le nombre de bouquets par le nombre de roses dans chaque bouquet."
            },
            {
                text: "On cherche combien de bouquets le fleuriste a réalisés.",
                correct: false,
                feedback: "Attention, le nombre de bouquets est déjà donné (11 bouquets). La question porte sur le total de roses utilisées, pas sur le nombre de bouquets."
            },
            {
                text: "On cherche combien de roses contiendrait un seul bouquet.",
                correct: false,
                feedback: "Relis bien l'énoncé : le nombre de roses par bouquet est déjà précisé (9 roses). Il faut trouver le total de roses pour les 11 bouquets, pas pour un seul."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 14,
        title: "Problème 14",
        text: "Au restaurant scolaire, les élèves sont répartis sur 8 tables de 6 personnes. Il reste 3 places vides. Combien d'élèves mangent au restaurant scolaire ?",
        words: ["Au", "restaurant", "scolaire,", "les", "élèves", "sont", "répartis", "sur", "8", "tables", "de", "6", "personnes.", "Il", "reste", "3", "places", "vides.", "Combien", "d'élèves", "mangent", "au", "restaurant", "scolaire", "?"],
        qcm: [
            {
                text: "On cherche combien d'élèves mangent au restaurant scolaire.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut calculer le nombre total de places occupées en tenant compte des tables complètes et des places vides."
            },
            {
                text: "On cherche combien de tables il y a au restaurant scolaire.",
                correct: false,
                feedback: "Attention, le nombre de tables est déjà donné (8 tables). La question porte sur le nombre d'élèves présents, pas sur le nombre de tables."
            },
            {
                text: "On cherche combien de places sont vides au restaurant scolaire.",
                correct: false,
                feedback: "Relis bien l'énoncé : le nombre de places vides est déjà précisé (3 places). Il faut déterminer combien d'élèves mangent, pas le nombre de places libres."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 15,
        title: "Problème 15",
        text: "Un cycliste a parcouru 17 tours de 5 km. Quelle distance a-t-il parcourue au total ?",
        words: ["Un", "cycliste", "a", "parcouru", "17", "tours", "de", "5", "km.", "Quelle", "distance", "a-t-il", "parcourue", "au", "total", "?"],
        qcm: [
            {
                text: "On cherche la distance totale parcourue par le cycliste après ses 17 tours.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut calculer la distance totale en multipliant le nombre de tours par la distance d'un tour."
            },
            {
                text: "On cherche combien de tours le cycliste a effectués.",
                correct: false,
                feedback: "Attention, le nombre de tours est déjà donné (17 tours). La question porte sur la distance totale parcourue, pas sur la quantité de tours."
            },
            {
                text: "On cherche combien de kilomètres mesure un tour de piste.",
                correct: false,
                feedback: "Relis bien l'énoncé : la distance d'un tour est déjà précisée (5 km). Il faut calculer la distance totale, pas la longueur d'un tour."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 16,
        title: "Problème 16",
        text: "Madame Aneto achète un vélo électrique qu'elle paie en 5 versements de 450 euros chacun. Combien coûte le vélo électrique de Madame Aneto ?",
        words: ["Madame", "Aneto", "achète", "un", "vélo", "électrique", "qu'elle", "paie", "en", "5", "versements", "de", "450", "euros", "chacun.", "Combien", "coûte", "le", "vélo", "électrique", "de", "Madame", "Aneto", "?"],
        qcm: [
            {
                text: "On cherche le prix total du vélo électrique de Madame Aneto.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut calculer le coût total en multipliant le montant de chaque versement par le nombre de versements."
            },
            {
                text: "On cherche combien Madame Aneto paie pour un seul versement.",
                correct: false,
                feedback: "Attention, le montant d'un versement est déjà donné (450 euros). La question porte sur le coût total du vélo, pas sur un seul versement."
            },
            {
                text: "On cherche combien de versements Madame Aneto devra effectuer si le vélo coûtait 600 euros.",
                correct: false,
                feedback: "Relis bien l'énoncé : le prix du vélo et le nombre de versements sont déjà précisés. Il ne faut pas inventer une nouvelle situation qui change la question initiale."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 17,
        title: "Problème 17",
        text: "Mila a cueilli 124 jonquilles. Sa grande sœur Sofia en a cueilli 4 fois plus. Combien de jonquilles Sofia a-t-elle cueillies ?",
        words: ["Mila", "a", "cueilli", "124", "jonquilles.", "Sa", "grande", "sœur", "Sofia", "en", "a", "cueilli", "4", "fois", "plus.", "Combien", "de", "jonquilles", "Sofia", "a-t-elle", "cueillies", "?"],
        qcm: [
            {
                text: "On cherche combien de jonquilles Sofia a cueillies.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut multiplier le nombre de jonquilles cueillies par Mila par 4 pour obtenir le nombre de jonquilles cueillies par Sofia."
            },
            {
                text: "On cherche combien de jonquilles Mila a cueillies.",
                correct: false,
                feedback: "Attention, le nombre de jonquilles cueillies par Mila est déjà donné (124). La question porte sur le nombre cueilli par Sofia, pas par Mila."
            },
            {
                text: "On cherche combien de jonquilles ont été cueillies au total par Mila et Sofia.",
                correct: false,
                feedback: "Relis bien l'énoncé : le problème demande uniquement le nombre cueilli par Sofia. Additionner les deux quantités change la question initiale."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 18,
        title: "Problème 18",
        text: "Robin a 14 billes. C'est 6 fois moins que son amie Anouk. Combien de billes Anouk a-t-elle ?",
        words: ["Robin", "a", "14", "billes.", "C'est", "6", "fois", "moins", "que", "son", "amie", "Anouk.", "Combien", "de", "billes", "Anouk", "a-t-elle", "?"],
        qcm: [
            {
                text: "On cherche combien de billes Anouk a.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut multiplier le nombre de billes de Robin par 6 pour connaître le nombre de billes d'Anouk."
            },
            {
                text: "On cherche combien de billes Robin a.",
                correct: false,
                feedback: "Attention, le nombre de billes de Robin est déjà donné (14). La question porte sur le nombre de billes d'Anouk, pas sur celles de Robin."
            },
            {
                text: "On cherche combien de billes Anouk a de moins que Robin.",
                correct: false,
                feedback: "Relis bien l'énoncé : Anouk a plus de billes que Robin (6 fois plus). Chercher la différence inverse change complètement la question initiale."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 19,
        title: "Problème 19",
        text: "Victor a 32 mangas. C'est 4 fois plus que son ami Saïd. Combien de mangas Saïd a-t-il ?",
        words: ["Victor", "a", "32", "mangas.", "C'est", "4", "fois", "plus", "que", "son", "ami", "Saïd.", "Combien", "de", "mangas", "Saïd", "a-t-il", "?"],
        qcm: [
            {
                text: "On cherche combien de mangas Saïd a.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut diviser le nombre de mangas de Victor par 4 pour trouver combien de mangas Saïd possède."
            },
            {
                text: "On cherche combien de mangas Victor a.",
                correct: false,
                feedback: "Attention, le nombre de mangas de Victor est déjà donné (32). La question porte sur le nombre de mangas de Saïd, pas sur ceux de Victor."
            },
            {
                text: "On cherche combien de mangas Saïd a de plus que Victor.",
                correct: false,
                feedback: "Relis bien l'énoncé : Victor a 4 fois plus de mangas que Saïd. Chercher combien Saïd a de plus que Victor inverse le sens de la comparaison et ne correspond pas à l'objectif initial."
            }
        ]
    },
    {
        level: 'CE2',
        period: 3,
        number: 20,
        title: "Problème 20",
        text: "Max mesurait 52 cm à la naissance. Aujourd'hui, il est 3 fois plus grand. Quelle est la taille de Max aujourd'hui ?",
        words: ["Max", "mesurait", "52", "cm", "à", "la", "naissance.", "Aujourd'hui,", "il", "est", "3", "fois", "plus", "grand.", "Quelle", "est", "la", "taille", "de", "Max", "aujourd'hui", "?"],
        qcm: [
            {
                text: "On cherche la taille actuelle de Max.",
                correct: true,
                feedback: "Bravo, tu as bien compris le problème : il faut multiplier la taille de Max à la naissance par 3 pour connaître sa taille aujourd'hui."
            },
            {
                text: "On cherche la taille de Max à la naissance.",
                correct: false,
                feedback: "Attention, la taille à la naissance est déjà donnée (52 cm). La question porte sur sa taille actuelle, pas sur celle du début."
            },
            {
                text: "On cherche combien de fois Max a grandi depuis sa naissance.",
                correct: false,
                feedback: "Relis bien l'énoncé : le problème indique qu'il est 3 fois plus grand et demande sa taille aujourd'hui. Ce n'est pas l'objectif ici."
            }
        ]
    }
];

// Variable qui contiendra les problèmes sauvegardés
window.SAVED_PROBLEMS = null;
