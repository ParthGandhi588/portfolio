export interface Project {
  slug: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  heroPrinciple?: string;
  technologies: string[];
  repoUrl?: string;
  architectureFlow: {
    step: string;
    description: string;
  }[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  engineeringHighlights: string[];
  metricsNote?: string;
  challengesAndDecisions: {
    challenge: string;
    decision: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "PARTH GANDHI",
  eyebrow: "GENERATIVE AI · AI SYSTEMS · APPLIED ML",
  headline: "I build AI systems that turn complex workflows into intelligent software.",
  supportingCopy:
    "AI/ML Developer focused on Generative AI, agent-based systems, RAG, applied machine learning, and production-oriented backend engineering.",
  status: "Available for AI Engineering",
  email: "gandhiparth588@gmail.com",
  github: "https://github.com/ParthGandhi588",
  linkedin: "https://www.linkedin.com/in/parth-gandhi-b48bba228/",
  resumePdf: "/ParthGandhi_Resume.pdf",
  location: "Ahmedabad, India",
};

export const CAPABILITIES = [
  {
    number: "01",
    title: "AGENTIC AI",
    description:
      "AI systems that combine LLM reasoning with constrained tools and deterministic application logic.",
    details: [
      "Specialist agent architecture with scoped role prompts",
      "Typed Python tools ensuring bounded tool access and schema validation",
      "Deterministic routing between reasoning and transaction layers",
    ],
  },
  {
    number: "02",
    title: "RAG & CODE INTELLIGENCE",
    description:
      "Retrieval systems that understand documents and codebases through structured chunking, vector search and source-aware responses.",
    details: [
      "AST-aware code chunking via Tree-sitter and LlamaIndex",
      "Incremental indexing via SHA-256 and modification time",
      "Dense vector search with PostgreSQL + pgvector (HNSW)",
    ],
  },
  {
    number: "03",
    title: "AI BACKEND SYSTEMS",
    description:
      "FastAPI services, background execution, model integration, file processing and data infrastructure for AI applications.",
    details: [
      "Background task scheduler for cron, interval, and one-time tasks",
      "vLLM model serving optimization for lower workflow latencies",
      "Document ingestion pipeline with OCR and MIME detection",
    ],
  },
  {
    number: "04",
    title: "APPLIED ML",
    description:
      "Practical machine-learning systems for prediction, behavioral analysis, clustering and explainability.",
    details: [
      "Pairwise behavioral & temporal feature engineering (12 features)",
      "Random Forest classification for 30-day co-absence risk",
      "Hierarchical clustering and Jaccard similarity for pattern discovery",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "agentic-erp",
    number: "01",
    category: "01 · ENTERPRISE AI",
    title: "AGENTIC ERP",
    tagline: "An enterprise AI layer connecting business workflows through specialist agents and typed tools.",
    description:
      "An AI layer over an enterprise ERP ecosystem that lets users interact with business workflows through specialist AI agents, typed tools and backend services.",
    heroPrinciple: "The LLM plans. Python executes. The ERP remains the system of record.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "LLMs",
      "vLLM",
      "OCR",
      "OpenCV",
      "Docker",
      "WebSockets",
    ],
    repoUrl: "https://github.com/Agentic-ERP/agentic_erp",
    architectureFlow: [
      { step: "USER", description: "Natural language query or file upload via UI / WebSockets" },
      { step: "FASTAPI / WEBSOCKET", description: "Session validation, request parsing, and socket streaming" },
      { step: "SPECIALIST AGENT", description: "Domain-scoped agent selected based on workflow intent" },
      { step: "LLM", description: "Reasoning engine determining tool parameters and structured plan" },
      { step: "TYPED PYTHON TOOL", description: "Strictly typed, validated function execution with error handling" },
      { step: "ERP / DATABASE / FILE SYSTEM", description: "State persistence, enterprise database, and file storage" },
    ],
    keyFeatures: [
      {
        title: "SPECIALIST AGENTS",
        description: "Domain-specific agents configured with scoped prompts and bounded toolsets rather than an unconstrained generalist agent.",
      },
      {
        title: "TOOL CALLING",
        description: "LLM decisions are translated into typed Python operations with Pydantic validation before touching enterprise APIs.",
      },
      {
        title: "DOCUMENT INTELLIGENCE",
        description: "File routing, MIME detection, OCR and vision-capable processing for invoice, receipt, and operational document ingestion.",
      },
      {
        title: "WORKFLOW AUTOMATION",
        description: "Scheduled execution supporting one-time, interval, and cron-based jobs with webhook, email, and messaging delivery.",
      },
    ],
    engineeringHighlights: [
      "Architected with strict separation: LLM determines intention, while deterministic Python code executes state changes.",
      "Optimized model inference and orchestration using vLLM, reducing latency on a documented workflow from ~15s to ~5s.",
      "Engineered background task scheduler to decouple long-running document processing and report generation from synchronous HTTP cycles.",
      "Maintained public-safe enterprise abstractions: secure tool isolation, no raw SQL injection exposure to models.",
    ],
    metricsNote: "Engineering optimization: Reduced workflow execution time from ~15s to ~5s via vLLM-based local model serving and token streaming.",
    challengesAndDecisions: [
      {
        challenge: "Unconstrained LLMs making unauthorized or malformed enterprise state changes.",
        decision:
          "Enforced strict specialist agents with restricted, typed Python tools. The model only outputs validated JSON schemas; execution occurs deterministically in Python against ERP APIs.",
      },
      {
        challenge: "High inference latency (>15s) in complex multi-step reasoning workflows.",
        decision:
          "Integrated vLLM for high-throughput model serving and optimized inference, bringing relevant workflow execution times from ~15s down to ~5s.",
      },
    ],
  },
  {
    slug: "codebase-rag",
    number: "02",
    category: "02 · CODE INTELLIGENCE",
    title: "CODEBASE RAG",
    tagline: "A repository-aware RAG system for understanding unfamiliar codebases through source-aware retrieval.",
    description:
      "A repository-aware RAG system designed to help developers understand unfamiliar codebases through source-aware retrieval and conversational querying.",
    heroPrinciple: "AST-aware semantic retrieval grounded in exact repository syntax and file paths.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "LlamaIndex",
      "FastEmbed",
      "Gemini",
      "Ollama",
      "Tree-sitter",
      "GitPython",
      "React",
      "TypeScript",
      "Docker",
    ],
    repoUrl: "https://github.com/ParthGandhi588/CodeBase-RAG",
    architectureFlow: [
      { step: "REPOSITORY", description: "Cloned or local target codebase scanned via GitPython" },
      { step: "SCANNER", description: "File discovery, language filter, and modification timestamp check" },
      { step: "TREE-SITTER / CODE SPLITTING", description: "AST-based boundary chunking (functions, classes, blocks)" },
      { step: "CODE CHUNKS", description: "Syntactically intact snippets tagged with relative file path and line numbers" },
      { step: "FASTEMBED", description: "High-speed local dense embedding generation" },
      { step: "PGVECTOR", description: "PostgreSQL storage with HNSW index for sub-millisecond similarity lookup" },
      { step: "RETRIEVER", description: "Top-k semantic retrieval with metadata filtering and repo-scoping" },
      { step: "LLM", description: "Gemini / Ollama model synthesizing answers with fallback tolerance" },
      { step: "ANSWER + SOURCE FILES", description: "Ground-truth response citing specific files, functions, and line ranges" },
    ],
    keyFeatures: [
      {
        title: "AST-AWARE CHUNKING",
        description: "Tree-sitter / LlamaIndex CodeSplitter is used to create language-aware code chunks respecting semantic boundaries rather than arbitrary character splits.",
      },
      {
        title: "INCREMENTAL INDEXING",
        description: "Modification time (mtime) and SHA-256 hashing are used to detect changes and avoid unnecessarily re-indexing unchanged files across repository syncs.",
      },
      {
        title: "PGVECTOR + HNSW INDEXING",
        description: "PostgreSQL with pgvector using Hierarchical Navigable Small World (HNSW) indexing for high-dimensional vector search with low retrieval latency.",
      },
      {
        title: "SOURCE-AWARE GROUNDING",
        description: "Every response cites the exact source files, function signatures, and context blocks utilized during retrieval.",
      },
      {
        title: "GIT INTELLIGENCE",
        description: "Git history and commit context can enrich repository understanding for author and recency analysis.",
      },
      {
        title: "MULTI-REPOSITORY ISOLATION",
        description: "Repository and session vector contexts remain strictly isolated to eliminate cross-project retrieval contamination.",
      },
    ],
    engineeringHighlights: [
      "Avoids naive text splitters: uses Tree-sitter grammar parsers so function bodies and classes are preserved intact.",
      "Dual model provider support: Primary integration with Gemini API and automatic local fallback to Ollama when offline or latency-constrained.",
      "Differential syncing prevents expensive re-embedding of entire repositories upon small git commits.",
    ],
    challengesAndDecisions: [
      {
        challenge: "Naive fixed-length text chunking breaks functions, splits control structures, and destroys code comprehension.",
        decision:
          "Implemented AST-based syntax splitting via Tree-sitter to preserve logical code units (classes, methods, control blocks) with contextual breadcrumbs.",
      },
      {
        challenge: "Re-indexing massive codebases on every change creates huge embedding overhead.",
        decision:
          "Built a SHA-256 hash and mtime caching indexer in SQLite/PostgreSQL to only embed new or mutated source files.",
      },
    ],
  },
  {
    slug: "absence-risk",
    number: "03",
    category: "03 · APPLIED ML",
    title: "ABSENCE RISK PREDICTION",
    tagline: "An applied ML workflow analyzing leave and attendance data to predict co-absence risk and discover patterns.",
    description:
      "An applied ML workflow that analyzes employee leave and attendance patterns to identify co-leave relationships and predict short-term co-leave risk.",
    heroPrinciple: "Moving beyond heuristics: engineering pairwise behavioral features into explainable ML predictions.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "Hierarchical Clustering",
      "Jaccard Similarity",
      "Pandas",
      "NumPy",
      "MongoDB",
      "PostgreSQL",
    ],
    architectureFlow: [
      { step: "EMPLOYEE DATA", description: "Historical employee records and department structures" },
      { step: "LEAVE + ATTENDANCE", description: "Daily punch logs, approved leave slips, and holiday schedules" },
      { step: "90-DAY FEATURE WINDOW", description: "Rolling 90-day historical window for temporal pattern extraction" },
      { step: "PAIRWISE FEATURES", description: "12 engineered temporal, overlap, frequency, and departmental features" },
      { step: "RANDOM FOREST", description: "Ensemble classifier trained on an 80/20 train/test split" },
      { step: "30-DAY RISK", description: "Predicted likelihood score for pairwise co-leave in the subsequent 30 days" },
      { step: "CLUSTERING + EXPLANATION", description: "Hierarchical clustering via Jaccard similarity and feature importance analysis" },
    ],
    keyFeatures: [
      {
        title: "12 PAIRWISE FEATURES",
        description: "Engineered pairwise behavioral and temporal features capturing co-occurrence frequencies, shift overlaps, and leave proximity.",
      },
      {
        title: "ROLLING WINDOW ARCHITECTURE",
        description: "Uses a 90-day observation window to project co-leave probabilities across a 30-day forward risk window.",
      },
      {
        title: "HIERARCHICAL CLUSTERING",
        description: "Applies Jaccard similarity and distance clustering to discover natural absence clusters across departments.",
      },
      {
        title: "EXPLAINABLE ML",
        description: "Feature importance extraction using Scikit-learn to provide operational visibility into the driving factors behind risk predictions.",
      },
    ],
    engineeringHighlights: [
      "Strict data boundary: 90-day historical training features mapped to a forward-looking 30-day binary prediction window.",
      "Trained with Random Forest using an 80/20 train-test split on verified pairwise historical records.",
      "Hierarchical clustering on Jaccard distance matrix reveals co-dependent clusters without arbitrary thresholding.",
      "Integrated with enterprise storage (PostgreSQL and MongoDB) for batch feature extraction and persistence.",
    ],
    challengesAndDecisions: [
      {
        challenge: "Individual employee leave data lacks relationship context for correlated absences.",
        decision:
          "Formulated the problem as pairwise dyadic modeling, engineering 12 relational and temporal interaction features across employee pairs.",
      },
      {
        challenge: "Black-box predictions are unusable for operational management without interpretability.",
        decision:
          "Utilized Random Forest feature importance rankings combined with hierarchical cluster dendrograms to explain why specific employee pairs exhibited high risk.",
      },
    ],
  },
];

