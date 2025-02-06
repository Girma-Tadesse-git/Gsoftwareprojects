let players = [];
let dares = [];
let currentDareIndex = 0;
let currentPlayerIndex = 0;

// Predefined Dares (Expanded List)
const predefinedDares = [
  "Do 15 squats while making an animal sound.",
  "Hold a plank for 30 seconds without breaking.",
  "Run around the room three times while clapping your hands.",
  "Balance on one leg for 20 seconds while reciting the alphabet backward.",
  "Perform a handstand (or attempt one) against the wall.",
  "Show a funny or awkward childhood photo to everyone.",
  "Call your crush and say something silly (e.g., 'I just saw a squirrel that looks exactly like you').",
  "Post a random emoji-only status on social media.",
  "Sing a romantic song to someone in the room.",
  "Pretend to flirt with an imaginary person for 30 seconds.",
  "Write a love letter to someone in the room (can be funny or serious).",
  "Give a playful nickname to everyone in the group.",
  "Do an impression of a famous celebrity.",
  "Tell a story using only words that start with the letter 'S'.",
  "Act out your favorite movie scene without speaking.",
  "Try to juggle three objects for 10 seconds.",
  "Let someone in the group give you a new hairstyle (temporary).",
  "Do a freestyle rap for 30 seconds.",
  "Mimic the person to your left for the next round.",
  "Wear an outfit chosen by another player for the rest of the game.",
  "Text your ex saying 'I miss you' (don't actually send it).",
  "Draw a picture of the person next to you using your non-dominant hand.",
  "Eat a spoonful of something weird (like ketchup mixed with sugar).",
  "Do a cartwheel (or attempt one).",
  "Make up a dance move and teach it to everyone."
];

// Load saved dares from local storage
function loadSavedDares() {
  const savedDares = localStorage.getItem('savedDares');
  return savedDares ? JSON.parse(savedDares) : [];
}

// Save dares to local storage
function saveDares(dares) {
  localStorage.setItem('savedDares', JSON.stringify(dares));
}

// Clear saved dares from local storage
function clearSavedDares() {
  localStorage.removeItem('savedDares');
}

// Setup Players
document.getElementById('startSetup').addEventListener('click', () => {
  const playerCount = parseInt(document.getElementById('playerCount').value);
  if (playerCount < 2) {
    alert('At least 2 players are required!');
    return;
  }

  // Generate player input forms
  const playerFormsDiv = document.getElementById('playerForms');
  playerFormsDiv.innerHTML = '';
  for (let i = 1; i <= playerCount; i++) {
    const playerDiv = document.createElement('div');
    playerDiv.innerHTML = `
      <h3>Player ${i}</h3>
      <label>Name:</label>
      <input type="text" class="playerName" placeholder="Enter name">
      <label>Gender:</label>
      <select class="playerGender">
        <option value="any">Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <label>Number of Cards:</label>
      <input type="number" class="playerCards" min="1" value="1">
      <button class="generateDaresBtn">Generate Dare Inputs</button>
      <div class="dareInputs"></div>
      <h4>Suggested Dares:</h4>
      <ul class="suggestedDares"></ul>
    `;
    playerFormsDiv.appendChild(playerDiv);

    // Add suggested dares
    const suggestedDaresList = playerDiv.querySelector('.suggestedDares');
    predefinedDares.forEach((dare, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = dare;
      listItem.style.cursor = 'pointer';
      listItem.addEventListener('click', () => {
        const dareInputsDiv = playerDiv.querySelector('.dareInputs');
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.value = dare;
        dareInputsDiv.appendChild(newInput);
      });
      suggestedDaresList.appendChild(listItem);
    });

    // Add event listener to "Generate Dare Inputs" button
    playerDiv.querySelector('.generateDaresBtn').addEventListener('click', (e) => {
      const cardCount = parseInt(e.target.parentElement.querySelector('.playerCards').value);
      const dareInputsDiv = e.target.parentElement.querySelector('.dareInputs');
      dareInputsDiv.innerHTML = ''; // Clear previous inputs

      for (let j = 1; j <= cardCount; j++) {
        const dareInput = document.createElement('input');
        dareInput.type = 'text';
        dareInput.placeholder = `Dare ${j}`;

        // Show/hide suggestions on focus/blur
        const suggestedDares = playerDiv.querySelector('.suggestedDares');
        dareInput.addEventListener('focus', () => {
          suggestedDares.style.display = 'block';
        });

        dareInput.addEventListener('blur', () => {
          setTimeout(() => {
            suggestedDares.style.display = 'none';
          }, 200); // Small delay to allow click on suggestion
        });

        dareInputsDiv.appendChild(dareInput);
      }
    });
  }

  // Show dare input section
  document.getElementById('setup').style.display = 'none';
  document.getElementById('dareInput').style.display = 'block';
});

// Start Game
document.getElementById('startGame').addEventListener('click', () => {
  const playerForms = document.querySelectorAll('#playerForms > div');
  players = [];
  dares = [];

  playerForms.forEach((form, index) => {
    const name = form.querySelector('.playerName').value.trim();
    const gender = form.querySelector('.playerGender').value;
    const dareInputs = form.querySelector('.dareInputs').querySelectorAll('input');

    if (!name || dareInputs.length === 0) {
      alert(`Please fill in all details and generate dares for Player ${index + 1}`);
      return;
    }

    let hasDares = false;
    dareInputs.forEach(input => {
      const dareText = input.value.trim();
      if (dareText) {
        dares.push(dareText);
        hasDares = true;
      }
    });

    if (!hasDares) {
      alert(`Please write at least one dare for Player ${index + 1}`);
      return;
    }

    players.push({ name, gender });
  });

  if (dares.length === 0) {
    alert('Please write at least one dare!');
    return;
  }

  // Save dares to local storage
  saveDares(dares);

  // Shuffle dares
  dares = shuffleArray(dares);
  currentDareIndex = 0;
  currentPlayerIndex = 0;

  // Update current player display
  document.getElementById('currentPlayer').textContent = players[currentPlayerIndex].name;

  // Show gameplay section
  document.getElementById('dareInput').style.display = 'none';
  document.getElementById('gameplay').style.display = 'block';
});

// Draw Card
document.getElementById('drawCard').addEventListener('click', () => {
  if (currentDareIndex >= dares.length) {
    // Show restart popup
    document.getElementById('gameplay').style.display = 'none';
    document.getElementById('restartPopup').style.display = 'block';
    return;
  }

  // Display current dare
  document.getElementById('currentDare').textContent = dares[currentDareIndex];
  currentDareIndex++;

  // Update current player
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  document.getElementById('currentPlayer').textContent = players[currentPlayerIndex].name;
});

// Restart Game
document.getElementById('restartYes').addEventListener('click', () => {
  location.reload();
});

document.getElementById('restartNo').addEventListener('click', () => {
  document.getElementById('restartPopup').style.display = 'none';
});

// Utility Function: Shuffle Array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load Saved Dares on Page Load
window.addEventListener('load', () => {
  const savedDares = loadSavedDares();
  if (savedDares.length > 0) {
    const confirmLoad = confirm('Saved dares found! Do you want to load them?');
    if (confirmLoad) {
      dares = savedDares;
      alert('Dares loaded successfully!');
    } else {
      clearSavedDares();
    }
  }
});