import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import ts from "typescript";

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return /\.(tsx?|mts|cts)$/.test(entry.name) ? [path] : [];
    }),
  );
  return nested.flat();
}

const files = await sourceFiles("src");
const diagnostics = [];
for (const file of files) {
  const source = ts.createSourceFile(
    file,
    await readFile(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  diagnostics.push(...source.parseDiagnostics.map((diagnostic) => ({ file, diagnostic })));
}

if (diagnostics.length) {
  for (const { file, diagnostic } of diagnostics) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
    console.error(`${file}:${line + 1}:${character + 1} ${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Parsed ${files.length} TypeScript source files.`);
}
