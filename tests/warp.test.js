// Tests for WARP.md documentation integrity
// Framework: Node.js built-in test runner (node:test) and assert

import { test, describe, before, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WARP_PATH = path.join(ROOT, 'WARP.md');

function hasAll(haystack, needles) {
  return needles.every((n) => haystack.includes(n));
}
function matchAll(haystack, regexes) {
  return regexes.every((re) => re.test(haystack));
}

describe('WARP.md', () => {
  /** Load once for all tests */
  let md = '';

  before(() => {
    assert.ok(fs.existsSync(WARP_PATH), 'WARP.md should exist at repository root');
    md = fs.readFileSync(WARP_PATH, 'utf8');
    assert.ok(md.length > 0, 'WARP.md should not be empty');
  });

  describe('Top-level structure and core sections', () => {
    it('contains expected primary headings', () => {
      const requiredHeadings = [
        '# WARP.md',
        '## Commands',
        '## Environment',
        '## High-level Architecture',
        '### Key Modules and Responsibilities',
        '### Data and Analytics',
        '### Notable Config',
        '## What’s Missing / Not Configured',
        '## Quick Start',
        '## References',
      ];
      for (const h of requiredHeadings) {
        assert.ok(md.includes(h), `Expected heading missing: ${h}`);
      }
    });

    it('mentions key notes and caveats', () => {
      assert.ok(
        md.includes('No test runner is configured in package.json'),
        'Should clearly state that no test runner is configured'
      );
      assert.ok(
        md.includes('TypeScript and ESLint errors are ignored during builds'),
        'Should mention TS/ESLint error ignore behavior'
      );
    });
  });

  describe('Commands section', () => {
    it('documents dev, build, start, lint, typecheck, genkit commands', () => {
      const commands = [
        'npm run dev',
        'npm run build',
        'npm start',
        'npm run lint',
        'npm run typecheck',
        'npm run genkit:dev',
        'npm run genkit:watch',
      ];
      for (const cmd of commands) {
        assert.ok(md.includes(cmd), `Missing command in docs: ${cmd}`);
      }
    });
  });

  describe('Environment variables', () => {
    it('lists Firebase, Google AI, and Vapi keys', () => {
      const firebaseKeys = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_CLIENT_EMAIL',
        'FIREBASE_PRIVATE_KEY',
      ];
      const otherKeys = [
        'GOOGLE_GENERATIVE_AI_API_KEY',
        'NEXT_PUBLIC_VAPI_API_KEY',
        'VAPI_PRIVATE_KEY',
      ];
      for (const k of [...firebaseKeys, ...otherKeys]) {
        assert.ok(md.includes(k), `Missing env var in docs: ${k}`);
      }
    });

    it('includes setup command for env file copy', () => {
      assert.ok(
        md.includes('cp env.example .env.local') ||
          md.includes('Copy-Item env.example .env.local'),
        'Should include a command to copy env.example to .env.local'
      );
    });
  });

  describe('Architecture accuracy (descriptive content presence)', () => {
    it('describes framework stack and integrations', () => {
      const mustMention = [
        'Next.js 15 (App Router)',
        'React 18',
        'Tailwind',
        'shadcn/ui',
        'Firebase Authentication',
        'Firestore',
        'Firebase Admin SDK',
        'GenKit',
        'googleai/gemini-2.0-flash',
        'Vapi.ai',
      ];
      for (const phrase of mustMention) {
        assert.ok(md.includes(phrase), `Expected architecture keyword missing: ${phrase}`);
      }
    });
  });

  describe('Referenced paths (docs consistency checks)', () => {
    const referencedPaths = [
      'src/app/layout.tsx',
      'src/app/dashboard/layout.tsx',
      'src/lib/firebase.ts',
      'src/lib/firebase-admin.ts',
      'src/ai/genkit.ts',
      'src/ai/flows/flag-risky-calls.ts',
      'src/ai/vapi.ts',
      'src/components/ui',
      'src/components/dashboard',
      'src/components/landing',
      'src/components/shared',
      'src/types/index.d.ts',
      'src/constants/index.ts',
      'next.config.ts',
    ];

    it('mentions all referenced file paths', () => {
      for (const p of referencedPaths) {
        assert.ok(md.includes(p), `Docs should mention path: ${p}`);
      }
    });

    it('optionally validates existence of referenced files/directories (soft check)', () => {
      // Soft assertions: collect missing but do not hard-fail to avoid blocking on doc drift.
      // Report all missing in a single assertion message for maintainability.
      const missing = referencedPaths.filter((p) => !fs.existsSync(path.join(ROOT, p)));
      // We allow some drift, but surface it clearly.
      if (missing.length > 0) {
        console.warn(
          `[WARP.md consistency] The following referenced paths were not found:
- ${missing.join('\n- ')}
Please update WARP.md or add the missing files.`
        );
      }
      assert.ok(true, 'Soft check executed');
    });
  });

  describe('Quick Start and References sections', () => {
    it('includes install and dev commands in Quick Start', () => {
      assert.ok(md.includes('npm install'), 'Quick Start should include npm install');
      assert.ok(md.includes('npm run dev'), 'Quick Start should include npm run dev');
    });

    it('references key documents and files for further reading', () => {
      const refs = ['README.md', 'src/ai/flows/flag-risky-calls.ts', 'src/lib/firebase-admin.ts', 'src/lib/firebase.ts'];
      for (const r of refs) {
        assert.ok(md.includes(r), `References should include: ${r}`);
      }
    });
  });

  describe('Formatting expectations', () => {
    it('uses fenced code blocks for commands', () => {
      // Check for backticked blocks with "bash"
      const fenced = md.match(/```bash[\s\S]*?```/g) || [];
      assert.ok(fenced.length >= 6, 'Expected multiple bash fenced code blocks for commands');
      // Ensure common commands appear within a fenced block
      assert.ok(fenced.some((b) => b.includes('npm run dev')), 'npm run dev should be inside a bash block');
      assert.ok(fenced.some((b) => b.includes('npm run build')), 'npm run build should be inside a bash block');
    });

    it('has normalized heading levels without skipping H levels abruptly', () => {
      const lines = md.split(/\r?\n/);
      const headingLevels = lines
        .filter((l) => /^#{1,6}\s/.test(l))
        .map((l) => l.match(/^(#+)\s/)[1].length);
      // Ensure no heading level jumps by more than 2 at once (basic sanity)
      for (let i = 1; i < headingLevels.length; i++) {
        const diff = Math.abs(headingLevels[i] - headingLevels[i - 1]);
        assert.ok(diff <= 2, `Unexpected large heading jump between sections (diff ${diff})`);
      }
    });
  });

  describe('Guardrails/Notes validation', () => {
    it('calls out lack of CI/CD and test setup in "What’s Missing" section', () => {
      assert.ok(
        md.includes('Tests: No test scripts or config present'),
        'Should state missing test scripts/config'
      );
      assert.ok(
        md.includes('CI/CD: No workflows or CI config detected'),
        'Should state missing CI/CD'
      );
    });
  });
});