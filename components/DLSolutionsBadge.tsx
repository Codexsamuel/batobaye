"use client"

import { useState } from 'react'

interface DLSolutionsBadgeProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  variant?: 'floating' | 'inline' | 'minimal'
  showOnHover?: boolean
}

export default function DLSolutionsBadge({ 
  position = 'bottom-right', 
  variant = 'floating',
  showOnHover = false 
}: DLSolutionsBadgeProps) {
  const [isVisible, setIsVisible] = useState(!showOnHover)

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }

  const variantStyles = {
    floating: 'bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg px-3 py-2 text-sm',
    inline: 'bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-xs',
    minimal: 'text-gray-400 text-xs'
  }

  const badgeContent = (
    <div className={`${variantStyles[variant]} transition-all duration-300 ${showOnHover ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
      <span className="text-gray-600">
        🚀 Par{' '}
        <a 
          href="https://www.daveandlucesolutions.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          DL Solutions
        </a>
        {' '}🇨🇲
      </span>
    </div>
  )

  if (variant === 'inline' || variant === 'minimal') {
    return badgeContent
  }

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseEnter={() => showOnHover && setIsVisible(true)}
      onMouseLeave={() => showOnHover && setIsVisible(false)}
    >
      {badgeContent}
    </div>
  )
}

// Version JavaScript vanilla pour intégration facile
export function DLSolutionsBadgeScript() {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script')
    script.innerHTML = `
      (function() {
        const badge = document.createElement('div');
        badge.innerHTML = \`
          <div style="position:fixed;bottom:16px;right:16px;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);border:1px solid #e5e7eb;border-radius:8px;padding:8px 12px;font-size:14px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);z-index:9999;transition:opacity 0.3s;">
            <span style="color:#374151;">
              🚀 Par <a href="https://www.daveandlucesolutions.com" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:none;font-weight:500;">DL Solutions</a> 🇨🇲
            </span>
          </div>
        \`;
        document.body.appendChild(badge);
      })();
    `
    document.head.appendChild(script)
  }
} 