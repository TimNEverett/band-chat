import { FC, useState } from 'react'
import { useRecordContext } from '../../contexts/record.context'
import Button from '../common/Button'
import Counter from '../common/Counter'
import Input from '../common/Input'

const Record: FC = () => {
  const { startRecording, stopRecording, isRecording, canUpload, uploadBlob } = useRecordContext()
  const [recordingName, setRecordingName] = useState<string>('')
  const [recSec, setRecSec] = useState<number>(0)

  const convertAudio = async () => {
    const resp = await fetch('/api/process-audio', {
      method: 'POST',
      body: JSON.stringify({ secret: 'shhhhhhhh', fileName: recordingName }),
    })
    console.log(resp)
  }

  const start = () => {
    startRecording()
    setRecSec(0)
  }

  return (
    <div className="flex flex-col space-y-2 items-center justify-center">
      <Button onClick={start}>start</Button>
      <Button onClick={stopRecording}>stop</Button>
      <div
        className={`w-12 h-12 rounded-full  ${
          isRecording ? 'bg-red-600 rounded-full animate-pulse' : 'bg-white border border-red-600'
        }`}
      ></div>
      <Counter isRunning={isRecording} count={recSec} onTick={() => setRecSec((prev) => prev + 1)} />
      <Input
        value={recordingName}
        onChange={(e) => setRecordingName(e.target.value)}
        // disabled={!canUpload}
        placeholder="name the recording"
      />
      <Button onClick={() => uploadBlob(recordingName)} disabled={!canUpload || recordingName.length < 0}>
        upload
      </Button>
      <Button onClick={convertAudio}>convertAudio</Button>
    </div>
  )
}

export default Record
