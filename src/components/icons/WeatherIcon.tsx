import * as React from 'react'

interface WeatherIconProps {
  type: 'cold' | 'heat' | 'drought'
  size?: number
  strokeColor?: string
  strokeWidth?: number
}

export default function WeatherIcon({
  type,
  size = 48,
  strokeColor = '#C99A3B',
  strokeWidth = 1.5,
}: WeatherIconProps) {
  if (type === 'cold') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8V40" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M8 24H40" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M12 12L36 36" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M36 12L12 36" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M24 12L21 8M24 12L27 8" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M24 36L21 40M24 36L27 40" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M12 24L8 21M12 24L8 27" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M36 24L40 21M36 24L40 27" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M15 15L12 12M15 15L13 18" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M33 33L36 36M33 33L35 30" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M33 15L36 12M33 15L35 18" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M15 33L12 36M15 33L13 30" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'heat') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="10" stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M18 22C20 20 22 24 24 22C26 20 28 24 30 22" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
        <path d="M18 26C20 24 22 28 24 26C26 24 28 28 30 26" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
        <path d="M24 6V12" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M24 36V42" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M6 24H12" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M36 24H42" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M11 11L15 15" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M33 33L37 37" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M37 11L33 15" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M15 33L11 37" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 34H44" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M12 34L16 42M20 34L18 42M28 34L26 42M36 34L32 42M40 34L42 42" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
      <path d="M8 38L14 38M18 40L24 40M28 38L36 38" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
      <circle cx="24" cy="16" r="6" stroke={strokeColor} strokeWidth={strokeWidth} />
      <path d="M24 6V8M24 24V26M14 16H16M32 16H34M17 9L18.5 10.5M29.5 21.5L31 23M31 9L29.5 10.5M18.5 21.5L17 23" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M22 34V28C20 27 21 24 24 25C27 24 28 27 26 28V34" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
      <path d="M24 29L21 26M24 29L27 26" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
    </svg>
  )
}
