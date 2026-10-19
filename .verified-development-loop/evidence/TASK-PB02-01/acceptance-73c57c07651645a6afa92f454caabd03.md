<!-- vdl-json
{
  "time": "2026-10-19T17:56:04.379871+00:00",
  "revision": "749cc1c4d3df3b730a63af019ce89c3e03a047324ef266cc453f963963b84ade",
  "criteria": [
    "Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON.",
    "Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1.",
    "Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected."
  ],
  "verification": ".verified-development-loop/evidence/TASK-PB02-01/verification-3cc9af3f0fba4e4082d8aa6bc63e6730.md",
  "review": ".verified-development-loop/evidence/TASK-PB02-01/review-5d5cd18a9da34ccdac744398ec1d6552.md",
  "qa": ".verified-development-loop/evidence/TASK-PB02-01/qa-9c1e83a5292a4efe97c0f65d59f06162.md"
}
-->

# Evidence: acceptance-73c57c07651645a6afa92f454caabd03

**Status:** approved

## Record

    {
      "time": "2026-10-19T17:56:04.379871+00:00",
      "revision": "749cc1c4d3df3b730a63af019ce89c3e03a047324ef266cc453f963963b84ade",
      "criteria": [
        "Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON.",
        "Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1.",
        "Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected."
      ],
      "verification": ".verified-development-loop/evidence/TASK-PB02-01/verification-3cc9af3f0fba4e4082d8aa6bc63e6730.md",
      "review": ".verified-development-loop/evidence/TASK-PB02-01/review-5d5cd18a9da34ccdac744398ec1d6552.md",
      "qa": ".verified-development-loop/evidence/TASK-PB02-01/qa-9c1e83a5292a4efe97c0f65d59f06162.md"
    }
