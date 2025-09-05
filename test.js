const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class ="btn">${el}</span`);

  console.log(htmlElement.join(" "));
};
//convert this array to string using join method.
const synonyms = ["hello", "hi", "dear-me"];
createElement(synonyms);