export const TECHNOLOGIES = [
  {
    category: "AI / ML",
    items: [
      "Python",
      "LLMs",
      "RAG",
      "Agentic AI",
      "OCR",
      "Computer Vision",
      "Scikit-learn",
      "Embeddings",
      "FastEmbed",
    ],
  },
  {
    category: "Backend",
    items: ["FastAPI", "PostgreSQL", "MongoDB", "MySQL", "WebSockets"],
  },
  {
    category: "AI Infrastructure",
    items: ["vLLM", "Ollama", "pgvector", "Docker", "MinIO"],
  },
  {
    category: "Frameworks & Tools",
    items: ["LlamaIndex", "LangChain", "LangGraph", "Tree-sitter", "GitPython"],
  },
];

export const EXPERIENCE = [
  {
    company: "Hexylon Analytics",
    role: "AI/ML Developer",
    period: "Dec 2024 — Present",
    location: "Ahmedabad, India",
    current: true,
    description:
      "Building AI-powered enterprise systems combining LLMs, specialist agents, backend services, OCR, retrieval and applied machine learning.",
    bullets: [
      "Architected AI-powered enterprise workflows integrating specialist agents, typed Python tools, and deterministic business rules.",
      "Engineered a persistent background task scheduler supporting one-time, interval, and cron-based execution for AI jobs and reporting.",
      "Developed high-performance FastAPI microservices for system integrations, document ingestion, and enterprise automation.",
      "Optimized AI workflow response times from approximately 15 seconds to 5 seconds by configuring model inference and serving with vLLM.",
      "Built an ML-based absence risk prediction workflow using Random Forest, 12 pairwise features, and hierarchical clustering.",
    ],
  },
  {
    company: "EduNet Foundation",
    role: "Machine Learning Intern",
    period: "May 2024 — Jun 2024",
    location: "Anand, India",
    current: false,
    description:
      "Worked on a Driver Behavior Monitoring System using Python and machine learning techniques as part of a collaborative team project.",
    bullets: [
      "Applied computer vision and machine learning models to detect driver anomalies and telemetry signals.",
      "Preprocessed vehicular and sensory datasets for model evaluation and validation.",
    ],
  },
];

