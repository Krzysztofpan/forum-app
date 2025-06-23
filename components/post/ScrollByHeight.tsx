'use client'

import React, { useEffect } from 'react'

interface ScrollByHeightProps {
  containerId: string
}

const ScrollByHeight: React.FC<ScrollByHeightProps> = ({ containerId }) => {
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (container) {
      const height = container.offsetHeight
      window.scrollBy({ top: height, behavior: 'auto' })
    }
  }, [containerId])

  return null
}

export default ScrollByHeight
