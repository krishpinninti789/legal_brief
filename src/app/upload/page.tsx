"use client";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { extractPdfText } from "@/lib/utils/file-utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  status: "uploading" | "analyzing" | "completed" | "error";
  progress: number;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [fileContent, setFileContent] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const mappedFiles: UploadedFile[] = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: "uploading",
      progress: 0,
    }));
    setFiles(mappedFiles);
  };
  const handleUpload = async () => {
    const file = files[0]?.file;
    if (!file) return;

    const text = await extractPdfText(file);
    console.log("PDF TEXT:", text);
  };

  const removeFile = (fileId: string) => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <Header />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Document Upload
              </h1>
              <p className="text-gray-600 mt-2">
                Upload legal documents for AI-powered analysis
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Upload Documents</CardTitle>
                    <CardDescription>
                      Select files from your device. Supports PDF, DOCX, TXT,
                      JPG.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="border px-4 py-3 rounded-md cursor-pointer"
                    />
                  </CardContent>
                </Card>

                {files.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Selected Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {files.map((file) => (
                          <div key={file.id} className="border rounded p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{file.file.name}</p>
                                <p className="text-sm text-gray-500">
                                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => removeFile(file.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                <Button
                  disabled={files.length === 0}
                  onClick={handleUpload}
                  className="m-4"
                >
                  Upload and Analyze
                </Button>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
