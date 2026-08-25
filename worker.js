export default {
  async fetch(request) {
    return new Response("AIClipper is online! 🚀", {
      headers: {
        "content-type": "text/plain"
      }
    });
  }
};
// AIClipper v1
