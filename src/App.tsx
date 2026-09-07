import { useEffect, useState } from 'react'
import './App.css'
import { experiments } from '@/lib/registry'
import { Sidebar } from '@/app-components/Sidebar'
import { ExperimentViewer } from '@/app-components/ExperimentViewer'

function slugFromHash(): string | null {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || null
}

function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    () => slugFromHash() ?? experiments[0]?.slug ?? null,
  )

  useEffect(() => {
    const onHashChange = () => setActiveSlug(slugFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selectExperiment = (slug: string) => {
    window.location.hash = slug
    setActiveSlug(slug)
  }

  const active = experiments.find((e) => e.slug === activeSlug) ?? null
  const body = active ? (
    <ExperimentViewer experiment={active} />
  ) : (
    <p className="empty-state">No experiments yet.</p>
  )

  return (
    <div className="app">
      <Sidebar
        experiments={experiments}
        activeSlug={activeSlug}
        onSelect={selectExperiment}
      />
      <main className="main">{body}</main>
    </div>
  )
}

export default App
