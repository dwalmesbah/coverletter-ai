import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import NavBar from '../components/NavBar'
import LettersList from '../components/LettersList'

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

          <LettersList letters={letters} />
        </section>
      </main>
    </div>
  )
}
