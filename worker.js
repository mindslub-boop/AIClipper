export default {
  async fetch(request) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AIClipper</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f0f0f;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      width: 90%;
      max-width: 700px;
      text-align: center;
    }

    h1 {
      font-size: 48px;
      margin-bottom: 10px;
    }

    p {
      color: #aaa;
      font-size: 18px;
    }

    .upload {
      margin-top: 40px;
      padding: 50px 30px;
      border: 2px dashed #444;
      border-radius: 20px;
      background: #181818;
    }

    button {
      margin-top: 20px;
      padding: 14px 28px;
      border: none;
      border-radius: 10px;
      background: white;
      color: black;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.85;
    }

    input {
      margin-top: 20px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>AIClipper 🚀</h1>
    <p>Turn long videos into short clips with AI.</p>

    <div class="upload">
      <h2>Upload your video</h2>
      <input type="file" id="video" accept="video/*">
      <br>
      <button onclick="analyze()">Analyze Video</button>
      <p id="status"></p>
    </div>
  </div>

  <script>
    function analyze() {
      const file = document.getElementById("video").files[0];
      const status = document.getElementById("status");

      if (!file) {
        status.textContent = "Please select a video first.";
        return;
      }

      status.textContent = "Video selected: " + file.name;
    }
  </script>
</body>
</html>
`;

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8"
      }
    });
  }
};
