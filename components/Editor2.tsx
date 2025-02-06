"use client"; // Ensure this is a Client Component

import React, { useState } from "react";

interface EditorProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

function Editor2({ markdown, setMarkdown }: EditorProps) {
  const handlePublish = async () => {
    const fileName = `markdown-${Date.now()}`;

    try {
      const response = await fetch("/api/save-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, content: markdown }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
      } else {
        alert("Error saving file.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save file.");
    }
  };

  return (
    <div className="border-r-2 border-gray-700">
      <div className="w-full bg-gray-900 p-3 text-gray-500 uppercase tracking-wider flex justify-between gap-2">
        <div>Markdown</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-[-8px] h-8 px-3 rounded"
          onClick={handlePublish}
        >
          Save
        </button>
      </div>

      <textarea
        className="w-full h-full bg-gray-800 outline-none p-6"
        onChange={(e) => setMarkdown(e.target.value)}
        value={markdown}
      />
    </div>
  );
}

export default Editor2;
