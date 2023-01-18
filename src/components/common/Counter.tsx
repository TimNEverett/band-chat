import { FC, useEffect } from 'react'
import { formatTime } from '../../utils/formatTime'

interface CounterProps {
  className?: string | undefined
  count: number
  isRunning?: boolean
  onTick: () => void
}

// example usage:
// <Counter isRunning={isRecording} count={seconds} onTick={() => setSeconds((prev) => prev + 1)} />

const Counter: FC<CounterProps> = ({ className, count, isRunning, onTick }) => {
  useEffect(() => {
    if (!isRunning) return

    const interval = window.setInterval(onTick, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  return <div className={` ${className}`}>{formatTime(count)}</div>
}

export default Counter
