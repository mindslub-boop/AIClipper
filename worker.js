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
    * {
      box-sizing: border-box;
    }

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

    .subtitle {
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

    input {
      margin-top: 20px;
      max-width: 100%;
    }

    button {
      margin-top: 25px;
      padding: 14px 28px;
      border: none;
      border-radius: 10px;
      background: white;
      color: black;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.85;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    #status {
      margin-top: 25px;
      color: #aaa;
      min-height: 24px;
    }

    .file-name {
      margin-top: 15px;
      color: #ddd;
      word-break: break-word;
    }
  </style>
</head>

<body>

  <div class="container">

    <h1>AIClipper 🚀</h1>

    <p class="subtitle">
      Turn long videos into short clips with AI.
    </p>

    <div class="upload">

      <h2>Upload your video</h2>

      <input
        type="file"
        id="video"
        accept="video/*"
      >

      <div class="file-name" id="filename"></div>

      <button id="analyzeBtn" onclick="analyze()">
        Analyze Video
      </button>

      <p id="status"></p>

    </div>

  </div>

<script>

const videoInput = document.getElementById("video");
const filename = document.getElementById("filename");
const status = document.getElementById("status");
const button = document.getElementById("analyzeBtn");

videoInput.addEventListener("change", () => {

  const file = videoInput.files[0];

  if (!file) {
    filename.textContent = "";
    return;
  }

  const sizeMB = (file.size / 1024 / 1024).toFixed(1);

  filename.textContent =
    file.name + " (" + sizeMB + " MB)";

});

async function analyze() {

  const file = videoInput.files[0];

  if (!file) {
    status.textContent = "Please select a video first.";
    return;
  }

  button.disabled = true;

  status.textContent =
    "Preparing your video...";

  try {

    const formData = new FormData();

    formData.append("video", file);

    const response = await fetch("/analyze", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Upload failed.");
    }

    status.textContent =
      "Video uploaded successfully!";

    console.log(data);

  } catch (error) {

    status.textContent =
      "Error: " + error.message;

  }

  button.disabled = false;

}

</script>

</body>
</html>
`;

    const url = new URL(request.url);

    // Test endpoint
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=UTF-8"
        }
      });
    }

    // Video upload endpoint
    if (request.method === "POST" && url.pathname === "/analyze") {

      try {

        const formData = await request.formData();

        const video = formData.get("video");

        if (!video) {
          return Response.json(
            { error: "No video was uploaded." },
            { status: 400 }
          );
        }

        return Response.json({
          success: true,
          filename: video.name,
          size: video.size,
          message: "Video received successfully."
        });

      } catch (error) {

        return Response.json(
          {
            error: error.message
          },
          {
            status: 500
          }
        );

      }

    }

    return new Response("Not Found", {
      status: 404
    });

  }
};
