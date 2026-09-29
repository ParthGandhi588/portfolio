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
      "AI systems that combine LLM reasoning with constrained tools, scoped specialist roles, and deterministic application logic.",
    details: [
      "Specialist agent architecture with bounded role prompts and toolsets",
      "Typed Python tools with Pydantic validation and async task queues",
      "Deterministic routing between reasoning and transaction layers",
    ],
  },
  {
    number: "02",
    title: "RAG & CODE INTELLIGENCE",
    description:
      "Repository-aware retrieval systems with Tree-sitter AST chunking, incremental hashing, and dense vector search.",
    details: [
      "Language-aware AST code chunking via Tree-sitter across 10 languages",
      "Dual-store incremental indexing via SHA-256 and modification time",
      "PostgreSQL + pgvector with HNSW bulk-ingestion drop-and-rebuild optimization",
    ],
  },
  {
    number: "03",
    title: "AI BACKEND SYSTEMS",
    description:
      "FastAPI services, persistent task schedulers, local model serving, and multimodal document processing infrastructure.",
    details: [
      "Persistent PostgreSQL AI task scheduler with timezone handling and retries",
      "Local vLLM model serving bringing workflow latency from ~15s to ~5s",
      "Multimodal document ingestion with MIME detection and OCR caching",
    ],
  },
  {
    number: "04",
    title: "APPLIED ML",
    description:
      "Production machine-learning pipelines for risk prediction, behavioral analysis, hierarchical clustering, and explainability.",
    details: [
      "120-day observation structure (90-day feature window + 30-day target window)",
      "12 engineered pairwise temporal and behavioral interaction features",
      "Random Forest ensemble and complete-linkage clustering (t=0.75 guarantee)",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "agentic-erp",
    number: "01",
    category: "01 · ENTERPRISE AI",
    title: "AGENTIC ERP",
    tagline: "An enterprise AI layer connecting business workflows through specialist agents, typed tools, and persistent scheduling.",
    description:
      "An AI layer over an enterprise ERP ecosystem that connects complex operational workflows through specialist AI agents, typed Python tools, and persistent backend services.",
    heroPrinciple: "The LLM plans. Python executes. The ERP remains the system of record.",
    technologies: [
      "Python",
      "FastAPI",
      "WebSockets",
      "PostgreSQL",
      "MongoDB",
      "vLLM",
      "Qwen",
      "Pydantic",
      "PyMuPDF",
      "Docker",
    ],
    repoUrl: "https://github.com/Agentic-ERP/agentic_erp",
    architectureFlow: [
      { step: "USER / TRIGGERS", description: "Natural language query, document upload, or persistent scheduler trigger" },
      { step: "FASTAPI / WEBSOCKET", description: "Session validation, MIME routing, rate-limiting, and async token streaming" },
      { step: "SPECIALIST AGENT", description: "Domain-scoped agent (Purchase, Stores, Planning, etc.) with constrained prompts" },
      { step: "vLLM REASONING", description: "Local model serving generating structured tool invocation schemas at temp=0" },
      { step: "TYPED PYTHON TOOL", description: "Strict Pydantic validation and concurrent async task queue execution" },
      { step: "ERP & PERSISTENCE", description: "Deterministic execution against ERP APIs, PostgreSQL, and document storage" },
    ],
    keyFeatures: [
      {
        title: "SPECIALIST AGENT RUNTIME",
        description: "Domain-specific agents configured with scoped system prompts and bounded toolsets per operational area, avoiding unconstrained generalist agent sprawl.",
      },
      {
        title: "TYPED CONSTRAINED EXECUTION",
        description: "Model decisions translate into typed Python operations with strict Pydantic validation before touching internal ERP API endpoints.",
      },
      {
        title: "PERSISTENT AI SCHEDULER",
        description: "PostgreSQL-backed job queue supporting natural language cron, interval, and one-time execution with timezone math and retry handling.",
      },
      {
        title: "MULTIMODAL DOCUMENT PROCESSING",
        description: "Automated MIME detection, PyMuPDF native extraction, and vision OCR with SHA-256 payload caching for operational documents.",
      },
    ],
    engineeringHighlights: [
      "Strict separation of concerns: LLM formulates structured action intent; deterministic Python code executes state changes.",
      "Optimized model inference using local vLLM serving, reducing a documented document workflow latency from ~15s to ~5s.",
      "Engineered persistent PostgreSQL AI cron scheduler with background worker process, timezone conversion, and delivery hooks.",
      "Evaluated experimental supervisor-worker multi-agent leader on feature branch with lazy-loaded schema context to minimize prompt bloat.",
    ],
    metricsNote: "Engineering optimization: Reduced workflow latency from ~15s to ~5s via local vLLM model serving and token streaming.",
    challengesAndDecisions: [
      {
        challenge: "Unconstrained LLMs making unauthorized or malformed enterprise database mutations.",
        decision:
          "Enforced a specialist-agent architecture with bounded Python tools. The model only outputs validated parameter schemas; execution occurs deterministically against authenticated ERP services.",
      },
      {
        challenge: "High round-trip latency (>15s) in multi-step document analysis workflows.",
        decision:
          "Deployed local vLLM model serving hosting Qwen at temperature zero, eliminating network hops and cold starts to cut workflow duration to ~5s.",
      },
      {
        challenge: "Scheduled AI tasks failing or disappearing upon server restarts with in-memory timers.",
        decision:
          "Architected a persistent PostgreSQL-backed scheduler with dedicated job and run tables, timezone-aware execution loops, and automatic retry states.",
      },
    ],
  },
  {
    slug: "codebase-rag",
    number: "02",
    category: "02 · CODE INTELLIGENCE",
    title: "CODEBASE RAG",
    tagline: "Repository-aware code intelligence with Tree-sitter AST chunking, incremental indexing, and pgvector HNSW search.",
    description:
      "A repository-aware RAG system designed for codebase exploration through AST-aware code chunking, incremental hashing, and dense vector retrieval.",
    heroPrinciple: "AST-aware semantic retrieval grounded in exact repository syntax and verified file paths.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Tree-sitter",
      "FastEmbed",
      "LlamaIndex",
      "Gemini",
      "Ollama",
      "GitPython",
      "Docker",
    ],
    repoUrl: "https://github.com/ParthGandhi588/CodeBase-RAG",
    architectureFlow: [
      { step: "REPOSITORY", description: "Cloned or local target codebase scanned via GitPython with .gitignore filtering" },
      { step: "MANIFEST SCANNER", description: "Compares SHA-256 and mtime against PostgreSQL manifest to detect modifications" },
      { step: "TREE-SITTER AST", description: "Language-aware AST code splitting across 10 languages preserving logical boundaries" },
      { step: "CODE CHUNKS", description: "50-line chunks with 10-line overlap tagged with relative file path and line numbers" },
      { step: "FASTEMBED", description: "High-throughput local dense vector embeddings generated without external API dependencies" },
      { step: "PGVECTOR (HNSW)", description: "HNSW indexes dropped during bulk ingestion and rebuilt post-embedding for optimal write speeds" },
      { step: "ISOLATED RETRIEVAL", description: "Top-k semantic retrieval partitioned by repository source key and hashed session ID" },
      { step: "HYBRID LLM", description: "Gemini API reasoning with automatic local fallback to Ollama for offline codebases" },
      { step: "GROUNDED RESPONSE", description: "Synthesized answers citing exact file paths, function signatures, and line spans" },
    ],
    keyFeatures: [
      {
        title: "TREE-SITTER AST CHUNKING",
        description: "Language-aware syntax chunking across 10 languages (Python, JS, TS, Java, Go, Rust, C++, C, C#, PHP) respecting structural code boundaries.",
      },
      {
        title: "INCREMENTAL MANIFEST INDEXING",
        description: "Dual-store design comparing file modification time (mtime) and SHA-256 against a PostgreSQL manifest table to skip unchanged files.",
      },
      {
        title: "HNSW INGESTION OPTIMIZATION",
        description: "Drops HNSW vector indexes prior to bulk ingestion and rebuilds them post-embedding, eliminating per-row graph rebalancing bottlenecks.",
      },
      {
        title: "MULTI-REPO & SESSION ISOLATION",
        description: "Assigns source keys and MD5-hashed session IDs to vector metadata to prevent cross-repository or cross-user context leakage.",
      },
      {
        title: "HYBRID MODEL SERVING",
        description: "Primary integration with Gemini API paired with seamless automatic fallback to local Ollama (llama3.2) when operating offline.",
      },
      {
        title: "IMPORT DEPENDENCY GRAPH",
        description: "Multi-language import extraction and cycle detection providing structural repository context alongside semantic vector search.",
      },
    ],
    engineeringHighlights: [
      "Avoids naive text slicing: uses Tree-sitter AST parsers to keep complete function and class declarations intact.",
      "Bulk ingestion optimization: drops HNSW index during vector inserts and rebuilds post-embedding for superior throughput.",
      "Dual manifest change detection prevents redundant re-embedding of entire repositories upon small git commits.",
      "Multi-tenant isolation using repository source keys and hashed session tokens within PostgreSQL pgvector tables.",
    ],
    challengesAndDecisions: [
      {
        challenge: "Fixed-character chunking cuts functions in half, separates signatures from docstrings, and breaks code understanding.",
        decision:
          "Implemented AST-based syntax splitting via Tree-sitter across 10 programming languages, preserving intact classes and methods with 50-line bounds.",
      },
      {
        challenge: "Massive vector index rebalancing latency during bulk codebase ingestion into pgvector.",
        decision:
          "Engineered an ingestion pipeline that drops the HNSW index before bulk vector insertion, performs batch writes, and reconstructs the HNSW graph post-embedding.",
      },
      {
        challenge: "Re-embedding thousands of repository files upon small commits wastes significant compute and time.",
        decision:
          "Built a persistent manifest table tracking file path, SHA-256 hash, and mtime, restricting embedding updates exclusively to modified or new files.",
      },
    ],
  },
  {
    slug: "absence-risk",
    number: "03",
    category: "03 · APPLIED ML",
    title: "ABSENCE RISK PREDICTION",
    tagline: "An applied ML workflow analyzing leave and attendance data to predict pairwise co-absence risk and discover patterns.",
    description:
      "An applied machine learning workflow analyzing employee leave and attendance patterns to identify relational co-absence risk and discover natural absence syndicates.",
    heroPrinciple: "Moving beyond heuristics: engineering pairwise behavioral features into explainable ML predictions.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "Hierarchical Clustering",
      "Jaccard Distance",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "MongoDB",
    ],
    architectureFlow: [
      { step: "ATTENDANCE LOGS", description: "Daily punch logs, approved leave applications, and shift rosters from PostgreSQL & MongoDB" },
      { step: "120-DAY WINDOW", description: "120-day observation window partitioned into 90-day feature training and 30-day target observation" },
      { step: "12 PAIRWISE FEATURES", description: "Dyadic temporal metrics: recency, individual leave rates, Jaccard overlap, and weekend bridges" },
      { step: "RANDOM FOREST", description: "Supervised ensemble classifier (100 estimators) trained with stratified 80/20 train/test split" },
      { step: "30-DAY FORWARD RISK", description: "Predicted co-absence probability for employee pairs in the upcoming 30-day operational horizon" },
      { step: "COMPLETE-LINKAGE CLUSTERING", description: "Agglomerative clustering on Jaccard distance with t=0.75 guarantee (all members share >=0.25 similarity)" },
      { step: "RULE-BASED EXPLAINABILITY", description: "Decision heuristics translating Random Forest feature contributions into actionable operational drivers" },
    ],
    keyFeatures: [
      {
        title: "120-DAY DUAL-WINDOW DESIGN",
        description: "Strictly partitioned 90-day feature aggregation window (Days -120 to -30) and 30-day ground-truth target window (Days -30 to 0) to prevent temporal data leakage.",
      },
      {
        title: "12 PAIRWISE INTERACTION FEATURES",
        description: "Engineered dyadic features capturing recency (days since last co-leave), individual baseline leave rates, Jaccard overlap, and Monday/Friday weekend bridges.",
      },
      {
        title: "RANDOM FOREST ENSEMBLE",
        description: "Supervised 100-tree classifier trained with stratified 80/20 split, identifying interaction patterns across dyadic employee pairs.",
      },
      {
        title: "COMPLETE-LINKAGE CLUSTERING",
        description: "Agglomerative clustering cut at distance threshold t=0.75, mathematically guaranteeing all cluster members share >=0.25 pairwise Jaccard similarity.",
      },
      {
        title: "RULE-BASED EXPLAINABILITY",
        description: "Maps feature thresholds to transparent risk drivers (e.g. frequent weekend bridge leaves, unplanned absence synchronization) for operations teams.",
      },
    ],
    engineeringHighlights: [
      "Strict temporal partition: 120-day historical window split into 90-day feature aggregation and 30-day forward prediction target.",
      "Empirical feature insight: historical interaction dynamics (recency, individual frequency, Jaccard overlap) accounted for >78% of model importance.",
      "Mathematical clustering guarantee: complete-linkage agglomerative clustering with t=0.75 guarantees >=0.25 pairwise similarity across all cluster members.",
      "Discovered 147 distinct co-absence clusters across enterprise workforce attendance logs.",
    ],
    challengesAndDecisions: [
      {
        challenge: "Individual employee leave data lacks relationship context for correlated absences.",
        decision:
          "Formulated the problem as pairwise dyadic modeling, engineering 12 relational and temporal interaction features across all active employee pairs.",
      },
      {
        challenge: "Temporal data leakage when training ML models on overlapping historical attendance records.",
        decision:
          "Partitioned the 120-day observation window into a 90-day feature window and a distinct 30-day target window, preventing future overlap from leaking into features.",
      },
      {
        challenge: "Arbitrary k-means clustering produces inconsistent groupings without semantic distance guarantees.",
        decision:
          "Implemented complete-linkage hierarchical clustering on Jaccard distance with threshold t=0.75, ensuring every pair in a cluster shares at least 25% co-absence overlap.",
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
      "Building AI-powered enterprise systems combining LLMs, specialist agents, backend services, OCR, retrieval, and applied machine learning.",
    bullets: [
      "Architected enterprise AI workflows using specialist-agent architectures with typed Python tools and Pydantic validation boundaries.",
      "Engineered a persistent PostgreSQL-backed AI task scheduler supporting cron, interval, and one-time execution with timezone handling and retry logic.",
      "Developed high-performance FastAPI microservices for system integrations, multimodal document ingestion, and enterprise automation.",
      "Optimized model serving response times from approximately 15 seconds to 5 seconds by configuring local vLLM serving and async streaming.",
      "Built an applied ML absence prediction workflow with a 120-day dual-window architecture, 12 pairwise features, Random Forest, and complete-linkage clustering.",
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
  {
    institution: "Riverdale Academy",
    degree: "Higher Secondary (Class XII) · Science Stream (GSEB)",
    period: "2019 — 2021",
    location: "Surat, Gujarat",
    grade: "Percentile: 93.71",
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
      "True delivery involves persistent background worker queues, WebSocket streaming, Docker containerization, and optimized model inference serving.",
  },
];

export const ABOUT_TEXT =
  "I'm an AI/ML Developer focused on building practical AI systems.\n\nMy work sits at the intersection of Generative AI, backend engineering, and applied machine learning. I've worked on enterprise agent systems, retrieval pipelines, OCR workflows, and ML-based prediction systems.\n\nI enjoy working on the layer between models and real software — where AI needs reliable data, tools, APIs, and engineering constraints to become useful.";

export const CURRENTLY_EXPLORING = [
  {
    topic: "ML / DL Fundamentals",
    description: "Deepening mathematical foundations and neural network architecture design.",
  },
  {
    topic: "AI Evaluation & Observability",
    description: "Systematic tracing of agent decision loops, tool reliability, and latency bottlenecks.",
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