export const EDUCATION = [
  {
    institution: "Birla Vishwakarma Mahavidyalaya",
    degree: "BTech in Information Technology",
    period: "2021 — 2025",
    location: "Anand, Gujarat",
    grade: "CPI: 7.14",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Develop AI Agents with LangChain & LangGraph",
    issuer: "LangChain",
    date: "February 2026",
  },
  {
    title: "Complete Data Science, Machine Learning, Deep Learning, and NLP",
    issuer: "Krish Naik",
    date: "January 2025",
  },
];

export const PHILOSOPHY = [
  {
    number: "01",
    principle: "BUILD",
    statement: "Models are only useful when connected to real software.",
    description:
      "An LLM in isolation is an unbound probability engine. Value emerges when reasoning is wrapped in typed tools, verified schemas, and persistent application state.",
  },
  {
    number: "02",
    principle: "RETRIEVE",
    statement: "Give models relevant context instead of expecting them to know everything.",
    description:
      "Context engineering, AST-aware code chunking, and deterministic vector search outperform brute-force context stuffing and reduce uncontrolled model actions.",
  },
  {
    number: "03",
    principle: "ORCHESTRATE",
    statement: "Connect reasoning to controlled tools and deterministic application logic.",
    description:
      "The LLM plans. Code executes. Systems of record require strict validation, typed interfaces, and deterministic execution boundaries.",
  },
  {
    number: "04",
    principle: "EVALUATE",
    statement: "AI systems need measurable behavior, not just impressive demos.",
    description:
      "Engineering rigor means measuring workflow latency, token throughput, failure recovery, and feature importance rather than hand-wavy benchmarks.",
  },
  {
    number: "05",
    principle: "SHIP",
    statement: "A model running locally is not the same thing as a usable system.",
    description:
      "True delivery involves background worker queues, WebSocket streaming, Docker containerization, and optimized model inference serving.",
  },
];

