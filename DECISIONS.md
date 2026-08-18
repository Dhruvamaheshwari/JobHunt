# Architecture & Design Decisions: JobHunt

## 1. Why did we choose our ingestion strategy over the obvious alternative?
The obvious alternative was fetching job listings directly from external APIs on every user request. We chose instead to ingest jobs into our own MongoDB database (via an hourly `node-cron` schedule and a manual `POST /api/jobs/ingest` endpoint).

- **Performance & Reliability:** Querying MongoDB directly gives fast responses and prevents frontend slowness or crashes if the third-party API is slow or temporarily down.
- **Search & Pagination:** Storing jobs locally allows us to support custom filtering (regex matching on title, location, and source) and server-side pagination across stored records.
- **Data Standardization & Deduplication:** We normalize missing fields (such as default locations and categories) and prevent duplicate job entries by checking `externalId` before saving.

---

## 2. What trade-off did we make because of the time limit, and what would we improve with one full week?

### Trade-offs Made (Currently Implemented):
- **Single Public Source:** We ingest jobs from a single public API (Remotive API).
- **Basic Loop & Simple Retries:** Ingestion loops through fetched items individually, using a simple 3-attempt retry fetch (`fetchWithRetry`) and `findOne` check per record.
- **In-Memory Scheduler:** The cron job (`node-cron`) runs inside the main Express application process.

### What We Would Improve With One Full Week:
- **Background Worker Queue:** Separate the ingestion scheduler from the main HTTP server process using dedicated background task queues to keep the main server lightweight.
- **Batch Processing:** Replace item-by-item database checks with bulk upsert database operations for better performance when processing large numbers of jobs.
- **Exponential Backoff & Multi-Source Support:** Add smarter retry delays (exponential backoff) for API failures and add ingestors for additional job boards and RSS feeds.

---

## 3. Where did we use AI, and what did we personally verify or change?

### Where AI Was Used:
- Scaffolding initial boilerplate for Express routes, Mongoose models, and React/shadcn component structures.

### What We Personally Verified & Changed:
- **Duplicate & Validation Logic:** Verified payload validation (`id`, `title`, `company_name`) and ensured `externalId` checks prevent duplicate database inserts.
- **Safe Fallbacks:** Added per-item try-catch blocks and default fallbacks (`'Remote'`, `'General'`, `Date.now()`) so one malformed job record does not crash the entire ingestion run.
- **Query & Pagination Math:** Checked and adjusted the MongoDB query filter object, regex case-insensitivity (`'i'`), and `skip`/`limit` calculations for pagination.
