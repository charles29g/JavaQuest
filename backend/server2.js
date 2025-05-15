import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // install with: npm i node-fetch

const app = express();
app.use(cors());
app.use(express.json());

const clientId = "c23d3b0abb5131393802463188649488";
const clientSecret =
  "9e69cad7b60fb503970facd438698e7de68082807d523adfde9fb77843df96f8";

app.post("/run", async (req, res) => {
  const { script, language, versionIndex } = req.body;

  try {
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        clientSecret,
        script,
        language,
        versionIndex,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});