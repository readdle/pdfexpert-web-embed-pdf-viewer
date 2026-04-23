# @embedpdf/plugin-history

## 2.14.6

### Patch Changes

- [`90965e9`](https://github.com/embedpdf/embed-pdf-viewer/commit/90965e9c805acdd587a3533f144534468e4bd019) by [@mpogodin-readdle](https://github.com/mpogodin-readdle) – Update publish command

## 2.14.5

### Patch Changes

- [`e393aa1`](https://github.com/embedpdf/embed-pdf-viewer/commit/e393aa16cbd112e021e9d5b3de48bd608314386c) by [@mpogodin-readdle](https://github.com/mpogodin-readdle) – Update type imports in engine

## 2.14.4

### Patch Changes

- [`01f004e`](https://github.com/embedpdf/embed-pdf-viewer/commit/01f004e08dc887bffa3b98a722fd0fae5cbbca04) by [@mpogodin-readdle](https://github.com/mpogodin-readdle) – Add CI/CD Pre-Publish Script to keep packages naming inside the codebase.

## 2.14.3

## 2.14.2

## 2.14.1

### Patch Changes

- [`14c9d3f`](https://github.com/embedpdf/embed-pdf-viewer/commit/14c9d3fb5018d089511098d649c976a082482069) by [@mpogodin-readdle](https://github.com/mpogodin-readdle) – Switch publish registry to GitHub Packages.

## 2.14.0

## 2.13.0

## 2.12.1

## 2.12.0

## 2.11.1

## 2.11.0

## 2.10.1

## 2.10.0

## 2.9.1

## 2.9.0

## 2.8.0

## 2.7.0

## 2.6.2

## 2.6.1

## 2.6.0

## 2.5.0

## 2.4.1

## 2.4.0

### Minor Changes

- [#426](https://github.com/embedpdf/embed-pdf-viewer/pull/426) by [@bobsingor](https://github.com/bobsingor) – Added history purging by command metadata:
  - Added `purgeByMetadata()` method to remove history entries matching a predicate on command metadata
  - Added generic `metadata` field to `Command` interface for attaching identifiable data to commands
  - Enables permanent operations (like redaction commits) to clean up related undo/redo history

## 2.3.0

## 2.2.0

## 2.1.2

## 2.1.1

## 2.1.0

## 2.0.2

## 2.0.1

## 2.0.0

### Major Changes

- [#279](https://github.com/embedpdf/embed-pdf-viewer/pull/279) by [@bobsingor](https://github.com/bobsingor) – ## Multi-Document Support

  The history plugin now supports per-document history state.

  ### Breaking Changes
  - **Actions**:
    - Replaced `SET_HISTORY_STATE` with `SET_HISTORY_DOCUMENT_STATE` that requires `documentId`
    - Added document lifecycle actions: `INIT_HISTORY_STATE` and `CLEANUP_HISTORY_STATE`
  - **State Structure**: Plugin state now uses `documents: Record<string, HistoryDocumentState>` to track per-document history state.
  - **Action Creators**:
    - `setHistoryState(documentId, state)` - Now requires document ID
    - Added `initHistoryState(documentId)` and `cleanupHistoryState(documentId)`

  ### Framework-Specific Changes (React/Preact, Svelte, Vue)
  - **Hooks**:
    - Added Svelte hooks support (`@embedpdf/plugin-history/svelte`)
    - All hooks work with document-scoped capabilities

  ### New Features
  - Per-document history state tracking
  - Document lifecycle management with automatic state initialization and cleanup

## 2.0.0-next.3

## 2.0.0-next.2

## 2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- [#279](https://github.com/embedpdf/embed-pdf-viewer/pull/279) by [@bobsingor](https://github.com/bobsingor) – ## Multi-Document Support

  The history plugin now supports per-document history state.

  ### Breaking Changes
  - **Actions**:
    - Replaced `SET_HISTORY_STATE` with `SET_HISTORY_DOCUMENT_STATE` that requires `documentId`
    - Added document lifecycle actions: `INIT_HISTORY_STATE` and `CLEANUP_HISTORY_STATE`
  - **State Structure**: Plugin state now uses `documents: Record<string, HistoryDocumentState>` to track per-document history state.
  - **Action Creators**:
    - `setHistoryState(documentId, state)` - Now requires document ID
    - Added `initHistoryState(documentId)` and `cleanupHistoryState(documentId)`

  ### Framework-Specific Changes (React/Preact, Svelte, Vue)
  - **Hooks**:
    - Added Svelte hooks support (`@embedpdf/plugin-history/svelte`)
    - All hooks work with document-scoped capabilities

  ### New Features
  - Per-document history state tracking
  - Document lifecycle management with automatic state initialization and cleanup

## 1.5.0

## 1.4.1

## 1.4.0

## 1.3.16

## 1.3.15

## 1.3.14

## 1.3.13

## 1.3.12

## 1.3.11

## 1.3.10

## 1.3.9

## 1.3.8

## 1.3.7

## 1.3.6

## 1.3.5

## 1.3.4

## 1.3.3

## 1.3.2

## 1.3.1

## 1.3.0

### Patch Changes

- [#168](https://github.com/embedpdf/embed-pdf-viewer/pull/168) by [@Ludy87](https://github.com/Ludy87) – Add license fields to the package.json with the value MIT

## 1.2.1

## 1.2.0

## 1.1.1

## 1.1.0

## 1.0.26

## 1.0.25

## 1.0.24

## 1.0.23

## 1.0.22

## 1.0.21

### Patch Changes

- [#119](https://github.com/embedpdf/embed-pdf-viewer/pull/119) by [@bobsingor](https://github.com/bobsingor) – Add and fix Vue packages!

## 1.0.20

## 1.0.19

## 1.0.18

## 1.0.17

## 1.0.16

## 1.0.15

## 1.0.14

## 1.0.13

## 1.0.12

### Patch Changes

- [#47](https://github.com/embedpdf/embed-pdf-viewer/pull/47) by [@bobsingor](https://github.com/bobsingor) – Update history plugin to have shared code between react and preact to simplify workflow

## 1.0.11

## 1.0.10

## 1.0.9

## 1.0.8

## 1.0.7

### Patch Changes

- [#35](https://github.com/embedpdf/embed-pdf-viewer/pull/35) by [@bobsingor](https://github.com/bobsingor) – New history plugin who allows to go back and forward in time
