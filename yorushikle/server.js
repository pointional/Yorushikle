const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 使用 JSON 解析中间件
app.use(bodyParser.json());

// 歌曲数据
const songs = [
  { name: "Parade", segments: ["1.1.mp3", "1.2.mp3", "1.3.mp3"] },
  { name: "負け犬にアンコールはいらない", segments: ["2.1.mp3", "2.2.mp3", "2.3.mp3"] },
  { name: "嘘月", segments: ["3.1.mp3", "3.2.mp3", "3.3.mp3"] },
  { name: "憂一乗", segments: ["4.1.mp3", "4.2.mp3", "4.3.mp3"] }
];

// 返回一个随机的歌曲 ID 和音频片段
app.get('/get-song', (req, res) => {
  const songIndex = Math.floor(Math.random() * songs.length);
  res.json({
    songId: songIndex,
    segments: songs[songIndex].segments
  });
});

// 验证用户的猜测
app.post('/submit-guess', (req, res) => {
  const { songId, guess } = req.body;
  const correctAnswer = songs[songId].name.toLowerCase();
  if (guess.toLowerCase() === correctAnswer) {
    res.json({ result: 'correct' });
  } else {
    res.json({ result: 'incorrect' });
  }
});

// 服务器监听端口
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