export const ABOUT_TEXT =
  "I'm an AI/ML Developer focused on building practical AI systems.\n\nMy work sits at the intersection of Generative AI, backend engineering and applied machine learning. I've worked on enterprise agent systems, retrieval pipelines, OCR workflows and ML-based prediction systems.\n\nI enjoy working on the layer between models and real software — where AI needs reliable data, tools, APIs and engineering constraints to become useful.";

export const CURRENTLY_EXPLORING = [
  {
    topic: "ML / DL Fundamentals",
    description: "Deepening mathematical foundations and neural network architecture design.",
  },
  {
    topic: "AI Evaluation & Observability",
    description: "Systematic tracing of agent decision loops, hallucination rates, and latency bottlenecks.",
  },
  {
    topic: "LLM Fine-Tuning",
    description: "Parameter-efficient fine-tuning (LoRA/QLoRA) for specialized structured extraction tasks.",
  },
  {
    topic: "Production AI Infrastructure",
    description: "High-throughput serving clusters, distributed KV-cache sharing, and vLLM optimizations.",
  },
  {
    topic: "Distributed Backend Systems",
    description: "Event-driven asynchronous queues, resilient socket streaming, and distributed locks.",
  },
  {
    topic: "Cloud Deployment",
    description: "Production container orchestration, GPU provisioning, and reliable CI/CD pipelines.",
  },
];
