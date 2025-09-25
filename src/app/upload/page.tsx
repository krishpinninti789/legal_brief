"use client";
import React, { useState, useRef, useCallback } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
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
  analysis?: AnalysisResult;
}

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  documentType: string;
  riskLevel: "Low" | "Medium" | "High";
  recommendations: string[];
  details: {
    parties: string[];
    dates: string[];
    amounts: string[];
    obligations: string[];
  };
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const simulateAnalysis = (
    fileId: string,
    fileName: string
  ): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysisResult: AnalysisResult = {
          summary: `This ${fileName} appears to be a legal contract with standard terms and conditions. The document outlines the rights and obligations of both parties, including payment terms, performance requirements, and termination clauses.`,
          keyPoints: [
            "Contract duration: 12 months with auto-renewal clause",
            "Payment terms: Net 30 days from invoice date",
            "Termination: 30 days written notice required",
            "Liability cap: $50,000 or contract value, whichever is lower",
            "Governing law: State of California",
          ],
          documentType: fileName.toLowerCase().includes("contract")
            ? "Service Agreement"
            : fileName.toLowerCase().includes("lease")
            ? "Lease Agreement"
            : fileName.toLowerCase().includes("nda")
            ? "Non-Disclosure Agreement"
            : "Legal Document",
          riskLevel:
            Math.random() > 0.7
              ? "High"
              : Math.random() > 0.4
              ? "Medium"
              : "Low",
          recommendations: [
            "Review the termination clause for favorable terms",
            "Consider negotiating the liability cap amount",
            "Verify the governing law aligns with your business location",
            "Ensure all parties have proper signing authority",
            "Add specific performance metrics if applicable",
          ],
          details: {
            parties: [
              "Company A LLC",
              "Service Provider Inc.",
              "John Smith (Individual)",
            ],
            dates: [
              "Contract Start: January 1, 2024",
              "Contract End: December 31, 2024",
              "Review Date: June 30, 2024",
            ],
            amounts: [
              "$10,000 monthly fee",
              "$2,000 setup fee",
              "$50,000 liability cap",
            ],
            obligations: [
              "Provider must deliver services within 5 business days",
              "Client must provide necessary access and information",
              "Both parties must maintain confidentiality",
              "Provider must maintain professional insurance",
            ],
          },
        };
        resolve(analysisResult);
      }, 3000 + Math.random() * 2000); // 3-5 seconds simulation
    });
  };

  const processFile = async (file: File) => {
    const fileId = Date.now().toString() + Math.random().toString(36);
    const newFile: UploadedFile = {
      id: fileId,
      file,
      status: "uploading",
      progress: 0,
    };

    // Add file preview for images/PDFs
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, preview: e.target?.result as string } : f
          )
        );
      };
      reader.readAsDataURL(file);
    }

    setFiles((prev) => [...prev, newFile]);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                progress,
                status: progress === 100 ? "analyzing" : "uploading",
              }
            : f
        )
      );
    }

    try {
      // Start AI analysis
      const analysis = await simulateAnalysis(fileId, file.name);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: "completed", analysis } : f
        )
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status: "error" } : f))
      );
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    validFiles.forEach(processFile);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(processFile);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <Header />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Document Analysis
              </h1>
              <p className="text-gray-600 mt-2">
                Upload legal documents for AI-powered analysis and insights
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upload Section */}
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Upload Documents</CardTitle>
                    <CardDescription>
                      Drag and drop files here or click to browse. Supports PDF,
                      DOC, DOCX, TXT, JPG, PNG up to 10MB.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Drag & Drop Zone */}
                    <div
                      ref={dropZoneRef}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="text-4xl text-gray-400">📄</div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {isDragging
                              ? "Drop files here"
                              : "Upload your documents"}
                          </h3>
                          <p className="text-gray-500 mt-2">
                            Drag and drop files here, or{" "}
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              browse files
                            </button>
                          </p>
                        </div>
                        <div className="text-sm text-gray-400">
                          Supported: PDF, DOC, DOCX, TXT, JPG, PNG (max 10MB
                          each)
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* File List */}
                {files.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Processing Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {files.map((file) => (
                          <div key={file.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                {file.preview && (
                                  <img
                                    src={file.preview}
                                    alt="Preview"
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {file.file.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {(file.file.size / 1024 / 1024).toFixed(2)}{" "}
                                    MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFile(file.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-2">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span
                                  className={`capitalize ${
                                    file.status === "completed"
                                      ? "text-green-600"
                                      : file.status === "error"
                                      ? "text-red-600"
                                      : "text-blue-600"
                                  }`}
                                >
                                  {file.status === "uploading"
                                    ? "Uploading..."
                                    : file.status === "analyzing"
                                    ? "Analyzing..."
                                    : file.status === "completed"
                                    ? "Analysis Complete"
                                    : "Error occurred"}
                                </span>
                                <span>{file.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    file.status === "completed"
                                      ? "bg-green-500"
                                      : file.status === "error"
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                                  }`}
                                  style={{ width: `${file.progress}%` }}
                                />
                              </div>
                            </div>

                            {/* Loading Animation for Analysis */}
                            {file.status === "analyzing" && (
                              <div className="flex items-center space-x-2 text-sm text-blue-600">
                                <div className="flex space-x-1">
                                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                                <span>AI analyzing document...</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Analysis Results Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      AI-powered insights from your documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {files.filter((f) => f.status === "completed").length ===
                    0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <div className="text-3xl mb-2">🤖</div>
                        <p>Upload documents to see AI analysis results here</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {files
                          .filter((f) => f.status === "completed")
                          .map((file) => (
                            <div
                              key={file.id}
                              className="border-b border-gray-200 pb-6 last:border-b-0"
                            >
                              <div className="mb-4">
                                <h4
                                  className="font-medium text-gray-900 truncate"
                                  title={file.file.name}
                                >
                                  {file.file.name}
                                </h4>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className="text-sm text-gray-600">
                                    Type:
                                  </span>
                                  <span className="text-sm font-medium">
                                    {file.analysis?.documentType}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-sm text-gray-600">
                                    Risk Level:
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(
                                      file.analysis?.riskLevel || "Low"
                                    )}`}
                                  >
                                    {file.analysis?.riskLevel}
                                  </span>
                                </div>
                              </div>

                              {file.analysis && (
                                <div className="space-y-4">
                                  {/* Summary */}
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-900 mb-2">
                                      Summary
                                    </h5>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      {file.analysis.summary}
                                    </p>
                                  </div>

                                  {/* Key Points */}
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-900 mb-2">
                                      Key Points
                                    </h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      {file.analysis.keyPoints
                                        .slice(0, 3)
                                        .map((point, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-start space-x-2"
                                          >
                                            <span className="text-blue-600 mt-1">
                                              •
                                            </span>
                                            <span>{point}</span>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>

                                  {/* View Full Analysis Button */}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                      // TODO: Open detailed analysis modal
                                      alert("Full analysis view coming soon!");
                                    }}
                                  >
                                    View Full Analysis
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
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
