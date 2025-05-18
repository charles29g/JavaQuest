// JDoodleCompiler.jsx
import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";

function JDoodleAPICompiler({ codeInit }) {
  const [code, setCode] = useState(codeInit);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Return nothing if code is empty or whitespace only

  async function runCode() {
    setLoading(true);
    setError("");
    setOutput("");

    const payload = {
      script: code,
      language: "java",
      versionIndex: "4",
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        setError("Authentication token missing.");
        setLoading(false);
        return;
      }

      console.log("Sending payload:", payload);
      console.log("Token being sent:", token);

      const response = await fetch("http://localhost:5000/api/jdoodle/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Make sure your backend expects this format
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      const raw = await response.text();
      console.log("Raw response body:", raw);

      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        throw new Error("Failed to parse JSON response: " + e.message);
      }

      if (!response.ok) {
        setError(
          `Server responded with status ${response.status}: ${
            data.message || "Unknown error"
          }`
        );
        return;
      }

      if (data.error) {
        setError("Compiler error: " + data.error);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      console.error("Error caught during fetch:", err);
      setError("Failed to compile: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container p-0 my-4">
      <h5 className="text-dark mb-3">Try Coding Here</h5>
      <div
        className="card text-light shadow pt-4"
        style={{ backgroundColor: "#1e1e1e" }}
      >
        <MonacoEditor
          height="200px"
          language="java"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          onClick={runCode}
          disabled={loading}
          aria-live="polite"
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Compiling...
            </>
          ) : (
            "Run Code"
          )}
        </button>
      </div>

      <div
        className="card bg-secondary text-light mt-4 p-3"
        style={{
          minHeight: "150px",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      >
        {error ? (
          <span className="text-danger">{error}</span>
        ) : (
          output || "Run to get the output."
        )}
      </div>
    </div>
  );
}

function JDoodleEmbedCompiler() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-light mb-3"> Java Compiler (Embed)</h2>
      {scriptLoaded ? (
        <iframe
          src="https://www.jdoodle.com/embed/v1/282aee686d9a32b1"
          width="100%"
          height="800"
          title="Java IDE"
          className="rounded shadow"
          style={{ border: "none" }}
        ></iframe>
      ) : (
        <div className="text-light">Loading compiler...</div>
      )}
    </div>
  );
}

// Default export:
export default JDoodleAPICompiler;
// To use embed version, switch to:
// export default JDoodleEmbedCompiler;
