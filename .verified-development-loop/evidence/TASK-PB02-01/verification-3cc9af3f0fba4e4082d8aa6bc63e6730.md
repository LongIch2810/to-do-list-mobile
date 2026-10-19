<!-- vdl-json
{
  "time": "2026-10-19T17:54:38.608403+00:00",
  "revision": "749cc1c4d3df3b730a63af019ce89c3e03a047324ef266cc453f963963b84ade",
  "status": "PASS",
  "commands": [
    {
      "command": [
        "npm.cmd",
        "test",
        "--",
        "databaseSchema"
      ],
      "exit_code": 0,
      "stdout": "\n> to-do-list-mobile-app@1.0.0 test\n> jest databaseSchema\n\n",
      "stderr": "PASS __tests__/data/databaseSchema.test.ts\n  Database Schema & Inbox Seeding\n    âˆš creates task_lists and tasks tables and enables PRAGMA foreign_keys (16 ms)\n    âˆš seeds default Inbox with fixed UUID and is_default=1 (2 ms)\n    âˆš rejects deleting or altering is_default of the default Inbox (10 ms)\n\nTest Suites: 1 passed, 1 total\nTests:       3 passed, 3 total\nSnapshots:   0 total\nTime:        0.511 s, estimated 1 s\nRan all test suites matching /databaseSchema/i.\n"
    },
    {
      "command": [
        "npx.cmd",
        "tsc",
        "--noEmit"
      ],
      "exit_code": 0,
      "stdout": "",
      "stderr": ""
    }
  ]
}
-->

# Evidence: verification-3cc9af3f0fba4e4082d8aa6bc63e6730

**Status:** PASS

## Record

    {
      "time": "2026-10-19T17:54:38.608403+00:00",
      "revision": "749cc1c4d3df3b730a63af019ce89c3e03a047324ef266cc453f963963b84ade",
      "status": "PASS",
      "commands": [
        {
          "command": [
            "npm.cmd",
            "test",
            "--",
            "databaseSchema"
          ],
          "exit_code": 0,
          "stdout": "\n> to-do-list-mobile-app@1.0.0 test\n> jest databaseSchema\n\n",
          "stderr": "PASS __tests__/data/databaseSchema.test.ts\n  Database Schema & Inbox Seeding\n    âˆš creates task_lists and tasks tables and enables PRAGMA foreign_keys (16 ms)\n    âˆš seeds default Inbox with fixed UUID and is_default=1 (2 ms)\n    âˆš rejects deleting or altering is_default of the default Inbox (10 ms)\n\nTest Suites: 1 passed, 1 total\nTests:       3 passed, 3 total\nSnapshots:   0 total\nTime:        0.511 s, estimated 1 s\nRan all test suites matching /databaseSchema/i.\n"
        },
        {
          "command": [
            "npx.cmd",
            "tsc",
            "--noEmit"
          ],
          "exit_code": 0,
          "stdout": "",
          "stderr": ""
        }
      ]
    }
