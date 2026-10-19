export const CHECKPOINT_QUESTIONS: Record<string, string[]> = {
  'git-and-version-control': [
    'Can you explain what a commit stores and how it differs from a branch?',
    'When would you merge, rebase, cherry-pick, or revert?',
    'How would you recover from committing to the wrong branch without losing work?',
    'What should a pull request description tell a reviewer before they read the diff?',
  ],
  'command-line-and-linux': [
    'How would you find a file, inspect its contents, and search inside it from the shell?',
    'What do user, group, and other permissions mean on a Linux file?',
    'How would you find which process is listening on a port?',
    'When would you use a pipe, redirect, environment variable, or exit code?',
  ],
  'debugging-workflow': [
    'Can you reproduce the bug with the smallest reliable command or request?',
    'What layer owns the failure: client, route, service, database, queue, or infrastructure?',
    'Which log line, metric, trace, or curl output would falsify your current hypothesis?',
    'How do you prove the fix worked and did not only hide the symptom?',
  ],
  'data-structures-and-complexity': [
    'Which operation makes an array, map, set, queue, tree, or graph the right choice?',
    'What does Big O ignore, and when can constant factors still dominate?',
    'How would you choose a data structure for membership checks, ordered traversal, or shortest paths?',
    'What input size would make an apparently simple nested loop risky?',
  ],
  'language-runtime-basics': [
    'What lives on the stack, what lives on the heap, and why does that matter?',
    'How do threads, processes, coroutines, and event loops differ?',
    'What can block an async service even when the code uses async syntax?',
    'Which runtime behavior would you inspect for high memory, high CPU, or stuck requests?',
  ],
  'dependency-management': [
    'Why should applications commit lockfiles, and what risk do they reduce?',
    'What is the difference between a direct dependency and a transitive dependency?',
    'How would you upgrade a vulnerable package without blindly breaking production?',
    'What should you check before adding a new package to a small service?',
  ],

  'http-fundamentals': [
    'Can you identify the start line, headers, blank line, and body in a raw HTTP request?',
    'Which HTTP methods are safe, which are idempotent, and why does that matter for retries?',
    'When should an API return 401 instead of 403?',
    'What would you inspect first with curl when an API response looks wrong?',
  ],
  'rest-api-design': [
    'Can you turn an action-shaped endpoint into a resource-shaped REST endpoint?',
    'Which HTTP method and status code would you use for create, read, update, and delete?',
    'When would cursor pagination be safer than offset pagination?',
    'What should a consistent API error response include?',
  ],
  'data-formats': [
    'What trade-off are you making when you choose JSON instead of Protobuf?',
    'Where should schema validation happen in a request pipeline?',
    'Why are Protobuf field numbers difficult to change later?',
    'Which format would you choose for a public web API, and why?',
  ],
  'build-a-rest-api': [
    'What endpoints, validation rules, and error cases prove the API is complete enough?',
    'How would you test the happy path and at least two failure paths with curl?',
    'Where should pagination, filtering, and consistent error responses be handled?',
    'What parts of the service would you replace before moving from in-memory data to production?',
  ],
  authentication: [
    'When would you choose API keys, sessions, JWTs, or OAuth2?',
    'What must a server verify before trusting a JWT?',
    'Why does Authorization Code with PKCE exist, and what problem does it solve?',
    'How should authentication failures differ from authorization failures?',
  ],
  'networking-basics': [
    'What happens between typing a URL and receiving the first HTTP response bytes?',
    'How do DNS, TCP, TLS, and HTTP each contribute to one web request?',
    'What does a port identify, and how is it different from an IP address?',
    'Which layer would you inspect first for DNS failure, connection refused, or certificate errors?',
  ],

  'creational-patterns': [
    'When is a Factory clearer than calling constructors directly?',
    'What problem does Builder solve when an object has many optional fields?',
    'Why is Singleton often risky in tests and concurrent systems?',
    'Can you name the construction concern each creational pattern hides?',
  ],
  'structural-patterns': [
    'What does a Repository hide from domain code?',
    'When would you use an Adapter instead of changing the caller or provider?',
    'How does Decorator add behavior without changing the wrapped object?',
    'What complexity should a Facade hide, and what should it leave visible?',
  ],
  'behavioral-patterns': [
    'When does Observer make sense, and what cleanup problem can it create?',
    'How can Strategy be represented as a simple function in TypeScript?',
    'What makes Chain of Responsibility useful for request pipelines?',
    'Which behavioral pattern would you choose for runtime algorithm selection?',
  ],
  'solid-principles': [
    'What is one concrete sign that a class has more than one responsibility?',
    'How can you extend behavior without editing existing code?',
    'What kind of subclass breaks Liskov Substitution?',
    'How does depending on interfaces make code easier to test?',
  ],
  'middleware-pattern': [
    'What happens before and after the handler in an onion-style middleware stack?',
    'Why does middleware order matter for auth, logging, validation, and error handling?',
    'Which concerns belong in middleware instead of the route handler?',
    'Where else do middleware-like pipelines appear outside HTTP frameworks?',
  ],
  'head-first-design-patterns': [
    'Which patterns from the book would you expect to use most in backend code?',
    'How can you tell whether a pattern is simplifying code or just adding ceremony?',
    'What should you practice after reading a chapter so the pattern sticks?',
    'Which modern language features can replace older pattern-heavy implementations?',
  ],

  'sql-vs-nosql': [
    'Which workload would push you toward relational, document, key-value, or graph storage?',
    'What trade-off do you accept when duplicating data in a document database?',
    'Why is Postgres often a good default even when NoSQL options exist?',
    'How would you explain the query pattern before choosing a database type?',
  ],
  'indexing-and-queries': [
    'How does a B-tree index help a database avoid scanning every row?',
    'Why does column order matter in a composite index?',
    'What clues in an EXPLAIN plan suggest a missing or ineffective index?',
    'How would you detect and fix an N+1 query problem?',
  ],
  'data-modeling': [
    'Which entities, relationships, and invariants must be captured before drawing tables?',
    'When is normalization helpful, and when is denormalization justified?',
    'Why might an order item store price_cents even if the product already has a price?',
    'How would you model a many-to-many relationship and query it efficiently?',
  ],
  'caching-with-redis': [
    'Which cache strategy fits a read-heavy endpoint with occasional writes?',
    'What could make cached data stale, and how would you invalidate it?',
    'How do TTLs reduce risk without fully solving correctness?',
    'What is a cache stampede, and how can you reduce it?',
  ],
  'transactions-and-acid': [
    'What does each ACID property protect in a real business operation?',
    'Which anomalies can appear at weaker isolation levels?',
    'When would optimistic locking be better than pessimistic locking?',
    'Why are long-running transactions dangerous in production?',
  ],
  'design-a-schema': [
    'What are the main entities and relationships in the e-commerce schema?',
    'Which queries should drive your index choices?',
    'Where would you enforce data integrity: application code, database constraints, or both?',
    'What design decision would you revisit if product search or reporting became slow?',
  ],

  'scaling-strategies': [
    'Which parts of a system are easiest to scale horizontally, and which are hardest?',
    'Why does stateless service design make load balancing simpler?',
    'What hidden bottlenecks can remain after adding more application servers?',
    'When should you scale the database vertically before adding replicas or shards?',
  ],
  'load-balancing': [
    'What problem does a load balancer solve besides distributing traffic?',
    'How do round-robin, least-connections, and health-check behavior differ?',
    'What happens to user sessions if backend servers are not stateless?',
    'Which signals should remove an unhealthy instance from rotation?',
  ],
  'message-queues': [
    'What work should move from a synchronous request into a queue?',
    'How do producers, brokers, consumers, acknowledgements, and retries fit together?',
    'Why must consumers usually be idempotent?',
    'When would you choose Kafka, RabbitMQ, or SQS-style queues?',
  ],
  'fault-tolerance': [
    'What timeout budget would you assign before retrying or failing a request?',
    'When are retries helpful, and when do they make an outage worse?',
    'How does a circuit breaker protect the rest of the system?',
    'What feature could degrade gracefully if a dependency is unavailable?',
  ],
  'rate-limiting': [
    'What identity or dimension should your limiter count against?',
    'How do fixed window, sliding window, and token bucket algorithms differ?',
    'What headers or status code should a rejected request return?',
    'Where should rate limiting live: edge, gateway, service, or multiple layers?',
  ],
  'cap-theorem': [
    'What does CAP say specifically during a network partition?',
    'Why is partition tolerance not something a distributed system can simply ignore?',
    'How would a CP system behave differently from an AP system during failure?',
    'Which consistency trade-off would be acceptable for a shopping cart, chat app, or bank transfer?',
  ],

  'monolith-vs-microservices': [
    'What pain would justify splitting a monolith into services?',
    'Why is a modular monolith often the better first architecture?',
    'What new operational costs appear once services are split?',
    'Where should team boundaries, data ownership, and deployment ownership influence the design?',
  ],
  'event-driven-architecture': [
    'What is the difference between an event and a command?',
    'When does event-driven design reduce coupling, and when does it create event spaghetti?',
    'Why do at-least-once delivery systems require idempotent handlers?',
    'How do event sourcing and CQRS change the read and write models?',
  ],
  'api-gateway': [
    'Which concerns are appropriate for an API gateway, and which should stay in services?',
    'How does a Backend for Frontend differ from a general gateway?',
    'What happens when one downstream service is slow during aggregation?',
    'When should you buy or adopt a gateway product instead of building one from scratch?',
  ],
  'graphql-and-grpc': [
    'What complexity does GraphQL move from server teams to client teams or schema owners?',
    'Why can GraphQL make caching and N+1 query prevention harder?',
    'What makes gRPC a strong fit for internal service-to-service calls?',
    'Which API style would you choose for browser clients, mobile clients, and internal streaming calls?',
  ],
  'design-a-url-shortener': [
    'What do the rough write, read, and storage estimates tell you about the design?',
    'Which short-code generation strategy would you choose, and what trade-off does it carry?',
    'Why should click analytics be separated from the redirect hot path?',
    'When would you return 301 versus 302 for a short link redirect?',
  ],
  'design-a-chat-system': [
    'Which parts of chat are stateful, and how does that affect scaling?',
    'How would you route messages to users connected to different WebSocket servers?',
    'What changes between one-to-one chat and large group chat fan-out?',
    'Which delivery states should the user see, and what backend events create them?',
  ],

  observability: [
    'What question can logs answer that metrics or traces cannot?',
    'Which RED metrics would you capture for a user-facing service?',
    'How does a trace help debug latency across multiple services?',
    'What makes an alert actionable instead of noisy?',
  ],
  'ci-cd-and-deployment': [
    'What checks should run before code is allowed to deploy?',
    'How do rolling, blue-green, and canary deployments reduce risk differently?',
    'What signal would make you stop or roll back a deployment?',
    'Which deployment step should be automated first for a small team?',
  ],
  'containers-and-k8s': [
    'What problem does a container solve that a virtual machine does not solve as directly?',
    'How do image, container, pod, service, and deployment relate to each other?',
    'What should be inside a container image, and what should be provided by the environment?',
    'When is Kubernetes helpful, and when is it unnecessary complexity?',
  ],
  'api-documentation': [
    'What should an OpenAPI spec communicate to both humans and tools?',
    'Which examples help a developer use an endpoint without reading source code?',
    'How do you keep documentation from drifting away from implementation?',
    'What error cases and authentication requirements should every endpoint document?',
  ],
  'database-migrations': [
    'Why can a simple ALTER TABLE become dangerous on a large production table?',
    'What sequence makes a schema change backward compatible during deploys?',
    'How would you roll out a new non-null column without downtime?',
    'What should a migration plan include before touching production data?',
  ],
  'ddia-book': [
    'Which DDIA chapter maps most closely to a system you currently work on?',
    'What storage, replication, or transaction trade-off did you recognize in your own stack?',
    'How would you explain the difference between reliability, scalability, and maintainability?',
    'What follow-up paper, lecture, or toy project would deepen the chapter you found hardest?',
  ],
};

export function getCheckpointQuestions(slug: string): string[] {
  return CHECKPOINT_QUESTIONS[slug] ?? [];
}
