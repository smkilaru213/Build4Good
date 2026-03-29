import type { Metadata } from 'next'
import './how-it-works.css'

export const metadata: Metadata = {
  title: 'How It Works — Finch',
  description: 'Five steps from sign-up to interview scheduled. See how Finch tailors your applications and wins the search.',
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
