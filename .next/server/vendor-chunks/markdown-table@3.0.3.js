"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/markdown-table@3.0.3";
exports.ids = ["vendor-chunks/markdown-table@3.0.3"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/markdown-table@3.0.3/node_modules/markdown-table/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/markdown-table@3.0.3/node_modules/markdown-table/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   markdownTable: () => (/* binding */ markdownTable)\n/* harmony export */ });\n/**\n * @typedef Options\n *   Configuration (optional).\n * @property {string|null|ReadonlyArray<string|null|undefined>} [align]\n *   One style for all columns, or styles for their respective columns.\n *   Each style is either `'l'` (left), `'r'` (right), or `'c'` (center).\n *   Other values are treated as `''`, which doesn’t place the colon in the\n *   alignment row but does align left.\n *   *Only the lowercased first character is used, so `Right` is fine.*\n * @property {boolean} [padding=true]\n *   Whether to add a space of padding between delimiters and cells.\n *\n *   When `true`, there is padding:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   When `false`, there is no padding:\n *\n *   ```markdown\n *   |Alpha|B    |\n *   |-----|-----|\n *   |C    |Delta|\n *   ```\n * @property {boolean} [delimiterStart=true]\n *   Whether to begin each row with the delimiter.\n *\n *   > 👉 **Note**: please don’t use this: it could create fragile structures\n *   > that aren’t understandable to some markdown parsers.\n *\n *   When `true`, there are starting delimiters:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   When `false`, there are no starting delimiters:\n *\n *   ```markdown\n *   Alpha | B     |\n *   ----- | ----- |\n *   C     | Delta |\n *   ```\n * @property {boolean} [delimiterEnd=true]\n *   Whether to end each row with the delimiter.\n *\n *   > 👉 **Note**: please don’t use this: it could create fragile structures\n *   > that aren’t understandable to some markdown parsers.\n *\n *   When `true`, there are ending delimiters:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   When `false`, there are no ending delimiters:\n *\n *   ```markdown\n *   | Alpha | B\n *   | ----- | -----\n *   | C     | Delta\n *   ```\n * @property {boolean} [alignDelimiters=true]\n *   Whether to align the delimiters.\n *   By default, they are aligned:\n *\n *   ```markdown\n *   | Alpha | B     |\n *   | ----- | ----- |\n *   | C     | Delta |\n *   ```\n *\n *   Pass `false` to make them staggered:\n *\n *   ```markdown\n *   | Alpha | B |\n *   | - | - |\n *   | C | Delta |\n *   ```\n * @property {(value: string) => number} [stringLength]\n *   Function to detect the length of table cell content.\n *   This is used when aligning the delimiters (`|`) between table cells.\n *   Full-width characters and emoji mess up delimiter alignment when viewing\n *   the markdown source.\n *   To fix this, you can pass this function, which receives the cell content\n *   and returns its “visible” size.\n *   Note that what is and isn’t visible depends on where the text is displayed.\n *\n *   Without such a function, the following:\n *\n *   ```js\n *   markdownTable([\n *     ['Alpha', 'Bravo'],\n *     ['中文', 'Charlie'],\n *     ['👩‍❤️‍👩', 'Delta']\n *   ])\n *   ```\n *\n *   Yields:\n *\n *   ```markdown\n *   | Alpha | Bravo |\n *   | - | - |\n *   | 中文 | Charlie |\n *   | 👩‍❤️‍👩 | Delta |\n *   ```\n *\n *   With [`string-width`](https://github.com/sindresorhus/string-width):\n *\n *   ```js\n *   import stringWidth from 'string-width'\n *\n *   markdownTable(\n *     [\n *       ['Alpha', 'Bravo'],\n *       ['中文', 'Charlie'],\n *       ['👩‍❤️‍👩', 'Delta']\n *     ],\n *     {stringLength: stringWidth}\n *   )\n *   ```\n *\n *   Yields:\n *\n *   ```markdown\n *   | Alpha | Bravo   |\n *   | ----- | ------- |\n *   | 中文  | Charlie |\n *   | 👩‍❤️‍👩    | Delta   |\n *   ```\n */\n\n/**\n * @typedef {Options} MarkdownTableOptions\n * @todo\n *   Remove next major.\n */\n\n/**\n * Generate a markdown ([GFM](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)) table..\n *\n * @param {ReadonlyArray<ReadonlyArray<string|null|undefined>>} table\n *   Table data (matrix of strings).\n * @param {Options} [options]\n *   Configuration (optional).\n * @returns {string}\n */\nfunction markdownTable(table, options = {}) {\n  const align = (options.align || []).concat()\n  const stringLength = options.stringLength || defaultStringLength\n  /** @type {Array<number>} Character codes as symbols for alignment per column. */\n  const alignments = []\n  /** @type {Array<Array<string>>} Cells per row. */\n  const cellMatrix = []\n  /** @type {Array<Array<number>>} Sizes of each cell per row. */\n  const sizeMatrix = []\n  /** @type {Array<number>} */\n  const longestCellByColumn = []\n  let mostCellsPerRow = 0\n  let rowIndex = -1\n\n  // This is a superfluous loop if we don’t align delimiters, but otherwise we’d\n  // do superfluous work when aligning, so optimize for aligning.\n  while (++rowIndex < table.length) {\n    /** @type {Array<string>} */\n    const row = []\n    /** @type {Array<number>} */\n    const sizes = []\n    let columnIndex = -1\n\n    if (table[rowIndex].length > mostCellsPerRow) {\n      mostCellsPerRow = table[rowIndex].length\n    }\n\n    while (++columnIndex < table[rowIndex].length) {\n      const cell = serialize(table[rowIndex][columnIndex])\n\n      if (options.alignDelimiters !== false) {\n        const size = stringLength(cell)\n        sizes[columnIndex] = size\n\n        if (\n          longestCellByColumn[columnIndex] === undefined ||\n          size > longestCellByColumn[columnIndex]\n        ) {\n          longestCellByColumn[columnIndex] = size\n        }\n      }\n\n      row.push(cell)\n    }\n\n    cellMatrix[rowIndex] = row\n    sizeMatrix[rowIndex] = sizes\n  }\n\n  // Figure out which alignments to use.\n  let columnIndex = -1\n\n  if (typeof align === 'object' && 'length' in align) {\n    while (++columnIndex < mostCellsPerRow) {\n      alignments[columnIndex] = toAlignment(align[columnIndex])\n    }\n  } else {\n    const code = toAlignment(align)\n\n    while (++columnIndex < mostCellsPerRow) {\n      alignments[columnIndex] = code\n    }\n  }\n\n  // Inject the alignment row.\n  columnIndex = -1\n  /** @type {Array<string>} */\n  const row = []\n  /** @type {Array<number>} */\n  const sizes = []\n\n  while (++columnIndex < mostCellsPerRow) {\n    const code = alignments[columnIndex]\n    let before = ''\n    let after = ''\n\n    if (code === 99 /* `c` */) {\n      before = ':'\n      after = ':'\n    } else if (code === 108 /* `l` */) {\n      before = ':'\n    } else if (code === 114 /* `r` */) {\n      after = ':'\n    }\n\n    // There *must* be at least one hyphen-minus in each alignment cell.\n    let size =\n      options.alignDelimiters === false\n        ? 1\n        : Math.max(\n            1,\n            longestCellByColumn[columnIndex] - before.length - after.length\n          )\n\n    const cell = before + '-'.repeat(size) + after\n\n    if (options.alignDelimiters !== false) {\n      size = before.length + size + after.length\n\n      if (size > longestCellByColumn[columnIndex]) {\n        longestCellByColumn[columnIndex] = size\n      }\n\n      sizes[columnIndex] = size\n    }\n\n    row[columnIndex] = cell\n  }\n\n  // Inject the alignment row.\n  cellMatrix.splice(1, 0, row)\n  sizeMatrix.splice(1, 0, sizes)\n\n  rowIndex = -1\n  /** @type {Array<string>} */\n  const lines = []\n\n  while (++rowIndex < cellMatrix.length) {\n    const row = cellMatrix[rowIndex]\n    const sizes = sizeMatrix[rowIndex]\n    columnIndex = -1\n    /** @type {Array<string>} */\n    const line = []\n\n    while (++columnIndex < mostCellsPerRow) {\n      const cell = row[columnIndex] || ''\n      let before = ''\n      let after = ''\n\n      if (options.alignDelimiters !== false) {\n        const size =\n          longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0)\n        const code = alignments[columnIndex]\n\n        if (code === 114 /* `r` */) {\n          before = ' '.repeat(size)\n        } else if (code === 99 /* `c` */) {\n          if (size % 2) {\n            before = ' '.repeat(size / 2 + 0.5)\n            after = ' '.repeat(size / 2 - 0.5)\n          } else {\n            before = ' '.repeat(size / 2)\n            after = before\n          }\n        } else {\n          after = ' '.repeat(size)\n        }\n      }\n\n      if (options.delimiterStart !== false && !columnIndex) {\n        line.push('|')\n      }\n\n      if (\n        options.padding !== false &&\n        // Don’t add the opening space if we’re not aligning and the cell is\n        // empty: there will be a closing space.\n        !(options.alignDelimiters === false && cell === '') &&\n        (options.delimiterStart !== false || columnIndex)\n      ) {\n        line.push(' ')\n      }\n\n      if (options.alignDelimiters !== false) {\n        line.push(before)\n      }\n\n      line.push(cell)\n\n      if (options.alignDelimiters !== false) {\n        line.push(after)\n      }\n\n      if (options.padding !== false) {\n        line.push(' ')\n      }\n\n      if (\n        options.delimiterEnd !== false ||\n        columnIndex !== mostCellsPerRow - 1\n      ) {\n        line.push('|')\n      }\n    }\n\n    lines.push(\n      options.delimiterEnd === false\n        ? line.join('').replace(/ +$/, '')\n        : line.join('')\n    )\n  }\n\n  return lines.join('\\n')\n}\n\n/**\n * @param {string|null|undefined} [value]\n * @returns {string}\n */\nfunction serialize(value) {\n  return value === null || value === undefined ? '' : String(value)\n}\n\n/**\n * @param {string} value\n * @returns {number}\n */\nfunction defaultStringLength(value) {\n  return value.length\n}\n\n/**\n * @param {string|null|undefined} value\n * @returns {number}\n */\nfunction toAlignment(value) {\n  const code = typeof value === 'string' ? value.codePointAt(0) : 0\n\n  return code === 67 /* `C` */ || code === 99 /* `c` */\n    ? 99 /* `c` */\n    : code === 76 /* `L` */ || code === 108 /* `l` */\n    ? 108 /* `l` */\n    : code === 82 /* `R` */ || code === 114 /* `r` */\n    ? 114 /* `r` */\n    : 0\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbWFya2Rvd24tdGFibGVAMy4wLjMvbm9kZV9tb2R1bGVzL21hcmtkb3duLXRhYmxlL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGtEQUFrRDtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywyQkFBMkI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscURBQXFEO0FBQ2hFO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsYUFBYTtBQUNiO0FBQ08sMENBQTBDO0FBQ2pEO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ0EsYUFBYSxlQUFlO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsZUFBZTtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLHVCQUF1QjtBQUNsQyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyx1QkFBdUI7QUFDbEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaW5ub3ZhX2NoYXRib3QvLi9ub2RlX21vZHVsZXMvLnBucG0vbWFya2Rvd24tdGFibGVAMy4wLjMvbm9kZV9tb2R1bGVzL21hcmtkb3duLXRhYmxlL2luZGV4LmpzPzEzYTgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24gKG9wdGlvbmFsKS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx8UmVhZG9ubHlBcnJheTxzdHJpbmd8bnVsbHx1bmRlZmluZWQ+fSBbYWxpZ25dXG4gKiAgIE9uZSBzdHlsZSBmb3IgYWxsIGNvbHVtbnMsIG9yIHN0eWxlcyBmb3IgdGhlaXIgcmVzcGVjdGl2ZSBjb2x1bW5zLlxuICogICBFYWNoIHN0eWxlIGlzIGVpdGhlciBgJ2wnYCAobGVmdCksIGAncidgIChyaWdodCksIG9yIGAnYydgIChjZW50ZXIpLlxuICogICBPdGhlciB2YWx1ZXMgYXJlIHRyZWF0ZWQgYXMgYCcnYCwgd2hpY2ggZG9lc27igJl0IHBsYWNlIHRoZSBjb2xvbiBpbiB0aGVcbiAqICAgYWxpZ25tZW50IHJvdyBidXQgZG9lcyBhbGlnbiBsZWZ0LlxuICogICAqT25seSB0aGUgbG93ZXJjYXNlZCBmaXJzdCBjaGFyYWN0ZXIgaXMgdXNlZCwgc28gYFJpZ2h0YCBpcyBmaW5lLipcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3BhZGRpbmc9dHJ1ZV1cbiAqICAgV2hldGhlciB0byBhZGQgYSBzcGFjZSBvZiBwYWRkaW5nIGJldHdlZW4gZGVsaW1pdGVycyBhbmQgY2VsbHMuXG4gKlxuICogICBXaGVuIGB0cnVlYCwgdGhlcmUgaXMgcGFkZGluZzpcbiAqXG4gKiAgIGBgYG1hcmtkb3duXG4gKiAgIHwgQWxwaGEgfCBCICAgICB8XG4gKiAgIHwgLS0tLS0gfCAtLS0tLSB8XG4gKiAgIHwgQyAgICAgfCBEZWx0YSB8XG4gKiAgIGBgYFxuICpcbiAqICAgV2hlbiBgZmFsc2VgLCB0aGVyZSBpcyBubyBwYWRkaW5nOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfEFscGhhfEIgICAgfFxuICogICB8LS0tLS18LS0tLS18XG4gKiAgIHxDICAgIHxEZWx0YXxcbiAqICAgYGBgXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtkZWxpbWl0ZXJTdGFydD10cnVlXVxuICogICBXaGV0aGVyIHRvIGJlZ2luIGVhY2ggcm93IHdpdGggdGhlIGRlbGltaXRlci5cbiAqXG4gKiAgID4g8J+RiSAqKk5vdGUqKjogcGxlYXNlIGRvbuKAmXQgdXNlIHRoaXM6IGl0IGNvdWxkIGNyZWF0ZSBmcmFnaWxlIHN0cnVjdHVyZXNcbiAqICAgPiB0aGF0IGFyZW7igJl0IHVuZGVyc3RhbmRhYmxlIHRvIHNvbWUgbWFya2Rvd24gcGFyc2Vycy5cbiAqXG4gKiAgIFdoZW4gYHRydWVgLCB0aGVyZSBhcmUgc3RhcnRpbmcgZGVsaW1pdGVyczpcbiAqXG4gKiAgIGBgYG1hcmtkb3duXG4gKiAgIHwgQWxwaGEgfCBCICAgICB8XG4gKiAgIHwgLS0tLS0gfCAtLS0tLSB8XG4gKiAgIHwgQyAgICAgfCBEZWx0YSB8XG4gKiAgIGBgYFxuICpcbiAqICAgV2hlbiBgZmFsc2VgLCB0aGVyZSBhcmUgbm8gc3RhcnRpbmcgZGVsaW1pdGVyczpcbiAqXG4gKiAgIGBgYG1hcmtkb3duXG4gKiAgIEFscGhhIHwgQiAgICAgfFxuICogICAtLS0tLSB8IC0tLS0tIHxcbiAqICAgQyAgICAgfCBEZWx0YSB8XG4gKiAgIGBgYFxuICogQHByb3BlcnR5IHtib29sZWFufSBbZGVsaW1pdGVyRW5kPXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gZW5kIGVhY2ggcm93IHdpdGggdGhlIGRlbGltaXRlci5cbiAqXG4gKiAgID4g8J+RiSAqKk5vdGUqKjogcGxlYXNlIGRvbuKAmXQgdXNlIHRoaXM6IGl0IGNvdWxkIGNyZWF0ZSBmcmFnaWxlIHN0cnVjdHVyZXNcbiAqICAgPiB0aGF0IGFyZW7igJl0IHVuZGVyc3RhbmRhYmxlIHRvIHNvbWUgbWFya2Rvd24gcGFyc2Vycy5cbiAqXG4gKiAgIFdoZW4gYHRydWVgLCB0aGVyZSBhcmUgZW5kaW5nIGRlbGltaXRlcnM6XG4gKlxuICogICBgYGBtYXJrZG93blxuICogICB8IEFscGhhIHwgQiAgICAgfFxuICogICB8IC0tLS0tIHwgLS0tLS0gfFxuICogICB8IEMgICAgIHwgRGVsdGEgfFxuICogICBgYGBcbiAqXG4gKiAgIFdoZW4gYGZhbHNlYCwgdGhlcmUgYXJlIG5vIGVuZGluZyBkZWxpbWl0ZXJzOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfCBBbHBoYSB8IEJcbiAqICAgfCAtLS0tLSB8IC0tLS0tXG4gKiAgIHwgQyAgICAgfCBEZWx0YVxuICogICBgYGBcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2FsaWduRGVsaW1pdGVycz10cnVlXVxuICogICBXaGV0aGVyIHRvIGFsaWduIHRoZSBkZWxpbWl0ZXJzLlxuICogICBCeSBkZWZhdWx0LCB0aGV5IGFyZSBhbGlnbmVkOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfCBBbHBoYSB8IEIgICAgIHxcbiAqICAgfCAtLS0tLSB8IC0tLS0tIHxcbiAqICAgfCBDICAgICB8IERlbHRhIHxcbiAqICAgYGBgXG4gKlxuICogICBQYXNzIGBmYWxzZWAgdG8gbWFrZSB0aGVtIHN0YWdnZXJlZDpcbiAqXG4gKiAgIGBgYG1hcmtkb3duXG4gKiAgIHwgQWxwaGEgfCBCIHxcbiAqICAgfCAtIHwgLSB8XG4gKiAgIHwgQyB8IERlbHRhIHxcbiAqICAgYGBgXG4gKiBAcHJvcGVydHkgeyh2YWx1ZTogc3RyaW5nKSA9PiBudW1iZXJ9IFtzdHJpbmdMZW5ndGhdXG4gKiAgIEZ1bmN0aW9uIHRvIGRldGVjdCB0aGUgbGVuZ3RoIG9mIHRhYmxlIGNlbGwgY29udGVudC5cbiAqICAgVGhpcyBpcyB1c2VkIHdoZW4gYWxpZ25pbmcgdGhlIGRlbGltaXRlcnMgKGB8YCkgYmV0d2VlbiB0YWJsZSBjZWxscy5cbiAqICAgRnVsbC13aWR0aCBjaGFyYWN0ZXJzIGFuZCBlbW9qaSBtZXNzIHVwIGRlbGltaXRlciBhbGlnbm1lbnQgd2hlbiB2aWV3aW5nXG4gKiAgIHRoZSBtYXJrZG93biBzb3VyY2UuXG4gKiAgIFRvIGZpeCB0aGlzLCB5b3UgY2FuIHBhc3MgdGhpcyBmdW5jdGlvbiwgd2hpY2ggcmVjZWl2ZXMgdGhlIGNlbGwgY29udGVudFxuICogICBhbmQgcmV0dXJucyBpdHMg4oCcdmlzaWJsZeKAnSBzaXplLlxuICogICBOb3RlIHRoYXQgd2hhdCBpcyBhbmQgaXNu4oCZdCB2aXNpYmxlIGRlcGVuZHMgb24gd2hlcmUgdGhlIHRleHQgaXMgZGlzcGxheWVkLlxuICpcbiAqICAgV2l0aG91dCBzdWNoIGEgZnVuY3Rpb24sIHRoZSBmb2xsb3dpbmc6XG4gKlxuICogICBgYGBqc1xuICogICBtYXJrZG93blRhYmxlKFtcbiAqICAgICBbJ0FscGhhJywgJ0JyYXZvJ10sXG4gKiAgICAgWyfkuK3mlocnLCAnQ2hhcmxpZSddLFxuICogICAgIFsn8J+RqeKAjeKdpO+4j+KAjfCfkaknLCAnRGVsdGEnXVxuICogICBdKVxuICogICBgYGBcbiAqXG4gKiAgIFlpZWxkczpcbiAqXG4gKiAgIGBgYG1hcmtkb3duXG4gKiAgIHwgQWxwaGEgfCBCcmF2byB8XG4gKiAgIHwgLSB8IC0gfFxuICogICB8IOS4reaWhyB8IENoYXJsaWUgfFxuICogICB8IPCfkanigI3inaTvuI/igI3wn5GpIHwgRGVsdGEgfFxuICogICBgYGBcbiAqXG4gKiAgIFdpdGggW2BzdHJpbmctd2lkdGhgXShodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3N0cmluZy13aWR0aCk6XG4gKlxuICogICBgYGBqc1xuICogICBpbXBvcnQgc3RyaW5nV2lkdGggZnJvbSAnc3RyaW5nLXdpZHRoJ1xuICpcbiAqICAgbWFya2Rvd25UYWJsZShcbiAqICAgICBbXG4gKiAgICAgICBbJ0FscGhhJywgJ0JyYXZvJ10sXG4gKiAgICAgICBbJ+S4reaWhycsICdDaGFybGllJ10sXG4gKiAgICAgICBbJ/CfkanigI3inaTvuI/igI3wn5GpJywgJ0RlbHRhJ11cbiAqICAgICBdLFxuICogICAgIHtzdHJpbmdMZW5ndGg6IHN0cmluZ1dpZHRofVxuICogICApXG4gKiAgIGBgYFxuICpcbiAqICAgWWllbGRzOlxuICpcbiAqICAgYGBgbWFya2Rvd25cbiAqICAgfCBBbHBoYSB8IEJyYXZvICAgfFxuICogICB8IC0tLS0tIHwgLS0tLS0tLSB8XG4gKiAgIHwg5Lit5paHICB8IENoYXJsaWUgfFxuICogICB8IPCfkanigI3inaTvuI/igI3wn5GpICAgIHwgRGVsdGEgICB8XG4gKiAgIGBgYFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09wdGlvbnN9IE1hcmtkb3duVGFibGVPcHRpb25zXG4gKiBAdG9kb1xuICogICBSZW1vdmUgbmV4dCBtYWpvci5cbiAqL1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgbWFya2Rvd24gKFtHRk1dKGh0dHBzOi8vZG9jcy5naXRodWIuY29tL2VuL2dpdGh1Yi93cml0aW5nLW9uLWdpdGh1Yi93b3JraW5nLXdpdGgtYWR2YW5jZWQtZm9ybWF0dGluZy9vcmdhbml6aW5nLWluZm9ybWF0aW9uLXdpdGgtdGFibGVzKSkgdGFibGUuLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHlBcnJheTxSZWFkb25seUFycmF5PHN0cmluZ3xudWxsfHVuZGVmaW5lZD4+fSB0YWJsZVxuICogICBUYWJsZSBkYXRhIChtYXRyaXggb2Ygc3RyaW5ncykuXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uIChvcHRpb25hbCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFya2Rvd25UYWJsZSh0YWJsZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IGFsaWduID0gKG9wdGlvbnMuYWxpZ24gfHwgW10pLmNvbmNhdCgpXG4gIGNvbnN0IHN0cmluZ0xlbmd0aCA9IG9wdGlvbnMuc3RyaW5nTGVuZ3RoIHx8IGRlZmF1bHRTdHJpbmdMZW5ndGhcbiAgLyoqIEB0eXBlIHtBcnJheTxudW1iZXI+fSBDaGFyYWN0ZXIgY29kZXMgYXMgc3ltYm9scyBmb3IgYWxpZ25tZW50IHBlciBjb2x1bW4uICovXG4gIGNvbnN0IGFsaWdubWVudHMgPSBbXVxuICAvKiogQHR5cGUge0FycmF5PEFycmF5PHN0cmluZz4+fSBDZWxscyBwZXIgcm93LiAqL1xuICBjb25zdCBjZWxsTWF0cml4ID0gW11cbiAgLyoqIEB0eXBlIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gU2l6ZXMgb2YgZWFjaCBjZWxsIHBlciByb3cuICovXG4gIGNvbnN0IHNpemVNYXRyaXggPSBbXVxuICAvKiogQHR5cGUge0FycmF5PG51bWJlcj59ICovXG4gIGNvbnN0IGxvbmdlc3RDZWxsQnlDb2x1bW4gPSBbXVxuICBsZXQgbW9zdENlbGxzUGVyUm93ID0gMFxuICBsZXQgcm93SW5kZXggPSAtMVxuXG4gIC8vIFRoaXMgaXMgYSBzdXBlcmZsdW91cyBsb29wIGlmIHdlIGRvbuKAmXQgYWxpZ24gZGVsaW1pdGVycywgYnV0IG90aGVyd2lzZSB3ZeKAmWRcbiAgLy8gZG8gc3VwZXJmbHVvdXMgd29yayB3aGVuIGFsaWduaW5nLCBzbyBvcHRpbWl6ZSBmb3IgYWxpZ25pbmcuXG4gIHdoaWxlICgrK3Jvd0luZGV4IDwgdGFibGUubGVuZ3RoKSB7XG4gICAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICAgIGNvbnN0IHJvdyA9IFtdXG4gICAgLyoqIEB0eXBlIHtBcnJheTxudW1iZXI+fSAqL1xuICAgIGNvbnN0IHNpemVzID0gW11cbiAgICBsZXQgY29sdW1uSW5kZXggPSAtMVxuXG4gICAgaWYgKHRhYmxlW3Jvd0luZGV4XS5sZW5ndGggPiBtb3N0Q2VsbHNQZXJSb3cpIHtcbiAgICAgIG1vc3RDZWxsc1BlclJvdyA9IHRhYmxlW3Jvd0luZGV4XS5sZW5ndGhcbiAgICB9XG5cbiAgICB3aGlsZSAoKytjb2x1bW5JbmRleCA8IHRhYmxlW3Jvd0luZGV4XS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBzZXJpYWxpemUodGFibGVbcm93SW5kZXhdW2NvbHVtbkluZGV4XSlcblxuICAgICAgaWYgKG9wdGlvbnMuYWxpZ25EZWxpbWl0ZXJzICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBzaXplID0gc3RyaW5nTGVuZ3RoKGNlbGwpXG4gICAgICAgIHNpemVzW2NvbHVtbkluZGV4XSA9IHNpemVcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgbG9uZ2VzdENlbGxCeUNvbHVtbltjb2x1bW5JbmRleF0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHNpemUgPiBsb25nZXN0Q2VsbEJ5Q29sdW1uW2NvbHVtbkluZGV4XVxuICAgICAgICApIHtcbiAgICAgICAgICBsb25nZXN0Q2VsbEJ5Q29sdW1uW2NvbHVtbkluZGV4XSA9IHNpemVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByb3cucHVzaChjZWxsKVxuICAgIH1cblxuICAgIGNlbGxNYXRyaXhbcm93SW5kZXhdID0gcm93XG4gICAgc2l6ZU1hdHJpeFtyb3dJbmRleF0gPSBzaXplc1xuICB9XG5cbiAgLy8gRmlndXJlIG91dCB3aGljaCBhbGlnbm1lbnRzIHRvIHVzZS5cbiAgbGV0IGNvbHVtbkluZGV4ID0gLTFcblxuICBpZiAodHlwZW9mIGFsaWduID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBhbGlnbikge1xuICAgIHdoaWxlICgrK2NvbHVtbkluZGV4IDwgbW9zdENlbGxzUGVyUm93KSB7XG4gICAgICBhbGlnbm1lbnRzW2NvbHVtbkluZGV4XSA9IHRvQWxpZ25tZW50KGFsaWduW2NvbHVtbkluZGV4XSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY29kZSA9IHRvQWxpZ25tZW50KGFsaWduKVxuXG4gICAgd2hpbGUgKCsrY29sdW1uSW5kZXggPCBtb3N0Q2VsbHNQZXJSb3cpIHtcbiAgICAgIGFsaWdubWVudHNbY29sdW1uSW5kZXhdID0gY29kZVxuICAgIH1cbiAgfVxuXG4gIC8vIEluamVjdCB0aGUgYWxpZ25tZW50IHJvdy5cbiAgY29sdW1uSW5kZXggPSAtMVxuICAvKiogQHR5cGUge0FycmF5PHN0cmluZz59ICovXG4gIGNvbnN0IHJvdyA9IFtdXG4gIC8qKiBAdHlwZSB7QXJyYXk8bnVtYmVyPn0gKi9cbiAgY29uc3Qgc2l6ZXMgPSBbXVxuXG4gIHdoaWxlICgrK2NvbHVtbkluZGV4IDwgbW9zdENlbGxzUGVyUm93KSB7XG4gICAgY29uc3QgY29kZSA9IGFsaWdubWVudHNbY29sdW1uSW5kZXhdXG4gICAgbGV0IGJlZm9yZSA9ICcnXG4gICAgbGV0IGFmdGVyID0gJydcblxuICAgIGlmIChjb2RlID09PSA5OSAvKiBgY2AgKi8pIHtcbiAgICAgIGJlZm9yZSA9ICc6J1xuICAgICAgYWZ0ZXIgPSAnOidcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDEwOCAvKiBgbGAgKi8pIHtcbiAgICAgIGJlZm9yZSA9ICc6J1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMTE0IC8qIGByYCAqLykge1xuICAgICAgYWZ0ZXIgPSAnOidcbiAgICB9XG5cbiAgICAvLyBUaGVyZSAqbXVzdCogYmUgYXQgbGVhc3Qgb25lIGh5cGhlbi1taW51cyBpbiBlYWNoIGFsaWdubWVudCBjZWxsLlxuICAgIGxldCBzaXplID1cbiAgICAgIG9wdGlvbnMuYWxpZ25EZWxpbWl0ZXJzID09PSBmYWxzZVxuICAgICAgICA/IDFcbiAgICAgICAgOiBNYXRoLm1heChcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICBsb25nZXN0Q2VsbEJ5Q29sdW1uW2NvbHVtbkluZGV4XSAtIGJlZm9yZS5sZW5ndGggLSBhZnRlci5sZW5ndGhcbiAgICAgICAgICApXG5cbiAgICBjb25zdCBjZWxsID0gYmVmb3JlICsgJy0nLnJlcGVhdChzaXplKSArIGFmdGVyXG5cbiAgICBpZiAob3B0aW9ucy5hbGlnbkRlbGltaXRlcnMgIT09IGZhbHNlKSB7XG4gICAgICBzaXplID0gYmVmb3JlLmxlbmd0aCArIHNpemUgKyBhZnRlci5sZW5ndGhcblxuICAgICAgaWYgKHNpemUgPiBsb25nZXN0Q2VsbEJ5Q29sdW1uW2NvbHVtbkluZGV4XSkge1xuICAgICAgICBsb25nZXN0Q2VsbEJ5Q29sdW1uW2NvbHVtbkluZGV4XSA9IHNpemVcbiAgICAgIH1cblxuICAgICAgc2l6ZXNbY29sdW1uSW5kZXhdID0gc2l6ZVxuICAgIH1cblxuICAgIHJvd1tjb2x1bW5JbmRleF0gPSBjZWxsXG4gIH1cblxuICAvLyBJbmplY3QgdGhlIGFsaWdubWVudCByb3cuXG4gIGNlbGxNYXRyaXguc3BsaWNlKDEsIDAsIHJvdylcbiAgc2l6ZU1hdHJpeC5zcGxpY2UoMSwgMCwgc2l6ZXMpXG5cbiAgcm93SW5kZXggPSAtMVxuICAvKiogQHR5cGUge0FycmF5PHN0cmluZz59ICovXG4gIGNvbnN0IGxpbmVzID0gW11cblxuICB3aGlsZSAoKytyb3dJbmRleCA8IGNlbGxNYXRyaXgubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gY2VsbE1hdHJpeFtyb3dJbmRleF1cbiAgICBjb25zdCBzaXplcyA9IHNpemVNYXRyaXhbcm93SW5kZXhdXG4gICAgY29sdW1uSW5kZXggPSAtMVxuICAgIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgICBjb25zdCBsaW5lID0gW11cblxuICAgIHdoaWxlICgrK2NvbHVtbkluZGV4IDwgbW9zdENlbGxzUGVyUm93KSB7XG4gICAgICBjb25zdCBjZWxsID0gcm93W2NvbHVtbkluZGV4XSB8fCAnJ1xuICAgICAgbGV0IGJlZm9yZSA9ICcnXG4gICAgICBsZXQgYWZ0ZXIgPSAnJ1xuXG4gICAgICBpZiAob3B0aW9ucy5hbGlnbkRlbGltaXRlcnMgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPVxuICAgICAgICAgIGxvbmdlc3RDZWxsQnlDb2x1bW5bY29sdW1uSW5kZXhdIC0gKHNpemVzW2NvbHVtbkluZGV4XSB8fCAwKVxuICAgICAgICBjb25zdCBjb2RlID0gYWxpZ25tZW50c1tjb2x1bW5JbmRleF1cblxuICAgICAgICBpZiAoY29kZSA9PT0gMTE0IC8qIGByYCAqLykge1xuICAgICAgICAgIGJlZm9yZSA9ICcgJy5yZXBlYXQoc2l6ZSlcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSA5OSAvKiBgY2AgKi8pIHtcbiAgICAgICAgICBpZiAoc2l6ZSAlIDIpIHtcbiAgICAgICAgICAgIGJlZm9yZSA9ICcgJy5yZXBlYXQoc2l6ZSAvIDIgKyAwLjUpXG4gICAgICAgICAgICBhZnRlciA9ICcgJy5yZXBlYXQoc2l6ZSAvIDIgLSAwLjUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJlZm9yZSA9ICcgJy5yZXBlYXQoc2l6ZSAvIDIpXG4gICAgICAgICAgICBhZnRlciA9IGJlZm9yZVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZnRlciA9ICcgJy5yZXBlYXQoc2l6ZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5kZWxpbWl0ZXJTdGFydCAhPT0gZmFsc2UgJiYgIWNvbHVtbkluZGV4KSB7XG4gICAgICAgIGxpbmUucHVzaCgnfCcpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgb3B0aW9ucy5wYWRkaW5nICE9PSBmYWxzZSAmJlxuICAgICAgICAvLyBEb27igJl0IGFkZCB0aGUgb3BlbmluZyBzcGFjZSBpZiB3ZeKAmXJlIG5vdCBhbGlnbmluZyBhbmQgdGhlIGNlbGwgaXNcbiAgICAgICAgLy8gZW1wdHk6IHRoZXJlIHdpbGwgYmUgYSBjbG9zaW5nIHNwYWNlLlxuICAgICAgICAhKG9wdGlvbnMuYWxpZ25EZWxpbWl0ZXJzID09PSBmYWxzZSAmJiBjZWxsID09PSAnJykgJiZcbiAgICAgICAgKG9wdGlvbnMuZGVsaW1pdGVyU3RhcnQgIT09IGZhbHNlIHx8IGNvbHVtbkluZGV4KVxuICAgICAgKSB7XG4gICAgICAgIGxpbmUucHVzaCgnICcpXG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmFsaWduRGVsaW1pdGVycyAhPT0gZmFsc2UpIHtcbiAgICAgICAgbGluZS5wdXNoKGJlZm9yZSlcbiAgICAgIH1cblxuICAgICAgbGluZS5wdXNoKGNlbGwpXG5cbiAgICAgIGlmIChvcHRpb25zLmFsaWduRGVsaW1pdGVycyAhPT0gZmFsc2UpIHtcbiAgICAgICAgbGluZS5wdXNoKGFmdGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5wYWRkaW5nICE9PSBmYWxzZSkge1xuICAgICAgICBsaW5lLnB1c2goJyAnKVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG9wdGlvbnMuZGVsaW1pdGVyRW5kICE9PSBmYWxzZSB8fFxuICAgICAgICBjb2x1bW5JbmRleCAhPT0gbW9zdENlbGxzUGVyUm93IC0gMVxuICAgICAgKSB7XG4gICAgICAgIGxpbmUucHVzaCgnfCcpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGluZXMucHVzaChcbiAgICAgIG9wdGlvbnMuZGVsaW1pdGVyRW5kID09PSBmYWxzZVxuICAgICAgICA/IGxpbmUuam9pbignJykucmVwbGFjZSgvICskLywgJycpXG4gICAgICAgIDogbGluZS5qb2luKCcnKVxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfG51bGx8dW5kZWZpbmVkfSBbdmFsdWVdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBzZXJpYWxpemUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyh2YWx1ZSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRTdHJpbmdMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLmxlbmd0aFxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfG51bGx8dW5kZWZpbmVkfSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gdG9BbGlnbm1lbnQodmFsdWUpIHtcbiAgY29uc3QgY29kZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZS5jb2RlUG9pbnRBdCgwKSA6IDBcblxuICByZXR1cm4gY29kZSA9PT0gNjcgLyogYENgICovIHx8IGNvZGUgPT09IDk5IC8qIGBjYCAqL1xuICAgID8gOTkgLyogYGNgICovXG4gICAgOiBjb2RlID09PSA3NiAvKiBgTGAgKi8gfHwgY29kZSA9PT0gMTA4IC8qIGBsYCAqL1xuICAgID8gMTA4IC8qIGBsYCAqL1xuICAgIDogY29kZSA9PT0gODIgLyogYFJgICovIHx8IGNvZGUgPT09IDExNCAvKiBgcmAgKi9cbiAgICA/IDExNCAvKiBgcmAgKi9cbiAgICA6IDBcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/markdown-table@3.0.3/node_modules/markdown-table/index.js\n");

/***/ })

};
;