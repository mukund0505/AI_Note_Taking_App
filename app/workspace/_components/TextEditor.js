// import Placeholder from "@tiptap/extension-placeholder";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React from "react";
// import EditorExtensions from "./EditorExtensions";

// const TextEditor = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Placeholder.configure({
//         placeholder: "Start taking your notes here...",
//       }),
//     ],
//     content: "",
//     editorProps: {
//       attributes: {
//         class: "focus:outline-none h-screen p-5",
//       },
//     },
//   });
//   return (
//     <div>
//       <EditorExtensions editor={editor} />
//       <div>
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// };

// export default TextEditor;

"use client";
import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import dynamic from "next/dynamic";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

// Lazy load toolbar to avoid SSR issues
const EditorExtensions = dynamic(() => import("./EditorExtensions"), {
  ssr: false,
});

const TextEditor = ({ fileId }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  // console.log(notes);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "text-start", // default alignment class (optional)
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Start taking your notes here...",
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"], // allow alignment for headings and paragraphs
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
    editorOptions: {
      immediatelyRender: false, // ✅ FIX hydration warning!
    },
  });

  useEffect(() => {
    editor &&
      editor.commands.setContent(
        notes || "<p>Start taking your notes here...</p>"
      );
  }, [notes && editor]);

  if (!isClient || !editor) return null;

  return (
    <div>
      <EditorExtensions editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
