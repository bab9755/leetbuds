'use client'

import React from 'react'
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  height?: number | string
  width?: number | string
  color?: 'light' | 'dark'
}

export function LoadingSpinnerComponent({
  height = 40,
  width = 40,
  color = 'light'
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "relative inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        color === 'light' ? "text-white" : "text-gray-900"
      )}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}