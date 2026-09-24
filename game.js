const screen = document.getElementById("screen");
const loading = document.getElementById("loading");

const assets = {
  hibellaCard: "images/hibella-card.jpg",
  hibellaCharacter: "images/hibella-character.png",
  violettaCard: "images/violetta-card.png",
  violettaCharacter: "images/violetta-character.png",
  cardBack: "images/card-back.jpg"
};

const fairyData = {
  hibella: {
    name: "HIBELLA",
    title: "THE FOOL",
    number: "0",
    character: assets.hibellaCharacter,
    card: assets.hibellaCard,
    intro: "Every journey begins with a single step…",
    quote: "She walks where the path has not yet been written.",
    journey: "Your journey through the Fairy Tarot begins.",
    paths: ["🌸 Petal Path","☀️ Sunlit Path","🌿 Whispering Grove"],
    pathText: [
      "A trail of petals curls deeper into the forest…",
      "Golden light spills across a path you have never seen…",
      "Something whispers your name from the trees…"
    ]
  },
  violetta: {
    name: "VIOLETTA",
    title: "THE HIGH PRIESTESS",
    number: "II",
    character: assets.violettaCharacter,
    card: assets.violettaCard,
    intro: "Some paths bloom beneath the moonlight…",
    quote: "She listens where the moonlight speaks without words.",
    journey: "Your path through the Fairy Tarot continues.",
    paths: ["💜 The Violet Garden","🔮 The Hidden Mirror","🕯️ The Whispering Path"],
    pathText: [
      "Violet flowers open along a secret garden path…",
      "The mirror reflects something that has not happened yet…",
      "A whisper leads you deeper between the ancient trees…"
    ]
  }
};

function show(html, bg="forest") {
  screen.className = `screen scene ${bg}`;
  screen.innerHTML = html;
  screen.classList.remove("hidden");
}

function button(label, fn, cls="") {
  const b = document.createElement("button");
  b.className = "btn " + cls;
  b.textContent = label;
  b.addEventListener("click", fn);
  return b;
}

function home() {
  show(`
    <div class="overlay"></div>
    <div class="center">
      <div class="panel fade">
        <div class="small">A FAIRY TAROT TEST BUILD</div>
        <h1 class="title">FAIRY TAROT</h1>
        <div class="subtitle">✨ Choose a fairy and begin your magical journey ✨</div>
        <div id="homeButtons"></div>
      </div>
    </div>
  `);
  document.getElementById("homeButtons").append(
    button("🎴 DRAW A CARD", drawCard)
  );
}

function drawCard() {
  show(`
    <div class="overlay"></div>
    <button class="back" id="backHome">← Home</button>
    <div class="center">
      <div class="panel fade">
        <div class="small">THE FAIRY TAROT</div>
        <h2 style="color:var(--cream);letter-spacing:.12em">DRAW YOUR CARD</h2>
        <p class="subtitle">Turn the card to discover which fairy is waiting for you.</p>
        <img id="cardBack" class="draw-card pop" src="${assets.cardBack}" alt="Fairy Tarot card back">
        <div><button class="btn" id="drawButton">✨ DRAW CARD ✨</button></div>
      </div>
    </div>
  `, "draw");

  document.getElementById("backHome").onclick = home;
  document.getElementById("cardBack").onclick = revealPicker;
  document.getElementById("drawButton").onclick = revealPicker;
}

function revealPicker() {
  show(`
    <div class="overlay"></div>
    <button class="back" id="backDraw">← Back</button>
    <div class="center">
      <div class="panel fade">
        <div class="small">CHOOSE YOUR CARD</div>
        <h2 style="color:var(--cream);letter-spacing:.12em">WHO WILL YOU MEET?</h2>
        <div class="card-grid">
          <button class="card-choice" id="hibellaChoice">
            <img src="${assets.hibellaCard}" alt="Hibella — The Fool">
          </button>
          <button class="card-choice" id="violettaChoice">
            <img src="${assets.violettaCard}" alt="Violetta — The High Priestess">
          </button>
        </div>
        <div class="small">Tap a tarot card to reveal its fairy.</div>
      </div>
    </div>
  `, "draw");

  document.getElementById("backDraw").onclick = drawCard;
  document.getElementById("hibellaChoice").onclick = () => revealFairy("hibella");
  document.getElementById("violettaChoice").onclick = () => revealFairy("violetta");
}

function revealFairy(which) {
  const f = fairyData[which];
  show(`
    <div class="overlay"></div>
    <button class="back" id="backCards">← Cards</button>
    <div class="fairy-wrap">
      <img class="fairy pop" src="${f.character}" alt="${f.name}">
    </div>
    <div class="story-bottom">
      <div class="storybox pop">
        <h2>${f.name}</h2>
        <p>“${f.intro}”</p>
        <div id="continue"></div>
      </div>
    </div>
  `, "forest");

  document.getElementById("backCards").onclick = revealPicker;
  document.getElementById("continue").append(
    button("✨ CONTINUE ✨", () => tarotIntro(which))
  );
}

function tarotIntro(which) {
  const f = fairyData[which];
  show(`
    <div class="overlay"></div>
    <button class="back" id="backFairy">← Back</button>
    <div class="fairy-wrap">
      <img class="fairy pop" src="${f.character}" alt="${f.name}">
    </div>
    <div class="story-bottom">
      <div class="storybox pop">
        <div class="small">${f.name}</div>
        <h2>${f.title}</h2>
        <p>“${f.quote}”</p>
        <p class="small">${f.journey}</p>
        <div id="begin"></div>
      </div>
    </div>
  `, "forest");

  document.getElementById("backFairy").onclick = () => revealFairy(which);
  document.getElementById("begin").append(
    button("✦ BEGIN JOURNEY ✦", () => paths(which))
  );
}

function paths(which) {
  const f = fairyData[which];
  const intro = which === "hibella"
    ? "The forest opens before you, glowing with warm petals and morning light."
    : "The forest grows quiet beneath a violet moon. A hidden mirror catches the light.";

  show(`
    <div class="overlay"></div>
    <button class="back" id="backIntro">← Card</button>
    <div class="fairy-wrap">
      <img class="fairy pop" src="${f.character}" alt="${f.name}">
    </div>
    <div class="story-bottom">
      <div class="storybox fade">
        <h2>THE JOURNEY BEGINS</h2>
        <p>${intro}</p>
        <div class="path-grid" id="paths"></div>
      </div>
    </div>
  `, "forest");

  document.getElementById("backIntro").onclick = () => tarotIntro(which);

  const grid = document.getElementById("paths");
  f.paths.forEach((label, i) => {
    grid.append(button(label, () => pathMessage(which, i)));
  });
}

function pathMessage(which, i) {
  const f = fairyData[which];
  show(`
    <div class="overlay"></div>
    <button class="back" id="backPaths">← Paths</button>
    <div class="center">
      <div class="panel fade">
        <div class="small">${f.name} • PATH ${i + 1}</div>
        <h1 class="title" style="font-size:clamp(2rem,7vw,4rem)">✨</h1>
        <div class="storybox">
          <h2>${which === "hibella" ? "THE FOREST CALLS" : "THE MOONLIGHT ANSWERS"}</h2>
          <p>${f.pathText[i]}</p>
          <p class="small">This is where the next chapter will go.</p>
        </div>
        <div id="again"></div>
      </div>
    </div>
  `, "forest");

  document.getElementById("backPaths").onclick = () => paths(which);
  document.getElementById("again").append(
    button("↩ CHOOSE ANOTHER PATH", () => paths(which))
  );
}

setTimeout(() => {
  loading.classList.add("hidden");
  home();
}, 1800);
