import type { CategoryId } from './categories';

export type TopicType = 'core' | 'practice' | 'read';

export type Resource = {
  label: string;
  url: string;
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  type: TopicType;
  summary: string;
  resources: Resource[];
  estMinutes: number;
  difficulty: 1 | 2 | 3;
  dependsOn?: string[];
};

export const CURRICULUM: Topic[] = [
  // --- Engineering Foundations ---------------------------------------
  {
    id: 'git-version-control',
    slug: 'git-and-version-control',
    title: 'Git and version control',
    category: 'foundations',
    type: 'core',
    summary: 'Commits, branches, merges, rebases, pull requests, and safe recovery.',
    resources: [
      { label: 'Pro Git book', url: 'https://git-scm.com/book/en/v2' },
      { label: 'Atlassian Git tutorials', url: 'https://www.atlassian.com/git/tutorials' },
      { label: 'GitHub flow', url: 'https://docs.github.com/en/get-started/using-github/github-flow' },
    ],
    estMinutes: 120,
    difficulty: 1,
  },
  {
    id: 'command-line-linux',
    slug: 'command-line-and-linux',
    title: 'Command line and Linux basics',
    category: 'foundations',
    type: 'core',
    summary: 'Shell navigation, files, processes, permissions, pipes, and service inspection.',
    resources: [
      { label: 'Linux Journey', url: 'https://linuxjourney.com/' },
      { label: 'The Linux command line', url: 'https://linuxcommand.org/tlcl.php' },
      { label: 'Explain Shell', url: 'https://explainshell.com/' },
    ],
    estMinutes: 150,
    difficulty: 1,
  },
  {
    id: 'debugging-workflow',
    slug: 'debugging-workflow',
    title: 'Debugging workflow',
    category: 'foundations',
    type: 'core',
    summary: 'Reproduce, isolate, inspect logs, form hypotheses, fix, and verify.',
    resources: [
      { label: 'Julia Evans — debugging tools', url: 'https://jvns.ca/categories/debugging/' },
      { label: 'The Debugging Book', url: 'https://www.debuggingbook.org/' },
      { label: 'Chrome DevTools docs', url: 'https://developer.chrome.com/docs/devtools/' },
    ],
    estMinutes: 120,
    difficulty: 1,
    dependsOn: ['command-line-linux'],
  },
  {
    id: 'data-structures-complexity',
    slug: 'data-structures-and-complexity',
    title: 'Data structures and complexity',
    category: 'foundations',
    type: 'core',
    summary: 'Arrays, maps, sets, trees, queues, graphs, Big O, and trade-offs.',
    resources: [
      { label: 'VisuAlgo', url: 'https://visualgo.net/en' },
      { label: 'OpenDSA', url: 'https://opendsa-server.cs.vt.edu/' },
      { label: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/' },
    ],
    estMinutes: 180,
    difficulty: 2,
  },
  {
    id: 'language-runtime-basics',
    slug: 'language-runtime-basics',
    title: 'Language runtime basics',
    category: 'foundations',
    type: 'core',
    summary: 'Memory, stack vs heap, garbage collection, async I/O, threads, and processes.',
    resources: [
      { label: 'MDN — JavaScript concurrency model', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' },
      { label: 'Python docs — asyncio', url: 'https://docs.python.org/3/library/asyncio.html' },
      { label: 'Go tour — goroutines', url: 'https://go.dev/tour/concurrency/1' },
    ],
    estMinutes: 150,
    difficulty: 2,
    dependsOn: ['data-structures-complexity'],
  },
  {
    id: 'dependency-management',
    slug: 'dependency-management',
    title: 'Dependency management',
    category: 'foundations',
    type: 'core',
    summary: 'Packages, lockfiles, semantic versioning, supply-chain risk, and upgrades.',
    resources: [
      { label: 'Semantic Versioning', url: 'https://semver.org/' },
      { label: 'npm package-lock docs', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json' },
      { label: 'Python packaging guide', url: 'https://packaging.python.org/en/latest/' },
    ],
    estMinutes: 90,
    difficulty: 1,
    dependsOn: ['git-version-control', 'command-line-linux'],
  },

  // ─── API & Networking ───────────────────────────────────────────
  {
    id: 'http-fundamentals',
    slug: 'http-fundamentals',
    title: 'HTTP fundamentals',
    category: 'api',
    type: 'core',
    summary: 'Methods, headers, status codes, request/response cycle.',
    resources: [
      { label: 'MDN — HTTP overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' },
      { label: 'MDN — HTTP status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
      { label: 'High Performance Browser Networking — Ch. HTTP', url: 'https://hpbn.co/' },
    ],
    estMinutes: 90,
    difficulty: 1,
  },
  {
    id: 'rest-api-design',
    slug: 'rest-api-design',
    title: 'REST API design',
    category: 'api',
    type: 'core',
    summary: 'Resources, endpoints, CRUD mapping, versioning.',
    resources: [
      { label: 'Microsoft REST API guidelines', url: 'https://github.com/microsoft/api-guidelines' },
      { label: 'Google AIPs (API improvement proposals)', url: 'https://google.aip.dev/' },
      { label: 'REST API Tutorial', url: 'https://restfulapi.net/' },
    ],
    estMinutes: 120,
    difficulty: 2,
    dependsOn: ['http-fundamentals'],
  },
  {
    id: 'data-formats',
    slug: 'data-formats',
    title: 'Data formats',
    category: 'api',
    type: 'core',
    summary: 'JSON, XML, Protobuf, schema validation.',
    resources: [
      { label: 'JSON Schema', url: 'https://json-schema.org/' },
      { label: 'Protocol Buffers', url: 'https://protobuf.dev/' },
      { label: 'Zod — TS schema validation', url: 'https://zod.dev/' },
    ],
    estMinutes: 60,
    difficulty: 1,
  },
  {
    id: 'build-rest-api',
    slug: 'build-a-rest-api',
    title: 'Build a REST API',
    category: 'api',
    type: 'practice',
    summary: 'Create CRUD endpoints with validation and error handling.',
    resources: [
      { label: 'FastAPI tutorial', url: 'https://fastapi.tiangolo.com/tutorial/' },
      { label: 'Express getting started', url: 'https://expressjs.com/en/starter/installing.html' },
      { label: 'NestJS docs', url: 'https://docs.nestjs.com/' },
    ],
    estMinutes: 240,
    difficulty: 2,
    dependsOn: ['rest-api-design', 'data-formats'],
  },
  {
    id: 'authentication',
    slug: 'authentication',
    title: 'Authentication',
    category: 'api',
    type: 'core',
    summary: 'API keys, JWT tokens, OAuth2 flows.',
    resources: [
      { label: 'OAuth 2.0 simplified', url: 'https://www.oauth.com/' },
      { label: 'JWT introduction', url: 'https://jwt.io/introduction' },
      { label: 'OWASP authentication cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    ],
    estMinutes: 120,
    difficulty: 2,
  },
  {
    id: 'networking-basics',
    slug: 'networking-basics',
    title: 'Networking basics',
    category: 'api',
    type: 'core',
    summary: 'DNS, TCP/IP, TLS, ports, sockets.',
    resources: [
      { label: 'High Performance Browser Networking (free book)', url: 'https://hpbn.co/' },
      { label: 'Julia Evans — networking zines', url: 'https://wizardzines.com/zines/networking/' },
      { label: 'How DNS works (comic)', url: 'https://howdns.works/' },
    ],
    estMinutes: 90,
    difficulty: 2,
  },

  // ─── Design Patterns & Principles ──────────────────────────────
  {
    id: 'creational-patterns',
    slug: 'creational-patterns',
    title: 'Creational patterns',
    category: 'patterns',
    type: 'core',
    summary: 'Singleton, Factory, Builder — when and why.',
    resources: [
      { label: 'Refactoring Guru — Creational patterns', url: 'https://refactoring.guru/design-patterns/creational-patterns' },
      { label: 'Source Making — Creational', url: 'https://sourcemaking.com/design_patterns/creational_patterns' },
    ],
    estMinutes: 60,
    difficulty: 2,
  },
  {
    id: 'structural-patterns',
    slug: 'structural-patterns',
    title: 'Structural patterns',
    category: 'patterns',
    type: 'core',
    summary: 'Repository, Adapter, Decorator, Facade.',
    resources: [
      { label: 'Refactoring Guru — Structural patterns', url: 'https://refactoring.guru/design-patterns/structural-patterns' },
      { label: 'Martin Fowler — Repository', url: 'https://martinfowler.com/eaaCatalog/repository.html' },
    ],
    estMinutes: 75,
    difficulty: 2,
  },
  {
    id: 'behavioral-patterns',
    slug: 'behavioral-patterns',
    title: 'Behavioral patterns',
    category: 'patterns',
    type: 'core',
    summary: 'Observer, Strategy, Chain of Responsibility.',
    resources: [
      { label: 'Refactoring Guru — Behavioral patterns', url: 'https://refactoring.guru/design-patterns/behavioral-patterns' },
      { label: 'Source Making — Behavioral', url: 'https://sourcemaking.com/design_patterns/behavioral_patterns' },
    ],
    estMinutes: 75,
    difficulty: 2,
  },
  {
    id: 'solid',
    slug: 'solid-principles',
    title: 'SOLID principles',
    category: 'patterns',
    type: 'core',
    summary: 'SRP, OCP, LSP, ISP, DIP — the backbone of clean code.',
    resources: [
      { label: 'Uncle Bob — SOLID papers', url: 'https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html' },
      { label: 'Stackify — SOLID explained', url: 'https://stackify.com/solid-design-principles/' },
    ],
    estMinutes: 90,
    difficulty: 2,
  },
  {
    id: 'middleware-pattern',
    slug: 'middleware-pattern',
    title: 'Middleware pattern',
    category: 'patterns',
    type: 'core',
    summary: 'Request pipelines: auth → logging → validation → handler.',
    resources: [
      { label: 'Express middleware guide', url: 'https://expressjs.com/en/guide/using-middleware.html' },
      { label: 'Koa onion model', url: 'https://github.com/koajs/koa/blob/master/docs/guide.md' },
    ],
    estMinutes: 45,
    difficulty: 1,
  },
  {
    id: 'head-first-design-patterns',
    slug: 'head-first-design-patterns',
    title: 'Head First Design Patterns',
    category: 'patterns',
    type: 'read',
    summary: 'Most approachable book on design patterns.',
    resources: [
      { label: 'O’Reilly — Head First Design Patterns', url: 'https://www.oreilly.com/library/view/head-first-design/9781492077992/' },
      { label: 'Companion code', url: 'https://github.com/bethrobson/Head-First-Design-Patterns' },
    ],
    estMinutes: 1200,
    difficulty: 2,
  },

  // ─── Databases ─────────────────────────────────────────────────
  {
    id: 'sql-vs-nosql',
    slug: 'sql-vs-nosql',
    title: 'SQL vs NoSQL',
    category: 'databases',
    type: 'core',
    summary: 'Relational, document, key-value, graph — tradeoffs.',
    resources: [
      { label: 'AWS — DB types comparison', url: 'https://aws.amazon.com/nosql/' },
      { label: 'Use the index, Luke!', url: 'https://use-the-index-luke.com/' },
    ],
    estMinutes: 60,
    difficulty: 2,
  },
  {
    id: 'indexing-queries',
    slug: 'indexing-and-queries',
    title: 'Indexing and queries',
    category: 'databases',
    type: 'core',
    summary: 'B-trees, composite indexes, query plans, N+1 problem.',
    resources: [
      { label: 'Use the index, Luke! — B-tree indexes', url: 'https://use-the-index-luke.com/sql/anatomy' },
      { label: 'PostgreSQL EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html' },
    ],
    estMinutes: 150,
    difficulty: 2,
  },
  {
    id: 'data-modeling',
    slug: 'data-modeling',
    title: 'Data modeling',
    category: 'databases',
    type: 'core',
    summary: 'Normalization, denormalization, schema design.',
    resources: [
      { label: 'Database design — Stanford', url: 'https://lagunita.stanford.edu/courses/Engineering/db/2014_1/about' },
      { label: 'Data modeling patterns', url: 'https://www.vertabelo.com/blog/' },
    ],
    estMinutes: 90,
    difficulty: 2,
  },
  {
    id: 'caching-redis',
    slug: 'caching-with-redis',
    title: 'Caching with Redis',
    category: 'databases',
    type: 'core',
    summary: 'Cache-aside, write-through, TTL, invalidation.',
    resources: [
      { label: 'Redis docs — Caching', url: 'https://redis.io/docs/latest/develop/use/patterns/' },
      { label: 'AWS caching strategies', url: 'https://aws.amazon.com/caching/best-practices/' },
    ],
    estMinutes: 90,
    difficulty: 2,
  },
  {
    id: 'transactions-acid',
    slug: 'transactions-and-acid',
    title: 'Transactions and ACID',
    category: 'databases',
    type: 'core',
    summary: 'Isolation levels, deadlocks, optimistic locking.',
    resources: [
      { label: 'PostgreSQL — Transaction isolation', url: 'https://www.postgresql.org/docs/current/transaction-iso.html' },
      { label: 'Martin Kleppmann — Hermitage', url: 'https://github.com/ept/hermitage' },
    ],
    estMinutes: 120,
    difficulty: 3,
  },
  {
    id: 'design-schema',
    slug: 'design-a-schema',
    title: 'Design a schema',
    category: 'databases',
    type: 'practice',
    summary: 'Model an e-commerce system end-to-end.',
    resources: [
      { label: 'dbdiagram.io (free modeling tool)', url: 'https://dbdiagram.io/' },
      { label: 'Sample schemas for inspiration', url: 'https://github.com/devrimgunduz/pagila' },
    ],
    estMinutes: 180,
    difficulty: 2,
    dependsOn: ['data-modeling', 'indexing-queries'],
  },

  // ─── Scalability & Resilience ──────────────────────────────────
  {
    id: 'scaling-strategies',
    slug: 'scaling-strategies',
    title: 'Scaling strategies',
    category: 'scalability',
    type: 'core',
    summary: 'Horizontal vs vertical, stateless design, connection pooling.',
    resources: [
      { label: 'AWS — Scalability fundamentals', url: 'https://aws.amazon.com/builders-library/' },
      { label: 'High Scalability blog', url: 'http://highscalability.com/' },
    ],
    estMinutes: 75,
    difficulty: 2,
  },
  {
    id: 'load-balancing',
    slug: 'load-balancing',
    title: 'Load balancing',
    category: 'scalability',
    type: 'core',
    summary: 'Round-robin, least-connections, health checks.',
    resources: [
      { label: 'NGINX — Load balancing', url: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/' },
      { label: 'HAProxy docs', url: 'https://www.haproxy.org/' },
    ],
    estMinutes: 60,
    difficulty: 2,
  },
  {
    id: 'message-queues',
    slug: 'message-queues',
    title: 'Message queues',
    category: 'scalability',
    type: 'core',
    summary: 'Kafka, RabbitMQ, SQS — async processing.',
    resources: [
      { label: 'Kafka — Documentation', url: 'https://kafka.apache.org/documentation/' },
      { label: 'RabbitMQ tutorials', url: 'https://www.rabbitmq.com/tutorials' },
    ],
    estMinutes: 120,
    difficulty: 2,
  },
  {
    id: 'fault-tolerance',
    slug: 'fault-tolerance',
    title: 'Fault tolerance',
    category: 'scalability',
    type: 'core',
    summary: 'Circuit breaker, retries, backoff, graceful degradation.',
    resources: [
      { label: 'AWS — Builders’ Library: timeouts/retries', url: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/' },
      { label: 'Martin Fowler — Circuit Breaker', url: 'https://martinfowler.com/bliki/CircuitBreaker.html' },
    ],
    estMinutes: 90,
    difficulty: 3,
  },
  {
    id: 'rate-limiting',
    slug: 'rate-limiting',
    title: 'Rate limiting',
    category: 'scalability',
    type: 'core',
    summary: 'Token bucket, sliding window, API throttling.',
    resources: [
      { label: 'Stripe — Rate limiters', url: 'https://stripe.com/blog/rate-limiters' },
      { label: 'Cloudflare — Rate limiting', url: 'https://developers.cloudflare.com/waf/rate-limiting-rules/' },
    ],
    estMinutes: 60,
    difficulty: 2,
  },
  {
    id: 'cap-theorem',
    slug: 'cap-theorem',
    title: 'CAP theorem',
    category: 'scalability',
    type: 'core',
    summary: 'Consistency, availability, partition tolerance tradeoffs.',
    resources: [
      { label: 'Original CAP paper (Brewer)', url: 'https://www.cs.berkeley.edu/~brewer/cs262b-2004/PODC-keynote.pdf' },
      { label: 'You can’t sacrifice partition tolerance (Hale)', url: 'https://codahale.com/you-cant-sacrifice-partition-tolerance/' },
    ],
    estMinutes: 60,
    difficulty: 3,
  },

  // ─── Distributed Systems ───────────────────────────────────────
  {
    id: 'monolith-microservices',
    slug: 'monolith-vs-microservices',
    title: 'Monolith vs microservices',
    category: 'distributed',
    type: 'core',
    summary: 'When to split, modular monolith as middle ground.',
    resources: [
      { label: 'Martin Fowler — Microservices premium', url: 'https://martinfowler.com/articles/microservice-trade-offs.html' },
      { label: 'Modular monolith — Kamil Grzybek', url: 'https://www.kamilgrzybek.com/blog/posts/modular-monolith-primer' },
    ],
    estMinutes: 75,
    difficulty: 2,
  },
  {
    id: 'event-driven',
    slug: 'event-driven-architecture',
    title: 'Event-driven architecture',
    category: 'distributed',
    type: 'core',
    summary: 'Event sourcing, CQRS, pub/sub patterns.',
    resources: [
      { label: 'Martin Fowler — Event Sourcing', url: 'https://martinfowler.com/eaaDev/EventSourcing.html' },
      { label: 'Martin Fowler — CQRS', url: 'https://martinfowler.com/bliki/CQRS.html' },
    ],
    estMinutes: 90,
    difficulty: 3,
  },
  {
    id: 'api-gateway',
    slug: 'api-gateway',
    title: 'API gateway',
    category: 'distributed',
    type: 'core',
    summary: 'Routing, aggregation, cross-cutting concerns.',
    resources: [
      { label: 'Microsoft — API gateway pattern', url: 'https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway' },
      { label: 'Kong, Tyk, Envoy — comparison reading', url: 'https://konghq.com/blog/learning-center/what-is-an-api-gateway' },
    ],
    estMinutes: 60,
    difficulty: 2,
  },
  {
    id: 'graphql-grpc',
    slug: 'graphql-and-grpc',
    title: 'GraphQL and gRPC',
    category: 'distributed',
    type: 'core',
    summary: 'Beyond REST — when to use alternatives.',
    resources: [
      { label: 'GraphQL — Learn', url: 'https://graphql.org/learn/' },
      { label: 'gRPC — Quick start', url: 'https://grpc.io/docs/' },
    ],
    estMinutes: 90,
    difficulty: 2,
  },
  {
    id: 'design-url-shortener',
    slug: 'design-a-url-shortener',
    title: 'Design a URL shortener',
    category: 'distributed',
    type: 'practice',
    summary: 'Classic system design exercise.',
    resources: [
      { label: 'System Design Primer — TinyURL', url: 'https://github.com/donnemartin/system-design-primer#designing-a-url-shortener' },
      { label: 'ByteByteGo walkthrough', url: 'https://bytebytego.com/courses/system-design-interview/design-a-url-shortener' },
    ],
    estMinutes: 180,
    difficulty: 2,
  },
  {
    id: 'design-chat-system',
    slug: 'design-a-chat-system',
    title: 'Design a chat system',
    category: 'distributed',
    type: 'practice',
    summary: 'WebSockets, presence, message delivery.',
    resources: [
      { label: 'System Design Primer — chat', url: 'https://github.com/donnemartin/system-design-primer' },
      { label: 'Slack architecture (blog)', url: 'https://slack.engineering/' },
    ],
    estMinutes: 240,
    difficulty: 3,
  },

  // ─── Production & Operations ───────────────────────────────────
  {
    id: 'observability',
    slug: 'observability',
    title: 'Observability',
    category: 'production',
    type: 'core',
    summary: 'Logging, metrics, tracing, alerting.',
    resources: [
      { label: 'OpenTelemetry docs', url: 'https://opentelemetry.io/docs/' },
      { label: 'Google SRE — Monitoring chapter', url: 'https://sre.google/sre-book/monitoring-distributed-systems/' },
    ],
    estMinutes: 120,
    difficulty: 2,
  },
  {
    id: 'cicd',
    slug: 'ci-cd-and-deployment',
    title: 'CI/CD and deployment',
    category: 'production',
    type: 'core',
    summary: 'Blue-green, canary, rolling deployments.',
    resources: [
      { label: 'GitHub Actions docs', url: 'https://docs.github.com/en/actions' },
      { label: 'Martin Fowler — Continuous Delivery', url: 'https://martinfowler.com/bliki/ContinuousDelivery.html' },
    ],
    estMinutes: 90,
    difficulty: 2,
  },
  {
    id: 'containers-k8s',
    slug: 'containers-and-k8s',
    title: 'Containers and K8s',
    category: 'production',
    type: 'core',
    summary: 'Docker, Kubernetes, service discovery.',
    resources: [
      { label: 'Docker — Get started', url: 'https://docs.docker.com/get-started/' },
      { label: 'Kubernetes — Concepts', url: 'https://kubernetes.io/docs/concepts/' },
    ],
    estMinutes: 240,
    difficulty: 3,
  },
  {
    id: 'api-docs',
    slug: 'api-documentation',
    title: 'API documentation',
    category: 'production',
    type: 'core',
    summary: 'OpenAPI, Swagger, developer experience.',
    resources: [
      { label: 'OpenAPI specification', url: 'https://swagger.io/specification/' },
      { label: 'Redoc — interactive docs', url: 'https://redocly.com/redoc/' },
    ],
    estMinutes: 60,
    difficulty: 1,
  },
  {
    id: 'db-migrations',
    slug: 'database-migrations',
    title: 'Database migrations',
    category: 'production',
    type: 'core',
    summary: 'Schema evolution, zero-downtime changes.',
    resources: [
      { label: 'Strong Migrations (Rails-leaning rules)', url: 'https://github.com/ankane/strong_migrations' },
      { label: 'Postgres at scale — schema changes', url: 'https://www.postgresql.org/docs/current/ddl-alter.html' },
    ],
    estMinutes: 90,
    difficulty: 3,
  },
  {
    id: 'ddia',
    slug: 'ddia-book',
    title: 'DDIA book',
    category: 'production',
    type: 'read',
    summary: 'Designing Data-Intensive Applications by Kleppmann.',
    resources: [
      { label: 'O’Reilly — DDIA', url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/' },
      { label: 'Companion references', url: 'https://github.com/ept/ddia-references' },
    ],
    estMinutes: 2400,
    difficulty: 3,
  },
];

export function getTopic(slug: string): Topic | undefined {
  return CURRICULUM.find((t) => t.slug === slug);
}

export function topicsByCategory(category: CategoryId): Topic[] {
  return CURRICULUM.filter((t) => t.category === category);
}

export const ALL_SLUGS = CURRICULUM.map((t) => t.slug);
