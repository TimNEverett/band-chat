// make a react context using typescript and context props

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Database } from '../types/DatabaseTypes'

type UploadState = 'success' | 'error' | null

interface RecordContext {
  isRecording: boolean
  canUpload: boolean
  uploading: boolean
  uploadState: UploadState
  startRecording: () => void
  stopRecording: () => void
  uploadBlob: (recordingName: string) => void
  reset: () => void
}

export const RecordContext = createContext<RecordContext>({
  isRecording: false,
  canUpload: false,
  uploading: false,
  uploadState: null,
  startRecording: () => null,
  stopRecording: () => null,
  uploadBlob: () => null,
  reset: () => null,
})

export const RecordContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [canUpload, setCanUpload] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadState, setUploadState] = useState<UploadState>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const supabase = useSupabaseClient<Database>()

  const startRecording = () => {
    if (mediaRecorder) {
      // restart recording
      mediaRecorder.start()
      setIsRecording(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setIsRecording(false)
    }
  }

  const uploadBlob = async (recordingName: string) => {
    if (blob) {
      setUploading(true)
      const { error } = await supabase.storage.from('audio-blobs').upload(recordingName, blob)
      if (error) {
        setUploadState('error')
        console.log('error uploading blob', error)
      } else {
        setUploadState('success')
        setBlob(null)
        setCanUpload(false)
      }
      setUploading(false)
    }
  }

  const reset = () => {
    setBlob(null)
    setCanUpload(false)
  }

  useEffect(() => {
    const getMediaRecorder = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMediaRecorder(new MediaRecorder(stream))
    }
    if (!mediaRecorder) getMediaRecorder()
  }, [mediaRecorder])

  useEffect(() => {
    const handleDataAvailable = (e: BlobEvent) => {
      setBlob(e.data)
    }
    if (mediaRecorder) {
      mediaRecorder.addEventListener('dataavailable', handleDataAvailable)
    }
    return () => {
      if (mediaRecorder) {
        mediaRecorder.removeEventListener('dataavailable', handleDataAvailable)
      }
    }
  }, [mediaRecorder])

  useEffect(() => {
    if (blob && blob.size > 0) {
      setCanUpload(true)
    }
  }, [blob])

  return (
    <RecordContext.Provider
      value={{ isRecording, startRecording, stopRecording, canUpload, uploading, uploadBlob, reset, uploadState }}
    >
      {children}
    </RecordContext.Provider>
  )
}

export const useRecordContext = () => useContext(RecordContext)
