'use client'

import { useState } from 'react'
import NavBar from '../components/NavBar'
import { createClient } from '../utils/supabase/client'

const TONES = ['formal', 'friendly', 'confident']

const FREE_LIMIT = 2

function generateMockLetter(resume, jobDescription, tone) {
  const toneOpener = {
    formal:
      'I am writing to express my strong interest in the position described in your job posting.',
    friendly:
      "I'd love to join your team! When I came across this opportunity, I knew right away it was a great fit.",
    confident:
      'With a proven record of delivering results, I am confident I am the ideal candidate for this role.',
  }[tone]

  return `Dear Hiring Manager,

${toneOpener}

Having reviewed the role carefully, I am excited by the opportunity to bring my skills and experience to your organization. My background aligns closely with your requirements, and I am eager to contribute from day one.

Throughout my career, I have demonstrated the ability to work effectively in fast-paced environments, collaborate across teams, and deliver high-quality work consistently. I am a proactive communicator and a strong problem-solver who thrives when given the opportunity to make a meaningful impact.

I am particularly drawn to this role because of the challenges it presents and the chance to grow alongside a dynamic team. I believe my experience and dedication make me a strong match for what you are looking for.

I would welcome the opportunity to discuss how my background can contribute to your team's success. Thank you for considering my application — I look forward to speaking with you.

${tone === 'confident' ? 'I look forward to making an immediate impact.' : tone === 'friendly' ? 'Hope to chat soon!' : 'Sincerely,'}

[Your Name]`
}

export default function GeneratePage() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [tone, setTone] = useState('formal')
  const [loading, setLoading] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [limitReached, setLimitReached] = useState(false)

  async function handleGenerate() {
    setError('')
    setCopied(false)

    if (!resume.trim() || !jobDescription.trim()) {
      setError('Please fill in both your resume and the job description.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/login'
      return
    }

    // Check free plan limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, letters_used')
      .eq('id', user.id)
      .single()

    const plan = profile?.plan ?? 'free'
    const lettersUsed = profile?.letters_used ?? 0

    if (plan === 'free' && lettersUsed >= FREE_LIMIT) {
      setLimitReached(true)
      setLoading(false)
      return
    }

    // Generate (mock)
    const letter = generateMockLetter(resume, jobDescription, tone)

    // Save to DB
    await supabase.from('cover_letters').insert({
      user_id: user.id,
      resume_text: resume,
      job_description: jobDescription,
      tone,
      generated_letter: letter,
    })

    // Increment letters_used
    await supabase
      .from('profiles')
      .update({ letters_used: lettersUsed + 1 })
      .eq('id', user.id)

    setGeneratedLetter(letter)
    setLoading(false)
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleReset() {
    setResume('')
    setJobDescription('')
    setTone('formal')
    setGeneratedLetter('')
    setError('')
    setLimitReached(false)
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Generate Cover Letter
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Paste your resume and job description, pick a tone, and get a
          professional cover letter instantly.
        </p>

        {limitReached ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <p className="text-amber-900 font-semibold text-lg mb-2">
              You&apos;ve reached your free plan limit
            </p>
            <p className="text-amber-700 text-sm mb-6">
              Free accounts can generate 2 cover letters per month. Upgrade to
              Pro for unlimited letters.
            </p>
            <a
              href="/account"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Upgrade to Pro — $9/mo
            </a>
          </div>
        ) : generatedLetter ? (
          /* Result view */
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Your Cover Letter
              </h2>
              <textarea
                readOnly
                value={generatedLetter}
                rows={18}
                className="w-full text-sm text-gray-900 leading-relaxed resize-none focus:outline-none font-mono"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
              >
                {loading ? 'Regenerating…' : 'Regenerate'}
              </button>
              <button
                onClick={handleReset}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Generate Another
              </button>
            </div>
          </div>
        ) : (
          /* Form view */
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Your Resume
                </label>
                <textarea
                  id="resume"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  rows={14}
                  placeholder="Paste the full text of your resume here…"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="job"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Job Description
                </label>
                <textarea
                  id="job"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={14}
                  placeholder="Paste the job posting or description here…"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Tone selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Tone</p>
              <div className="flex gap-3">
                {TONES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                      tone === t
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium px-8 py-3 rounded-xl transition-colors text-sm"
            >
              {loading ? 'Generating…' : 'Generate Cover Letter'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
