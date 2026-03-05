const scenarios = [

{
title: "Duplicate Charge Incident",

context: "Payment API /api/v1/payments",

core_issue: "Lack of Idempotency leading to multiple charges",

scenario: "User taps Pay Now multiple times causing duplicate payments",

phase1: {

question: "What is your immediate move to stabilize the system?",

options: [

{
option_id: "A",
title: "Rate Limit Endpoint",
logic: "Reject requests if user sends more than 1 request in 10 seconds"
},

{
option_id: "B",
title: "Client Side Debouncing",
logic: "Disable button after first click"
},

{
option_id: "C",
title: "Server Side Idempotency",
logic: "Require Idempotency-Key header"
},

{
option_id: "D",
title: "Database Unique Constraints",
logic: "Unique index on order_id"
}

]

},

phase2: {

description: "Refine your strategy",

branches: [

{
linked_option: "A",

options: [

{ option_id: "A1", text: "Global Redis Counter" },
{ option_id: "A2", text: "Local In Memory Buckets" }

]

},

{
linked_option: "B",

options: [

{ option_id: "B1", text: "Hard Disable Button" },
{ option_id: "B2", text: "Processing Modal" }

]

},

{
linked_option: "C",

options: [

{ option_id: "C1", text: "Distributed Locking" },
{ option_id: "C2", text: "Persistence Based Validation" }

]

},

{
linked_option: "D",

options: [

{ option_id: "D1", text: "Strict Error Handling" },
{ option_id: "D2", text: "Upsert On Conflict" }

]

}

]

},

phase3: {

title: "Production Architecture",

architecture: [

"Idempotency Middleware",

"Three Step State Machine: Started → Executing → Finalized",

"Atomic Transactions to prevent race conditions"

]

},

phase4: {

prompt: "Explain the trade-offs of your selected path"

},

phase5: {

company_lens: [

{
company: "Stripe",
expectation: "Strict correctness and handling network failures"
},

{
company: "Amazon",
expectation: "Focus on availability even if duplicates occur"
}

],

strong_signals: [

"Store response body with idempotency key",

"Discuss expiration TTL for idempotency keys"

],

weak_signals: [

"Frontend only solution",

"Using rate limiting for data integrity"

]

}

}

]

export default scenarios