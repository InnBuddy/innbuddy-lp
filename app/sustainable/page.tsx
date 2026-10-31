import SustainableClient from './SustainableClient'

// ビルド時に完全静的HTMLとして書き出す
export const dynamic = 'force-static'

export default function Page() {
  return <SustainableClient />
}