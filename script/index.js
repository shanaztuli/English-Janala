//promise of response
//promise of jason data

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  // used back-tic because it's dynamic if anyone click.
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `  <div
        class="text-center  col-span-full rounded-xl py-10 r space-y-6 font-bangla"
      >
      <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>`;

    return;
  }

  //
  //   {
  //     "id": 166,
  //     "level": 6,
  //     "word": "Recalcitrant",
  //     "meaning": null,
  //     "pronunciation": "রিক্যালসিট্রান্ট"
  // }
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
 <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "অর্থ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "শব্দ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1a91ff1a] hover:bg-sky-300">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#4196e61a] hover:bg-sky-300">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
`;
    wordContainer.append(card);
  });
};
//
const displayLesson = (lessons) => {
  //1. get the container
  //2. get into every lessons
  //3.create Element
  //4.append into container

  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = ` <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;

    levelContainer.append(btnDiv);
  }
};

//call the function
loadLessons();
