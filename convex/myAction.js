import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText, // Array of text chunks
      args.fileId, // Unique identifier for the document
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return { success: true, message: "Document ingested successfully" };
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const resultOne = await vectorStore.similaritySearch(args.query, 1);
    // .filter((q) => q.metadata.fileId === args.fileId)
    console.log(resultOne);

    return JSON.stringify(resultOne);
  },
});

// import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
// import { action } from "./_generated/server.js";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { TaskType } from "@google/generative-ai";
// import { v } from "convex/values";

// // ✅ INGESTION ACTION
// export const ingest = action({
//   args: {
//     splitText: v.any(), // array of text chunks
//     fileId: v.string(), // identifier for the file
//   },
//   handler: async (ctx, args) => {
//     await ConvexVectorStore.fromTexts(
//       args.splitText,
//       args.splitText.map(() => ({ fileId: args.fileId })), // ✅ assign metadata per chunk
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//         model: "text-embedding-004",
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx }
//     );

//     return { success: true, message: "Document ingested successfully" };
//   },
// });

// // ✅ SEARCH ACTION
// export const search = action({
//   args: {
//     query: v.string(),
//     fileId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const vectorStore = new ConvexVectorStore(
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//         model: "text-embedding-004",
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx }
//     );

//     const resultOne = (
//       await vectorStore.similaritySearch(args.query, 1)
//     ).filter((q) => q.metadata?.fileId === args.fileId); // ✅ ensure correct filtering

//     console.log("Filtered results:", resultOne);
//     return JSON.stringify(resultOne);
//   },
// });
