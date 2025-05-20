/* import React, { useEffect, useState } from 'react'
type Props = {
  percentage: number
}

const CircularProgressBar = ({ percentage }: Props) => {
  const radius = percentage >= 92.8 ? 15 : 11
  const strokeWidth = 2
  const normalizedRadius = radius - strokeWidth * 0.5
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex items-center justify-center transition-all">
      <svg height="30" width="30" className="transition-all">
        <circle
          stroke="rgb(61, 61, 61)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx="15"
          cy="15"
        />
        <circle
          stroke={
            percentage === 100
              ? 'rgb(255,0,0)'
              : percentage >= 92.8
              ? 'rgb(255, 230, 0)'
              : 'rgb(0, 140, 255)'
          }
          className='transition-all'
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx="15"
          cy="15"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'all',
          }}
        />
        {percentage >= 92.8 ? (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="10"
            fill="white"
          >
            {280 - percentage * 2.8}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export default CircularProgressBar
 */
import React from 'react'

type Props = {
  percentage: number
}

const CircularProgressBar = ({ percentage }: Props) => {
  const radius = percentage >= 92.8 ? 13 : 11
  const strokeWidth = 2
  const normalizedRadius = radius - strokeWidth * 0.5
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const isAnimated = percentage >= 92.8

  return (
    <div
      className={`flex items-center justify-center transition-all ${
        isAnimated ? 'scale-125' : ''
      }`}
    >
      <svg
        height="30"
        width="30"
        className={`transition-all ${isAnimated ? 'animate-yellow' : ''}`}
      >
        <circle
          stroke="rgb(61, 61, 61)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx="15"
          cy="15"
        />
        <circle
          stroke={
            percentage === 100
              ? 'rgb(255,0,0)'
              : isAnimated
              ? 'rgb(255, 230, 0)'
              : 'rgb(0, 140, 255)'
          }
          className="transition-all"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx="15"
          cy="15"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease',
          }}
        />
        {percentage >= 92.8 ? (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="10"
            fill={`${percentage === 100 ? 'red' : 'white'}`}
          >
            {280 - percentage * 2.8}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export default CircularProgressBar
