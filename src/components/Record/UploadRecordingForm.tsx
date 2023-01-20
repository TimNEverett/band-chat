import { FC, useState } from 'react'
import { useRecordContext } from '../../contexts/record.context'
import Button from '../common/Button'
import Icon from '../common/Icons/Icon'
import UploadIcon from '../common/Icons/UploadIcon'
import Input from '../common/Input'

const UploadRecordingForm: FC = () => {
  const { canUpload, uploadBlob, uploading } = useRecordContext()
  const [recordingName, setRecordingName] = useState<string>('')

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!canUpload || !recordingName) return
    uploadBlob(recordingName)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-2">
      <Input
        value={recordingName}
        onChange={(e) => setRecordingName(e.target.value)}
        disabled={!canUpload}
        placeholder="name the recording"
        className="border-black"
      />
      <Button
        type="submit"
        disabled={!canUpload || recordingName.length < 1}
        className="flex justify-center"
        loading={uploading}
      >
        <Icon size="xl">
          <UploadIcon />
        </Icon>
      </Button>
    </form>
  )
}

export default UploadRecordingForm
