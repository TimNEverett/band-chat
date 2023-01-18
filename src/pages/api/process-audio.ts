// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import { createClient } from '@supabase/supabase-js'

const ProcessAudio = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const start = Date.now()
  try {
    const { fileName, secret } = typeof req.body == 'string' ? JSON.parse(req.body) : req.body

    if (secret !== process.env.API_SECRET)
      return res.status(401).json({ data: { success: false }, error: 'unauthorized' })
    if (!fileName) return res.status(400).json({ data: { success: false }, error: 'bad_request' })

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

    if (!ffmpegStatic) throw new Error('ffmpeg-static not found')
    ffmpeg.setFfmpegPath(ffmpegStatic)

    const { data, error } = await supabase.storage.from('audio-blobs').createSignedUrl(fileName, 60 * 60 * 24)

    if (error) throw new Error(`Get Audio blob error: Could not get signed url: ${error}`)

    // check if there is a local file called blob-1
    if (!data?.signedUrl) throw new Error('No file found')
    const outputData: any[] = []
    // wrap audio conversion in a promise
    const convertAudio = () =>
      new Promise<boolean>((resolve, reject) => {
        const process = ffmpeg().format('mp3').input(data.signedUrl).format('mp3').pipe()
        process.on('data', (chunk) => {
          outputData.push(chunk)
        })
        process.on('end', () => {
          resolve(true)
        })
        process.on('error', (error) => {
          reject(false)
          throw new Error(`stream error ${error}`)
        })
      })

    const conversionSuccess = await convertAudio()

    const buffer = Buffer.concat(outputData)

    if (!conversionSuccess) throw new Error('Could not convert audio')

    const { error: uploadError } = await supabase.storage
      .from('mp3s')
      .upload(`${fileName}.mp3`, buffer, { contentType: 'audio/mpeg3' })
    if (uploadError) throw new Error(`Could not upload file: ${uploadError.message}`)

    res.json({ data: { success: true } })
  } catch (error: unknown) {
    console.log(error)
    return res.status(500).json({
      data: { success: false },
      error: 'internal_server_error',
      description: `${error}`,
    })
  } finally {
    console.log(`Request took ${Date.now() - start}ms`)
  }
}

export default ProcessAudio
