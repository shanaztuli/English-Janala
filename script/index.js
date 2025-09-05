const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);

  return htmlElement.join(" ");
};
//voice
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

//🌋🌋
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

//promise of response
//promise of jason data
//starts.1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

//function🌋🌋🌋🌋🌋🌋🌋
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
///**********************************************************************************************************************************************8 */
// 3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣
const loadLevelWord = (id) => {
  manageSpinner(true);
  // used back-tic because it's dynamic if anyone click.
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      //   console.log(clickBtn);
      clickBtn.classList.add("active"); // add active class
      displayLevelWord(data.data);
    });
};
///
//function
//5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣5️⃣
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
//
/*{word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার', level: 1, sentence: 'The kids were eager to open their gifts.', …}id: 5level: 1meaning: "আগ্রহী"partsOfSpeech: "adjective"points: 1pronunciation: "ইগার"sentence: "The kids were eager to open their gifts."synonyms: (3) ['enthusiastic', 'excited', 'keen']word: "Eager"[[Prototype]]: Object*/
//************************************************************************************************************************* */
//6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="">
            <h2 class="text-2xl font-bold">
             ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="text-2xl font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="text-2xl font-bold">example</h2>
            <p> ${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="text-2xl font-bold">Synonyms</h2>
           <div class="">
          ${createElement(word.synonyms)}
          </div>
          </div>
  
  
  `;
  document.getElementById("word_modal").showModal();
};
//***********************************************************************************************************************8 */
// 4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣
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
    manageSpinner(false);
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
    // console.log(word);
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
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1a91ff1a] hover:bg-sky-300">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${
            word.word
          }')" class="btn bg-[#4196e61a] hover:bg-sky-300">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
`;
    wordContainer.append(card);
  });
  manageSpinner(false);
};
//********************************************************************* */
// 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣
const displayLesson = (lessons) => {
  //1. get the container
  //2. get into every lessons
  //3.create Element
  //4.append into container

  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = ` <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;

    levelContainer.append(btnDiv);
  }
};

//call the function
loadLessons();

//7️⃣🕢🕢🕢🕢🕢🕢
document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLevelWord(filterWords);
    });
});
