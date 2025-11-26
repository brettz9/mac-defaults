/* eslint-disable unicorn/no-empty-file, import/unambiguous -- Typedefs */
/**
 * @typedef {object} HostInfo
 * @property {boolean} [currentHost]
 * @property {boolean} anyHost
 * @property {string} hostString
 */

/**
 * @typedef {HostInfo & {
 *   globalDomain: boolean,
 *   app: string,
 *   domainString: string
 * }} HostAndDomain
*/

/**
 * `app` is a non-empty string
 * g is for the Global domain
 * globalDomain is an alias of `g`
 * NSGlobalDomain is an alias of `g`.
 * @typedef {{
 *   app: string,
 *   g: boolean,
 *   globalDomain: boolean,
 *   NSGlobalDomain: boolean
 * }} DomainObject
 */

/**
 * @typedef {string|Partial<DomainObject>} Domain
 */

/**
 * @typedef {{
 *   domain?: string|{
 *     currentHost: boolean,
 *     domain: Domain,
 *     host: Host
 *   },
 *   host?: Host,
 *   currentHost?: boolean
 * }} DomainWithHost
 */

/**
* @typedef {string|{currentHost?: boolean, host?: string}} Host
*/

/**
* @typedef {any[]|object|string|number[]|Uint8Array|undefined} DefaultsResult
*/

/**
* @typedef {"find"|"commaSeparated"|"readType"|"jsType"} ReturnType
*/

/**
* @typedef {number} Integer
*/

/**
* @typedef {object} FindResult
* @property {string} message
* @property {Integer} keys
* @property {string} domain
* @property {DefaultsResult} result
*/

/**
* @typedef {object} FindResultsErrorObject
* @property {TypeError|RangeError} error Parser error
*/

/**
* @typedef {FindResult[]|FindResultsErrorObject} FindResults
*/

/**
 * The valid type string, the escaped value arguments (as a 1-item array,
 *   or possibly more for dicts/arrays), whether the default format was
 *   used (no explicit type).
 * @typedef {[PropertyListType, string[], boolean]} ReducedValue
 */

/**
* @typedef {"hex"|"int"|"bool"|"real"} PropertyListTypeAlias
*/

/**
 * @typedef {"string"|"data"|"integer"|"float"|"boolean"|"date"|
 *    "array"|"array-add"|"dict"|"dict-add"|PropertyListTypeAlias
 * } PropertyListType
 */

/**
* @typedef {boolean|number|Date|DefaultsResult} DefaultsInput
*/

/**
 * @typedef {string|[PropertyListType, DefaultsInput]|
 *   Record<string, any>} PropertyListValue If a
 *  string is provided, the type will be assumed to be a string
 */

/**
 * The key and value.
 * @typedef {[string, PropertyListValue]} PropertyListArray
 */

/**
* @typedef {object} PropertyListObject
* @property {DefaultsInput} value
*/

/**
 * @typedef {string|PropertyListObject|PlistKeyValue|
 *  PropertyListArray} PropertyListOrKeyValue If a string, must be non-empty.
 */

/**
* @typedef {object} PlistStringObject
* @property {string} plist The property list as an old-style ASCII property list
*/

/**
 * @typedef {object} PlistKeyValue
 * @property {string} [key]
 * @property {PropertyListValue} value
 * @property {PropertyListType} [type]
 */

/**
 * @typedef {Partial<DomainWithHost> & Partial<DomainObject> & (
 *   PlistStringObject|PlistKeyValue|PropertyListArray)} PList
 */

/**
* @typedef {Host & {word: string}} WordObject
*/

/**
 * @typedef {Partial<DomainWithHost> & Partial<DomainObject> &
 *    {key: string}} KeyObject
 */

/**
 * `old_key` is an alias of oldKey
 * new_key is an alias of newKey.
 * @typedef {Partial<DomainWithHost> & Partial<DomainObject> & {
 *   oldKey: string,
 *   newKey: string,
 *   old_key?: string,
 *   new_key?: string
 * }} KeysObject
 */


/**
 * @typedef {KeyObject & {deleteAll?: boolean}} KeyDeleteAllObject
 */

/**
* @typedef {object} MockStreamInput
* @property {string} input
*/

/**
 * @typedef {Partial<DomainWithHost> & Partial<DomainObject> & {
 *   plist?: string|import('node:stream').Readable|MockStreamInput
 * }} ImportPlistPathObject
 */

/**
 * @typedef {Partial<DomainWithHost> & Partial<DomainObject> &
 *   {plist?: string}} ExportPlistPathObject
 */

/**
* @typedef {object} ParsedIORegResult
* @property {boolean} isNode
* @property {string|null} ioServiceName
* @property {string|null} ioServiceLocation
* @property {string} ioServiceClass
* @property {Integer} id
* @property {boolean} registered
* @property {boolean} matched
* @property {boolean} active
* @property {Integer} busyTime
* @property {Integer} accumulatedBusyTime
* @property {Integer|null} retainCount
* @property {DefaultsResult} info
*/
