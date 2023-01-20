import { FC, useEffect, useState } from 'react'
import { useRecordContext } from '../../contexts/record.context'
import Counter from '../common/Counter'
import Icon from '../common/Icons/Icon'
import MicIcon from '../common/Icons/MicIcon'
import StopIcon from '../common/Icons/StopIcon'

const RecordControls: FC = () => {
  const { startRecording, stopRecording, isRecording, canUpload } = useRecordContext()
  const [recSec, setRecSec] = useState<number>(0)

  const start = () => {
    setRecSec(0)
    startRecording()
  }

  useEffect(() => {
    if (!canUpload) setRecSec(0)
  }, [canUpload])

  return (
    <div className="flex flex-col space-y-2 items-center justify-center">
      <div className="space-x-2">
        <button
          onClick={isRecording ? stopRecording : start}
          className={`border border-red-600 rounded-full p-4 ${
            isRecording ? 'animate-pulse bg-red-600 text-white' : 'bg-white text-red-600'
          }`}
        >
          {isRecording ? (
            <Icon size="xl">
              <StopIcon />
            </Icon>
          ) : (
            <Icon size="xl">
              <MicIcon />
            </Icon>
          )}
        </button>
      </div>
      <div>
        <Counter isRunning={isRecording} count={recSec} onTick={() => setRecSec((prev) => prev + 1)} />
      </div>
    </div>
  )
}

export default RecordControls
