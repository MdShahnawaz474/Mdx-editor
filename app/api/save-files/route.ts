import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"; // Use the promise-based version

export async function POST(req: Request) {
  try {
    const { fileName, content } = await req.json();

    // Define the directory where the file will be saved
    const saveDirectory = "D:\\FirstBench\\mark-down-editor\\app";

    await fs.mkdir(saveDirectory, { recursive: true });

    const filePath = path.join(saveDirectory, `${fileName}.mdx`);
    // Write the file
    await fs.writeFile(filePath, content, "utf-8");

    return NextResponse.json({ success: true, message: `File saved to: ${filePath}` });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ success: false, error: "Failed to save file" }, { status: 500 });
  }
}
