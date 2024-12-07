let cards = [];

// Fetch the cards data
fetch('PTCGP-Compressed/cards.json')
    .then(response => response.json())
    .then(data => {
        // Assign the fetched data to the 'cards' array
        cards = data;

        // Rarity-based pull rates for normal packs
        const regularPullRates = {
            "🔷": [2, 2, 2, 0, 0],
            "🔷🔷": [0, 0, 0, 2.571, 1.714],
            "🔷🔷🔷": [0, 0, 0, 0.357, 1.428],
            "🔷🔷🔷🔷": [0, 0, 0, 0.333, 1.332],
            "⭐": [0, 0, 0, 0.321, 1.286],
            "⭐⭐": [0, 0, 0, 0.055, 0.222],
            "⭐⭐⭐": [0, 0, 0.222, 0.888],
            "👑": [0, 0, 0.013, 0.053]
        };

        // Rarity-based pull rates for rare packs (adjust as needed)
        const rarePullRates = {
            "🔷": [0, 0, 0, 0, 0],
            "🔷🔷": [0, 0, 0, 0, 0],
            "🔷🔷🔷": [0, 0, 0, 0, 0],
            "🔷🔷🔷🔷": [0, 0, 0, 0, 0],
            "⭐": [5.263, 5.263, 5.263, 5.263, 5.263],
            "⭐⭐": [5.263, 5.263, 5.263, 5.263, 5.263],
            "⭐⭐⭐": [5.263, 5.263, 5.263, 5.263, 5.263],
            "👑": [5.263, 5.263, 5.263, 5.263, 5.263]
        };

        function pullCard(card, position, packType, isRarePack) {
            const rarityPullRates = isRarePack ? rarePullRates : regularPullRates;
            if (card.pack === 'All' || card.pack === packType) {
              const pullRate = rarityPullRates[card.rarity][position - 1] / 100;
              let randomNum = Math.random();
          
              return randomNum <= pullRate;
            }
            return false;
          }
          
          function openPack(packType) {
            const isRarePack = Math.random() < 0.0005; // 0.05% chance of a rare pack
            const pack = [];
          
            for (let i = 0; i < 5; i++) {
              let pulledCard = null;
          
              while (!pulledCard) {
                const randomIndex = Math.floor(Math.random() * cards.length);
                const card = cards[randomIndex]; 
          
                if (pullCard(card, i + 1, packType, isRarePack)) { 
                  pulledCard = card;
                  pack.push(card);
                }
              }
            }
          
            return pack;
          }

        // Function to display the opened pack
        function displayPack(pack) {
            const cardDisplay = document.getElementById('card-display');
            cardDisplay.innerHTML = ''; // Clear previous display

            pack.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.innerHTML = `
                    <img src="PTCGP-Compressed/${card.image}" alt="${card.name}">
                    <p>${card.rarity}</p>
                `;
                cardDisplay.appendChild(cardElement);
            });
        }

        // Event listeners for the buttons
        document.getElementById('charizard-button').addEventListener('click', () => {
            const charizardPack = openPack('Charizard');
            displayPack(charizardPack);
        });
        
        document.getElementById('mewtwo-button').addEventListener('click', () => {
            const mewtwoPack = openPack('Mewtwo');
            displayPack(mewtwoPack);
        });
        
        document.getElementById('pikachu-button').addEventListener('click', () => {
            const pikachuPack = openPack('Pikachu');
            displayPack(pikachuPack);
        });
    })
    .catch(error => console.error('Error fetching cards:', error));