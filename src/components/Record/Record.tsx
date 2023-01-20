import { FC, useState } from 'react'
import { useRecordContext } from '../../contexts/record.context'
import Button from '../common/Button'
import Icon from '../common/Icons/Icon'
import RecordControls from './RecordControls'
import UploadRecordingForm from './UploadRecordingForm'

const Record: FC = () => {
  const { canUpload, reset, uploadState } = useRecordContext()
  const [willUpload, setWillUpload] = useState<boolean>(false)

  const showUploadForm = canUpload && willUpload && uploadState === null
  const showSaveButton = canUpload && !willUpload && uploadState === null
  const showSuccess = !canUpload && uploadState === 'success'
  const showError = !canUpload && uploadState === 'error'

  const resetRecording = () => {
    reset()
    setWillUpload(false)
  }

  return (
    <div className="flex flex-col space-y-2 items-center justify-center">
      <RecordControls />
      <div className="w-full h-32 flex items-end ">
        {showUploadForm && <UploadRecordingForm />}
        {showSaveButton && (
          <div className="flex space-x-2 w-full">
            <Button onClick={() => setWillUpload(true)} className="px-8">
              <Icon path="save" size="md" />
            </Button>
            <Button onClick={() => resetRecording()} className="bg-white text-black border border-black px-8">
              <Icon path="trash" size="md" />
            </Button>
          </div>
        )}
        {showSuccess && <div className="text-green-500">Success!</div>}
        {showError && <div className="text-red-600">Error!</div>}
      </div>
    </div>
  )
}

export default Record
