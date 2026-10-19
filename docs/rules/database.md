# Database Rules

## 1. Purpose

This document defines mandatory database engineering rules for the Todo Mobile application.

All AI Coding Agents must follow these rules when creating or modifying database schemas, queries, repositories, transactions, or migrations.

**Technology:**
- Database: SQLite
- Persistence Library: Drift
- Language: Dart
- Architecture: MVVM + Repository Pattern
- Storage Strategy: Offline-first

**Priority:** MUST rules are mandatory. SHOULD rules are recommended unless a justified exception is documented.

## 2. Database Architecture

### DB-001: Single Database Instance

- MUST use a single shared application database instance during normal application operation.
- MUST manage database initialization and lifecycle centrally.
- MUST release database resources when appropriate.
- MUST NOT create a new database connection inside every Widget or ViewModel.

### DB-002: Data Access Boundaries

- MUST access persistent task data through repositories.
- Views and ViewModels MUST NOT execute SQL directly.
- SQLite and Drift implementation details MUST remain in the Data Layer.
- Repositories MUST provide task-specific operations instead of exposing unrestricted database access to the UI.
- Database entities MUST NOT leak into the UI when doing so would couple presentation code to persistence details.

Allowed flow:

```text
View
  ↓
ViewModel
  ↓
Repository
  ↓
Drift Database / DAO
  ↓
SQLite
```

### DB-003: Source of Truth

- SQLite MUST be the authoritative persistent source of task and task-list data.
- In-memory state MUST NOT become an independent persistent source of truth.
- UI state SHOULD observe database changes through repository-provided streams.
- Avoid maintaining multiple independently mutable copies of the same task collection.

## 3. Schema Design

### DB-004: Table Naming

- MUST use descriptive table names.
- MUST use `snake_case` for SQL table and column names.
- MUST define table schemas centrally using Drift.
- MUST NOT duplicate schema definitions in separate features.

Recommended tables:

```text
tasks
task_lists
```

### DB-005: Primary Keys

- Every persistent entity MUST have a primary key.
- Task and TaskList IDs MUST be UUIDs, stored consistently as TEXT.
- IDs MUST remain stable throughout an entity's lifetime.
- IDs MUST NOT be reused after deletion.

### DB-006: Column Constraints

- Required fields MUST use NOT NULL constraints.
- Optional fields MUST allow NULL.
- MUST define safe defaults for applicable fields.
- MUST enforce suitable database constraints in addition to application validation.
- MUST NOT use empty strings as substitutes for NULL.

Examples:

```text
Task:
- id: required
- title: required
- status: required
- priority: required
- list_id: required
- due_date: optional
- due_time: optional
- reminder_at: optional
- completed_at: optional
- created_at: required
- updated_at: required
```

Task title MUST be non-empty after trimming whitespace and MUST NOT exceed 200 characters.

### DB-007: Relationships and Foreign Keys

Relationship:

```text
task_lists (1) ──── (N) tasks
```

- Every Task MUST reference an existing TaskList.
- MUST enable SQLite foreign-key enforcement.
- MUST prevent orphaned records.
- MUST explicitly configure appropriate foreign-key behavior.
- MUST NOT rely on implicit cascade deletion for TaskLists.

The application MUST NOT delete the Inbox list.

When deleting a custom TaskList, associated tasks MUST be moved to Inbox before the list is deleted.

### DB-008: Indexing

- MUST create indexes based on actual query patterns.
- SHOULD index frequently filtered or sorted fields where beneficial.
- MUST consider indexing `list_id`, `status` and `due_date`.
- MUST avoid unnecessary indexes that increase write overhead.
- MUST review indexes when introducing new query patterns.

Do not create an index for every column without justification.

## 4. Data Types and Time Handling

### DB-009: Consistent Data Types

- UUID: TEXT.
- Status: constrained string or documented enum representation.
- Priority: constrained string or documented enum representation.
- Calendar date: explicit date-only representation.
- Time of day: explicit time-only representation.
- Instant timestamps: UTC-based representation.

MUST NOT mix incompatible storage formats for the same column.

### DB-010: Date and Time

Use distinct representations for calendar dates and absolute timestamps.

Recommended conventions:

- `due_date`: ISO 8601 calendar date, `YYYY-MM-DD`.
- `due_time`: nullable integer representing minutes after midnight.
- `reminder_at`: UTC instant stored as Unix milliseconds.
- `created_at`: UTC instant stored as Unix milliseconds.
- `updated_at`: UTC instant stored as Unix milliseconds.
- `completed_at`: nullable UTC instant stored as Unix milliseconds.

