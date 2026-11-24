(function () {
  "use strict";

  const REGION_COLORS = {
    "Hokkaido/Tohoku": "#3D6B8E",
    Kanto: "#2D4E7E",
    "Chubu/Hokuriku": "#3A6D5C",
    Kansai: "#9B4747",
    Chugoku: "#2E7572",
    Shikoku: "#B57D2B",
    "Kyushu/Okinawa": "#C15A42",
  };

  const PREFECTURES = [
    {
      id: "JP-01",
      name: "Hokkaido",
      ja: "北海道",
      region: "Hokkaido/Tohoku",
      catchphrase: "Northern Powder Snow, Volcanic Lakes, and Sea-to-Table Abundance",
      cities: ["Sapporo", "Hakodate", "Otaru", "Furano", "Biei"],
      spots: ["Otaru Canal & Glassworks", "Mount Hakodate Night Panorama", "Shiretoko Peninsula (UNESCO)", "Biei Blue Pond & Flower Hills"],
      foods: ["Miso Ramen", "Soup Curry", "Fresh Uni & Ikura Kaisendon", "Genghis Khan Lamb Grill"],
      foodCat: "seafood",
      cafes: ["Morihiko Coffee (Sapporo)", "Rokkatei Tea Salon (Sapporo)", "Kitakaro Cafe (Otaru)"],
      culture: "Indigenous Ainu heritage at Upopoy, frontier brick architecture, and world-renowned winter powder snow.",
      event: { title: "Sapporo Snow Festival", month: "February", season: "winter", desc: "Monumental illuminated snow and ice sculptures spanning Odori Park and Susukino." },
      hiddenGem: "Lake Mashu mist overlooks & Rishiri Island coastal trails.",
      scenic: "Mount Hakodate summit twilight view over twin-harbor city lights."
    },
    {
      id: "JP-02",
      name: "Aomori",
      ja: "青森県",
      region: "Hokkaido/Tohoku",
      catchphrase: "Ancient Beech Forests, Orchard Valleys, and Summer Warrior Floats",
      cities: ["Aomori", "Hirosaki", "Towada", "Hachinohe"],
      spots: ["Hirosaki Castle & Cherry Moat", "Oirase Gorge & Lake Towada", "Shirakami-Sanchi Beech Forest (UNESCO)"],
      foods: ["Aomori Apple Pie", "Nokke-don Market Sashimi Bowl", "Tsugaru Niboshi Ramen"],
      foodCat: "seafood",
      cafes: ["Taisho Roman Tea Room (Hirosaki)", "A-Factory Cider Lounge (Aomori)"],
      culture: "Tsugaru-jamisen shamisen music, Kogin-zashi embroidery, and Jomon archaeological sites.",
      event: { title: "Aomori Nebuta Matsuri", month: "August", season: "summer", desc: "Towering illuminated warrior lantern floats paraded with taiko drums and Haneto dancers." },
      hiddenGem: "Hotokegaura sea-carved rock cliffs on Shimokita Peninsula.",
      scenic: "Hirosaki Castle moat carpeted in pink sakura petals in late April."
    },
    {
      id: "JP-03",
      name: "Iwate",
      ja: "岩手県",
      region: "Hokkaido/Tohoku",
      catchphrase: "Mythical Folklore, Golden Temples, and the Rugged Sanriku Coast",
      cities: ["Morioka", "Hiraizumi", "Hanamaki", "Miyako"],
      spots: ["Chuson-ji Golden Hall (UNESCO)", "Geibikei Gorge Boat Ride", "Jodogahama Beach"],
      foods: ["Morioka Wanko Soba", "Morioka Reimen", "Jajamen Noodles"],
      foodCat: "noodles",
      cafes: ["Kogensha Coffee (Morioka)", "Fukai Kissaten (Morioka)"],
      culture: "Tono folklore legends of kappa and zashiki-warashi, plus Nambu ironware craftsmanship.",
      event: { title: "Morioka Sansa Odori", month: "August", season: "summer", desc: "World-record scale taiko drum parade with thousands of dancers." },
      hiddenGem: "Ryusendo Limestone Cave's crystal-clear underground blue lakes.",
      scenic: "Jodogahama's white rhyolite spires against calm Pacific coves."
    },
    {
      id: "JP-04",
      name: "Miyagi",
      ja: "宮城県",
      region: "Hokkaido/Tohoku",
      catchphrase: "City of Trees, Pine-Studded Bays, and Charcoal-Grilled Gyutan",
      cities: ["Sendai", "Matsushima", "Ishinomaki", "Zao"],
      spots: ["Matsushima Bay 260 Pine Islands", "Zuihoden Mausoleum", "Zao Okama Crater Lake"],
      foods: ["Sendai Charcoal Gyutan (Beef Tongue)", "Zunda Edamame Mochi", "Kaki Oyster Hotpot"],
      foodCat: "meat",
      cafes: ["Cafe Mozart Atelier (Sendai)", "Kanrantei Matcha Tea House (Matsushima)"],
      culture: "Date Masamune's samurai legacy and Tanabata paper streamer artistry.",
      event: { title: "Sendai Tanabata Matsuri", month: "August", season: "summer", desc: "Thousands of handcrafted colorful washi paper streamers filling downtown arcades." },
      hiddenGem: "Tashirojima (Cat Island) & Naruko Gorge autumn maples.",
      scenic: "Saigyo Modoshi no Matsu Park sunrise over Matsushima Bay."
    },
    {
      id: "JP-05",
      name: "Akita",
      ja: "秋田県",
      region: "Hokkaido/Tohoku",
      catchphrase: "Samurai Towns, Secluded Mountain Hot Springs, and Towering Lantern Poles",
      cities: ["Akita", "Kakunodate", "Nyuto Onsen", "Oga"],
      spots: ["Kakunodate Samurai District", "Nyuto Onsenkyo Rustic Baths", "Lake Tazawa"],
      foods: ["Kiritanpo Nabe Hotpot", "Inaniwa Udon", "Hinai-jidori Chicken Oyakodon"],
      foodCat: "noodles",
      cafes: ["Sato Yosuke Cafe (Inaniwa)", "Nagaya Coffee (Akita)"],
      culture: "Namahage winter folklore on Oga Peninsula and Kabazaiku cherry-bark woodwork.",
      event: { title: "Akita Kanto Matsuri", month: "August", season: "summer", desc: "Performers balance 12-meter bamboo poles hung with 46 glowing lanterns on foreheads and hips." },
      hiddenGem: "Tsurunoyu Onsen milky-white outdoor wooden bath in snow.",
      scenic: "Lake Tazawa's deep cobalt waters framed by Akita-Komagatake."
    },
    {
      id: "JP-06",
      name: "Yamagata",
      ja: "山形県",
      region: "Hokkaido/Tohoku",
      catchphrase: "Gaslit Hot Spring Alleys, Clifftop Mountain Temples, and Cherry Orchards",
      cities: ["Yamagata", "Ginzan Onsen", "Tsuruoka", "Yonezawa"],
      spots: ["Ginzan Onsen Gaslit Ryokan Street", "Yamadera Clifftop Temple", "Mount Haguro Cedar Stairway"],
      foods: ["Yonezawa Wagyu Beef", "Imoni Taro & Beef Stew", "Hiyashi Cold Ramen"],
      foodCat: "meat",
      cafes: ["Izu no Hana Cafe (Ginzan Onsen)", "Mt. Haguro Five-Story Pagoda Tea Hut"],
      culture: "Dewa Sanzan mountain asceticism (Shugendo) and Shogi wooden chess piece carving in Tendo.",
      event: { title: "Yamagata Hanagasa Matsuri", month: "August", season: "summer", desc: "Over 10,000 dancers spinning safflower-adorned straw hats in unison." },
      hiddenGem: "Maruike-sama emerald spring pond in Yuza.",
      scenic: "Twilight snow falling over Ginzan Onsen's wooden bridges."
    },
    {
      id: "JP-07",
      name: "Fukushima",
      ja: "福島県",
      region: "Hokkaido/Tohoku",
      catchphrase: "Thatched Post Towns, Volcanic Emerald Lakes, and Resilient Samurai Spirit",
      cities: ["Aizuwakamatsu", "Ouchijuku", "Kitakata", "Iwaki"],
      spots: ["Ouchijuku Edo Thatched Village", "Tsuruga Castle (Aizu)", "Goshikinuma Five-Colored Ponds"],
      foods: ["Kitakata Soy Ramen", "Negi-soba eaten with a Leek", "Sauce Katsudon"],
      foodCat: "noodles",
      cafes: ["Misawaya Tea House (Ouchijuku)", "Tsuruga Castle Rinkaku Tea Pavilion"],
      culture: "Aizu samurai code, Akabeko red papier-mache cows, and lacquerware.",
      event: { title: "Aizu Matsuri Samurai Procession", month: "September", season: "autumn", desc: "500 armored samurai march through Aizuwakamatsu." },
      hiddenGem: "Tadami Line railway bridge emerging through river mist.",
      scenic: "Bishamon-numa turquoise waters reflecting Mount Bandai."
    },
    {
      id: "JP-08",
      name: "Ibaraki",
      ja: "茨城県",
      region: "Kanto",
      catchphrase: "Coastal Flower Hills, Classic Landscape Gardens, and Pacific Sunrise Torii",
      cities: ["Mito", "Hitachinaka", "Tsukuba", "Oarai"],
      spots: ["Hitachi Seaside Park Nemophila & Kochia", "Kairakuen Plum Garden", "Oarai Isosaki Kamiiso-no-Torii"],
      foods: ["Anko Monkfish Hotpot", "Mito Natto Specialties", "Hitachi Wagyu"],
      foodCat: "seafood",
      cafes: ["Saza Coffee Main Store (Hitachinaka)", "Kobuntei Garden Tea Room (Mito)"],
      culture: "Kasama pottery kilns and Mito Tokugawa scholarly heritage.",
      event: { title: "Mito Plum Blossom Festival", month: "February–March", season: "spring", desc: "Over 3,000 plum trees across 100 varieties blooming in Kairakuen." },
      hiddenGem: "Fukuroda Falls frozen ice cascade in winter.",
      scenic: "Pacific waves crashing around Kamiiso-no-Torii at dawn."
    },
    {
      id: "JP-09",
      name: "Tochigi",
      ja: "栃木県",
      region: "Kanto",
      catchphrase: "Gilded UNESCO Shrines, Wisteria Tunnels, and Crispy Utsunomiya Gyoza",
      cities: ["Nikko", "Utsunomiya", "Ashikaga", "Mashiko"],
      spots: ["Nikko Toshogu Shrine (UNESCO)", "Kegon Falls & Lake Chuzenji", "Ashikaga Flower Park Wisteria"],
      foods: ["Utsunomiya Pan-Fried Gyoza", "Nikko Yuba (Tofu Skin) Kaiseki", "Tochiotome Strawberries"],
      foodCat: "street",
      cafes: ["Nikko Coffee Goyotei-dori", "Mashiko Starnet Cafe"],
      culture: "Edo master woodcarving (Sleeping Cat & Three Wise Monkeys) and Mashiko folk pottery.",
      event: { title: "Nikko Toshogu Grand Autumn Festival", month: "October", season: "autumn", desc: "Procession of 1,000 samurai archers and armor bearers." },
      hiddenGem: "Oya History Museum cavernous underground stone quarry.",
      scenic: "Shinkyo Sacred Vermilion Bridge framed by autumn maples."
    },
    {
      id: "JP-10",
      name: "Gunma",
      ja: "群馬県",
      region: "Kanto",
      catchphrase: "Steaming Yubatake Hot Springs, Daruma Crafts, and Silk Mill Heritage",
      cities: ["Kusatsu", "Ikaho", "Takasaki", "Tomioka"],
      spots: ["Kusatsu Onsen Yubatake Steam Field", "Ikaho 365 Stone Steps", "Tomioka Silk Mill (UNESCO)"],
      foods: ["Mizusawa Udon", "Yakimanju Sweet Miso Buns", "Takasaki Pasta"],
      foodCat: "noodles",
      cafes: ["Chazen Ichigo Tea House (Kusatsu)", "Ikaho Stone-Step Kissaten"],
      culture: "Takasaki Daruma wishing dolls and mountain hot spring bathing traditions.",
      event: { title: "Kusatsu Onsen Yubatake Candlelight", month: "Winter / Year-round", season: "winter", desc: "Thousands of glass candles glowing through mineral steam." },
      hiddenGem: "Shima Onsen cobalt-blue river waters and historic wooden ryokan.",
      scenic: "Oze National Park wooden boardwalks across alpine marshland."
    },
    {
      id: "JP-11",
      name: "Saitama",
      ja: "埼玉県",
      region: "Kanto",
      catchphrase: "Edo Warehouse Streets, Bonsai Villages, and Chichibu Mountain Floats",
      cities: ["Kawagoe", "Omiya", "Chichibu", "Tokorozawa"],
      spots: ["Kawagoe Kurazukuri Clay Warehouses", "Omiya Bonsai Art Museum", "Nagatoro River Gorge"],
      foods: ["Kawagoe Sweet Potato Sweets", "Unagi Grilled Eel", "Waraji Katsudon"],
      foodCat: "sweets",
      cafes: ["Starbucks Kawagoe Kanetsuki-dori (Timber)", "Kasaya Kissaten (Kawagoe)"],
      culture: "Little Edo merchant preservation and centuries-old bonsai cultivation.",
      event: { title: "Chichibu Night Festival", month: "December", season: "winter", desc: "Ornate lantern floats and winter fireworks in the Chichibu mountains." },
      hiddenGem: "Mitsumine Shrine wolf-guardian cedar forest in Okuchichibu.",
      scenic: "Toki no Kane Bell Tower at dusk in Kawagoe."
    },
    {
      id: "JP-12",
      name: "Chiba",
      ja: "千葉県",
      region: "Kanto",
      catchphrase: "Pacific Coastlines, Edo Canal Towns, and Tokyo-Bay Gateways",
      cities: ["Narita", "Sawara", "Kamogawa", "Choshi"],
      spots: ["Naritasan Shinsho-ji Temple", "Sawara Historic Canal District", "Nokogiriyama Cliff Buddha"],
      foods: ["Namerou Miso-Minced Horse Mackerel", "Choshi Fresh Tuna & Sardines", "Chiba Peanuts"],
      foodCat: "seafood",
      cafes: ["Waro-an Canal Cafe (Sawara)", "Narita Omotesando Matcha House"],
      culture: "Traditional soy sauce brewing and Edo river-merchant architecture.",
      event: { title: "Sawara Grand Festival", month: "July & October", season: "autumn", desc: "Giant wooden floats topped with 4-meter historical figures." },
      hiddenGem: "Nomizo Waterfall heart-shaped morning light reflection.",
      scenic: "Mount Nokogiri's Hell's Peek cliff overlooking Tokyo Bay."
    },
    {
      id: "JP-13",
      name: "Tokyo",
      ja: "東京都",
      region: "Kanto",
      catchphrase: "Edo-Rooted Neighborhoods, Modern Architecture, and Street-Level Craft",
      cities: ["Asakusa", "Shibuya", "Shinjuku", "Ueno", "Yanaka"],
      spots: ["Senso-ji Temple & Kaminarimon", "Meiji Jingu Forest Shrine", "Shinjuku Gyoen & Shibuya Sky"],
      foods: ["Edomae Nigiri Sushi", "Monjayaki (Tsukishima)", "Tokyo Shoyu Ramen & Tempura"],
      foodCat: "seafood",
      cafes: ["Kayaba Coffee (Yanaka)", "Cafe de l'Ambre (Ginza)", "Fuglen Tokyo (Yoyogi)"],
      culture: "Kabuki theatre, Edo Kiriko cut glass, and seamless harmony between quiet shrine precincts and neon avenues.",
      event: { title: "Sanja Matsuri (Asakusa)", month: "May", season: "spring", desc: "Over 100 portable mikoshi shrines carried through Asakusa's historic streets." },
      hiddenGem: "Yanaka Ginza retro alleys & Todoroki Ravine bamboo stream.",
      scenic: "Tokyo Tower & Mount Fuji silhouette from Shibuya Sky at sunset."
    },
    {
      id: "JP-14",
      name: "Kanagawa",
      ja: "神奈川県",
      region: "Kanto",
      catchphrase: "Samurai Capitals, Red-Brick Ports, and Steaming Hakone Calderas",
      cities: ["Kamakura", "Yokohama", "Hakone", "Enoshima"],
      spots: ["Great Buddha of Kamakura & Hase-dera", "Hakone Open-Air Museum & Lake Ashi", "Yokohama Minato Mirai & Chinatown"],
      foods: ["Yokohama Chinatown Dim Sum", "Shirasu Whitebait Bowl (Enoshima)", "Hakone Black Volcanic Eggs"],
      foodCat: "street",
      cafes: ["Hokoku-ji Bamboo Garden Matcha (Kamakura)", "Bashamichi Jubankan (Yokohama)"],
      culture: "12th-century Kamakura Shogunate Zen temples and Yosegi-zaiku wood marquetry.",
      event: { title: "Kamakura Matsuri & Yabusame", month: "April", season: "spring", desc: "Mounted samurai horseback archery at Tsurugaoka Hachimangu." },
      hiddenGem: "Jogashima Island sea cliffs & lighthouse trails on Miura Peninsula.",
      scenic: "Lake Ashi vermilion torii framing Mount Fuji on clear mornings."
    },
    {
      id: "JP-15",
      name: "Niigata",
      ja: "新潟県",
      region: "Chubu/Hokuriku",
      catchphrase: "Snow-Country Rice Terraces, UNESCO Sado Gold Mines, and Craft Sake",
      cities: ["Niigata", "Sado Island", "Echigo-Yuzawa", "Tokamachi"],
      spots: ["Sado Island Gold Mines (UNESCO)", "Kiyotsu Gorge Light Tunnel", "Hoshitoge Rice Terraces"],
      foods: ["Koshihikari Rice & Bakudan Onigiri", "Hegi-soba Seaweed Noodles", "Tare Katsudon"],
      foodCat: "noodles",
      cafes: ["Ponshukan Sake & Rice Tasting (Niigata)", "Kiyotsu Gorge Entrance Cafe"],
      culture: "Over 80 sake breweries, Sado Ondeko demon drumming, and Echigo-Tsumari Art Triennale.",
      event: { title: "Nagaoka Festival Grand Fireworks", month: "August", season: "summer", desc: "One of Japan's three great fireworks displays featuring the 2km Phoenix shell." },
      hiddenGem: "Tub-boat (taraibune) rides in Sado's Ogi cove.",
      scenic: "Morning mist drifting across flooded Hoshitoge rice terraces."
    },
    {
      id: "JP-16",
      name: "Toyama",
      ja: "富山県",
      region: "Chubu/Hokuriku",
      catchphrase: "Towering Tateyama Snow Walls, UNESCO Gokayama Villages, and Firefly Squid Bays",
      cities: ["Toyama", "Tateyama", "Gokayama", "Takaoka"],
      spots: ["Tateyama Kurobe Alpine Route Snow Wall", "Gokayama Gassho-zukuri (UNESCO)", "Kurobe Gorge Scenic Railway"],
      foods: ["Toyama Bay White Shrimp & Firefly Squid", "Toyama Black Ramen", "Masuzushi Trout Sushi"],
      foodCat: "seafood",
      cafes: ["Fugan Canal Kansui Park Cafe (Toyama)", "Gokayama Ainokura Hearth Tea"],
      culture: "Takaoka bronze casting and Etchu washi papermaking.",
      event: { title: "Owara Kaze-no-Bon", month: "September", season: "autumn", desc: "Lantern-lit streets in Yatsuo with graceful silent dances in braided hats." },
      hiddenGem: "Amaharashi Coast pine rock framing snow-capped Tateyama peaks across the sea.",
      scenic: "20-meter-high Yuki-no-Otani snow corridor in April–May."
    },
    {
      id: "JP-17",
      name: "Ishikawa",
      ja: "石川県",
      region: "Chubu/Hokuriku",
      catchphrase: "Gold-Leaf Samurai Gardens, Contemporary Art, and Sea of Japan Crab",
      cities: ["Kanazawa", "Wajima", "Kaga Onsen"],
      spots: ["Kenrokuen Landscape Garden", "Higashi Chaya Geisha District", "21st Century Museum of Contemporary Art"],
      foods: ["Kano Crab & Nodoguro Blackthroat Seaperch", "Gold-Leaf Soft Serve", "Kanazawa Oden"],
      foodCat: "seafood",
      cafes: ["Shima Geisha House Tea Room (Kanazawa)", "Kenrokuen Uchihashi-tei"],
      culture: "99% of Japan's gold leaf production, Kutani porcelain, and Kaga Yuzen silk dyeing.",
      event: { title: "Kanazawa Hyakumangoku Matsuri", month: "June", season: "summer", desc: "Grand feudal lord procession and Kaga Yuzen lanterns floating on Asano River." },
      hiddenGem: "Myoryu-ji (Ninja Temple) hidden trapdoors and secret staircases.",
      scenic: "Kenrokuen's Kotojitoro lantern reflected in Kasumigaike Pond."
    },
    {
      id: "JP-18",
      name: "Fukui",
      ja: "福井県",
      region: "Chubu/Hokuriku",
      catchphrase: "Zen Mountain Monasteries, Dinosaur Fossils, and Basalt Sea Cliffs",
      cities: ["Fukui", "Eiheiji", "Katsuyama", "Sakai"],
      spots: ["Eiheiji Soto Zen Monastery", "Fukui Prefectural Dinosaur Museum", "Tojinbo Basalt Sea Cliffs"],
      foods: ["Echizen Oroshi Grated-Radish Soba", "Echizen Crab", "Sauce Katsudon"],
      foodCat: "noodles",
      cafes: ["Eiheiji Gate Sesame Tofu Cafe", "Tojinbo Cliff Sunset Coffee"],
      culture: "Dogen Zenji's 13th-century Zen training tradition and Echizen lacquerware & knives.",
      event: { title: "Mikuni Matsuri", month: "May", season: "spring", desc: "Giant 6-meter warrior floats parading through historic port alleys." },
      hiddenGem: "Heisenji Hakusan Shrine's emerald moss carpet.",
      scenic: "Sunset over the columnar basalt cliffs of Tojinbo."
    },
    {
      id: "JP-19",
      name: "Yamanashi",
      ja: "山梨県",
      region: "Chubu/Hokuriku",
      catchphrase: "Mirror Lakes Beneath Mount Fuji, Vineyard Valleys, and Flat Hoto Noodles",
      cities: ["Fujiyoshida", "Kawaguchiko", "Kofu", "Katsunuma"],
      spots: ["Chureito Pagoda & Mount Fuji", "Lake Kawaguchiko & Oshino Hakkai", "Shosenkyo Gorge"],
      foods: ["Hoto Pumpkin Miso Flat Noodles", "Koshu Wine & Kyoho Grapes", "Yoshida Udon"],
      foodCat: "noodles",
      cafes: ["Oishi Park Fuji View Cafe (Kawaguchiko)", "Katsunuma Winery Terrace"],
      culture: "Japan's birthplace of domestic winemaking and Fujisan pilgrimage heritage.",
      event: { title: "Yoshida Fire Festival", month: "August", season: "summer", desc: "70-plus giant 3-meter torches lit down Fujiyoshida's main street to close climbing season." },
      hiddenGem: "Saiko Iyashi-no-Sato Nemba thatched village under Mount Fuji.",
      scenic: "Sakura blossoms framing Chureito Pagoda and snow-crowned Mount Fuji."
    },
    {
      id: "JP-20",
      name: "Nagano",
      ja: "長野県",
      region: "Chubu/Hokuriku",
      catchphrase: "Original Black Castles, Steaming Snow Monkeys, and Samurai Post Trails",
      cities: ["Matsumoto", "Nagano", "Yamanouchi", "Kiso Valley"],
      spots: ["Matsumoto Castle (Original Keep)", "Jigokudani Snow Monkey Park", "Nakasendo Trail (Narai-juku & Tsumago)"],
      foods: ["Shinshu Hand-Cut Soba", "Oyaki Stuffed Dumplings", "Shinshu Apple & Miso"],
      foodCat: "noodles",
      cafes: ["Matsumoto Folkcraft Kissaten Marumo", "Narai-juku Edo Post Tea House"],
      culture: "Edo-period Nakasendo mountain highway preservation and Zenko-ji Temple pilgrimage.",
      event: { title: "Suwa Taisha Onbashira Festival", month: "April–May (Every 6 yrs)", season: "spring", desc: "Sacred giant fir logs ridden down steep mountain slopes." },
      hiddenGem: "Kamikochi alpine valley's crystal-clear Azusa River & Kappa Bridge.",
      scenic: "Matsumoto Castle's black-and-white keep mirrored in its moat against the Northern Alps."
    },
    {
      id: "JP-21",
      name: "Gifu",
      ja: "岐阜県",
      region: "Chubu/Hokuriku",
      catchphrase: "Thatched Alpine Villages, Edo Merchant Streets, and Sizzling Hida Beef",
      cities: ["Takayama", "Shirakawa-go", "Gifu", "Gujo Hachiman"],
      spots: ["Shirakawa-go Gassho-zukuri (UNESCO)", "Hida Takayama Sanmachi Old Town", "Gujo Hachiman Castle & Canals"],
      foods: ["Hida Wagyu Nigiri & Hoba Miso Grill", "Takayama Ramen", "Gohei-mochi"],
      foodCat: "meat",
      cafes: ["Tensho-ji Machiya Cafe (Takayama)", "Wada House Hearth Tea (Shirakawa-go)"],
      culture: "Hida master carpentry, Mino washi paper lanterns, and Seki swordsmithing.",
      event: { title: "Takayama Matsuri (Spring & Autumn)", month: "April & October", season: "spring", desc: "Intricately gilded yatai floats with mechanical marionette performances." },
      hiddenGem: "Monet's Pond (Nameless Pond) in Seki with koi swimming over water lilies.",
      scenic: "Shirakawa-go winter night illumination under deep snow."
    },
    {
      id: "JP-22",
      name: "Shizuoka",
      ja: "静岡県",
      region: "Chubu/Hokuriku",
      catchphrase: "Mount Fuji Horizons, Coastal Tea Terraces, and Hot Spring Peninsulas",
      cities: ["Shizuoka", "Atami", "Izu Peninsula", "Hamamatsu"],
      spots: ["Miho no Matsubara Pine Grove (UNESCO)", "Obuchi Sasaba Green Tea Fields", "Jogasaki Coast Suspension Bridge"],
      foods: ["Shizuoka Matcha & Sencha", "Hamamatsu Gyoza", "Suruga Bay Sakura Shrimp & Unagi"],
      foodCat: "sweets",
      cafes: ["Chagama Tea Roastery (Shizuoka)", "Izu Omuroyama Crater Cafe"],
      culture: "Japan's #1 green tea region and Izu coastal hot spring literary retreats.",
      event: { title: "Hamamatsu Kite Festival", month: "May", season: "spring", desc: "Over 100 giant neighborhood kites flown on Nakatajima Sand Dunes." },
      hiddenGem: "Sumatakyo Gorge's milky-emerald 'Bridge of Dreams' suspension walkway.",
      scenic: "Green tea rows sweeping up toward Mount Fuji at Obuchi Sasaba."
    },
    {
      id: "JP-23",
      name: "Aichi",
      ja: "愛知県",
      region: "Chubu/Hokuriku",
      catchphrase: "Original Castle Keeps, Industrial Heritage, and Hatcho-Miso Comfort Food",
      cities: ["Nagoya", "Inuyama", "Tokoname", "Okazaki"],
      spots: ["Inuyama Castle (Original 1537 Keep)", "Nagoya Castle Hommaru Palace", "Tokoname Pottery Footpath"],
      foods: ["Hitsumabushi Grilled Eel", "Miso Katsu & Tebasaki Wings", "Nagoya Kissaten Morning Toast"],
      foodCat: "meat",
      cafes: ["Konparu Kissaten (Nagoya)", "Kakozan Tea Salon (Nagoya)"],
      culture: "Home of three unifiers (Nobunaga, Hideyoshi, Ieyasu), Seto ceramics, and Nagoya's famous morning cafe culture.",
      event: { title: "Inuyama Festival", month: "April", season: "spring", desc: "13 three-tiered floats adorned with 365 lanterns parading beneath cherry trees." },
      hiddenGem: "Korankei Gorge's 4,000 maple trees reflected in the Tomoe River.",
      scenic: "Inuyama Castle perched high above the Kiso River."
    },
    {
      id: "JP-24",
      name: "Mie",
      ja: "三重県",
      region: "Kansai",
      catchphrase: "Japan's Most Sacred Shinto Shrine, Ama Pearl Divers, and Ninja Citadels",
      cities: ["Ise", "Toba", "Iga", "Kumano"],
      spots: ["Ise Jingu (Naiku & Geku) & Okage Yokocho", "Meoto Iwa Wedded Rocks", "Iga-ryu Ninja Museum"],
      foods: ["Matsusaka Wagyu Beef", "Ise Udon", "Akafuku Mochi & Ise Lobster"],
      foodCat: "meat",
      cafes: ["Akafuku Main Tea House (Ise)", "Isuzugawa Cafe (Ise)"],
      culture: "2,000-year-old Shikinen Sengu shrine rebuilding tradition and Ama female freedivers.",
      event: { title: "Ise Jingu Kagura Sacred Dance", month: "Spring & Autumn", season: "spring", desc: "Classical court music and dance performed in ancient shrine pavilions." },
      hiddenGem: "Maruyama Senmaida 1,340 terraced rice paddies in Kumano.",
      scenic: "Sunrise between the sacred rope-bound rocks of Meoto Iwa."
    },
    {
      id: "JP-25",
      name: "Shiga",
      ja: "滋賀県",
      region: "Kansai",
      catchphrase: "Japan's Largest Ancient Lake, Original Samurai Keeps, and Shigaraki Kilns",
      cities: ["Otsu", "Hikone", "Omihachiman", "Shigaraki"],
      spots: ["Hikone Castle (National Treasure)", "Shirahige Shrine Floating Torii", "Omihachiman Edo Canals"],
      foods: ["Omi Wagyu Beef", "Funazushi Fermented Sushi", "Club Harie Baumkuchen"],
      foodCat: "meat",
      cafes: ["La Collina Omihachiman Grass-Roof Cafe", "Genkyu-en Garden Tea House (Hikone)"],
      culture: "Enryaku-ji on Mount Hiei and Shigaraki tanuki ceramic kilns.",
      event: { title: "Otsu Matsuri", month: "October", season: "autumn", desc: "13 karakuri mechanical floats parading through historic Otsu." },
      hiddenGem: "Miho Museum's mountain tunnel and glass bridge designed by I.M. Pei.",
      scenic: "Shirahige Shrine's vermilion torii standing in Lake Biwa at sunrise."
    },
    {
      id: "JP-26",
      name: "Kyoto",
      ja: "京都府",
      region: "Kansai",
      catchphrase: "Imperial Temple Gardens, Living Artisan Guilds, and Mountain-Basin Seasons",
      cities: ["Kyoto", "Uji", "Arashiyama", "Ine"],
      spots: ["Fushimi Inari Thousand Torii", "Kiyomizu-dera & Higashiyama", "Arashiyama Bamboo Grove & Tenryu-ji"],
      foods: ["Uji Matcha & Kaiseki Cuisine", "Yudofu Boiled Tofu", "Kyoto Obanzai & Nishiki Street Bites"],
      foodCat: "sweets",
      cafes: ["Smart Coffee (Teramachi)", "Nakamura Tokichi Main Store (Uji)", "Inoda Coffee Honten"],
      culture: "Over 1,000 years as Japan's imperial capital; tea ceremony, Nishijin weaving, and Kyo-yaki ceramics.",
      event: { title: "Gion Matsuri", month: "July", season: "summer", desc: "Month-long festival featuring towering Yamaboko floats museum-draped in tapestries." },
      hiddenGem: "Ine Funaya wooden boathouses along Tango Peninsula's calm bay.",
      scenic: "Kiyomizu-dera's wooden stage floating over crimson autumn maples."
    },
    {
      id: "JP-27",
      name: "Osaka",
      ja: "大阪府",
      region: "Kansai",
      catchphrase: "Neon Canals, Samurai Keeps, and Japan's Kitchen of Kuidaore Soul Food",
      cities: ["Osaka", "Namba", "Umeda", "Sakai"],
      spots: ["Osaka Castle Park", "Dotonbori Canal & Hozenji Yokocho", "Shinsekai & Sumiyoshi Taisha"],
      foods: ["Takoyaki Octopus Balls", "Osaka Okonomiyaki", "Kushikatsu Skewers (No Double-Dipping!)"],
      foodCat: "street",
      cafes: ["Marufuku Coffee Sennichimae", "Brooklyn Roasting Company Kitahama"],
      culture: "Merchant humor, Bunraku puppet theatre, and Sakai master kitchen knife forging.",
      event: { title: "Tenjin Matsuri", month: "July", season: "summer", desc: "One of Japan's top three festivals with 100 illuminated boats and fireworks on Okawa River." },
      hiddenGem: "Katsuo-ji Temple's thousands of miniature Daruma dolls in Minoh.",
      scenic: "Dotonbori neon reflections along the canal at night."
    },
    {
      id: "JP-28",
      name: "Hyogo",
      ja: "兵庫県",
      region: "Kansai",
      catchphrase: "White Heron Castles, Cosmopolitan Port Bays, and Gold-Standard Kobe Beef",
      cities: ["Kobe", "Himeji", "Kinosaki Onsen", "Awaji Island"],
      spots: ["Himeji Castle (UNESCO National Treasure)", "Kinosaki Onsen Seven Bathhouses", "Kobe Kitano Ijinkan & Harborland"],
      foods: ["Certified Kobe Wagyu Beef", "Akashiyaki Octopus Omelet", "Nada Sake & Kobe Sweets"],
      foodCat: "meat",
      cafes: ["Nishimura Coffee Nakayamate (Kobe)", "Kinosaki Canal Coffee Roastery"],
      culture: "Japan's finest surviving feudal castle and Nada's premier sake-brewing district.",
      event: { title: "Kobe Luminarie", month: "Winter", season: "winter", desc: "Cathedral-like illuminated archways honoring resilience and hope." },
      hiddenGem: "Takeda Castle Ruins floating above a sea of autumn clouds.",
      scenic: "Himeji Castle's gleaming white plaster keep framed by spring cherry blossoms."
    },
    {
      id: "JP-29",
      name: "Nara",
      ja: "奈良県",
      region: "Kansai",
      catchphrase: "Ancient Eighth-Century Capitals, Bowing Sacred Deer, and Yoshino Cherry Ridges",
      cities: ["Nara", "Yoshino", "Ikaruga", "Asuka"],
      spots: ["Todai-ji Great Buddha & Nara Park", "Kasuga Taisha Lantern Forest", "Mount Yoshino 30,000 Cherry Trees"],
      foods: ["Kakinoha-zushi Persimmon-Leaf Sushi", "Miwa Somen Noodles", "Nakatanidou Pounded Yomogi Mochi"],
      foodCat: "seafood",
      cafes: ["KanaKana Machiya Cafe (Naramachi)", "Yoshino Mountain Tea House"],
      culture: "Japan's first permanent capital (710 AD), Horyu-ji (world's oldest wooden structures), and sumi ink sticks.",
      event: { title: "Wakakusa Yamayaki", month: "January", season: "winter", desc: "Spectacular controlled mountainside burning and winter fireworks above Nara." },
      hiddenGem: "Hasedera Temple's 399-step covered wooden stairways.",
      scenic: "Sunrise across Mount Yoshino's layered cherry-blossom ridges."
    },
    {
      id: "JP-30",
      name: "Wakayama",
      ja: "和歌山県",
      region: "Kansai",
      catchphrase: "Sacred Kumano Trails, Mountaintop Temples, and Giant Tuna Markets",
      cities: ["Koyasan", "Nachi-Katsuura", "Wakayama", "Shirahama"],
      spots: ["Mount Koya (Koyasan) & Okunoin Cemetery", "Kumano Kodo Pilgrimage & Nachi Falls", "Shirahama White Sand Beach"],
      foods: ["Wakayama Tonkotsu-Shoyu Ramen", "Katsuura Fresh Bluefin Tuna", "Koyasan Shojin Ryori Vegan Cuisine"],
      foodCat: "seafood",
      cafes: ["Bon On Sha Monastery Cafe (Koyasan)", "Nachi Falls View Tea House"],
      culture: "1,200-year-old Shingon Esoteric Buddhism founded by Kobo Daishi and UNESCO pilgrimage routes.",
      event: { title: "Nachi Fire Festival (Ogi Matsuri)", month: "July", season: "summer", desc: "Giant flaming pine torches purifying twelve portable shrine fans beside Nachi Falls." },
      hiddenGem: "Tomogashima uninhabited island brick fortresses in Kitan Strait.",
      scenic: "Seiganto-ji three-story pagoda framed against 133-meter Nachi Waterfall."
    },
    {
      id: "JP-31",
      name: "Tottori",
      ja: "鳥取県",
      region: "Chugoku",
      catchphrase: "Coastal Sand Dunes, Sacred Cliff Temples, and Winter Crab Feasts",
      cities: ["Tottori", "Kurayoshi", "Yonago", "Misasa"],
      spots: ["Tottori Sand Dunes & Sand Museum", "Sanbutsu-ji Nageiredo Cliff Temple", "Mount Daisen"],
      foods: ["Matsuba Snow Crab", "Tottori Wagyu & Pear Curry", "Nijisseiki Nashi Pears"],
      foodCat: "seafood",
      cafes: ["Sunaba Coffee (Tottori)", "Kurayoshi White-Wall Warehouse Cafe"],
      culture: "Japan's largest coastal dune system and radon-rich Misasa Onsen.",
      event: { title: "Tottori Shan-Shan Umbrella Festival", month: "August", season: "summer", desc: "Thousands of dancers twirling bell-adorned colorful umbrellas." },
      hiddenGem: "Uradome Coast emerald sea caves and rock arches.",
      scenic: "Wind ripples across the Tottori Sand Dunes overlooking the Sea of Japan at dusk."
    },
    {
      id: "JP-32",
      name: "Shimane",
      ja: "島根県",
      region: "Chugoku",
      catchphrase: "Ancient Mythology Shrines, World Heritage Silver Mines, and Serene Gardens",
      cities: ["Izumo", "Matsue", "Oda", "Tsuwano"],
      spots: ["Izumo Taisha Grand Shrine", "Adachi Museum of Art Gardens", "Iwami Ginzan Silver Mine (UNESCO)"],
      foods: ["Izumo Warigo Three-Tier Soba", "Shijimi Lake Clams", "Matsue Wagashi Tea Sweets"],
      foodCat: "noodles",
      cafes: ["Adachi Museum Tea Room", "Matsue Castle Horikawa Boat Cafe"],
      culture: "Land of Japanese creation myths (where deities gather in the 10th lunar month) and Matsue tea culture.",
      event: { title: "Kamiari-zuki Shrine Rituals (Izumo)", month: "November", season: "autumn", desc: "Sacred rituals welcoming deities from across Japan to Izumo Taisha." },
      hiddenGem: "Oki Islands' Kuniga Coast 257-meter Matengai sea cliffs.",
      scenic: "Sunset over Lake Shinji's Yomegashima Island from Matsue."
    },
    {
      id: "JP-33",
      name: "Okayama",
      ja: "岡山県",
      region: "Chugoku",
      catchphrase: "Sun-Drenched Fruit Orchards, Edo Canal Warehouses, and Samurai Gardens",
      cities: ["Okayama", "Kurashiki", "Bizen", "Takahashi"],
      spots: ["Kurashiki Bikan Canal Quarter", "Okayama Korakuen Garden & Black Crow Castle", "Bizen Pottery Village"],
      foods: ["Okayama White Peaches & Muscat Grapes", "Barazushi Scattered Sushi", "Hiruzen Yakisoba"],
      foodCat: "sweets",
      cafes: ["Kurashiki Coffee Kan", "Parlor Kudamono Komachi (Kurashiki)"],
      culture: "Momotaro folklore, unglazed Bizen stoneware, and Kojima Japanese selvedge denim.",
      event: { title: "Saidai-ji Eyo Hadaka Matsuri", month: "February", season: "winter", desc: "Historic midnight ritual for sacred wooden talismans." },
      hiddenGem: "Bitchu Matsuyama Castle—Japan's highest surviving original mountain keep.",
      scenic: "Willow trees reflected in Kurashiki's stone-lined canal at twilight."
    },
    {
      id: "JP-34",
      name: "Hiroshima",
      ja: "広島県",
      region: "Chugoku",
      catchphrase: "Floating Sacred Torii, Living Peace Memorials, and Sizzling Layered Okonomiyaki",
      cities: ["Hiroshima", "Miyajima", "Onomichi", "Kure"],
      spots: ["Itsukushima Shrine Floating Torii (UNESCO)", "Hiroshima Peace Memorial Park & Museum", "Onomichi Temple Walk & Shimanami Kaido"],
      foods: ["Hiroshima-style Layered Okonomiyaki", "Grilled Miyajima Oysters", "Momiji Manju Maple Cakes"],
      foodCat: "street",
      cafes: ["Itsukushima Coffee (Miyajima)", "Onomichi U2 Cycle Cafe"],
      culture: "Global symbol of peace and Seto Inland Sea island cycling culture.",
      event: { title: "Miyajima Kangensai", month: "July/August", season: "summer", desc: "Court musicians play gagaku aboard lantern-lit boats in front of the floating torii." },
      hiddenGem: "Tomonoura historic Edo port harbor & hillside temples.",
      scenic: "High tide surrounding Itsukushima's vermilion torii against Mount Misen."
    },
    {
      id: "JP-35",
      name: "Yamaguchi",
      ja: "山口県",
      region: "Chugoku",
      catchphrase: "Cliffside Red Torii Tunnels, Five-Arched Wooden Bridges, and Pufferfish Cuisine",
      cities: ["Shimonoseki", "Iwakuni", "Hagi", "Nagato"],
      spots: ["Motonosumi Shrine 123 Cliff Torii", "Kintaikyo Five-Arched Wooden Bridge", "Akiyoshido Limestone Cavern"],
      foods: ["Shimonoseki Fugu (Licensed Pufferfish)", "Kawara Soba on Hot Roof Tiles", "Hagi Natsumikan Citrus"],
      foodCat: "seafood",
      cafes: ["Hagi Castle Town Warehouse Cafe", "Tsunoshima Lighthouse Cafe"],
      culture: "Hagi-yaki tea pottery and Meiji Restoration samurai heritage.",
      event: { title: "Shimonoseki Sentei-sai", month: "May", season: "spring", desc: "Ornate Heian-era court procession at Akama Shrine overlooking Kanmon Strait." },
      hiddenGem: "Tsunoshima Bridge sweeping across turquoise waters to Tsunoshima Island.",
      scenic: "123 vermilion torii descending green coastal cliffs toward crashing waves."
    },
    {
      id: "JP-36",
      name: "Tokushima",
      ja: "徳島県",
      region: "Shikoku",
      catchphrase: "Roaring Tidal Whirlpools, Vine Canyon Bridges, and Four-Hundred-Year Awa Dance",
      cities: ["Tokushima", "Naruto", "Iya Valley", "Mima"],
      spots: ["Naruto Tidal Whirlpools", "Iya Valley Vine Bridge (Kazurabashi)", "Oboke & Koboke Gorges"],
      foods: ["Tokushima Pork-Belly Ramen", "Sudachi Citrus Dishes", "Awa Odori Chicken"],
      foodCat: "noodles",
      cafes: ["Iya Valley Mist Overlook Cafe", "Ai-zome Indigo Studio Tea"],
      culture: "400-year-old Awa Odori street dance and Awa natural indigo dyeing.",
      event: { title: "Tokushima Awa Odori", month: "August", season: "summer", desc: "Over a million visitors join joyous troupes dancing through Tokushima City." },
      hiddenGem: "Oku-Iya Double Vine Bridges & Chiiori thatched farmhouse.",
      scenic: "Emerald river bends beneath the swinging vine bridge of Iya Valley."
    },
    {
      id: "JP-37",
      name: "Kagawa",
      ja: "香川県",
      region: "Shikoku",
      catchphrase: "Island Art Museums, Centuries-Old Gardens, and Firm Hand-Kneaded Sanuki Udon",
      cities: ["Takamatsu", "Naoshima", "Kotohira", "Shodoshima"],
      spots: ["Ritsurin Landscape Garden", "Naoshima & Teshima Art Islands", "Kotohira-gu (Konpira-san) 1,368 Steps"],
      foods: ["Sanuki Udon (Kamaage & Bukkake)", "Honetsuki-dori Spiced Chicken Leg", "Shodoshima Olive Dishes"],
      foodCat: "noodles",
      cafes: ["Kikugetsu-tei Teahouse (Ritsurin)", "Benesse House Terrace Cafe (Naoshima)"],
      culture: "Setouchi Triennale contemporary island art and Japan's udon capital.",
      event: { title: "Setouchi Triennale", month: "Spring / Summer / Autumn (Triennial)", season: "spring", desc: "Site-specific art installations across Seto Inland Sea islands." },
      hiddenGem: "Chichibugahama Beach mirror-lagoon sunset reflections.",
      scenic: "Ritsurin Garden's Engetsu-kyo arched bridge framed by Mount Shiun."
    },
    {
      id: "JP-38",
      name: "Ehime",
      ja: "愛媛県",
      region: "Shikoku",
      catchphrase: "Historic Hot Springs, Original Hilltop Keeps, and Sun-Sweet Citrus Islands",
      cities: ["Matsuyama", "Imabari", "Uchiko", "Uwajima"],
      spots: ["Dogo Onsen Honkan Bathhouse", "Matsuyama Castle (Original Keep)", "Shimanami Kaido Island Bridges"],
      foods: ["Uwajima Sea Bream Tai-meshi", "Ehime Mikan & Beni-Madonna Citrus", "Jakoten Fish Cakes"],
      foodCat: "seafood",
      cafes: ["Dogo Onsen Botchan Karakuri Cafe", "10 Factory Mikan Juice Bar (Matsuyama)"],
      culture: "3,000-year-old Dogo Onsen spa lore, haiku poetry (Masaoka Shiki), and Imabari towels.",
      event: { title: "Matsuyama Autumn Festival", month: "October", season: "autumn", desc: "Dynamic mikoshi shrine clashes outside Dogo Onsen Station." },
      hiddenGem: "Shimonada Station's seaside platform overlooking the Seto Inland Sea.",
      scenic: "Sunset from Kirosan Observatory across Kurushima Kaikyo Suspension Bridge."
    },
    {
      id: "JP-39",
      name: "Kochi",
      ja: "高知県",
      region: "Shikoku",
      catchphrase: "Straw-Seared Bonito, Last Free-Flowing Rivers, and Original Castle Keeps",
      cities: ["Kochi", "Shimanto", "Niyodo", "Muroto"],
      spots: ["Kochi Castle (Original Keep & Palace)", "Hirome Market", "Shimanto River & Niyodo Blue"],
      foods: ["Katsuo no Tataki (Straw-Seared Bonito)", "Nabeyaki Ramen", "Yuzu Citrus Specialties"],
      foodCat: "seafood",
      cafes: ["Hirome Market Morning Coffee", "Niyodo River Crystal Terrace"],
      culture: "Sakamoto Ryoma's Meiji visionary spirit and lively Tosa hospitality.",
      event: { title: "Yosakoi Matsuri", month: "August", season: "summer", desc: "High-energy dance teams clicking wooden naruko clappers through Kochi." },
      hiddenGem: "Nikobuchi waterfall basin glowing in electric 'Niyodo Blue'.",
      scenic: "Chinka-bashi submersible bridges spanning the clear Shimanto River."
    },
    {
      id: "JP-40",
      name: "Fukuoka",
      ja: "福岡県",
      region: "Kyushu/Okinawa",
      catchphrase: "Open-Air Yatai Stalls, Silky Tonkotsu Ramen, and Centuries of Hakata Heritage",
      cities: ["Fukuoka (Hakata)", "Dazaifu", "Kitakyushu", "Yanagawa"],
      spots: ["Nakasu & Tenjin Yatai Food Stalls", "Dazaifu Tenmangu Shrine", "Yanagawa Canal Punting"],
      foods: ["Hakata Tonkotsu Ramen", "Motsunabe & Mizutaki Hotpot", "Hakata Mentaiko & Gyoza"],
      foodCat: "noodles",
      cafes: ["Starbucks Dazaifu Tenmangu (Kengo Kuma)", "Fuglen Fukuoka (Hakata)"],
      culture: "Gateway to continental Asia for over 1,500 years and Hakata-ori silk textiles.",
      event: { title: "Hakata Gion Yamakasa", month: "July", season: "summer", desc: "Teams race 1-ton decorated floats through Hakata streets at 4:59 AM." },
      hiddenGem: "Nanzoin Temple's 41-meter bronze Reclining Buddha in Sasaguri.",
      scenic: "Sakurai Futamigaura white torii against Genkai Sea sunsets."
    },
    {
      id: "JP-41",
      name: "Saga",
      ja: "佐賀県",
      region: "Kyushu/Okinawa",
      catchphrase: "Four Centuries of Porcelain Kilns, Balloon-Filled Skies, and Ancient Settlements",
      cities: ["Arita", "Imari", "Karatsu", "Ureshino"],
      spots: ["Arita & Okawachiyama Porcelain Villages", "Yutoku Inari Shrine", "Yoshinogari Yayoi Historical Park"],
      foods: ["Saga Wagyu Beef", "Yobuko Live-Caught Squid", "Ureshino Onsen Tofu"],
      foodCat: "meat",
      cafes: ["Arita Porcelain Lab Gallery Cafe", "Ureshino Tea Bar"],
      culture: "Birthplace of Japanese porcelain (1616) and Ureshino green tea.",
      event: { title: "Saga International Balloon Fiesta", month: "November", season: "autumn", desc: "Over 100 colorful hot-air balloons ascending along the Kase River." },
      hiddenGem: "Hamanoura terraced rice paddies glowing orange at sunset.",
      scenic: "Okawachiyama's brick kiln chimneys nestled in misty cliffs."
    },
    {
      id: "JP-42",
      name: "Nagasaki",
      ja: "長崎県",
      region: "Kyushu/Okinawa",
      catchphrase: "Terraced Harbor Panoramas, Maritime Crossroads, and Wa-Ka-Ran Cuisine",
      cities: ["Nagasaki", "Sasebo", "Unzen", "Goto Islands"],
      spots: ["Glover Garden & Oura Cathedral (UNESCO)", "Mount Inasa $10M Night View", "Nagasaki Peace Park & Dejima"],
      foods: ["Nagasaki Champon & Sara Udon", "Castella Sponge Cake", "Sasebo Burger"],
      foodCat: "noodles",
      cafes: ["Bunmeido Castella Tea Salon", "Dejima Wharf Harbor Coffee"],
      culture: "Unique Japanese-Chinese-Dutch (Wa-Ka-Ran) fusion heritage and Hidden Christian sites.",
      event: { title: "Nagasaki Lantern Festival", month: "February (Lunar New Year)", season: "winter", desc: "15,000 glowing Chinese lanterns illuminating Chinatown and Meganebashi." },
      hiddenGem: "Goto Islands' stone churches and white-sand Takahama Beach.",
      scenic: "Mount Inasa's amphitheater night panorama over Nagasaki Harbor."
    },
    {
      id: "JP-43",
      name: "Kumamoto",
      ja: "熊本県",
      region: "Kyushu/Okinawa",
      catchphrase: "Mighty Volcanic Calderas, Resilient Black Castles, and Mountain Onsen",
      cities: ["Kumamoto", "Mount Aso", "Kurokawa Onsen", "Amakusa"],
      spots: ["Kumamoto Castle", "Mount Aso Nakadake Crater & Kusasenri", "Kurokawa Onsen Wooden Bath Hopping"],
      foods: ["Kumamoto Garlic-Chip Tonkotsu Ramen", "Basashi & Akaushi Caldera Beef", "Ikinari Dango"],
      foodCat: "meat",
      cafes: ["Suizenji Garden Kokindenju-no-Ma", "Kurokawa Onsen Patisserie Roku"],
      culture: "World's largest inhabited volcanic caldera and Higo samurai craftsmanship.",
      event: { title: "Aso Fire Festival (Hifuri Shinji)", month: "March", season: "spring", desc: "Swinging blazing bundles of grass to create rings of fire in Aso." },
      hiddenGem: "Kamishikimi Kumanoimasu Shrine's mossy stone-lantern stairway.",
      scenic: "Kusasenri grassland horses grazing before smoking Mount Aso."
    },
    {
      id: "JP-44",
      name: "Oita",
      ja: "大分県",
      region: "Kyushu/Okinawa",
      catchphrase: "Japan's Hot Spring Capital of Steaming Hells, Mist Lakes, and Crispy Toriten",
      cities: ["Beppu", "Yufuin", "Kitsuki", "Usa"],
      spots: ["Beppu Jigoku (Seven Hells) & Sand Baths", "Yufuin & Lake Kinrin Morning Mist", "Usa Jingu Grand Shrine"],
      foods: ["Oita Toriten Chicken Tempura", "Beppu Jigoku-mushi Steam Cooking", "Bungo Wagyu"],
      foodCat: "meat",
      cafes: ["Tenshoan Lake Kinrin Cafe (Yufuin)", "Beppu Kannawa Steam Cafe"],
      culture: "Highest hot spring output in Japan and bamboo weaving artistry.",
      event: { title: "Beppu Hatto Onsen Matsuri", month: "April", season: "spring", desc: "Hot water splashing parades and Mount Ogi fire festival." },
      hiddenGem: "Kokonoe 'Yume' Grand Suspension Bridge above Shindo Falls.",
      scenic: "Morning mist rising off Lake Kinrin beneath twin-peaked Mount Yufu."
    },
    {
      id: "JP-45",
      name: "Miyazaki",
      ja: "宮崎県",
      region: "Kyushu/Okinawa",
      catchphrase: "Mythological Basalt Gorges, Cliff-Cave Shrines, and Subtropical Coastlines",
      cities: ["Takachiho", "Miyazaki", "Nichinan", "Obi"],
      spots: ["Takachiho Gorge & Manai Falls", "Udo Jingu Cliff-Cave Shrine", "Aoshima Island Devil's Washboard"],
      foods: ["Miyazaki Chicken Nanban with Tartar", "Charcoal-Grilled Jidori", "Miyazaki Sun-Ripened Mango"],
      foodCat: "meat",
      cafes: ["Takachiho Gorge Riverfront Tea House", "Aoshima Beachside Coffee"],
      culture: "Setting of Japan's sun-goddess Amaterasu mythology and Yokagura sacred night dances.",
      event: { title: "Takachiho Yokagura Night Dances", month: "November–February", season: "winter", desc: "All-night sacred masked dances reenacting the Sun Goddess cave legend." },
      hiddenGem: "Amanoiwato Shrine's Amano Yasukawara river-stone cairn cavern.",
      scenic: "Rowing beneath columnar basalt cliffs and Manai Waterfall at Takachiho."
    },
    {
      id: "JP-46",
      name: "Kagoshima",
      ja: "鹿児島県",
      region: "Kyushu/Okinawa",
      catchphrase: "Smoking Bay Volcanoes, Millennia-Old Yakushima Cedars, and Volcanic Sand Baths",
      cities: ["Kagoshima", "Sakurajima", "Ibusuki", "Yakushima"],
      spots: ["Sakurajima Active Volcano & Sengan-en", "Yakushima Ancient Cedar Forest (UNESCO)", "Ibusuki Natural Volcanic Sand Baths"],
      foods: ["Kagoshima Kurobuta Black Pork", "Kagoshima Ramen", "Shirokuma Shaved Ice & Imo Shochu"],
      foodCat: "meat",
      cafes: ["Sengan-en Garden Matcha Pavilion", "Yakushima Forest Roast Coffee"],
      culture: "Satsuma samurai history, Satsuma Kiriko cut glass, and sweet-potato shochu.",
      event: { title: "Ohara Matsuri", month: "November", season: "autumn", desc: "Over 20,000 dancers parading through Kagoshima City." },
      hiddenGem: "Kirishima Shrine's crimson pillars in volcanic cedar mist.",
      scenic: "Sengan-en Garden framing smoking Sakurajima across Kinko Bay."
    },
    {
      id: "JP-47",
      name: "Okinawa",
      ja: "沖縄県",
      region: "Kyushu/Okinawa",
      catchphrase: "Coral Reef Lagoons, Subtropical Forests, and Ryukyu Island Heritage",
      cities: ["Naha", "Okinawa Churaumi", "Ishigaki", "Miyakojima"],
      spots: ["Shurijo Castle Park & Tsuboya Pottery", "Churaumi Aquarium & Emerald Coast", "Kabira Bay (Ishigaki) & Yonaha Maehama"],
      foods: ["Okinawa Soba & Rafute Pork Belly", "Goya Champuru", "Sata Andagi Donuts & Blue Seal"],
      foodCat: "noodles",
      cafes: ["Buku-Buku Tea Salon (Naha)", "Hamabe no Chaya Seaside Cafe (Nanjo)"],
      culture: "450-year Ryukyu Kingdom heritage, sanshin three-string music, and Bingata stencil dyeing.",
      event: { title: "Naha Great Tug-of-War", month: "October", season: "autumn", desc: "World-record 200-meter straw rope pulled by tens of thousands of participants." },
      hiddenGem: "Taketomi Island's water-buffalo carts and coral-walled Ryukyu houses.",
      scenic: "Turquoise coral lagoon waters of Kabira Bay on Ishigaki Island."
    }
  ];

  const byId = Object.fromEntries(PREFECTURES.map((p) => [p.id, p]));
  let selectedId = "JP-13";
  let savedIds = new Set();
  try {
    const raw = localStorage.getItem("konmaike_saved_prefs");
    if (raw) savedIds = new Set(JSON.parse(raw));
  } catch (e) {}

  let sightMode = "all";
  let sightRegion = "ALL";
  let sightExpanded = false;

  let foodCat = "all";
  let foodExpanded = false;

  let eventSeason = "all";
  let eventExpanded = false;

  let modalPrefId = "JP-13";
  let modalTab = "overview";

  function saveStorage() {
    try {
      localStorage.setItem("konmaike_saved_prefs", JSON.stringify([...savedIds]));
    } catch (e) {}
    const badge = document.getElementById("saved-count");
    if (badge) badge.textContent = String(savedIds.size);
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------------------------------------------------------
     1. INSPECTOR & DIRECTORY
     --------------------------------------------------------- */
  function renderInspector(id) {
    const p = byId[id] || PREFECTURES[0];
    selectedId = p.id;

    document.querySelectorAll(".japan-svg-map .prefecture").forEach((el) => {
      el.classList.toggle("selected", el.getAttribute("data-id") === p.id);
    });
    document.querySelectorAll(".pref-pill-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-pref") === p.id);
    });

    const box = document.getElementById("pref-inspector");
    if (!box) return;
    const isSaved = savedIds.has(p.id);
    const color = REGION_COLORS[p.region] || "#1B3B5A";

    box.innerHTML = `
      <div class="inspector-top">
        <div>
          <div class="pref-badges">
            <span class="badge-code">${esc(p.id)}</span>
            <span class="badge-region" style="background:${color}">${esc(p.region)}</span>
            <span class="badge-full">Full 2026 Guide</span>
          </div>
          <h3 class="inspector-name-en">${esc(p.name)}<span class="inspector-name-ja">${esc(p.ja)}</span></h3>
        </div>
        <button type="button" class="btn-bookmark ${isSaved ? "saved" : ""}" id="insp-bookmark-btn">
          ${isSaved ? "★ Saved" : "☆ Save"}
        </button>
      </div>
      <p class="inspector-catchphrase">${esc(p.catchphrase)}</p>
      <div class="inspector-block">
        <div class="inspector-label">Key Cities &amp; Areas</div>
        <div class="chip-list">
          ${p.cities.map((c) => `<span class="info-chip">${esc(c)}</span>`).join("")}
        </div>
      </div>
      <div class="inspector-block">
        <div class="inspector-label">Must-See Highlights</div>
        <ul class="mini-list">
          ${p.spots.map((s) => `<li>${esc(s)}</li>`).join("")}
        </ul>
      </div>
      <div class="inspector-block">
        <div class="inspector-label">Regional Soul Food</div>
        <div class="chip-list">
          ${p.foods.map((f) => `<span class="info-chip food">${esc(f)}</span>`).join("")}
        </div>
      </div>
      <div class="inspector-footer">
        <span style="font-size:0.8rem;color:var(--ink-muted)"><strong>Season Peak:</strong> ${esc(p.event.month)}</span>
        <button type="button" class="btn-primary" id="insp-open-modal" style="padding:9px 18px;font-size:0.86rem">
          Open Full Guide →
        </button>
      </div>
    `;

    const bm = document.getElementById("insp-bookmark-btn");
    if (bm) {
      bm.onclick = () => toggleSave(p.id);
    }
    const om = document.getElementById("insp-open-modal");
    if (om) {
      om.onclick = () => openModal(p.id, "overview");
    }
  }

  function renderDirectory(region = "ALL") {
    const grid = document.getElementById("pref-directory-grid");
    const label = document.getElementById("dir-count-label");
    if (!grid) return;
    const list =
      region === "ALL"
        ? PREFECTURES
        : PREFECTURES.filter((p) => p.region === region);
    if (label) label.textContent = `(Showing ${list.length})`;

    grid.innerHTML = list
      .map(
        (p) => `
      <button type="button" class="pref-pill-btn ${p.id === selectedId ? "active" : ""}" data-pref="${p.id}">
        <span>${esc(p.name)}</span>
        <small>${esc(p.ja)}</small>
      </button>
    `
      )
      .join("");

    grid.querySelectorAll(".pref-pill-btn").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-pref");
        renderInspector(id);
      };
    });
  }

  function initMap() {
    const tooltip = document.getElementById("map-tooltip");
    const wrap = document.getElementById("map-svg-container");

    document.querySelectorAll(".japan-svg-map .prefecture").forEach((el) => {
      const id = el.getAttribute("data-id");
      const name = el.getAttribute("data-name");
      const ja = el.getAttribute("data-ja");
      const region = el.getAttribute("data-region");

      el.onclick = () => renderInspector(id);
      el.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          renderInspector(id);
        }
      };
      el.onmousemove = (e) => {
        if (!tooltip || !wrap) return;
        const rect = wrap.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - rect.left}px`;
        tooltip.style.top = `${e.clientY - rect.top}px`;
        tooltip.innerHTML = `<strong>${esc(name)} (${esc(ja)})</strong><span>${esc(region)} • Click to inspect</span>`;
        tooltip.classList.add("visible");
      };
      el.onmouseleave = () => {
        if (tooltip) tooltip.classList.remove("visible");
      };
    });

    document.querySelectorAll("#map-region-filters .filter-btn").forEach((btn) => {
      btn.onclick = () => {
        document
          .querySelectorAll("#map-region-filters .filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const reg = btn.getAttribute("data-region");
        document.querySelectorAll(".japan-svg-map .prefecture").forEach((el) => {
          const match = reg === "ALL" || el.getAttribute("data-region") === reg;
          el.classList.toggle("dimmed", !match);
        });
        renderDirectory(reg);
      };
    });

    const resetBtn = document.getElementById("reset-map-btn");
    if (resetBtn) {
      resetBtn.onclick = () => {
        document
          .querySelectorAll("#map-region-filters .filter-btn")
          .forEach((b) => b.classList.toggle("active", b.getAttribute("data-region") === "ALL"));
        document
          .querySelectorAll(".japan-svg-map .prefecture")
          .forEach((el) => el.classList.remove("dimmed"));
        renderDirectory("ALL");
      };
    }

    document.querySelectorAll("[data-footer-region]").forEach((btn) => {
      btn.onclick = () => {
        const reg = btn.getAttribute("data-footer-region");
        const mapSec = document.getElementById("map-section");
        if (mapSec) mapSec.scrollIntoView({ behavior: "smooth" });
        const target = document.querySelector(`#map-region-filters .filter-btn[data-region="${reg}"]`);
        if (target) target.click();
      };
    });
  }

  /* ---------------------------------------------------------
     2. SIGHTSEEING CARDS
     --------------------------------------------------------- */
  function renderSightseeing() {
    const grid = document.getElementById("sightseeing-grid");
    const moreWrap = document.getElementById("sightseeing-more-wrap");
    const toggleBtn = document.getElementById("sightseeing-toggle-all");
    if (!grid) return;

    let list = PREFECTURES.filter(
      (p) => sightRegion === "ALL" || p.region === sightRegion
    );
    const limit = sightExpanded || sightMode === "full" || sightRegion !== "ALL" ? list.length : 9;
    const shown = list.slice(0, limit);

    grid.innerHTML = shown
      .map((p) => {
        const color = REGION_COLORS[p.region] || "#1B3B5A";
        let focusNote = "";
        if (sightMode === "hidden") {
          focusNote = `<p class="card-lead"><strong>Hidden Gem:</strong> ${esc(p.hiddenGem)}</p>`;
        } else if (sightMode === "scenic") {
          focusNote = `<p class="card-lead"><strong>Scenic View:</strong> ${esc(p.scenic)}</p>`;
        } else {
          focusNote = `<p class="card-lead">${esc(p.catchphrase)}</p>`;
        }
        return `
        <article class="editorial-card">
          <div class="card-accent-bar" style="background:${color}"></div>
          <div class="card-body">
            <div class="card-meta-row">
              <span class="badge-code">${esc(p.id)}</span>
              <span class="badge-region" style="background:${color}">${esc(p.region)}</span>
            </div>
            <h3 class="card-title">${esc(p.name)}<span class="card-ja">${esc(p.ja)}</span></h3>
            ${focusNote}
            <ul class="card-points">
              ${p.spots.map((s) => `<li>${esc(s)}</li>`).join("")}
            </ul>
            <div class="card-footer">
              <span style="font-size:0.78rem;color:var(--ink-muted)">${esc(p.cities.slice(0, 3).join(" • "))}</span>
              <button type="button" class="card-link-btn" data-open-pref="${p.id}">Explore Guide →</button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    if (moreWrap && toggleBtn) {
      if (list.length <= 9 || sightMode === "full") {
        moreWrap.style.display = "none";
      } else {
        moreWrap.style.display = "block";
        toggleBtn.textContent = sightExpanded
          ? "Show Featured 9"
          : `Show All ${list.length} Prefectures`;
      }
    }
  }

  function initSightseeing() {
    document.querySelectorAll("#sight-type-filters .filter-btn").forEach((btn) => {
      btn.onclick = () => {
        document
          .querySelectorAll("#sight-type-filters .filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        sightMode = btn.getAttribute("data-sight-mode");
        renderSightseeing();
      };
    });

    document.querySelectorAll("#sight-region-filters .filter-btn").forEach((btn) => {
      btn.onclick = () => {
        document
          .querySelectorAll("#sight-region-filters .filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        sightRegion = btn.getAttribute("data-sight-region");
        renderSightseeing();
      };
    });

    const toggleBtn = document.getElementById("sightseeing-toggle-all");
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        sightExpanded = !sightExpanded;
        renderSightseeing();
      };
    }
  }

  /* ---------------------------------------------------------
     3. FOOD & CAFES
     --------------------------------------------------------- */
  function renderFood() {
    const foodGrid = document.getElementById("food-grid");
    const cafeWrap = document.getElementById("cafe-panel-wrap");
    const cafeGrid = document.getElementById("cafe-grid");
    const moreWrap = document.getElementById("food-more-wrap");
    const toggleBtn = document.getElementById("food-toggle-all");
    if (!foodGrid) return;

    if (foodCat === "cafes") {
      foodGrid.style.display = "none";
      if (moreWrap) moreWrap.style.display = "none";
      if (cafeWrap) cafeWrap.style.display = "block";
      if (cafeGrid) {
        cafeGrid.innerHTML = PREFECTURES.map(
          (p) => `
          <div class="cafe-card">
            <h4>
              <span>${esc(p.name)} <small style="font-weight:400;color:var(--ink-muted)">${esc(p.ja)}</small></span>
              <span class="badge-code">${esc(p.id)}</span>
            </h4>
            <ul class="cafe-list">
              ${p.cafes.map((c) => `<li>${esc(c)}</li>`).join("")}
            </ul>
          </div>
        `
        ).join("");
      }
      return;
    }

    if (cafeWrap) cafeWrap.style.display = "none";
    foodGrid.style.display = "grid";

    const list =
      foodCat === "all"
        ? PREFECTURES
        : PREFECTURES.filter((p) => p.foodCat === foodCat);
    const limit = foodExpanded || foodCat !== "all" ? list.length : 9;
    const shown = list.slice(0, limit);

    foodGrid.innerHTML = shown
      .map((p) => {
        const color = REGION_COLORS[p.region] || "#1B3B5A";
        return `
        <article class="editorial-card">
          <div class="card-accent-bar" style="background:${color}"></div>
          <div class="card-body">
            <div class="card-meta-row">
              <span class="badge-code">${esc(p.id)} • ${esc(p.name)}</span>
              <span class="adv-pill adv-allergen">Confirm Allergens</span>
            </div>
            <h3 class="card-title">${esc(p.foods[0])}</h3>
            <p class="card-lead">Local specialty of ${esc(p.name)} (${esc(p.ja)})</p>
            <ul class="card-points">
              ${p.foods.map((f) => `<li>${esc(f)}</li>`).join("")}
            </ul>
            <div class="card-footer">
              <span style="font-size:0.78rem;color:var(--ink-muted)">Cafe pick: ${esc(p.cafes[0])}</span>
              <button type="button" class="card-link-btn" data-open-pref="${p.id}" data-open-tab="food">Food &amp; Cafes →</button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    if (moreWrap && toggleBtn) {
      if (list.length <= 9) {
        moreWrap.style.display = "none";
      } else {
        moreWrap.style.display = "block";
        toggleBtn.textContent = foodExpanded
          ? "Show Featured 9"
          : `Show All ${list.length} Prefectures`;
      }
    }
  }

  function initFood() {
    document.querySelectorAll("#food-cat-filters .filter-btn").forEach((btn) => {
      btn.onclick = () => {
        document
          .querySelectorAll("#food-cat-filters .filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        foodCat = btn.getAttribute("data-food-cat");
        renderFood();
      };
    });

    const toggleBtn = document.getElementById("food-toggle-all");
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        foodExpanded = !foodExpanded;
        renderFood();
      };
    }
  }

  /* ---------------------------------------------------------
     4. EVENTS
     --------------------------------------------------------- */
  function renderEvents() {
    const grid = document.getElementById("events-grid");
    const moreWrap = document.getElementById("events-more-wrap");
    const toggleBtn = document.getElementById("events-toggle-all");
    if (!grid) return;

    const list =
      eventSeason === "all"
        ? PREFECTURES
        : PREFECTURES.filter((p) => p.event.season === eventSeason);
    const limit = eventExpanded || eventSeason !== "all" ? list.length : 9;
    const shown = list.slice(0, limit);

    grid.innerHTML = shown
      .map((p) => {
        const sClass = `season-${p.event.season}`;
        return `
        <article class="editorial-card">
          <div class="card-body">
            <div class="card-meta-row">
              <span class="event-month-badge ${sClass}">${esc(p.event.month)}</span>
              <span class="badge-code">${esc(p.name)}</span>
            </div>
            <h3 class="card-title">${esc(p.event.title)}</h3>
            <p class="card-lead">${esc(p.event.desc)}</p>
            <div class="card-footer">
              <span style="font-size:0.78rem;color:var(--ink-muted)">${esc(p.region)}</span>
              <button type="button" class="card-link-btn" data-open-pref="${p.id}" data-open-tab="events">Festival Details →</button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    if (moreWrap && toggleBtn) {
      if (list.length <= 9) {
        moreWrap.style.display = "none";
      } else {
        moreWrap.style.display = "block";
        toggleBtn.textContent = eventExpanded
          ? "Show Featured 9"
          : `Show All ${list.length} Festivals`;
      }
    }
  }

  function initEvents() {
    document.querySelectorAll("#event-season-filters .filter-btn").forEach((btn) => {
      btn.onclick = () => {
        document
          .querySelectorAll("#event-season-filters .filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        eventSeason = btn.getAttribute("data-season");
        renderEvents();
      };
    });

    const toggleBtn = document.getElementById("events-toggle-all");
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        eventExpanded = !eventExpanded;
        renderEvents();
      };
    }
  }

  /* ---------------------------------------------------------
     5. SEARCH & MODAL & SAVED TRIP
     --------------------------------------------------------- */
  function initSearch() {
    const input = document.getElementById("global-search");
    const dropdown = document.getElementById("search-dropdown");
    const jumpBtn = document.getElementById("hero-jump-map");
    if (!input || !dropdown) return;

    function updateSearch() {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        dropdown.classList.remove("open");
        dropdown.innerHTML = "";
        return;
      }
      const matches = PREFECTURES.filter((p) => {
        const blob = [
          p.name,
          p.ja,
          p.region,
          ...p.cities,
          ...p.spots,
          ...p.foods,
          ...p.cafes,
          p.event.title,
        ]
          .join(" ")
          .toLowerCase();
        return blob.includes(q);
      }).slice(0, 8);

      if (!matches.length) {
        dropdown.innerHTML = `<div class="search-item"><div><div class="search-item-title">No matching prefectures found</div><div class="search-item-sub">Try Tokyo, Kyoto, ramen, onsen, sakura, or Hokkaido</div></div></div>`;
        dropdown.classList.add("open");
        return;
      }

      dropdown.innerHTML = matches
        .map(
          (p) => `
        <button type="button" class="search-item" data-search-pref="${p.id}">
          <div>
            <div class="search-item-title">${esc(p.name)} (${esc(p.ja)})</div>
            <div class="search-item-sub">${esc(p.spots[0])} • ${esc(p.foods[0])}</div>
          </div>
          <span class="search-item-tag">${esc(p.id)}</span>
        </button>
      `
        )
        .join("");
      dropdown.classList.add("open");

      dropdown.querySelectorAll("[data-search-pref]").forEach((btn) => {
        btn.onclick = () => {
          const id = btn.getAttribute("data-search-pref");
          dropdown.classList.remove("open");
          openModal(id, "overview");
        };
      });
    }

    input.oninput = updateSearch;
    input.onfocus = updateSearch;
    if (jumpBtn) {
      jumpBtn.onclick = () => {
        if (input.value.trim()) {
          updateSearch();
        } else {
          const mapSec = document.getElementById("map-section");
          if (mapSec) mapSec.scrollIntoView({ behavior: "smooth" });
        }
      };
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".hero-search-wrap")) {
        dropdown.classList.remove("open");
      }
    });
  }

  function renderModalBody() {
    const p = byId[modalPrefId] || PREFECTURES[0];
    const body = document.getElementById("modal-body");
    if (!body) return;

    document.querySelectorAll("#modal-tabs .modal-tab").forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-mtab") === modalTab);
    });

    if (modalTab === "food") {
      body.innerHTML = `
        <div class="modal-section-grid">
          <div class="modal-panel">
            <h4>Regional Soul Food &amp; Specialties</h4>
            <ul>${p.foods.map((f) => `<li><strong>${esc(f)}</strong></li>`).join("")}</ul>
          </div>
          <div class="modal-panel">
            <h4>Local Cafes, Kissaten &amp; Tea Rooms</h4>
            <ul>${p.cafes.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
          </div>
        </div>
      `;
    } else if (modalTab === "culture") {
      body.innerHTML = `
        <div class="modal-section-grid">
          <div class="modal-panel">
            <h4>Heritage, Crafts &amp; Local Spirit</h4>
            <p style="margin:0;font-size:0.92rem;line-height:1.65">${esc(p.culture)}</p>
          </div>
          <div class="modal-panel">
            <h4>Hidden Gem &amp; Quiet Nature</h4>
            <p style="margin:0;font-size:0.92rem;line-height:1.65">${esc(p.hiddenGem)}</p>
          </div>
        </div>
      `;
    } else if (modalTab === "events") {
      body.innerHTML = `
        <div class="modal-section-grid">
          <div class="modal-panel">
            <h4>Signature Festival: ${esc(p.event.title)}</h4>
            <p style="margin:0 0 8px;font-size:0.84rem;color:var(--vermilion);font-weight:700">Season: ${esc(p.event.month)}</p>
            <p style="margin:0;font-size:0.92rem;line-height:1.65">${esc(p.event.desc)}</p>
          </div>
          <div class="modal-panel">
            <h4>Best Scenic Vista</h4>
            <p style="margin:0;font-size:0.92rem;line-height:1.65">${esc(p.scenic)}</p>
          </div>
        </div>
      `;
    } else {
      body.innerHTML = `
        <div class="modal-section-grid">
          <div class="modal-panel">
            <h4>Top Sightseeing Highlights</h4>
            <ul>${p.spots.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          </div>
          <div class="modal-panel">
            <h4>Key Cities &amp; Gateways</h4>
            <div class="chip-list" style="margin-bottom:14px">
              ${p.cities.map((c) => `<span class="info-chip">${esc(c)}</span>`).join("")}
            </div>
            <h4>Hidden Gem</h4>
            <p style="margin:0;font-size:0.88rem;color:var(--ink-muted)">${esc(p.hiddenGem)}</p>
          </div>
        </div>
      `;
    }
  }

  function openModal(id, tab = "overview") {
    const p = byId[id] || PREFECTURES[0];
    modalPrefId = p.id;
    modalTab = tab;
    renderInspector(p.id);

    const modal = document.getElementById("pref-modal");
    const badges = document.getElementById("modal-badges");
    const title = document.getElementById("modal-pref-title");
    const catchp = document.getElementById("modal-catchphrase");
    const counter = document.getElementById("modal-counter");
    const bm = document.getElementById("modal-bookmark-btn");
    if (!modal) return;

    const color = REGION_COLORS[p.region] || "#1B3B5A";
    const idx = PREFECTURES.findIndex((x) => x.id === p.id) + 1;
    const isSaved = savedIds.has(p.id);

    if (badges) {
      badges.innerHTML = `
        <span class="badge-code">${esc(p.id)}</span>
        <span class="badge-region" style="background:${color}">${esc(p.region)}</span>
      `;
    }
    if (title) {
      title.innerHTML = `${esc(p.name)} <span class="inspector-name-ja">${esc(p.ja)}</span>`;
    }
    if (catchp) catchp.textContent = p.catchphrase;
    if (counter) counter.textContent = `${p.id} (${idx}/47)`;
    if (bm) {
      bm.textContent = isSaved ? "★ Saved" : "☆ Save";
      bm.classList.toggle("saved", isSaved);
      bm.onclick = () => {
        toggleSave(p.id);
        const nowSaved = savedIds.has(p.id);
        bm.textContent = nowSaved ? "★ Saved" : "☆ Save";
        bm.classList.toggle("saved", nowSaved);
      };
    }

    renderModalBody();
    modal.classList.add("open");
  }

  function toggleSave(id) {
    if (savedIds.has(id)) {
      savedIds.delete(id);
    } else {
      savedIds.add(id);
    }
    saveStorage();
    renderInspector(selectedId);
  }

  function renderSavedModal() {
    const body = document.getElementById("saved-modal-body");
    if (!body) return;
    if (savedIds.size === 0) {
      body.innerHTML = `<p style="color:var(--ink-muted);margin:0">No prefectures saved yet. Click <strong>☆ Save</strong> on any prefecture guide to build your Japan trip list.</p>`;
      return;
    }
    const items = [...savedIds].map((id) => byId[id]).filter(Boolean);
    body.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px">
        ${items
          .map(
            (p) => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--surface);border:1px solid var(--border);border-radius:10px">
            <div>
              <strong>${esc(p.name)} (${esc(p.ja)})</strong>
              <div style="font-size:0.8rem;color:var(--ink-muted)">${esc(p.spots[0])}</div>
            </div>
            <div style="display:flex;gap:8px">
              <button type="button" class="quick-chip" data-saved-open="${p.id}">Open</button>
              <button type="button" class="quick-chip" data-saved-del="${p.id}">Remove</button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    body.querySelectorAll("[data-saved-open]").forEach((b) => {
      b.onclick = () => {
        document.getElementById("saved-modal")?.classList.remove("open");
        openModal(b.getAttribute("data-saved-open"), "overview");
      };
    });
    body.querySelectorAll("[data-saved-del]").forEach((b) => {
      b.onclick = () => {
        toggleSave(b.getAttribute("data-saved-del"));
        renderSavedModal();
      };
    });
  }

  function initModalsAndNav() {
    document.querySelectorAll("#modal-tabs .modal-tab").forEach((t) => {
      t.onclick = () => {
        modalTab = t.getAttribute("data-mtab");
        renderModalBody();
      };
    });

    document.getElementById("modal-close-btn")?.addEventListener("click", () => {
      document.getElementById("pref-modal")?.classList.remove("open");
    });

    document.getElementById("pref-modal")?.addEventListener("click", (e) => {
      if (e.target.id === "pref-modal") {
        e.currentTarget.classList.remove("open");
      }
    });

    document.getElementById("modal-prev-btn")?.addEventListener("click", () => {
      const idx = PREFECTURES.findIndex((p) => p.id === modalPrefId);
      const prev = PREFECTURES[(idx - 1 + PREFECTURES.length) % PREFECTURES.length];
      openModal(prev.id, modalTab);
    });

    document.getElementById("modal-next-btn")?.addEventListener("click", () => {
      const idx = PREFECTURES.findIndex((p) => p.id === modalPrefId);
      const next = PREFECTURES[(idx + 1) % PREFECTURES.length];
      openModal(next.id, modalTab);
    });

    document.getElementById("open-saved-btn")?.addEventListener("click", () => {
      renderSavedModal();
      document.getElementById("saved-modal")?.classList.add("open");
    });

    document.getElementById("saved-close-btn")?.addEventListener("click", () => {
      document.getElementById("saved-modal")?.classList.remove("open");
    });

    document.getElementById("saved-done-btn")?.addEventListener("click", () => {
      document.getElementById("saved-modal")?.classList.remove("open");
    });

    document.getElementById("clear-saved-btn")?.addEventListener("click", () => {
      savedIds.clear();
      saveStorage();
      renderSavedModal();
      renderInspector(selectedId);
    });

    const menuBtn = document.getElementById("mobile-menu-toggle");
    const drawer = document.getElementById("mobile-drawer");
    if (menuBtn && drawer) {
      menuBtn.onclick = () => {
        const open = drawer.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
      };
      drawer.querySelectorAll("a").forEach((a) => {
        a.onclick = () => drawer.classList.remove("open");
      });
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-pref]");
      if (btn) {
        const id = btn.getAttribute("data-open-pref");
        const tab = btn.getAttribute("data-open-tab") || "overview";
        openModal(id, tab);
      }
    });
  }

  /* ---------------------------------------------------------
     INIT ALL
     --------------------------------------------------------- */
  saveStorage();
  initMap();
  renderDirectory("ALL");
  renderInspector("JP-13");
  initSightseeing();
  renderSightseeing();
  initFood();
  renderFood();
  initEvents();
  renderEvents();
  initSearch();
  initModalsAndNav();
})();