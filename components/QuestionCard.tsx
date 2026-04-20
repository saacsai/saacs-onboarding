'use client'

import { ReactNode } from 'react'

interface QuestionCardProps {
  title: string
  description?: string
  children: ReactNode
}

export default function QuestionCard({
  title,
  description,
  children,
}: QuestionCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-saacs-900 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}
