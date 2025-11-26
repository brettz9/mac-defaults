# mac-defaults CHANGES

## 2.0.0

### User-facing

- Breaking change: Switch to native ESM
- Breaking change: Switch to named export (and refactor internally from
    `macOSdefault` to `macOSDefaults`)
- Breaking change: Complete new API (Promises for async)
- Breaking change (npm): Drop now unused dependencies
- Enhancement: Allow single options object signature
- Enhancement: Validate host (host, currentHost, or any host) arguments
- Enhancement: Validate domain arguments (global, app as domain, path to file)
- Enhancement: Class API option
- Enhancement: Old-style ASCII Property list validating parser with options
    to control output (`hexAsArrays`), to liberalize rules for non-defaults
    syntax like ioreg (`allowAngledBracketStrings`, `allowMissingSeparators`),
    or to tighten expectations (by turning off `allowUnquotedStringsAtRoot`).
- Enhancement: `jsToPropertyListXML` utility (with optional config `forceHex`
    and `forceReal` to avoid ambiguous type detection)
- Enhancement: `jsToAsciiPropertyList` utility (accepting JavaScript or JSON
    object with string, number, array, Uint8Arrays, or objects)
- Enhancement: `parseFindResults` utility (accepts a string in the
    non-exclusively-Property-List results format returned by
    `defaults find` along with a `json` option on whether to return JSON
    arrays instead of `Uint8Array`s.
- Enhancement: Add `getParsedIORegInfo.js` for parsing ioreg responses
    (not currently adding to main file; besides its utility, may be useful
    as demo of options)
- Enhancement (validation): Check keys are strings, verify passed values
    match type (or can be converted), verify domain is present where required
- Enhancement: Add `OpenWith` and `XAttr` modules
- Enhancement: Factor out spawn code for export (including allowing for no
    arguments)
- Optimization: Add `use strict`
- API (constructor) accepts any of the following options: `debug`,
    `jsonResults`, `log`, `sync`, `forceReal`, `forceHex`
- API (write): Accept key-type/value pairs in structured formats (1. A
    two-item array with the 2nd item as a string or two-item array of
    type and value; 2. An object with `key`, `value`, and `type`; 3. An
    object with `key`, `value` (as two-item array of type and value)).
- API (write): Accept values as structured (and nestable) primitives, arrays,
    or objects (wrapped within an object with a `value` property) as well as
    property list strings.
- API (read): Parse ASCII Property List values returned into parsed JSON
    (+ optional Uint8Array for hex) return/resolved results
- API (readType): Return/resolve the string type alone
- API (delete): To delete all without a domain, require an extra `deleteAll`
    key
- API (domains): Return/resolve into an array of domains
- API (find): Return a parsed structure
- API (import): Allow stream (or pseudo-stream)
- Linting (npm): Add `engines` (8.0.0+), `contributors` (also use more typical
    property order)
- Docs (README): Fix example, use JS syntax highlighting, fix headings
- Docs: Indicate non-obvious differences
- Docs: Typo
- npm: Bump get-stream dep

### Dev-facing

- Linting (ESLint): Add ES6, deriving from eslint:recommended and a few
    other rules (consistent semi-colons, use variadic parameters, etc.)
- Linting (ESLint): quote rules, allow module (for tests), lint tests
- Linting: ES2017, allow template literals
- Linting: Rename eslintrc to include recommended json extension
- Refactoring: Arrow functions; prefer const
- npm: Add eslint devDep and ignore file
- npm: ESLint script
- npm: Switch to `pnpm`
- npm: Update devDeps
- npm: Switch to pnpm for massive file size saving
- npm (Testing): Create separate scripts for testing main or parser file
- Testing: Skip problematic stream test
- Testing: Avoid duplicate test names and change throws->throwsAsync
    (per new ava requirements)
- Testing: Test good and bad arguments, values; extended and single object
    signatures, compare resulting XML

## 1.0.2

- Fix: Added `abbrev` dependency

## 1.0.1

- Initial publication
