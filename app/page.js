import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <span className="text-xl font-bold tracking-tight">CoverLetterAI</span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-white transition-colors px-3 py-2"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
            Generate a Tailored Cover Letter
            <br />
            <span className="text-blue-600">in 10 Seconds</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Paste your resume and job description. AI writes a professional
            cover letter instantly.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition-colors"
          >
            Generate My Cover Letter Free
          </Link>
          <p className="mt-4 text-sm text-gray-400">No credit card required</p>
        </section>

        {/* How it works */}
        <section className="bg-zinc-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  step: '1',
                  title: 'Paste Resume & Job Description',
                  desc: 'Copy your resume and the job posting into the tool.',
                },
                {
                  step: '2',
                  title: 'Choose Your Tone',
                  desc: 'Pick from Formal, Friendly, or Confident to match the role.',
                },
                {
                  step: '3',
                  title: 'Get Your Letter',
                  desc: 'Your tailored cover letter is ready in seconds. Copy and send.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
              Simple Pricing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Free */}
              <div className="border border-gray-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Free</h3>
                <p className="text-4xl font-extrabold text-gray-900 my-4">
                  $0
                  <span className="text-base font-normal text-gray-400">
                    /mo
                  </span>
                </p>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 2 cover letters per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> All tone options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Copy to clipboard
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="block text-center border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-xl transition-colors"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Pro */}
              <div className="border-2 border-blue-600 rounded-2xl p-8 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  POPULAR
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Pro</h3>
                <p className="text-4xl font-extrabold text-gray-900 my-4">
                  $9
                  <span className="text-base font-normal text-gray-400">
                    /mo
                  </span>
                </p>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Unlimited cover letters
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> All tone options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Copy to clipboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Priority support
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="block text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  Get Started with Pro
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        CoverLetterAI &copy; 2026
      </footer>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-blue-600 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
