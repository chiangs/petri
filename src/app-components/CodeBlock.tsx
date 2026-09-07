import { useEffect, useState } from 'react'
import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import tsx from 'shiki/langs/tsx.mjs'
import ts from 'shiki/langs/typescript.mjs'
import css from 'shiki/langs/css.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  code: string
  lang?: string
}

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      langs: [tsx, ts, css],
      themes: [githubLight, githubDark],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    })
  }
  return highlighterPromise
}

export function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getHighlighter().then((highlighter) => {
      if (cancelled) return
      const result = highlighter.codeToHtml(code, {
        lang,
        themes: { light: 'github-light', dark: 'github-dark' },
      })
      setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [code, lang])

  const body = html ? (
    <div
      className="code-block-scroll"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <pre className="code-block-scroll code-block--loading">{code}</pre>
  )

  return (
    <div className="code-block">
      <CopyButton text={code} />
      {body}
    </div>
  )
}
