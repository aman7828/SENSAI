"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-4 px-4 md:px-8 bg-gradient-to-b from-lime-50 via-olive-50 to-emerald-50 min-h-screen">
      <div className="bg-white/90 border border-lime-300 shadow-lg rounded-lg p-4">
        <MDEditor
          value={content}
          preview="preview"
          height={700}
          textareaProps={{
            style: {
              color: "#1f2e0c", // dark olive for editable text
              backgroundColor: "transparent",
              fontSize: "16px",
            },
          }}
          commands={[]}
        />
      </div>
    </div>
  );
};

export default CoverLetterPreview;

