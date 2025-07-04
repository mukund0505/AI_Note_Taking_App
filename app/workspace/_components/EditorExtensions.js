"use client";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  Sparkles,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { chatSession } from "@/config/AIModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const EditorExtensions = ({ editor }) => {
  const [isClient, setIsClient] = useState(false);
  const { fileId } = useParams();

  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !editor) return null;

  const onAiClick = async () => {
    toast("✨ Magic triggered! Processing your request...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    // console.log("✨ Magic triggered with selected text:", selectedText);
    if (!selectedText || selectedText.trim() === "") {
      console.warn("No text selected for AI search.");
      return;
    }

    const result = await SearchAI({
      query: selectedText,
      fileId: fileId, // Replace with actual file ID or pass it as a prop
    });

    // console.log("✨ AI Response:", result);

    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = "";
    UnformattedAns &&
      UnformattedAns.forEach((item) => {
        AllUnformattedAns += item.pageContent;
      });
    // console.log("✨ AI Response:", answer);

    const PROMPT =
      "For question :" +
      selectedText +
      "and with the given content and answer," +
      "please provide a concise and accurate response in HTML format. The answer content is : " +
      AllUnformattedAns;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log("✨ AI Model Result:", AiModelResult.response.text());
    const FinalAns = AiModelResult.response
      .text()
      .replace(/```html\n?/gi, "") // remove ```html or ```html\n
      .replace(/```/g, "") // remove any other ```
      .trim();

    // Insert the AI response into the editor
    const AllText = editor.getHTML();
    editor.commands.setContent(
      AllText + "<p> <strong>Answer: </strong>" + FinalAns + "</p>"
    );

    // Save the notes to the database
    // console.log("Saving notes to DB:", {
    //   fileId,
    //   notes: editor.getHTML(),
    //   createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
    // });

    await saveNotes({
      fileId: fileId, // Replace with actual file ID or pass it as a prop
      notes: editor.getHTML(),
      createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
    });
    toast.success("✨ Magic completed! Your notes have been saved.");
  };

  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-3">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
            }
          >
            H3
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-500" : ""}
          >
            <Italic />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "text-blue-500" : ""}
          >
            <Underline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "text-blue-500" : ""}
          >
            <Code />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-500" : ""}
          >
            <List />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-500" : ""}
          >
            <ListOrdered />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "text-blue-500" : ""}
          >
            <Highlighter />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "text-blue-500" : ""}
          >
            <Strikethrough />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
            }
            title="Align Left"
          >
            <AlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
            }
            title="Align Center"
          >
            <AlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
            }
            title="Align Right"
          >
            <AlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "text-blue-500" : ""
            }
            title="Justify"
          >
            <AlignJustify />
          </button>

          <button
            onClick={() => {
              // Add your custom AI/magic action here
              onAiClick();
            }}
            className="text-purple-500 hover:text-purple-700 transition"
            title="Magic"
          >
            <Sparkles />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorExtensions;
