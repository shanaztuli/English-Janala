//promise of response
//promise of jason data

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
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
    btnDiv.innerHTML = ` <button href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
    `;

    levelContainer.append(btnDiv);
  }
};

//call the function
loadLessons();
