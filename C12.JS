/* 
    ****** Challenge #12 *******

    !! TEBAK TEBAKAN !!
      Buatlah sebuah Permainan tebak-tebakan. Gunakan file data JSON untuk menyimpan daftar pertanyaan dan Jawaban. File Data JSON
      sudah disertakan di github, ikuti aturan dibawah ini:
*/

// !! Driver Code !!
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban: ",
});

let collectQuestion = [];
let searchIndex = 0;
let wrongAnswer = 0;
let skippedQuestion = [];

function readFileJSON() {
  try {
    const data = fs.readFileSync("data.json", "utf-8");

    const parsedData = JSON.parse(data);
    collectQuestion = parsedData.collectQuestion;
    startGame();
  } catch (error) {
    console.log(
      "Tolong Sertakan nama file sebagai inputan soalnya, Misalnya 'node solution.js data.json"
    );
    startGame();
    // rl.prompt();
    // process.exit(1);
  }
}

function showQuestions() {
  if (searchIndex >= collectQuestion.length) {
    if (skippedQuestion.length > 0) {
      collectQuestion = skippedQuestion;
      skippedQuestion = [];
      searchIndex = 0;
      console.log("Pertanyaan: ", collectQuestion[searchIndex].pertanyaan);
    } else {
      //   endGame();
      rl.close();
    }
    return;
  }
  console.log("Pertanyaan: ", collectQuestion[searchIndex].pertanyaan);
}


function startGame() {
  console.log(`Selamat datang di permainan Tebak-tebakan.`);
  console.log(`Kamu akan diberikan pertanyaan dari file ini 'data.json'`);
  console.log(`Untuk Bermain, jawablah dengan jawaban yang sesuai.`);
  console.log(
    `Gunakan 'skip' untuk menangguhkan pertanyaan, dan di akhir pertanyaan akan ditanyakan lagi`
  );
  showQuestions();
}

readFileJSON();
rl.prompt();

rl.on("line", (input) => {
  if (searchIndex >= collectQuestion.length && skippedQuestion.length === 0) {
    rl.close;
    return;
  }

  const currentQuestion = collectQuestion[searchIndex];

  if (input.trim().toLowerCase() === "skip") {
    skippedQuestion.push(currentQuestion);
  } else if (input.toLowerCase() === currentQuestion.jawaban.toLowerCase()) {
    console.log("Anda Beruntung!");
  } else {
    wrongAnswer++;
    if (wrongAnswer > 0) {
      console.log(
        `Anda Kurang Beruntung! anda telah salah ${wrongAnswer} kali, silahkan coba lagi`
      );
    }
    return rl.prompt()
  }
  

  searchIndex++;
  showQuestions();
});

rl.on("close", () => {
  process.exit(0);
});
