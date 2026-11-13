const memories = [
  {
    title: "Nosso primeiro mês",
    note: "O começo de uma história que eu nem imaginava que ficaria tão bonita. Desde o primeiro passeio, estar com você fez tudo parecer mais especial.",
    photo: "janeiro.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no primeiro mês"
  },
  {
    title: "Dois meses de nós",
    note: "Nosso primeiro jantar juntos no apartamento. Uma noite simples, mas cheia daquela felicidade boa de construir momentos ao seu lado.",
    photo: "fevereiro.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no segundo mês"
  },
  {
    title: "Três meses de amor",
    note: "No Dia da Mulher, celebro a mulher incrível que você é. Tenho orgulho de caminhar ao lado de alguém tão forte, carinhosa e especial.",
    photo: "março.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no terceiro mês"
  },
  {
    title: "Quatro meses juntinhos",
    note: "Você foi o melhor presente de aniversário que a vida poderia me dar. Seu carinho transforma qualquer dia em motivo para sorrir.",
    photo: "abril.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no quarto mês"
  },
  {
    title: "Cinco meses de carinho",
    note: "Nosso passeio pelo Centro Cultural Vergueiro virou mais uma lembrança que guardo com carinho. Com você, até um passeio comum vira história.",
    photo: "maio.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no quinto mês"
  },
  {
    title: "Seis meses de nós",
    note: "O Dia dos Namorados e tantos momentos marcantes. Foi lindo dividir esse dia com você e perceber, mais uma vez, como somos felizes juntos.",
    photo: "junho.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no sexto mês"
  },
  {
    title: "Sete meses de amor",
    note: "A festa julina na casa da tia Sueli foi ainda mais gostosa porque pude estar perto de você e conhecer um pouco mais da sua família.",
    photo: "julho.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no sétimo mês"
  },
  {
    title: "Oito meses juntinhos",
    note: "O aniversário da Sofia foi um dia incrível — e o Caetano certamente ajudou a deixar tudo mais divertido. Amo viver esses momentos com você.",
    photo: "agosto.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no oitavo mês"
  },
  {
    title: "Nove meses de história",
    note: "Você conheceu a minha vó, e ainda tivemos nosso momento com clima de anos 80. São lembranças assim que fazem nossa história ser só nossa.",
    photo: "setembro.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no nono mês"
  },
  {
    title: "Dez meses de nós",
    note: "Nosso domingo no CERET: conversas, abraços e muito amor. Obrigado por ser meu lugar feliz. Que este livro seja só o começo de tantos capítulos juntos.",
    photo: "outubro.jpeg",
    alt: "Uma lembrança especial de Robson e Nataly no décimo mês"
  }
];

const pagesContainer = document.getElementById("pages");
const cover = document.querySelector(".cover-sheet");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageCounter = document.getElementById("pageCounter");
const progress = document.getElementById("progress");
const book = document.getElementById("book");

const sheets = [cover];
let currentPage = 0;
let isAnimating = false;
const turnDuration = 850;

function makeMemoryPage(memory, index) {
  const sheet = document.createElement("article");
  sheet.className = "sheet memory-sheet";
  sheet.setAttribute("aria-label", `Página ${index + 1}: ${memory.title}`);

  const content = document.createElement("div");
  content.className = "memory-page";

  const kicker = document.createElement("p");
  kicker.className = "memory-kicker";
  kicker.textContent = "um capítulo da nossa história";

  const heading = document.createElement("h2");
  heading.textContent = memory.title;

  const month = document.createElement("p");
  month.className = "month-label";
  month.textContent = `Mês ${index + 1} ♡`;

  const frame = document.createElement("div");
  frame.className = "photo-frame";

  const image = document.createElement("img");
  image.src = memory.photo;
  image.alt = memory.alt;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    frame.classList.add("is-missing");
    image.hidden = true;
  });

  const placeholder = document.createElement("span");
  placeholder.className = "photo-placeholder";
  placeholder.textContent = "Adicione aqui uma foto deste mês.";

  const message = document.createElement("p");
  message.className = "message";
  message.textContent = memory.note;

  const number = document.createElement("span");
  number.className = "page-number";
  number.textContent = String(index + 1).padStart(2, "0");

  frame.append(image, placeholder);
  content.append(kicker, heading, month, frame, message, number);
  sheet.append(content);
  return sheet;
}

memories.forEach((memory, index) => {
  const sheet = makeMemoryPage(memory, index);
  pagesContainer.append(sheet);
  sheets.push(sheet);
});

function updateControls() {
  prevButton.disabled = isAnimating || currentPage === 0;
  nextButton.disabled = isAnimating || currentPage === sheets.length - 1;

  if (currentPage === 0) {
    pageCounter.textContent = "Capa";
  } else {
    pageCounter.textContent = `Mês ${currentPage} de 10`;
  }

  progress.style.width = `${(currentPage / (sheets.length - 1)) * 100}%`;
}

function turnPage(direction) {
  if (isAnimating) return;

  const nextPage = currentPage + direction;
  if (nextPage < 0 || nextPage >= sheets.length) return;

  isAnimating = true;
  const sheet = direction > 0 ? sheets[currentPage] : sheets[nextPage];

  if (direction > 0) {
    sheet.style.zIndex = String(30 - currentPage);
    requestAnimationFrame(() => sheet.classList.add("turned"));
  } else {
    sheet.style.zIndex = "30";
    requestAnimationFrame(() => sheet.classList.remove("turned"));
  }

  currentPage = nextPage;
  updateControls();

  window.setTimeout(() => {
    if (direction > 0) sheet.style.zIndex = String(currentPage === sheets.length - 1 ? 1 : 30 - (currentPage + 1));
    isAnimating = false;
    updateControls();
  }, turnDuration);
}

prevButton.addEventListener("click", () => turnPage(-1));
nextButton.addEventListener("click", () => turnPage(1));
book.addEventListener("click", event => {
  if (event.target.closest(".sheet")) {
    turnPage(1);
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") turnPage(1);
  if (event.key === "ArrowLeft") turnPage(-1);
});

let touchStartX = 0;
let touchStartY = 0;
book.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

book.addEventListener("touchend", event => {
  const deltaX = event.changedTouches[0].clientX - touchStartX;
  const deltaY = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
    turnPage(deltaX < 0 ? 1 : -1);
  }
}, { passive: true });

// Empilha as folhas com a capa por cima e a primeira lembrança logo abaixo.
sheets.forEach((sheet, index) => {
  sheet.style.zIndex = String(30 - index);
});

updateControls();
