// make a react context using typescript and context props

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Database } from '../types/DatabaseTypes'

interface RecordContext {
  isRecording: boolean
  canUpload: boolean
  uploading: boolean
  startRecording: () => void
  stopRecording: () => void
  uploadBlob: (recordingName: string) => void
}

export const RecordContext = createContext<RecordContext>({
  isRecording: false,
  canUpload: false,
  uploading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startRecording: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stopRecording: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  uploadBlob: () => {},
})

export const RecordContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [canUpload, setCanUpload] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
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
      if (error) console.log('error uploading blob', error)
      else {
        setBlob(null)
        setCanUpload(false)
      }
      setUploading(false)
    }
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
      console.log('data available', e.data)
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
    console.log('BLOB', blob)
    if (blob && blob.size > 0) {
      setCanUpload(true)
    }
  }, [blob])

  return (
    <RecordContext.Provider value={{ isRecording, startRecording, stopRecording, canUpload, uploading, uploadBlob }}>
      {children}
    </RecordContext.Provider>
  )
}

export const useRecordContext = () => useContext(RecordContext)
