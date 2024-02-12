"use strict";
const btn = document.querySelector(".btn");
const erorMessage = document.querySelector(".error-message");
const imgContainer = document.querySelector(".gallery");

//!API Key-->  y8_ImlSfKpyPYFXSiEVrIpjuPgJqfoZdqRLv_1H1Bh4
////////////////////////////////////////////////////////////
const fetchImage = async function () {
  try {
    //removing all previuos images
    imgContainer.innerHTML = "";

    //Adding a loading spinner
    const spinner = `<img src="./spinner.svg" alt="spinner" style="width: 50px;">`;
    imgContainer.insertAdjacentHTML("afterbegin", spinner);

    //Hidding the button
    btn.style.display = "none";

    //get user i-nput each time when user click the button
    const userInput = document.querySelector(".input").value;

    //setting limits for images
    if (userInput > 10 || userInput < 1)
      throw new Error(`Please enter number below 10`);

    //Fetching data
    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=${userInput}&page=${Math.trunc(
        Math.random() * 1000 + 1
      )}&client_id=y8_ImlSfKpyPYFXSiEVrIpjuPgJqfoZdqRLv_1H1Bh4`
    );

    if (!response.ok)
      throw new Error(
        `Not able to get images Please try again ${response.status}`
      );
    const data = await response.json();

    //hidding loading spinner
    imgContainer.innerHTML = "";

    //Displaying image
    data.forEach((img) => {
      const html = `
      <img src="${img.urls.small}" alt="image">
      `;
      imgContainer.insertAdjacentHTML("afterbegin", html);
    });

    //dispalying button and imageContainer, hiding error message if it is visible
    btn.style.display = "block";
    imgContainer.style.display = "block";
    erorMessage.style.display = "none";
  } catch (err) {

    //displaying button
    btn.style.display = "block";

    //displaying error
    erorMessage.style.display = "block";
    erorMessage.textContent = `${err.message}`;
  }
};

btn.addEventListener("click", fetchImage);
