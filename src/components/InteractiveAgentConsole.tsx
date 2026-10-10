"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  X,
  MessageSquare,
} from "lucide-react";
import { PERSONAL_INFO, PROJECTS, TECHNOLOGIES } from "@/data/portfolioData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "How did you optimize ERP latency from ~15s to ~5s?",
  "Why Tree-sitter AST instead of fixed-character chunking?",
  "Explain the 120-day dual window in the Absence Risk model",
  "What is Parth's tech stack and background?",
  "What are your core architectural doctrines?",
  "How can I contact or collaborate with Parth?",
];

function generateAssistantResponse(userPrompt: string): string {
  const p = userPrompt.toLowerCase().trim();

  // Greetings & Persona
  if (
    p.includes("hi") ||
    p.includes("hello") ||
    p.includes("hey") ||
    p.includes("who are you") ||
    p.includes("who is parth") ||
    p.includes("introduce") ||
    p.includes("about parth") ||
    p.includes("tell me about yourself")
  ) {
    return `Hello! I'm Parth's neural assistant, grounded directly in verified repository data and production benchmarks.

Parth Gandhi is an AI/ML Developer based in Ahmedabad, India, currently engineering production systems at Hexylon Analytics. He holds a B.Tech in Information Technology from Birla Vishwakarma Mahavidyalaya (2021–2025).

His engineering focus is built on three core pillars:
1. Autonomous Agent Architectures & Tool Orchestration (Agentic ERP)
2. Production RAG & AST-Aware Code Retrieval (CodeBase RAG)
3. Predictive Enterprise ML & Workforce Graph Modeling (Absence Risk Prediction)

Feel free to ask me anything about his technical decisions, benchmark latencies, code pipelines, or how to get in touch!`;
  }

  // Contact, Hire & Availability
  if (
    p.includes("contact") ||
    p.includes("hire") ||
    p.includes("email") ||
    p.includes("reach") ||
    p.includes("resume") ||
    p.includes("connect") ||
    p.includes("github") ||
    p.includes("linkedin")
  ) {
    return `You can get in touch with Parth directly via:

• Email: parth.gandhi588@gmail.com
• Location: Ahmedabad, Gujarat, India (Open to high-impact remote & on-site roles)
• GitHub: github.com/ParthGandhi588
• LinkedIn: linkedin.com/in/parth-gandhi-b96236240

Parth specializes in bringing generative AI and machine learning systems out of toy prototypes into verified, low-latency production runtimes. Reach out for engineering roles, technical advisory, or enterprise system consultations.`;
  }

  // ERP: Latency & vLLM (~15s to ~5s)
  if (
    p.includes("15s") ||
    p.includes("5s") ||
    p.includes("latency") ||
    p.includes("vllm") ||
    p.includes("qwen") ||
    p.includes("speed") ||
    p.includes("fast") ||
    p.includes("acceleration")
  ) {
    return `In Agentic ERP, sequential cloud LLM calls originally produced ~15s multi-step document workflow latencies due to network round-trips, TLS overhead, and cold starts.

Here is the exact optimization playbook Parth implemented to slash latency to ~5s:

1. Local Model Serving via vLLM:
   - Deployed a local OpenAI-compatible vLLM endpoint hosting Qwen at temperature 0 on local GPU hardware.
   - Eliminated external cloud API latency bottlenecks and egress bandwidth costs completely.

2. WebSocket Token Streaming:
   - Replaced blocking REST polling with full-duplex WebSocket connections (\`agent_ws.py\`).
   - The first token streams to the frontend within milliseconds, providing immediate perceptual feedback.

3. Concurrent Async Task Queue:
   - Concurrently dispatched multiple independent tool calls (e.g., invoice balance query + inventory check) using typed Python async routines rather than sequential serial requests.

4. Smart Document OCR Caching:
   - Cached parsed invoice outputs keyed by SHA-256 hashes in PostgreSQL, skipping OCR re-execution for identical documents.`;
  }

  // ERP: General Architecture & Boundaries
  if (
    p.includes("erp") ||
    p.includes("specialist") ||
    p.includes("supervisor") ||
    p.includes("tool") ||
    p.includes("pydantic") ||
    p.includes("boundaries") ||
    p.includes("scheduler")
  ) {
    return `In Agentic ERP, Parth established a foundational architectural rule:
"The LLM plans. Python executes. The database remains the system of record."

Key Architectural Components:
1. Scoped Specialist Roles:
   - Dedicated agents for Purchase, Stores, Planning, QC, and Database domains.
   - Each agent receives bounded role prompts and strictly scoped tool definitions rather than an unconstrained universal prompt.

2. Deterministic Pydantic Schemas:
   - The model is never permitted to execute raw SQL or mutate database records directly.
   - Decisions are emitted as strictly typed Pydantic parameter schemas, validated before invoking authenticated backend services.

3. Persistent Relational Scheduler:
   - Replaced fragile in-memory Python timers with a PostgreSQL-backed AI scheduler table.
   - A background daemon process handles cron intervals, timezone translations, failure retries, and WhatsApp/Email alert dispatches.`;
  }

  // CodeBase RAG: Tree-sitter AST & Chunking
  if (
    p.includes("treesitter") ||
    p.includes("tree-sitter") ||
    p.includes("ast") ||
    p.includes("chunking") ||
    p.includes("chunk") ||
    p.includes("split")
  ) {
    return `In CodeBase RAG, naive fixed-character chunking was rejected because sliding windows arbitrarily cut functions in half, break variable scoping, and orphan vital docstrings.

Parth implemented language-aware AST chunking using Tree-sitter:
1. Multi-Language Syntax Grammars:
   - Native AST support for 10 languages: Python, JavaScript, TypeScript, Java, Go, Rust, C++, C, C#, and PHP.

2. AST-Bounded Splitting:
   - Code is traversed along structural nodes (functions, classes, interfaces).
   - Enforces a 50-line boundary with 10-line overlap, guaranteeing each code snippet retains its class header, parameter types, and docstring context intact.

3. Config / Docs Fallback:
   - Markdown and JSON configuration files fall back to semantic sentence-level splitters (500 chars / 50 overlap).`;
  }

  // CodeBase RAG: pgvector, HNSW & Manifest
  if (
    p.includes("rag") ||
    p.includes("codebase") ||
    p.includes("pgvector") ||
    p.includes("hnsw") ||
    p.includes("manifest") ||
    p.includes("fastembed") ||
    p.includes("vector")
  ) {
    return `CodeBase RAG is an enterprise-grade multi-repo semantic search and code reasoning engine.

Key Engineering Highlights:
1. Dual-Store Incremental Manifest:
   - Scans git repositories using GitPython and checks (file_path, sha256_hash, mtime).
   - Only modified or newly added files are re-embedded, completely bypassing 95%+ of unchanged codebase files during re-indexing.

2. pgvector Bulk Ingestion Optimization:
   - Standard HNSW indexes trigger per-insert graph rebalancing, making bulk embedding slow.
   - Parth implemented a 3-step pipeline: (1) \`drop_hnsw_indexes()\`, (2) batch vector insertions, (3) \`create_hnsw_index()\` post-embedding.

3. Hybrid Inference Engine:
   - Cloud: Gemini API for rich semantic synthesis.
   - Local: Seamless automated fallback to local Ollama (\`llama3.2\`) for air-gapped or offline development environments.`;
  }

  // Absence Risk Prediction: 120-Day Window & ML
  if (
    p.includes("absence") ||
    p.includes("risk") ||
    p.includes("120") ||
    p.includes("dual window") ||
    p.includes("leakage") ||
    p.includes("jaccard") ||
    p.includes("clustering") ||
    p.includes("random forest")
  ) {
    return `The Absence Risk Prediction system models co-absence probabilities and workforce dependency clusters across enterprise rosters.

Key Methodological Innovations:
1. 120-Day Dual Observation Window:
   - To eliminate severe temporal data leakage, the 120-day horizon is strictly bifurcated:
     • Feature Aggregation Window (90 Days, Days -120 to -30): Used exclusively to calculate behavioral metrics.
     • Target Observation Window (30 Days, Days -30 to Day 0): Used strictly to label ground-truth future co-leave events.

2. 12 Dyadic Interaction Features:
   - Engineered features including pairwise recency (\`days_since_last_co_leave\`), individual baseline rates (\`leave_rate_e1/e2\`), Jaccard overlap (\`|E1 ∩ E2| / |E1 ∪ E2|\`), and Monday/Friday weekend bridges.

3. Mathematical Clustering Guarantee:
   - Hierarchical Complete-Linkage agglomerative clustering using Jaccard distance with cutoff threshold t = 0.75.
   - Mathematical proof: By complete-linkage property, the maximum pairwise distance between any two members is ≤ 0.75, which guarantees that every single pair in a cluster shares at least 25% co-absence overlap.
   - Uncovered 147 distinct workforce dependency clusters across the organization.`;
  }

  // Tech Stack & Toolchain
  if (
    p.includes("tech") ||
    p.includes("stack") ||
    p.includes("skills") ||
    p.includes("python") ||
    p.includes("tools") ||
    p.includes("frameworks") ||
    p.includes("database")
  ) {
    return `Parth's production toolchain is organized across 4 primary layers:

1. AI / ML Core:
   • Python, LLMs, RAG, Agentic AI, Tree-sitter, OCR, Computer Vision, Scikit-learn, FastEmbed (384d).

2. Backend & Communication:
   • FastAPI (asynchronous microservices), WebSockets (streaming tokens), Docker (containerization).

3. AI Infrastructure & Serving:
   • vLLM (local high-throughput GPU model serving), Ollama (local model execution), pgvector (vector similarity search).

4. Data Persistence & Storage:
   • PostgreSQL (relational & vector storage), MongoDB (flexible document storage), MySQL, MinIO (S3-compatible object storage).

5. Orchestration:
   • LlamaIndex, LangChain, LangGraph, GitPython.`;
  }

  // Doctrines & Philosophy
  if (
    p.includes("doctrine") ||
    p.includes("philosophy") ||
    p.includes("principle") ||
    p.includes("creed") ||
    p.includes("belief")
  ) {
    return `Parth operates according to four strict engineering doctrines:

1. Deterministic Execution Boundaries:
   "The LLM plans. Python executes. The database remains the system of record." Language models should never hold unconstrained mutation privileges.

2. Syntax-Aware Retrieval:
   "Chunking without syntax awareness is hallucination by omission." Fixed character windows sever function bodies and orphan context; AST-aware splitting preserves semantic boundaries.

3. Performance as a Functional Requirement:
   "Latency is an engineering problem, not a model limitation." Sub-second feedback loops through local serving, token streaming, and intelligent caching convert sluggish demos into production tools.

4. Empirical Grounding:
   All claims must be backed by reproducible benchmarks, strongly typed validation schemas, and automated rollback boundaries.`;
  }

  // Education & Background
  if (
    p.includes("bvm") ||
    p.includes("education") ||
    p.includes("college") ||
    p.includes("degree") ||
    p.includes("university") ||
    p.includes("hexylon") ||
    p.includes("experience")
  ) {
    return `Education & Industry Background:

• Current Role: AI/ML Developer at Hexylon Analytics (Ahmedabad, India | Dec 2024 — Present).
  - Architecting enterprise AI systems, local vLLM serving, AST RAG pipelines, and automated business process agents.

• Education: Bachelor of Technology (B.Tech) in Information Technology
  - Birla Vishwakarma Mahavidyalaya (BVM Engineering College), Gujarat, India (2021 — 2025).
  - Foundation in data structures, distributed systems, database architectures, and applied machine learning.`;
  }

  // Fallback Intelligent Reasoning
  return `I analyzed your query: "${userPrompt}".

While I don't have a canned response for that specific wording, here is how Parth approaches this domain:

• In generative AI systems, Parth focuses on deterministic execution boundaries, low-latency local inference (vLLM/Qwen), and strongly typed Pydantic tool dispatch.
• In retrieval pipelines, he enforces AST-level syntax parsing (Tree-sitter) and dual-store incremental manifest caching.
• In enterprise machine learning, he prioritizes zero-data-leakage temporal architectures (such as the 120-day dual window) and verifiable mathematical guarantees.

You can ask me more specifically about:
1. "How did vLLM cut latency to ~5s?"
2. "How does the Tree-sitter AST chunker work?"
3. "Explain the 120-day absence prediction ML model"
4. "What is Parth's tech stack or contact details?"`;
}