These conventions require explicit mapping or converters when using Drift.

Rules:

- MUST use one documented storage convention for each field.
- MUST convert UTC instants to the device's local timezone for display.
- MUST evaluate Today and Overdue according to local calendar semantics.
- MUST handle changes in device timezone.
- MUST NOT confuse a date-only value with a UTC timestamp.
- MUST NOT rely on implicit Drift DateTime conversions without verifying their storage precision and timezone behavior.

### DB-011: Timestamp Consistency

- `created_at` MUST be assigned when an entity is created.
- `updated_at` MUST change when persisted entity state changes.
- `created_at` MUST remain unchanged during updates.
- `completed_at` MUST be assigned when a task is completed.
- `completed_at` MUST become NULL when a task is reopened.

## 5. Query Rules

### DB-012: Safe Queries

- MUST use Drift's typed query API or verified SQL.
- MUST bind dynamic parameters.
- MUST NOT construct SQL by directly concatenating user input.
- MUST NOT bypass Drift without a documented technical reason.

### DB-013: Query Efficiency

- MUST fetch only data required by the operation.
- MUST filter at database level when practical.
- MUST avoid loading all tasks into memory for database-filterable operations.
- MUST use database ordering and pagination for potentially large collections.
- MUST avoid N+1 query patterns.
- SHOULD review query plans for expensive queries.

For Unicode case-insensitive Title/Description search that SQLite's default `NOCASE` cannot implement correctly, the repository MAY filter a measured, bounded candidate set after applying database-supported filters. It MUST page larger candidate sets and MUST NOT silently truncate results. Test Vietnamese case handling and latency with at least 1,000 tasks before accepting this exception.

### DB-014: Reactive Queries

- SHOULD use Drift streams for continuously displayed task collections.
- MUST expose reactive queries through repositories rather than directly from Widgets.
- MUST manage stream subscriptions and their lifecycle.
- MUST NOT unnecessarily refresh every screen after each database mutation.

### DB-015: Query Semantics

Repository queries MUST implement the product requirements consistently.

Examples:

**Today**
- Include pending tasks due today.
- Include overdue pending tasks.
- Exclude tasks without due dates.

**Upcoming**
- Include pending tasks with future due dates.
- Sort by due date and time.

**Completed**
- Include completed tasks.
- Sort by completion time when appropriate.

**Search**
- Search title and description.
- Support combined filters.
- Apply deterministic ordering.

## 6. Transaction Rules

### DB-016: Atomic Operations

MUST use transactions when an operation requires multiple dependent database writes that must succeed or fail together.

Examples:

- Move tasks to Inbox and delete their previous List.
- Apply multiple coordinated database changes.
- Perform data migrations involving dependent changes.

Example:

```dart
await database.transaction(() async {
  await moveTasksToInbox(listId);
  await deleteTaskList(listId);
});
```

Every asynchronous database operation inside a transaction MUST be awaited.

### DB-017: Transaction Boundaries

- MUST keep transactions short.
- MUST NOT perform network requests inside database transactions.
- MUST NOT request user interaction inside transactions.
- MUST NOT place unrelated expensive operations inside transactions.
- MUST allow errors to propagate when rollback is required.
- MUST NOT swallow exceptions that should abort the transaction.

### DB-018: External Side Effects

Database transactions do not make operating-system notification scheduling atomic.

When a task and its reminder are changed:

1. Persist the intended task state.
2. Update or cancel the local notification.
3. Handle notification scheduling failures.
4. Reconcile notification schedules when the app is initialized or resumed, as appropriate.

MUST NOT claim that a database transaction guarantees notification delivery.

## 7. CRUD Rules

### DB-019: Create

- MUST validate input before persistence.
- MUST generate a unique ID.
- MUST assign the default List when none is provided.
- MUST initialize task status as Pending.
- MUST prevent duplicate creation caused by repeated submissions of the same operation.

### DB-020: Update

- MUST identify the target record by primary key.
- MUST update only intended fields.
- MUST preserve immutable fields.
- MUST report missing records appropriately.
- MUST update `updated_at`.

### DB-021: Delete

- MUST follow the deletion behavior defined in the PRD.
- MUST delete only the intended record.
- MUST NOT accidentally delete related Tasks when deleting a List.
- MUST handle associated notification cleanup.
- MUST NOT use soft deletion unless explicitly required.

### DB-022: Completion State

- Completing a Task MUST update status and completion timestamp consistently.
- Reopening a Task MUST clear its completion timestamp.
- Repeated completion operations MUST NOT create inconsistent state.
- Database writes MUST preserve task identity and ownership.

