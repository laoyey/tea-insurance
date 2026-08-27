import * as React from 'react'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
  size?: number
}

export default function TeaLogo({ variant = 'dark', className = '', size = 40 }: LogoProps) {
  const strokeColor = variant === 'light' ? '#F5EFE0' : '#C99A3B'
  const fillColor = variant === 'light' ? 'rgba(245,239,224,0.1)' : 'rgba(201,154,59,0.1)'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 茶叶轮廓 */}
      <path
        d="M24 4C18 4 10 12 10 22C10 32 16 42 24 44C32 42 38 32 38 22C38 12 30 4 24 4Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill={fillColor}
      />
      {/* 叶脉 */}
      <path d="M24 8V40" stroke={strokeColor} strokeWidth="1" opacity="0.6" />
      <path
        d="M24 16L18 20M24 24L18 26M24 32L18 32M24 16L30 20M24 24L30 26M24 32L30 32"
        stroke={strokeColor}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* 盾形保护符号 */}
      <path
        d="M24 14L29 16V22C29 26 26.5 29 24 30C21.5 29 19 26 19 22V16L24 14Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        fill={fillColor}
      />
      {/* 雨滴元素 */}
      <path
        d="M24 17C22.5 19 21 20.5 21 22.5C21 24 22.3 25 24 25C25.7 25 27 24 27 22.5C27 20.5 25.5 19 24 17Z"
        fill={strokeColor}
        opacity="0.3"
      />
    </svg>
  )
}
