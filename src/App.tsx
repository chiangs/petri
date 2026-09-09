import { useEffect, useState } from 'react'
import './App.css'
import { experiments } from '@/lib/registry'
import { Sidebar } from '@/app-components/Sidebar'
import { ExperimentViewer } from '@/app-components/ExperimentViewer'
import { AboutDialog } from '@/app-components/AboutDialog'

const INTRO_SEEN_KEY = 'petri:intro-seen'

function slugFromHash(): string | null {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || null
}

function introSeen(): boolean {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) !== null
  } catch {
    return true // storage off → don't nag on every load
  }
}

function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    () => slugFromHash() ?? experiments[0]?.slug ?? null,
  )
  const [aboutOpen, setAboutOpen] = useState(() => !introSeen())

  useEffect(() => {
    const onHashChange = () => setActiveSlug(slugFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selectExperiment = (slug: string) => {
    window.location.hash = slug
    setActiveSlug(slug)
  }

  const closeAbout = () => {
    setAboutOpen(false)
    try {
      localStorage.setItem(INTRO_SEEN_KEY, '1')
    } catch {
      // ignore — private mode / storage disabled
    }
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
        onShowAbout={() => setAboutOpen(true)}
      />
      <main className="main">{body}</main>
      <AboutDialog open={aboutOpen} onClose={closeAbout} />
    </div>
  )
}

export default App
