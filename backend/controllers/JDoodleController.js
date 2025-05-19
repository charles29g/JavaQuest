const clientId = "c23d3b0abb5131393802463188649488";
const clientSecret =
  "9e69cad7b60fb503970facd438698e7de68082807d523adfde9fb77843df96f8";

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
