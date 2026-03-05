const scenarios = [

/* =====================================================
1️⃣ DUPLICATE CHARGE INCIDENT
===================================================== */

{
title: "Duplicate Charge",

context: "Payment API /api/v1/payments",

coreIssue: "Lack of Idempotency causing multiple charges for a single user action.",

scenario:
"A user taps the Pay Now button multiple times because the UI looks stuck. The frontend sends several identical requests within seconds and the system processes all of them.",

phase1: {
question:
"What is your immediate move to stabilize the system and prevent duplicate payments?",

options: [

{ id:"A", title:"Rate-limit Endpoint",
logic:"Reject requests if a user sends more than 1 payment request within 10 seconds."},

{ id:"B", title:"Client-side Debouncing",
logic:"Disable Pay Now button after first click."},

{ id:"C", title:"Server-side Idempotency",
logic:"Require Idempotency-Key header so repeated requests return cached response."},

{ id:"D", title:"Database Unique Constraint",
logic:"Add unique constraint on transaction_id."}

]
},

phase2: {

A:[
{ id:"A1", title:"Global Redis Counter", logic:"Use Redis to track rate limits across servers."},
{ id:"A2", title:"Local Memory Rate Limit", logic:"Rate limit per server instance."}
],

B:[
{ id:"B1", title:"Disable Button", logic:"Disable button until response received."},
{ id:"B2", title:"Processing Modal", logic:"Show processing modal to block UI."}
],

C:[
{ id:"C1", title:"Distributed Lock", logic:"Use Redis lock while request processes."},
{ id:"C2", title:"Persist Idempotency Key", logic:"Store key in database before payment call."}
],

D:[
{ id:"D1", title:"Catch UniqueViolation", logic:"Return 'already processed' message."},
{ id:"D2", title:"ON CONFLICT DO NOTHING", logic:"Ignore duplicate inserts."}
]

},

phase3:{
title:"Architectural Evolution",
points:[
"Introduce Idempotency Middleware",
"Use payment state machine: Started → Executing → Finalized",
"Wrap key validation + record creation in atomic transaction"
]
},

phase4:{
instruction:"Explain why your approach prevents duplicate payments."
},

phase5:{
interviewerIntent:{
stripe:"Focus on strict correctness and handling network retries.",
amazon:"Focus on high availability and reconciliation."
},

strongSignals:[
"Store response body with idempotency key",
"Implement expiration for idempotency keys"
],

weakSignals:[
"Frontend-only solution",
"Using rate limit as data integrity guarantee"
]
}
},

/* =====================================================
2️⃣ FOLLOWER COUNT CHAOS
===================================================== */

{
title:"Follower Count Chaos",

context:"Social Graph API /api/v1/follow",

coreIssue:"Race conditions causing duplicate relationships and incorrect follower counts.",

scenario:
"When users spam the follow button, duplicate follow relationships are stored and the follower count becomes inconsistent.",

phase1:{
question:"How do you stabilize the database and prevent duplicate follow records?",

options:[

{ id:"A", title:"Atomic Counter Update",
logic:"Use UPDATE followers = followers + 1 directly in DB."},

{ id:"B", title:"Database Unique Constraint",
logic:"Add unique composite index (follower_id, followed_id)."},

{ id:"C", title:"Distributed Lock",
logic:"Lock follow operation using Redis."},

{ id:"D", title:"Event Driven Counter",
logic:"Separate relationship write and counter update using events."}

]
},

phase2:{

A:[
{ id:"A1", title:"SQL Increment", logic:"Use atomic SQL updates."},
{ id:"A2", title:"Redis INCR", logic:"Maintain counters in Redis."}
],

B:[
{ id:"B1", title:"Catch UniqueViolation", logic:"Return idempotent success."},
{ id:"B2", title:"ON CONFLICT DO NOTHING", logic:"Ignore duplicate insert."}
],

C:[
{ id:"C1", title:"Redlock Algorithm", logic:"Multi-node Redis lock."},
{ id:"C2", title:"SETNX Lock", logic:"Basic Redis lock with TTL."}
],

D:[
{ id:"D1", title:"Transactional Outbox", logic:"Emit follow event safely."},
{ id:"D2", title:"CDC Stream", logic:"Stream DB changes to counter service."}
]

},

phase3:{
title:"Architectural Evolution",
points:[
"Use composite primary key for relationship table",
"Implement sharded counters for celebrity accounts",
"Async propagation to follower count cache"
]
},

phase4:{
instruction:"Explain how your design prevents race conditions."
},

phase5:{
interviewerIntent:{
twitter:"Expect handling hot keys and celebrity scaling.",
uber:"Expect consistency across distributed services."
},

strongSignals:[
"Recognizing read-modify-write anti-pattern",
"Discussing sharded counters"
],

weakSignals:[
"Cron job to fix counts",
"Global mutex lock"
]
}
},

/* =====================================================
3️⃣ SLOW FEED DISASTER
===================================================== */

{
title:"Slow Feed Disaster",

context:"Feed API /api/v1/feed",

coreIssue:"N+1 Query Problem causing extreme database load.",

scenario:
"Feed endpoint runs 1 query for posts, then hundreds of queries for user profiles and comments, resulting in 8-second response time.",

phase1:{
question:"How do you reduce the latency quickly?",

options:[

{ id:"A", title:"Database Indexing",
logic:"Add indexes on foreign keys."},

{ id:"B", title:"Query Optimization",
logic:"Fetch related data using joins or batching."},

{ id:"C", title:"Cache Entire Feed",
logic:"Store feed response in Redis."},

{ id:"D", title:"Pagination",
logic:"Return only 10 posts per request."}

]
},

phase2:{

A:[
{ id:"A1", title:"B-Tree Index", logic:"Standard index on user_id."},
{ id:"A2", title:"Covering Index", logic:"Include columns in index."}
],

B:[
{ id:"B1", title:"SQL Join", logic:"Fetch data in one query."},
{ id:"B2", title:"Application Batching", logic:"Use IN query batching."}
],

C:[
{ id:"C1", title:"Cache Aside", logic:"Fetch DB on cache miss."},
{ id:"C2", title:"Write Through Cache", logic:"Update cache on write."}
],

D:[
{ id:"D1", title:"Offset Pagination", logic:"LIMIT OFFSET queries."},
{ id:"D2", title:"Cursor Pagination", logic:"Use last_seen_id."}
]

},

phase3:{
title:"Architectural Evolution",
points:[
"Denormalize user data inside posts",
"Fan-out architecture for feeds",
"Use data hydration layer"
]
},

phase4:{
instruction:"Explain how your approach fixes the N+1 query problem."
},

phase5:{
interviewerIntent:{
linkedin:"Focus on read optimization",
meta:"Focus on graph batching systems"
},

strongSignals:[
"Using DataLoader batching",
"Understanding cursor pagination"
],

weakSignals:[
"Vertical scaling",
"Caching without TTL"
]
}
},

/* =====================================================
4️⃣ STALE PRODUCT PRICE
===================================================== */

{
title:"Stale Product Price",

context:"Product API /api/v1/products/{id}",

coreIssue:"Cache invalidation causing outdated product prices.",

scenario:
"Product price updated in admin panel but Redis cache still serves old price.",

phase1:{
question:"How do you ensure users see updated price?",

options:[

{ id:"A", title:"Reduce TTL",
logic:"Shorten cache expiration."},

{ id:"B", title:"Active Cache Invalidation",
logic:"Delete Redis key on update."},

{ id:"C", title:"Write Through Cache",
logic:"Update DB and cache together."},

{ id:"D", title:"Versioned Cache Key",
logic:"Use product:id:v2 style keys."}

]
},

phase2:{

A:[
{ id:"A1", title:"Static TTL", logic:"Same TTL for all products."},
{ id:"A2", title:"Adaptive TTL", logic:"Different TTL per product."}
],

B:[
{ id:"B1", title:"Sync Delete", logic:"Admin waits for Redis delete."},
{ id:"B2", title:"Async Event", logic:"Queue event to clear cache."}
],

C:[
{ id:"C1", title:"Atomic Update", logic:"Distributed transaction."},
{ id:"C2", title:"Lazy Write Through", logic:"Delete cache on failure."}
],

D:[
{ id:"D1", title:"DB Trigger", logic:"Auto increment version."},
{ id:"D2", title:"ETag Header", logic:"Use HTTP cache control."}
]

},

phase3:{
title:"Architectural Evolution",
points:[
"Use Change Data Capture for invalidation",
"Cache-aside pattern",
"Two level caching"
]
},

phase4:{
instruction:"Explain how your design prevents stale reads."
},

phase5:{
interviewerIntent:{
amazon:"Strong consistency for prices",
netflix:"Prefer availability even if slightly stale"
},

strongSignals:[
"Delete cache instead of update",
"Prevent cache stampede"
],

weakSignals:[
"Only reducing TTL"
]
}
},

/* =====================================================
5️⃣ LOGIN STORM
===================================================== */

{
title:"Login Storm",

context:"Authentication API /api/v1/login",

coreIssue:"Traffic spike overwhelms CPU and DB.",

scenario:
"Millions of users attempt login simultaneously during marketing campaign.",

phase1:{
question:"How do you protect the platform immediately?",

options:[

{ id:"A", title:"Horizontal Scaling",
logic:"Add more auth service pods."},

{ id:"B", title:"Request Queue",
logic:"Queue login requests."},

{ id:"C", title:"Priority Rate Limit",
logic:"Reject excess login attempts."},

{ id:"D", title:"Exponential Backoff",
logic:"Force client retry delays."}

]
},

phase2:{

A:[
{ id:"A1", title:"Reactive Scaling", logic:"Scale based on CPU."},
{ id:"A2", title:"Predictive Scaling", logic:"Scale before campaign."}
],

B:[
{ id:"B1", title:"FIFO Queue", logic:"Process requests sequentially."},
{ id:"B2", title:"Virtual Waiting Room", logic:"Queue users visually."}
],

C:[
{ id:"C1", title:"Token Bucket", logic:"Allow bursts."},
{ id:"C2", title:"Adaptive Throttling", logic:"Dynamic rate limit."}
],

D:[
{ id:"D1", title:"Client Backoff", logic:"Retry with delay."},
{ id:"D2", title:"Jitter Backoff", logic:"Random retry delays."}
]

},

phase3:{
title:"Architectural Evolution",
points:[
"Use distributed auth services",
"Cache session tokens",
"Separate password hashing workers"
]
},

phase4:{
instruction:"Explain how your system survives login storms."
},

phase5:{
interviewerIntent:{
google:"Focus on distributed scalability",
amazon:"Focus on load shedding"
},

strongSignals:[
"Pre-warming servers",
"Rate limiting at API gateway"
],

weakSignals:[
"Only vertical scaling"
]
}
},

/* =====================================================
6️⃣ SEARCH LATENCY
===================================================== */

{
title:"Search Latency",

context:"Search API /api/v1/search",

coreIssue:"Database queries too slow for text search.",

scenario:"Users experience 5 second delays when searching products.",

phase1:{
question:"What is the first fix?",

options:[
{ id:"A", title:"Full Text Index", logic:"Add DB full text index."},
{ id:"B", title:"Search Engine", logic:"Use Elasticsearch."},
{ id:"C", title:"Cache Queries", logic:"Cache popular searches."},
{ id:"D", title:"Limit Results", logic:"Return top 20 only."}
]
},

phase2:{
A:[{id:"A1",title:"Postgres FTS",logic:"Use TSVector."}],
B:[{id:"B1",title:"Elastic Cluster",logic:"Dedicated search nodes."}],
C:[{id:"C1",title:"Redis Cache",logic:"Cache search responses."}],
D:[{id:"D1",title:"Pagination",logic:"Load more results."}]
},

phase3:{title:"Architecture",points:["Search index service","Async indexing"]},
phase4:{instruction:"Explain search scaling."},
phase5:{interviewerIntent:{google:"Search efficiency"},strongSignals:["Use search index"],weakSignals:["Scanning DB"]}
},

/* =====================================================
7️⃣ NOTIFICATION DELAY
===================================================== */

{
title:"Notification Delay",
context:"Notification Service",
coreIssue:"Synchronous notification sending slowing requests.",
scenario:"Users wait 3 seconds after posting because notifications are sent synchronously.",

phase1:{
question:"How to fix latency?",
options:[
{id:"A",title:"Async Queue",logic:"Send notifications via queue"},
{id:"B",title:"Batch Sending",logic:"Batch notifications"},
{id:"C",title:"Push Service",logic:"Dedicated push service"},
{id:"D",title:"Skip Notifications",logic:"Disable temporarily"}
]
},

phase2:{
A:[{id:"A1",title:"Kafka",logic:"Stream notifications"}],
B:[{id:"B1",title:"Batch Worker",logic:"Send batch"}],
C:[{id:"C1",title:"Notification Microservice",logic:"Separate service"}],
D:[{id:"D1",title:"Maintenance Mode",logic:"Disable"}]
},

phase3:{title:"Architecture",points:["Event driven system","Worker queues"]},
phase4:{instruction:"Explain async benefits"},
phase5:{interviewerIntent:{meta:"Event systems"},strongSignals:["Queue"],weakSignals:["Sync notifications"]}
},

/* =====================================================
8️⃣ FILE UPLOAD FAILURE
===================================================== */

{
title:"File Upload Failure",
context:"Upload API",
coreIssue:"Large file uploads crash servers.",
scenario:"Users upload 500MB videos causing server timeouts.",

phase1:{
question:"How to fix uploads?",
options:[
{id:"A",title:"Chunk Upload",logic:"Upload in parts"},
{id:"B",title:"Direct S3 Upload",logic:"Client uploads to storage"},
{id:"C",title:"Increase Timeout",logic:"Allow longer requests"},
{id:"D",title:"Background Upload",logic:"Upload async"}
]
},

phase2:{
A:[{id:"A1",title:"Multipart Upload",logic:"Chunked upload"}],
B:[{id:"B1",title:"Signed URL",logic:"Upload directly"}],
C:[{id:"C1",title:"Server Timeout",logic:"Increase limit"}],
D:[{id:"D1",title:"Upload Worker",logic:"Background job"}]
},

phase3:{title:"Architecture",points:["CDN","Object storage"]},
phase4:{instruction:"Explain large file strategy"},
phase5:{interviewerIntent:{youtube:"Video upload scale"},strongSignals:["Direct upload"],weakSignals:["Large server upload"]}
},

/* =====================================================
9️⃣ CHAT MESSAGE LOSS
===================================================== */

{
title:"Chat Message Loss",
context:"Chat API",
coreIssue:"Messages lost during server crash.",
scenario:"Users report messages disappearing.",

phase1:{
question:"How to guarantee delivery?",
options:[
{id:"A",title:"Message Queue",logic:"Persist messages in queue"},
{id:"B",title:"Write Ahead Log",logic:"Log messages"},
{id:"C",title:"Retry Mechanism",logic:"Client retries"},
{id:"D",title:"Cache Messages",logic:"Store in Redis"}
]
},

phase2:{
A:[{id:"A1",title:"Kafka Stream",logic:"Message persistence"}],
B:[{id:"B1",title:"WAL Logging",logic:"Crash recovery"}],
C:[{id:"C1",title:"Retry Queue",logic:"Resend"}],
D:[{id:"D1",title:"Redis Stream",logic:"Store messages"}]
},

phase3:{title:"Architecture",points:["Durable messaging","Replication"]},
phase4:{instruction:"Explain message durability"},
phase5:{interviewerIntent:{whatsapp:"Reliable messaging"},strongSignals:["Durability"],weakSignals:["Only retries"]}
},

/* =====================================================
🔟 VIDEO STREAM BUFFERING
===================================================== */

{
title:"Video Streaming Buffering",
context:"Streaming Service",
coreIssue:"Users experience buffering during peak traffic.",
scenario:"Millions of users watch same video causing server overload.",

phase1:{
question:"How to fix buffering?",
options:[
{id:"A",title:"CDN",logic:"Serve video from edge servers"},
{id:"B",title:"Adaptive Bitrate",logic:"Change quality dynamically"},
{id:"C",title:"Caching",logic:"Cache video segments"},
{id:"D",title:"More Servers",logic:"Scale infrastructure"}
]
},

phase2:{
A:[{id:"A1",title:"Global CDN",logic:"Edge delivery"}],
B:[{id:"B1",title:"HLS Streaming",logic:"Segment streaming"}],
C:[{id:"C1",title:"Edge Cache",logic:"Cache segments"}],
D:[{id:"D1",title:"Auto Scaling",logic:"More streaming servers"}]
},

phase3:{title:"Architecture",points:["Segmented streaming","Edge delivery"]},
phase4:{instruction:"Explain streaming scale"},
phase5:{interviewerIntent:{netflix:"CDN heavy architecture"},strongSignals:["Edge caching"],weakSignals:["Central server"]}
}

];

export default scenarios