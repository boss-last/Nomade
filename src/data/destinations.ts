import { Destination, Booking } from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'mont-blanc',
    title: 'Tour du Mont-Blanc',
    subtitle: 'Randonnée alpine mythique à travers 3 pays',
    country: 'France / Italie / Suisse',
    continent: 'Europe',
    category: 'Montagne',
    price: 1150,
    durationDays: 7,
    rating: 4.9,
    reviewCount: 142,
    difficulty: 'Exigeant',
    bestSeason: 'Juin - Septembre',
    altitude: '4 809 m',
    description: 'Une aventure alpine inoubliable autour du toit de l’Europe occidentale avec passages de cols spectaculaires et nuits en refuges traditionnels.',
    longDescription: 'Le Tour du Mont-Blanc (TMB) est considéré comme l’un des plus beaux treks du monde. Vous traverserez trois pays alpins au cœur de vallées verdoyantes, sous les séracs et glaciers suspendus. Chaque soir, profitez de la convivialité des refuges de montagne et de la gastronomie savoyarde et valdôtaine.',
    highlights: [
      'Passage du Col de la Seigne à la frontière italo-française',
      'Vue panoramique sur les Grandes Jorasses',
      'Nuits en refuges authentiques en demi-pension',
      'Accompagnement par un guide de haute montagne diplômé d’État'
    ],
    included: [
      'Hébergement en refuges et gîtes d’étape (6 nuits)',
      'Tous les repas en pension complète du J1 au J7',
      'Transferts locaux et remontées mécaniques prévues',
      'Transport des bagages allégé entre étapes'
    ],
    itinerary: [
      { day: 1, title: 'Chamonix - Les Contamines', desc: 'Départ de la vallée et montée vers les alpages de Miage.' },
      { day: 2, title: 'Col du Bonhomme - Refuge des Mottets', desc: 'Ascension du col de la Croix du Bonhomme à 2 479m.' },
      { day: 3, title: 'Col de la Seigne - Courmayeur', desc: 'Franchissement de la frontière italienne avec panorama sur le massif.' },
      { day: 4, title: 'Val Ferret - La Fouly (Suisse)', desc: 'Sentier balcon face aux glaciers du Triolet et de Pré de Bar.' },
      { day: 5, title: 'Champex-Lac - Trient', desc: 'Étape bucolique autour du lac alpin puis descente vers le village de Trient.' },
      { day: 6, title: 'Col de Balme - Chamonix', desc: 'Retour grandiose en France avec vue imprenable sur le Mont-Blanc.' },
      { day: 7, title: 'Aiguillette des Posettes & Clôture', desc: 'Dernière traversée aérienne et débriefing à Chamonix.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'fjords-norvege',
    title: 'Fjords & Aurores de Norvège',
    subtitle: 'Navigation côtière et randonnées scandinaves',
    country: 'Norvège',
    continent: 'Europe',
    category: 'Aventure',
    price: 1890,
    durationDays: 8,
    rating: 4.8,
    reviewCount: 98,
    difficulty: 'Modéré',
    bestSeason: 'Mai - Octobre',
    altitude: '1 100 m',
    description: 'Explorez Geirangerfjord et Nærøyfjord en kayak et à pied, entre cascades géantes, falaises plongeantes et nuits en rorbuer traditionnels.',
    longDescription: 'La Norvège offre un spectacle géologique unique au monde. Au départ de Bergen, explorez les fjords classés au patrimoine de l’UNESCO, grimpez au célèbre Preikestolen et naviguez en semi-rigide au ras des eaux cristallines.',
    highlights: [
      'Randonnée matinale au Preikestolen au-dessus du Lysefjord',
      'Croisière silencieuse en bateau électrique dans le Nærøyfjord',
      'Dégustation de saumon sauvage et spécialités nordiques',
      'Safari kayak au pied des chutes des Sept Sœurs'
    ],
    included: [
      '7 nuits en rorbu et hôtels typiques',
      'Guides anglophones et francophones spécialisés',
      'Tous les transports ferroviaires et maritimes intérieurs',
      'Équipement complet de kayak et matériel de sécurité'
    ],
    itinerary: [
      { day: 1, title: 'Arrivée à Bergen', desc: 'Accueil et visite du quartier historique hanséatique de Bryggen.' },
      { day: 2, title: 'Flåm & Train panoramique', desc: 'Trajet mythique en train à crémaillère traversant gorges et cascades.' },
      { day: 3, title: 'Navigation dans le Nærøyfjord', desc: 'Exploration en kayak des bras de mer les plus sauvages.' },
      { day: 4, title: 'Glacier de Nigardsbreen', desc: 'Marche sur glace équipée de crampons sur la langue glaciaire bleue.' },
      { day: 5, title: 'Geiranger & Route des Trolls', desc: 'Lacet spectaculaire et points de vue vertigineux sur la vallée.' },
      { day: 6, title: 'Stavanger & Randonnée Preikestolen', desc: 'Ascension du rocher suspendu à 604m au-dessus des eaux.' },
      { day: 7, title: 'Archipel des îles côtières', desc: 'Journée détente et pêche en mer dans les criques abritées.' },
      { day: 8, title: 'Retour et clôture à Bergen', desc: 'Matinée libre au marché aux poissons et vol retour.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'kyoto-japan',
    title: 'Kyoto & Voie de Nakasendo',
    subtitle: 'Immersion spirituelle, temples zen et auberges ryokan',
    country: 'Japon',
    continent: 'Asie',
    category: 'Culture',
    price: 2450,
    durationDays: 10,
    rating: 4.95,
    reviewCount: 215,
    difficulty: 'Facile',
    bestSeason: 'Mars - Mai & Octobre - Novembre',
    altitude: '450 m',
    description: 'Une plongée intemporelle dans l’ancien Japon des samouraïs, entre jardins de mousses, pavillons dorés, cérémonies du thé et sentiers de la vallée de Kiso.',
    longDescription: 'De la ferveur des sanctuaires de Kyoto aux villages préservés de Magome et Tsumago sur la route historique de Nakasendo, ce voyage propose une communion rare avec l’esthétique et l’art de vivre japonais. Bains onsen thermaux et gastronomie Kaiseki inclus.',
    highlights: [
      'Visite privatisée matinale du sanctuaire Fushimi Inari-taisha',
      'Randonnée historique de 8 km entre les villages de Magome et Tsumago',
      'Nuitée et dîner gastronomique Kaiseki en Ryokan traditionnel',
      'Initiation à la méditation zazen avec un moine bouddhiste'
    ],
    included: [
      '9 nuits en ryokans authentiques et hôtels de charme',
      'Japan Rail Pass 7 jours en première classe',
      'Tous les petits-déjeuners et 5 dîners traditionnels',
      'Guide culturel bilingue permanent'
    ],
    itinerary: [
      { day: 1, title: 'Arrivée à Kyoto', desc: 'Installation et première promenade dans le quartier préservé de Gion.' },
      { day: 2, title: 'Pavillon d’Argent & Chemin de la Philosophie', desc: 'Découverte des temples zen et des jardins secs de pierres.' },
      { day: 3, title: 'Arashiyama & Bambouseraie', desc: 'Croisière en barque traditionnelle sur la rivière Hozu.' },
      { day: 4, title: 'Nara et ses cerfs sacrés', desc: 'Visite du grand Bouddha en bronze du Todai-ji.' },
      { day: 5, title: 'Départ pour la Vallée de Kiso', desc: 'Arrivée dans le village de Magome et nuit en auberge de bois.' },
      { day: 6, title: 'La voie royale de Nakasendo', desc: 'Marche sur les anciens pavés médiévaux menant à Tsumago.' },
      { day: 7, title: 'Matsumoto & son château noir', desc: 'Visite du donjon médiéval et des ateliers de gravure sur bois.' },
      { day: 8, title: 'Mont Fuji & Lac Kawaguchi', desc: 'Vue spectaculaire sur le volcan sacré et détente en onsen.' },
      { day: 9, title: 'Retour à Tokyo & Quartiers anciens', desc: 'Asakusa, sanctuaire Meiji et dîner de clôture.' },
      { day: 10, title: 'Fin du séjour', desc: 'Transfert vers l’aéroport de Narita / Haneda.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'santorin-cyclades',
    title: 'Cyclades : Santorin & Amorgos',
    subtitle: 'Villages blancs, dômes bleus et criques turquoise',
    country: 'Grèce',
    continent: 'Europe',
    category: 'Plage',
    price: 1320,
    durationDays: 6,
    rating: 4.85,
    reviewCount: 167,
    difficulty: 'Facile',
    bestSeason: 'Avril - Novembre',
    altitude: '300 m',
    description: 'Une échappée méditerranéenne entre les falaises volcaniques de la caldeira de Santorin et le monastère suspendu d’Amorgos, décor du film Le Grand Bleu.',
    longDescription: 'Vivez la magie des îles égéennes au rythme doux des traversées en ferry, des baignades dans des eaux cristallines et des couchers de soleil flamboyants sur les villages blanchis à la chaux.',
    highlights: [
      'Randonnée crête entre Fira et Oia dominant la caldeira',
      'Visite du monastère de la Panagia Chozoviotissa taillé dans la roche',
      'Croisière voilier au coucher de soleil avec dîner de mezzés',
      'Dégustation des vins volcaniques Assyrtiko réputés'
    ],
    included: [
      '5 nuits en boutique hôtels de style cycladique',
      'Traversées inter-îles en catamaran rapide',
      'Croisière catamaran semi-privative de 5 heures',
      'Petits déjeuners gourmands aux saveurs helléniques'
    ],
    itinerary: [
      { day: 1, title: 'Arrivée à Santorin & Fira', desc: 'Installation et première flânerie dans les ruelles pavées de Fira.' },
      { day: 2, title: 'Sentier panoramique Fira - Oia', desc: 'Marche de 10 km au bord du gouffre volcanique avec vue à 360°.' },
      { day: 3, title: 'Ferry vers Amorgos l’authentique', desc: 'Navigation vers l’île la plus sauvage et préservée des Cyclades.' },
      { day: 4, title: 'Le monastère d’Amorgos & Criques secrètes', desc: 'Ascension des marches blanches et baignade à Agia Anna.' },
      { day: 5, title: 'Retour Santorin & Croisière caldeira', desc: 'Baignade dans les sources chaudes et barbecue marin au coucher de soleil.' },
      { day: 6, title: 'Clôture et vol retour', desc: 'Dernier café frappé face à la mer et départ.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'desert-sahara',
    title: 'Grande Traversée du Sahara',
    subtitle: 'Bivouacs sous la voie lactée et dunes de Merzouga',
    country: 'Maroc',
    continent: 'Afrique',
    category: 'Aventure',
    price: 890,
    durationDays: 5,
    rating: 4.92,
    reviewCount: 112,
    difficulty: 'Modéré',
    bestSeason: 'Octobre - Avril',
    altitude: '800 m',
    description: 'Une aventure sensorielle au cœur des sables dorés de l’Erg Chebbi avec caravane chamelière, thé à la menthe autour du feu et musiques nomades.',
    longDescription: 'Laissez derrière vous l’agitation citadine pour plonger dans le silence minéral du désert marocain. Franchissez le Haut-Atlas par le col du Tichka, traversez les palmeraies des gorges du Todra et rejoignez votre campement de tentes berbères de luxe.',
    highlights: [
      'Nuit sous les tentes nomades confortables avec literie royale',
      'Méharée à dos de dromadaire au crépuscule sur les dunes crêtes',
      'Observation astronomique guidée du ciel étoilé sans pollution lumineuse',
      'Visite du ksar fortifié d’Aït-Ben-Haddou (classé UNESCO)'
    ],
    included: [
      'Transport privatisé en 4x4 climatisé avec chauffeur-guide',
      '2 nuits en riads traditionnels et 2 nuits en campement nomade de luxe',
      'Pension complète avec tajines et couscous faits maison',
      'Balade chamelière et sandboarding sur les dunes'
    ],
    itinerary: [
      { day: 1, title: 'Marrakech - Ouarzazate - Vallée du Dadès', desc: 'Passage du Tichka et traversée des vergers d’amandiers.' },
      { day: 2, title: 'Gorges du Todra - Dunes de Merzouga', desc: 'Falaises ocres impressionnantes puis arrivée face à l’Erg Chebbi.' },
      { day: 3, title: 'Journée nomade & Oasis secrète', desc: 'Rencontre avec les familles nomades et concert de musique gnawa.' },
      { day: 4, title: 'Merzouga - Vallée du Drâa - Zagora', desc: 'Palmeraie millénaire bordée de kasbahs de terre séchée.' },
      { day: 5, title: 'Aït-Ben-Haddou & retour Marrakech', desc: 'Visite de la cité de pisé décor de chefs-d’œuvre du cinéma.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'patagonie-torres',
    title: 'Trek W en Patagonie',
    subtitle: 'Massifs vertigineux, glaciers suspendus et terres australes',
    country: 'Chili',
    continent: 'Amérique',
    category: 'Montagne',
    price: 2890,
    durationDays: 9,
    rating: 4.96,
    reviewCount: 84,
    difficulty: 'Expert',
    bestSeason: 'Novembre - Mars',
    altitude: '1 200 m',
    description: 'Le circuit le plus spectaculaire d’Amérique du Sud au parc Torres del Paine : les trois tours de granit, la Vallée Française et le glacier Grey.',
    longDescription: 'À la pointe sud du continent américain, la Patagonie dévoile une nature brute et indomptée. Marchez face aux colosses de granit émergeant des forêts d’arbustes lenga et naviguez entre les icebergs flottants aux reflets saphir.',
    highlights: [
      'Lever de soleil flamboyant sur les trois cornes de Torres del Paine',
      'Navigation en zodiac au pied du monstrueux mur de glace du Glacier Grey',
      'Observation de la faune sauvage : guanacos, condors des Andes et flamants roses',
      'Hébergement en éco-dômes et refuges patagoniens'
    ],
    included: [
      '8 nuits en refuges de montagne et dômes confortables',
      'Entrées et permis officiels du Parc National Torres del Paine',
      'Guide bilingue certifié WFR (Wilderness First Responder)',
      'Tous les repas durant le trek et transferts en catamaran'
    ],
    itinerary: [
      { day: 1, title: 'Puerto Natales', desc: 'Briefing d’expédition et vérification du matériel technique.' },
      { day: 2, title: 'Base des Tours', desc: 'Ascension exigeante vers le mirador et le lac glaciaire turquoise.' },
      { day: 3, title: 'Sentier du Lac Nordenskjöld', desc: 'Randonnée le long des eaux laiteuses sous les Cuernos.' },
      { day: 4, title: 'Vallée Française', desc: 'Cirque naturel entouré d’avalanches et de cascades suspendues.' },
      { day: 5, title: 'Glacier Grey', desc: 'Progression le long du champ de glace patagonien sud.' },
      { day: 6, title: 'Kayak sur le lac Grey', desc: 'Slalom entre les icebergs détachés du front de glace.' },
      { day: 7, title: 'Traversée du lac Pehoé', desc: 'Catamaran de retour et transfert vers une estancia traditionnelle.' },
      { day: 8, title: 'Journée gaucho & Asado', desc: 'Barbecue traditionnel de Patagonie et immersion équestre.' },
      { day: 9, title: 'Clôture à Punta Arenas', desc: 'Dernière vue sur le détroit de Magellan et départ.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'bali-ubud-zen',
    title: 'Sérénité balinaise & Rizières',
    subtitle: 'Yoga, cascades secrètes, temples d’eau et massages',
    country: 'Indonésie',
    continent: 'Asie',
    category: 'Détente',
    price: 1080,
    durationDays: 7,
    rating: 4.88,
    reviewCount: 133,
    difficulty: 'Facile',
    bestSeason: 'Mai - Octobre',
    altitude: '600 m',
    description: 'Une parenthèse bien-être ressourçante entre les terrasses de Jatiluwih, les rituels de purification de Tirta Empul et la cuisine ayurvédique.',
    longDescription: 'Rechargez vos énergies sur l’Île des Dieux. Logé dans un éco-resort niché au cœur de la jungle luxuriante d’Ubud, vous profiterez de sessions quotidiennes de yoga, de soins holistiques traditionnels et de promenades calmes au milieu des rizières verdoyantes.',
    highlights: [
      'Rituel ancestral de purification aux sources sacrées de Tirta Empul',
      'Session quotidienne de yoga vinyasa face à la canopée tropicale',
      'Atelier de cuisine balinaise avec visite des marchés d’épices locaux',
      'Balade au lever du soleil sur la crête de Campuhan'
    ],
    included: [
      '6 nuits en villa privée avec piscine dans un resort éco-luxe',
      'Petits déjeuners sains et 3 dîners dégustation bio',
      'Deux massages balinais traditionnels de 90 minutes',
      'Chauffeur privé à disposition pour les excursions culturelles'
    ],
    itinerary: [
      { day: 1, title: 'Bienvenue à Ubud', desc: 'Accueil avec collier de frangipaniers et cocktail de bienvenue aux herbes.' },
      { day: 2, title: 'Rizières de Tegallalang & Balançoire', desc: 'Promenade matinale à l’aube et pause dégustation de café Luwak.' },
      { day: 3, title: 'Temple de l’eau Tirta Empul', desc: 'Bénédiction guidée par un prêtre balinais et purification.' },
      { day: 4, title: 'Cascades cachées de Tibumana', desc: 'Baignade fraîche dans un lagon naturel ceint de fougères géantes.' },
      { day: 5, title: 'Atelier cuisine & Herboristerie Jamu', desc: 'Création de remèdes traditionnels à base de curcuma et gingembre.' },
      { day: 6, title: 'Journée spa holistique & Détente', desc: 'Bain de fleurs fraîches et méditation sonore aux bols tibétains.' },
      { day: 7, title: 'Dernier regard sur les volcans', desc: 'Petit déjeuner face au mont Batur et transfert aéroport Denpasar.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'banff-rocheuses',
    title: 'Lacs Émeraude des Rocheuses',
    subtitle: 'Parc National de Banff et Vallée des Dix Pics',
    country: 'Canada',
    continent: 'Amérique',
    category: 'Montagne',
    price: 2150,
    durationDays: 8,
    rating: 4.93,
    reviewCount: 92,
    difficulty: 'Modéré',
    bestSeason: 'Juin - Octobre',
    altitude: '1 600 m',
    description: 'Randonnées inoubliables autour du lac Moraine et du lac Louise, au pied des glaciers géants et des forêts d’épinettes boréales de l’Alberta.',
    longDescription: 'Les Rocheuses canadiennes constituent l’un des sanctuaires naturels les plus grandioses d’Amérique du Nord. Parcourez la promenade des Glaciers (Icefields Parkway), canotez sur des eaux turquoise irréelles et observez les wapitis et mouflons d’Amérique dans leur habitat préservé.',
    highlights: [
      'Canoë rouge traditionnel sur le célèbre Lac Moraine',
      'Randonnée de la Plaine des Six Glaciers avec pause thé dans un chalet rustique',
      'Traversée panoramique de la Icefields Parkway jusqu’au lac Peyto',
      'Bains chauds thermaux de Banff Upper Hot Springs'
    ],
    included: [
      '7 nuits en chalets en rondins de bois et lodges alpins',
      'Pass officiel Parcs Canada pour toute la durée du séjour',
      'Location de canoë et gilets de sauvetage au lac Moraine',
      'Véhicule SUV tout confort et essence inclus'
    ],
    itinerary: [
      { day: 1, title: 'Arrivée à Calgary & Route vers Banff', desc: 'Prise en main du véhicule et installation dans le village alpin.' },
      { day: 2, title: 'Lac Louise & Chalet du Thé', desc: 'Randonnée jusqu’au tea house historique face au glacier Victoria.' },
      { day: 3, title: 'Lever de soleil au Lac Moraine', desc: 'Spectacle féerique de la lumière matinale sur les Dix Pics de granit.' },
      { day: 4, title: 'Icefields Parkway & Champ de glace Columbia', desc: 'Route panoramique mondiale et marche sur la passerelle vitrée.' },
      { day: 5, title: 'Canyon Johnston & Chutes d’eau', desc: 'Sentier sur passerelles suspendues à flanc de falaise calcaire.' },
      { day: 6, title: 'Parc National de Yoho & Lac Emerald', desc: 'Forêt ancienne et pont naturel de roche taillé par les flots.' },
      { day: 7, title: 'Mont Sulphur & Sources thermales', desc: 'Téléphérique offrant un panorama sur six chaînes de montagnes.' },
      { day: 8, title: 'Retour vers Calgary', desc: 'Derniers achats souvenirs et départ.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'res-101',
    destinationId: 'mont-blanc',
    destinationTitle: 'Tour du Mont-Blanc',
    destinationCountry: 'France / Italie / Suisse',
    destinationImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    fullName: 'Alexandre Mercier',
    email: 'alex.mercier@example.com',
    phone: '+33 6 12 34 56 78',
    travelersCount: 2,
    departureDate: '2026-07-15',
    experienceLevel: 'Intermédiaire',
    hasInsurance: true,
    specialRequests: 'Régime végétarien pour un des deux participants.',
    totalPrice: 2300,
    status: 'Confirmée',
    createdAt: '2026-03-10'
  },
  {
    id: 'res-102',
    destinationId: 'kyoto-japan',
    destinationTitle: 'Kyoto & Voie de Nakasendo',
    destinationCountry: 'Japon',
    destinationImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    fullName: 'Sophie Chen',
    email: 'sophie.chen@example.com',
    phone: '+33 7 98 76 54 32',
    travelersCount: 1,
    departureDate: '2026-10-04',
    experienceLevel: 'Débutant',
    hasInsurance: true,
    specialRequests: 'Chambre avec futon traditionnel au calme.',
    totalPrice: 2450,
    status: 'Confirmée',
    createdAt: '2026-03-18'
  }
];
