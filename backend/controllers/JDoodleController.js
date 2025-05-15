// import fetch from "node-fetch";

const clientId = process.env.JDOODLE_CLIENT_ID;
const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

export const runCode = async (req, res) => {
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
};
