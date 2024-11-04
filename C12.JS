/* 
    ****** Challenge #12 *******

    !! TEBAK TEBAKAN !!
      Buatlah sebuah Permainan tebak-tebakan. Gunakan file data JSON untuk menyimpan daftar pertanyaan dan Jawaban. File Data JSON
      sudah disertakan di github, ikuti aturan dibawah ini:
*/

// !! Driver Code !!

// Inisialisasi dan Setup
const readline = require("readline"); // Untuk Input/Output Console
const fs = require("fs"); // Untuk Membaca File

// Membuat interface untuk membaca input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban: ",
});

// Validasi File Input
const fileName = process.argv[2]; // Mengambil nama file dari argument CLI

// Cek Apakah file disertakan
if (!fileName) {
  console.log("Tolong sertakan nama file sebagai inputan soalnya");
  console.log("Misalnya 'node solution.js data.json");
  rl.close;
}

// Variable State Game
let collectQuestion = []; // Array untuk menyimpan pertanyaan dari File JSON
let searchIndex = 0; // Index pertanyaan yang sedang Aktif
let wrongAnswer = 0; // Menghitung kesalahan untuk pertanyaan saat ini
let skippedQuestion = []; // Menyimpan pertanyaan yang di SKIP

// Membaca dan Parsing file JSON
try {
  const data = fs.readFileSync(fileName, "utf-8");

  collectQuestion = JSON.parse(data);

} catch (error) {
  console.log(`Error: Tidak dapat membaca file ${fileName}`);

  rl.close;
}

// Fungsi Menampilkan Pertanyaan
function showQuestions() {
  // Cek apakah permainan Selesai
  if (searchIndex >= collectQuestion.length && skippedQuestion.length === 0) {
    console.log("Anda Berhasil!");
    rl.close();
    return;
  }

  // Menampilkan pertanyaan dari daftar yang di skip atau pertanyaan reguler
  if (searchIndex >= collectQuestion.length) {
    const passQuestion = skippedQuestion[0];
    console.log("Pertanyaan: ", passQuestion.pertanyaan);
  } else {
    console.log("Pertanyaan: ", collectQuestion[searchIndex].pertanyaan);
  }
  rl.prompt()
}

// Penanganan Input User
rl.on("line", (input) => {
  let currentQuestion;
 
  // Menentukan Pertanyaan yang sedang aktif
  if (searchIndex >= collectQuestion.length) {
    currentQuestion = skippedQuestion[0];
  } else {
    currentQuestion = collectQuestion[searchIndex];
  }
  
  // Penanganan Perintah Skip
  if (input.toLowerCase() === "skip") {
    if (searchIndex < collectQuestion.length) {
      skippedQuestion.push(collectQuestion[searchIndex]);
    }
    searchIndex++;
    wrongAnswer = 0

    // Cek Apakah Permainan Selesai
    if (searchIndex >= collectQuestion.length && skippedQuestion.length === 0) {
      console.log("Anda Berhasil!");
      rl.close;
      return;
    }
    showQuestions();
    return;
  }
  

    // Cek Jawaban
  if (input.toLowerCase() === currentQuestion.jawaban.toLowerCase()) {
    console.log("Anda Beruntung!");
    if (searchIndex >= collectQuestion.length) {
      skippedQuestion.shift(); // Hapus Pertanyaan yang sudah dijawab dari daftar yang di SKIP
    }
    searchIndex++;
    wrongAnswer = 0 // Reset hitungan Error

    // Cek apakah permainan selesai
    if (searchIndex >= collectQuestion.length && skippedQuestion.length === 0) {
      console.log("Anda Berhasil!");
      rl.close();
      return;
    }
    showQuestions();
  } else {

    wrongAnswer++
    console.log(`Anda Kurang Beruntung! anda telah salah ${wrongAnswer} kali, Silahkan Coba lagi`);
    showQuestions();
  }
});


rl.on("close", () => {
  process.exit(0);
});

console.log(
  "Selamat datang di permainan Tebak-tebakan. Kami akan diberikan pertanyaan dari file ini 'data.json'"
);
console.log("Untuk Bermain, jawablah dengan jawaban yang sesuai");
console.log(
  'Gunakan "skip" untuk menangguhkan pertanyaan, dan di akhir pertanyaan akan ditanyakan lagi '
);

showQuestions();