## 8. Database Migrations

### DB-023: Schema Versioning

- MUST maintain a database schema version.
- MUST increment the schema version for schema changes requiring migration.
- MUST preserve existing user data during application upgrades.
- MUST NOT use destructive migrations as a production shortcut.

### DB-024: Migration Process

When changing the database schema:

1. Inspect the current schema and migration history.
2. Determine the required schema change.
3. Increment the schema version.
4. Generate or update Drift migrations.
5. Preserve previous schema snapshots.
6. Add or update migration tests.
7. Verify existing data survives migration.
8. Verify the resulting schema.
9. Review compatibility with existing repository queries.

SHOULD use Drift's official migration tooling.

### DB-025: Destructive Changes

- MUST NOT delete existing user data without explicit product requirements.
- MUST NOT silently drop or recreate production tables.
- MUST NOT reset the database to resolve a migration failure.
- MUST provide an explicit data transformation strategy for incompatible changes.

## 9. Error Handling

### DB-026: Database Errors

- MUST handle database failures at appropriate boundaries.
- MUST distinguish validation failures from persistence failures.
- MUST NOT silently swallow database exceptions.
- MUST provide recoverable user-facing error states where possible.
- MUST preserve underlying error context for debugging.

### DB-027: Logging

- SHOULD log relevant failed database operations during development.
- MUST NOT log unnecessary user task descriptions or private content.
- MUST NOT expose sensitive data in error messages.
- SHOULD use structured diagnostic information where useful.

## 10. Testing Requirements

### DB-028: Repository Tests

MUST test:

- Create Task.
- Get Task by ID.
- Update Task.
- Delete Task.
- Complete and Reopen Task.
- List assignment.
- Today queries.
- Upcoming queries.
- Search and filtering.

### DB-029: Transaction Tests

MUST verify:

- Successful transaction commits.
- Failed transaction rolls back.
- Deleting a List moves its tasks to Inbox.
- Failed operations do not leave orphaned records.

### DB-030: Migration Tests

- MUST test migration from supported older schema versions.
- MUST verify existing user data is preserved.
- MUST verify expected tables, indexes and constraints.
- MUST NOT assume a successful migration merely because the application starts.

### DB-031: Test Isolation

- SHOULD use isolated in-memory SQLite databases for database unit tests.
- MUST create independent database state per test.
- MUST close test database connections.
- MUST NOT depend on test execution order.
- SHOULD use deterministic clocks and fixed timestamps for date-sensitive tests.

## 11. Schema & Migration Management

### DB-032: Typed DAOs & Schema Migrations

- MUST define clear TypeScript interfaces matching SQLite table columns.
- MUST manage migrations via versioned scripts (`PRAGMA user_version`).
- MUST run migrations sequentially and test forward migration paths.
- MUST verify database integrity after schema changes (`PRAGMA integrity_check`).
- MUST run test verification commands when schemas change:

Example commands:

```bash
npx tsc --noEmit
npm test
```

## 12. Forbidden Practices

AI Coding Agents MUST NOT:

1. Execute SQL directly from Screens or UI Components.
2. Instantiate new database connections per screen.
3. Duplicate database schemas across features.
4. Concatenate user input into raw SQL.
5. Create unnecessary indexes.
6. Ignore foreign-key constraints.
7. Use destructive migrations without explicit authorization.
8. Delete user data to fix schema incompatibilities.
9. Swallow database exceptions silently.
10. Put unrelated external operations inside transactions.
11. Manually modify generated database code.
12. Claim tests passed without executing them.
13. Introduce a second persistence technology without justification.
14. Duplicate persistent state across independent storage systems.

## 13. Required Verification

Before considering database-related implementation complete, the Coding Agent MUST:

- Verify schema constraints and relationships.
- Verify data-access boundaries.
- Verify affected CRUD operations.
- Run relevant database tests.
- Run migration tests when schema changes.
- Run static analysis.
- Inspect transaction behavior.
- Check for unintended data loss.
- Report executed commands and actual results.

If a required test cannot run, explicitly state the limitation.

## 14. Definition of Done

A database-related change is complete only when:

- Schema and repository behavior meet the PRD.
- Database invariants are preserved.
- Relevant tests pass.
- Migration compatibility is verified when applicable.
- No unintended data loss occurs.
- Dependency rules are respected.
- Generated code is synchronized.
- Verification evidence is available.

These rules apply to every database-related implementation task unless an explicit, documented architectural decision supersedes a specific rule.
