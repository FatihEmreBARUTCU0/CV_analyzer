"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type { AnalysisResult, AnalyzeApiResponse } from "@/lib/types";
import {
  CloudUpload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  FileUp,
  Sparkles,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const gradeConfig: Record<
  AnalysisResult["grade"],
  { label: string; color: string; bg: string }
> = {
  A: { label: "Excellent", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  B: { label: "Good", color: "text-cyan-700", bg: "bg-cyan-50 border-cyan-200" },
  C: { label: "Average", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  D: { label: "Below Average", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  F: { label: "Needs Work", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;
  const color =
    score >= 80
      ? "#10b981"
      : score >= 60
      ? "#06b6d4"
      : score >= 40
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-border" />
        <circle
          cx="72" cy="72" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="text-center z-10">
        <span className="text-4xl font-bold" style={{ color }}>{score}</span>
        <span className="block text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function ResultCard({ result }: { result: AnalysisResult }) {
  const grade = gradeConfig[result.grade] ?? gradeConfig["C"];

  return (
    <div className="mt-8 space-y-4 animate-fade-up">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1 flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 gap-3">
          <ScoreRing score={result.ats_score} />
          <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${grade.bg} ${grade.color}`}>
            Grade {result.grade} — {grade.label}
          </div>
          <p className="text-xs text-muted-foreground text-center">ATS Compatibility Score</p>
        </div>

        <div className="sm:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold mb-2">Overall Assessment</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-emerald-600 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-amber-600 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Improvements
          </h3>
          <ul className="space-y-2">
            {result.improvements.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold mb-3">Missing Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {result.keywords_missing.map((kw) => (
            <span
              key={kw}
              className="px-2.5 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/15"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">AI-Rewritten Summary</h3>
          <CopyButton text={result.rewritten_summary} />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          &ldquo;{result.rewritten_summary}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function Analyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const VALID_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  function validateAndSet(f: File) {
    if (!VALID_TYPES.includes(f.type)) {
      setErrorMsg("Sadece PDF veya DOCX dosyaları yükleyebilirsiniz.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrorMsg("Dosya boyutu 5MB'ı aşamaz.");
      return;
    }
    setFile(f);
    setErrorMsg("");
    setStatus("idle");
    setResult(null);
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSet(dropped);
  }, []);

  async function handleAnalyze() {
    if (!file) return;
    setStatus("loading");
    setErrorMsg("");
    setResult(null);

    const body = new FormData();
    body.append("cv", file);
    if (jobDescription) body.append("jobDescription", jobDescription);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body });
      const data: AnalyzeApiResponse = await res.json();

      if (!data.success) {
        setErrorMsg(data.error);
        setStatus("error");
        return;
      }

      setResult(data.result);
      setStatus("success");
    } catch {
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
      setStatus("error");
    }
  }

  function reset() {
    setFile(null);
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
    setJobDescription("");
  }

  return (
    <section id="analyzer" className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Try It Now
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Analyze your CV for free
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Upload your resume and get an instant ATS score, personalized
            improvements, and an AI-rewritten summary.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-8">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => !file && inputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer
              ${file ? "border-primary/40 bg-primary/5 cursor-default" : "hover:border-primary/50 hover:bg-primary/3"}
              ${dragging ? "border-primary bg-primary/8 scale-[1.01]" : "border-border"}
              p-10`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) validateAndSet(f);
              }}
            />

            {file ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20">
                  <FileUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-muted border border-border">
                  <CloudUpload className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    Drop your CV here or{" "}
                    <span className="text-primary underline underline-offset-2">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF or DOCX · max 5MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Job description{" "}
              <span className="font-normal">(optional — improves match scoring)</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value.slice(0, 500))}
              placeholder="Paste the job posting here…"
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
            />
            <p className="text-right text-xs text-muted-foreground mt-1">
              {jobDescription.length} / 500
            </p>
          </div>

          {errorMsg && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <Button
              onClick={handleAnalyze}
              disabled={!file || status === "loading"}
              className="flex-1 rounded-full gap-2 h-11 text-sm font-medium"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze My CV
                </>
              )}
            </Button>
            {(status === "success" || status === "error") && (
              <Button
                onClick={reset}
                variant="outline"
                className="rounded-full h-11 px-4"
                aria-label="Start over"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {status === "success" && result && <ResultCard result={result} />}
      </div>
    </section>
  );
}
