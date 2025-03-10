const songs = [
  { name: ["パレード", "Parade", "游行"], segments: ["1.1.mp3", "1.2.mp3", "1.3.mp3"] },
  { name: ["败犬不需要安可", "負け犬にアンコールはいらない"], segments: ["2.1.mp3", "2.2.mp3", "2.3.mp3"] },
  { name: ["嘘月"], segments: ["3.1.mp3", "3.2.mp3", "3.3.mp3"] },
  { name: ["憂一乗", "夏一乘"], segments: ["4.1.mp3", "4.2.mp3", "4.3.mp3"] }
];

let currentSong = 0;
let score = 0;
let currentSegment = 1;

function loadSong() {
  currentSegment = 1;
  document.getElementById('segment1').style.display = 'block';
  document.getElementById('segment2').style.display = 'none';
  document.getElementById('segment3').style.display = 'none';
  document.getElementById('guessInput').value = '';
  document.getElementById('songNameDisplay').style.display = 'none';

  document.getElementById('audioSegment1').src = songs[currentSong].segments[0];
  document.getElementById('audioSegment2').src = songs[currentSong].segments[1];
  document.getElementById('audioSegment3').src = songs[currentSong].segments[2];

  document.getElementById('songInfo').innerText = `今天的挑战: 歌曲 ${currentSong + 1}/5`;
  document.getElementById('dayInfo').innerText = `Day #${currentSong + 1}`;
}

function playSegment(segment) {
  currentSegment = segment;
  const audioElement = document.getElementById('audioSegment' + segment);
  audioElement.play();
}

function submitGuess() {
  const guess = document.getElementById('guessInput').value.trim().toLowerCase();
  const isCorrect = songs[currentSong].name.some(songName => songName.toLowerCase() === guess);

  if (isCorrect) {
    score++;
    window.location.href = `result.html?score=${score}&song=${songs[currentSong].name[0]}`;
  } else {
    alert("猜错了，再试试看吧！");
    nextSong();
  }
}

function nextSegment() {
  if (currentSegment < 3) {
    currentSegment++;
    document.getElementById('segment' + currentSegment).style.display = 'block';
    playSegment(currentSegment);
  } else {
    nextSong();
  }
}

function nextSong() {
  if (currentSong < songs.length - 1) {
    currentSong++;
    loadSong();
  } else {
    showResults();
  }
}

function showResults() {
  document.body.innerHTML = `
    <div style="text-align: center; padding: 50px; color: #fff;">
      <h1>游戏结束</h1>
      <p style="font-size: 24px;">你的得分：${score} / ${songs.length}</p>
      <button onclick="location.reload()">再玩一次</button>
    </div>
  `;
}

window.onload = loadSong;
