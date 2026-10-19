# Facebook

## Mission
Create implementation-ready, token-driven UI guidance for Facebook that is optimized for consistency, accessibility, and fast delivery across documentation site.

## Brand
- Product/brand: Facebook
- URL: https://www.facebook.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=Segoe UI Historic`, `font.family.stack=Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif`, `font.size.base=12px`, `font.weight.base=400`, `font.lineHeight.base=16.08px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=13px`, `font.size.md=15px`, `font.size.lg=17px`
- Color palette: `color.text.primary=#1c1e21`, `color.text.secondary=#385898`, `color.text.tertiary=#65686c`, `color.text.inverse=#080809`, `color.surface.base=#000000`, `color.surface.muted=#e2e5e9`, `color.surface.raised=#ffffff`, `color.surface.strong=#f0f2f5`
- Spacing scale: `space.1=4px`, `space.2=7px`, `space.3=8px`, `space.4=9px`, `space.5=12px`, `space.6=13px`, `space.7=16px`
- Radius/shadow/motion tokens: `radius.xs=8px`, `radius.sm=10px`, `radius.md=20px`, `radius.lg=30px`, `radius.xl=50px`, `radius.2xl=999px` | `shadow.1=rgba(0, 0, 0, 0.2) 0px 1px 2px 0px`, `shadow.2=rgba(0, 0, 0, 0.1) 0px 0px 0px 1px`, `shadow.3=rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px`, `shadow.4=rgba(0, 0, 0, 0.1) 0px 2px 4px 0px` | `motion.duration.instant=100ms`, `motion.duration.fast=200ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: buttons (72), links (41), inputs (6), lists (4).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
