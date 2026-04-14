// "use server";
// import { PDFParse } from "pdf-parse";

// export async function extractPdfText(file: File, pages?: number[]) {
//   // Create instance using file content
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const parser = new PDFParse({ data: buffer });

//   // pages → example [3] for only page 3
//   const result = await parser.getText(pages ? { partial: pages } : undefined);

//   await parser.destroy();

//   return result.text ?? "";
// }
