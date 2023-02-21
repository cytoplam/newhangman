async function start() {
  let secret = await getRandomWord();
  console.log(secret);
  let secretArr = secret.split("");
  let output = document.querySelector("#output");
  let feedback = document.querySelector("#feedback");
  let allGuesses = document.querySelector("#output2");
  let blankArr = [];
  let imageIndex = 0;
  for (let i = 0; i < secretArr.length; i++) {
    blankArr[i] = "_";
  }

  let guesses = []
  output.innerHTML = blankArr.join(" ");

  //On keypress, letter entered, enters array
  let letterElem = document.querySelector("#letter")
  letterElem.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
      //If letter is in secret
      if (secretArr.includes(letterElem.value)) {
        for (let i = 0; i < secretArr.length; i++) {
          if (secretArr[i] == letterElem.value) {
            blankArr[i] = secretArr[i];
          }
        }
        {
          feedback.innerHTML = "You are: Correct!"
          output.innerHTML = blankArr.join(" ")
        }
        // If letter is not in secret
      } else {
        feedback.innerHTML = "You are: Incorrect."
        output.innerHTML = blankArr.join(" ");
        imageIndex++;
      }
      // Feeback if win
      if (!blankArr.includes("_")) {
        feedback.innerHTML = "You win!"
        letterElem.disabled = true;
        letterElem.value = " ";
      }
      //Ensures no dupicate letters
      if (guesses.includes(letterElem.value)) {
        feedback.innerHTML = "Please enter a new character"
        if (!secretArr.includes(letterElem.value)) {
          imageIndex--
        }
      } else {
        //Counts all guesses in separate array
        guesses.push(letterElem.value);
        allGuesses.innerHTML = "Guesses: " + guesses;
      }
      // Limits number of guesses
      if (imageIndex <= 6) {
        let hangmanImageElem = document.querySelector("#hangmanImg");
        hangmanImageElem.src = "assets/images/hangman" + imageIndex + ".png";
      }
      // Feedbck if lost
      if (imageIndex == 6) {
        feedback.innerHTML = "You lost :( Try again!"
        output.innerHTML = "The answer was " + secretArr.join("") + "."
        letterElem.disabled = true;
        letterElem.value = " ";
      }
    }
  })
}

//Function to pull secret word from other site
async function getRandomWord() {

  //Pulling word from site w/ async
  const wordsGit = await fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt")
  const wordsTxt = await wordsGit.text();
  const wordsList = wordsTxt.split("\n");
  let filteredWords = [];

  //Only lets word be between 5 and 8 characters
  for (let i = 0; i < wordsList.length; i++) {
    let word = wordsList[i];
    if (word.length >= 5 && word.length <= 8) {
      filteredWords.push(word);
    }
  }

  //Randomizes word length
  const randomNum = Math.floor(Math.random() * filteredWords.length);
  const randomWord = filteredWords[randomNum];
  return randomWord;
}

start()
