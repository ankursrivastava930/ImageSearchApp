const parentDiv = document.querySelector(".images");
const secbtn = document.querySelector("#secbtn");
let page = 1;
let inputData = "";
const key = "HHOfxsi0Fv7POGSj2hR3ZzvzOZZildYBr2lz1rbzQ6c";
const form = document.querySelector("#searchForm");

function searchElement(inputData, page) {
  const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;

  async function fetchUrl() {
    const response = await fetch(apiUrl);
    const output = await response.json();
    console.log(output);
    const answer = output.results;
    if (page === 1) {
      parentDiv.innerHTML = " ";
    }
    answer.forEach((result) => {
      const card = document.createElement("div");
      card.className = "cards";
      const img = document.createElement("img");
      img.id = "img";

      img.src = result.urls.small;
      img.alt = result.alt_description;
      const imgLink = document.createElement("a");
      imgLink.href = result.links.html;
      imgLink.id = "imgLink";
      imgLink.target = "_blank";
      imgLink.innerHTML = result.alt_description;
      // imgLink.appendChild(img); // Append the image to the link, not the card
      card.appendChild(img);
      card.appendChild(imgLink);
      parentDiv.appendChild(card);
    });

    page++;

    if (page > 1) {
      secbtn.style.opacity = "1";
    }
  }

  fetchUrl(); // Call the fetchUrl function to make the API request
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  const input = document.querySelector("input");
  inputData = input.value;
  if (inputData === "") {
    parentDiv.innerHTML = "Please enter a search term.";
  } else searchElement(inputData, page);
});

secbtn.addEventListener("click", (e) => {
  page++;
  searchElement(inputData, page);
});
