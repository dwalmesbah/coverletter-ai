'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LettersList({ letters }) {
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(selected.generated_letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleClose() {
    setSelected(null)
    setCopied(false)
  }

  if (!letters || letters.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-14 text-center">
        <p className="text-gray-500 mb-4">No cover letters yet.</p>
        <Link
          href="/generate"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Generate Your First One
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        {letters.map((letter) => {
          const preview = letter.generated_letter
            ? letter.generated_letter.slice(0, 50) + '…'
            : '(empty)'
          const date = new Date(letter.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
          return (
            <button
              key={letter.id}
              onClick={() => setSelected(letter)}
              className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-blue-300 hover:shadow-sm transition-all text-left cursor-pointer"
            >
              <div>
                <p className="text-sm text-gray-900 font-medium">{preview}</p>
                <p className="text-xs text-gray-400 mt-1 capitalize">
                  {date} &middot; {letter.tone} tone
                </p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 shrink-0 ml-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Cover Letter
                </h2>
                <p className="text-xs text-gray-400 capitalize mt-0.5">
                  {new Date(selected.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  &middot; {selected.tone} tone
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <textarea
                readOnly
                value={selected.generated_letter}
                rows={18}
                className="w-full text-sm text-gray-900 leading-relaxed resize-none focus:outline-none font-mono"
              />
            </div>

            {/* Modal footer */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={handleClose}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
