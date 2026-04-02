import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import NavBar from '../components/NavBar'

export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, letters_used')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan ?? 'free'
  const lettersUsed = profile?.letters_used ?? 0
  const isPro = plan === 'pro'

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Account</h1>

        {/* Profile card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
            Account Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-900 font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Plan</span>
              <span
                className={`font-semibold capitalize ${
                  isPro ? 'text-blue-600' : 'text-gray-900'
                }`}
              >
                {plan}
              </span>
            </div>
            {!isPro && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Letters Used (this month)</span>
                <span className="text-gray-900 font-medium">
                  {lettersUsed} / 2
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Plan actions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
            Billing
          </h2>
          <div className="space-y-4">
            {!isPro && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  Upgrade to Pro — $9/month
                </p>
                <p className="text-sm text-blue-700 mb-4">
                  Unlimited cover letters, no monthly cap.
                </p>
                <button
                  id="upgrade-btn"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                  Upgrade to Pro
                </button>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-3">
                Need help with billing or your subscription?
              </p>
              <a
                href="mailto:support@coverletter-ai.com"
                className="inline-block border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Manage Billing
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
