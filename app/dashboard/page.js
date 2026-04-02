import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import NavBar from '../components/NavBar'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: letters } = await supabase
    .from('cover_letters')
    .select('id, generated_letter, tone, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back, {user.email}
            </p>
          </div>
          <Link
            href="/generate"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Generate New Cover Letter
          </Link>
        </div>

        {/* Cover letters list */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Cover Letters
          </h2>

          {!letters || letters.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-14 text-center">
              <p className="text-gray-500 mb-4">No cover letters yet.</p>
              <Link
                href="/generate"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Generate Your First One
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {letters.map((letter) => {
                const preview = letter.generated_letter
                  ? letter.generated_letter.slice(0, 50) + '…'
                  : '(empty)'
                const date = new Date(letter.created_at).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                )
                return (
                  <div
                    key={letter.id}
                    className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        {preview}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 capitalize">
                        {date} &middot; {letter.tone} tone
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