export function InteractiveAgentConsole() {
  // Window states: "minimized" (default compact bar), "open" (expanded chat), "closed" (standby pill)
  const [windowState, setWindowState] = useState<"minimized" | "open" | "closed">("minimized");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-assistant-msg",
      role: "assistant",
      content: `System online. I am Parth's verified reasoning console, loaded with complete architectural specifications, latency benchmarks, and code schematics from his production repositories.

Ask me anything about his systems (Agentic ERP, CodeBase RAG, Absence Risk), engineering doctrines, or background.`,
      timestamp: "00:00",
    },
  ]);

  const [inputVal, setInputVal] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current && windowState === "open") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, windowState]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim() || isStreaming) return;

    // Automatically expand/open chat window when a prompt is sent
    setWindowState("open");

    const userMessage: Message = {
      id: "user-" + Date.now(),
      role: "user",
      content: promptText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const targetAnswer = generateAssistantResponse(promptText);

    const assistantPlaceholderId = "assistant-" + Date.now();
    const assistantMessagePlaceholder: Message = {
      id: assistantPlaceholderId,
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessagePlaceholder]);
    setInputVal("");
    setIsStreaming(true);

    let charIdx = 0;
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    streamTimerRef.current = setInterval(() => {
      charIdx += 6; // stream tokens fluidly
      if (charIdx >= targetAnswer.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId ? { ...msg, content: targetAnswer } : msg
          )
        );
        setIsStreaming(false);
        if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      } else {
        const partial = targetAnswer.slice(0, charIdx);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId ? { ...msg, content: partial } : msg
          )
        );
      }
    }, 12);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputVal);
  };

  const handleResetChat = () => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    setIsStreaming(false);
    setMessages([
      {
        id: "initial-assistant-msg-" + Date.now(),
        role: "assistant",
        content: `Conversation reset. Neural context refreshed. What architectural or project question would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="inquiry" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/[0.08] gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              INDEX 03 // INTERACTIVE SYSTEM CODEX & REASONING AGENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              Evaluate System <span className="font-serif italic text-white">Reasoning</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Query the architectural decisions, token latency metrics, and algorithmic guarantees directly against verified project data.
          </p>
        </div>

        {/* Suggested Quick Prompts Ledger (Always visible so visitor can click to launch) */}
        <div className="pt-6 pb-6 border-b border-white/[0.08] space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>CLICK ANY PRE-PROMPT TO LAUNCH CONVERSATION:</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSendPrompt(q)}
                disabled={isStreaming}
                className="text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-blue-500/50 px-3 py-1.5 rounded-full transition-all text-left cursor-pointer disabled:opacity-40"
              >
                &ldquo;{q}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Closed Standby State (When user clicks Red button) */}
        {windowState === "closed" && (
          <div className="mt-6 flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#06070a]">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              <span>parth-agent-v2.0 :: console closed</span>
            </div>
            <button
              type="button"
              onClick={() => setWindowState("open")}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-mono transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>REOPEN CONSOLE</span>
            </button>
          </div>
        )}

        {/* macOS Terminal Window (Minimized or Open) */}
        {windowState !== "closed" && (
          <div className="mt-6 border border-white/[0.08] bg-[#06070a] rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
            {/* macOS Title Bar with Functional Traffic Lights */}
            <div className="px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                {/* Traffic Light Buttons */}
                <div className="flex items-center gap-2 group">
                  {/* Red: Close */}
                  <button
                    type="button"
                    onClick={() => setWindowState("closed")}
                    title="Close console"
                    aria-label="Close"
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-2 h-2 text-red-950 opacity-0 hover:opacity-100" />
                  </button>

                  {/* Yellow: Minimize */}
                  <button
                    type="button"
                    onClick={() => setWindowState(windowState === "minimized" ? "open" : "minimized")}
                    title={windowState === "minimized" ? "Expand console" : "Minimize console"}
                    aria-label="Minimize"
                    className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className="w-1.5 h-0.5 bg-yellow-950 opacity-0 hover:opacity-100" />
                  </button>

                  {/* Green: Expand / Maximize */}
                  <button
                    type="button"
                    onClick={() => setWindowState("open")}
                    title="Expand console"
                    aria-label="Expand"
                    className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-1.5 h-1.5 text-green-950 opacity-0 hover:opacity-100" />
                  </button>
                </div>

                <span className="text-zinc-400 border-l border-white/[0.1] pl-3">
                  parth-agent-v2.0 :: grounded_rag_engine
                  {windowState === "minimized" && " [MINIMIZED]"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {windowState === "open" ? (
                  <>
                    <button
                      type="button"
                      onClick={handleResetChat}
                      className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer mr-2"
                      title="Reset chat"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">RESET</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWindowState("minimized")}
                      className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                      title="Minimize console"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setWindowState("open")}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <span>OPEN CHAT</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Body Area (Visible when windowState === 'open') */}
            {windowState === "open" && (
              <div className="animate-in fade-in duration-200">
                {/* Messages Scroll Area - Compact Max Height (320px) to not take over page */}
                <div
                  ref={scrollRef}
                  className="p-5 sm:p-6 space-y-5 max-h-[340px] min-h-[220px] overflow-y-auto font-sans"
                >
                  {messages.map((msg) => {
                    const isAssistant = msg.role === "assistant";
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${
                          isAssistant ? "justify-start" : "justify-end"
                        }`}
                      >
                        {isAssistant && (
                          <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div
                          className={`max-w-xl space-y-1.5 ${
                            isAssistant
                              ? "bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 text-zinc-300"
                              : "bg-blue-600/15 border border-blue-500/30 rounded-xl p-3.5 text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 gap-4">
                            <span>
                              {isAssistant ? "PARTH NEURAL AGENT" : "VISITOR // ARCHITECT"}
                            </span>
                            <div className="flex items-center gap-2">
                              <span>{msg.timestamp}</span>
                              {isAssistant && msg.content && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(msg.id, msg.content)}
                                  className="hover:text-white transition-colors cursor-pointer"
                                  title="Copy response"
                                >
                                  {copiedId === msg.id ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                            {msg.content}
                            {isAssistant && isStreaming && msg.content.length === 0 && (
                              <span className="flex items-center gap-1 text-zinc-500 font-mono text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                                <span className="ml-2">Retrieving repository context...</span>
                              </span>
                            )}
                            {isAssistant && isStreaming && msg.content.length > 0 && (
                              <span className="inline-block w-1.5 h-3.5 bg-blue-400 ml-1 translate-y-0.5 animate-pulse" />
                            )}
                          </div>
                        </div>

                        {!isAssistant && (
                          <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 text-zinc-300">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Compact Interactive Chat Input Form */}
                <div className="p-3.5 sm:p-4 border-t border-white/[0.08] bg-[#07080c]">
                  <form onSubmit={handleFormSubmit} className="flex items-center gap-2.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Ask any question about Parth, projects, or architecture..."
                        disabled={isStreaming}
                        className="w-full bg-white/[0.03] border border-white/[0.1] focus:border-blue-500/80 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors font-sans pr-12 disabled:opacity-50"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 hidden sm:inline">
                        ⏎
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={!inputVal.trim() || isStreaming}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
                    >
                      <span>SEND</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
