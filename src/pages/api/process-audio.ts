// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import fs from 'fs/promises'

const tempFileName = 'temp.mp3'

const ProcessAudio = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const start = Date.now()
  try {
    const { fileName, secret } = JSON.parse(req.body)

    if (secret !== process.env.API_SECRET)
      return res.status(401).json({ data: { success: false }, error: 'unauthorized' })
    if (!fileName) return res.status(400).json({ data: { success: false }, error: 'bad_request' })

    const supabase = createServerSupabaseClient({ req, res })

    if (!ffmpegStatic) throw new Error('ffmpeg-static not found')
    ffmpeg.setFfmpegPath(ffmpegStatic)

    // Get the audio file from the request
    const { data, error } = await supabase.storage.from('audio-blobs').createSignedUrl(fileName, 60 * 60 * 24)

    if (error) throw new Error(`Could not get signed url: ${error.message}`)

    // check if there is a local file called blob-1
    if (!data?.signedUrl) throw new Error('No file found')

    // wrap audio conversion in a promise
    const convertAudio = () =>
      new Promise<boolean>((resolve, reject) => {
        const process = ffmpeg().format('mp3').input(data.signedUrl).format('mp3').output(tempFileName)
        process.on('end', () => {
          console.log('conversion ended')
          resolve(true)
        })
        process.on('error', (error) => {
          reject(false)
          throw new Error(`conversion error ${error}`)
        })
        process.run()
      })

    //await audio conversion
    const conversionSuccess = await convertAudio()

    if (!conversionSuccess) throw new Error('Could not convert audio')

    // read the team file and upload it to supabase
    const file = await fs.readFile(tempFileName)
    const { error: uploadError } = await supabase.storage
      .from('mp3s')
      .upload(`${fileName}.mp3`, file, { contentType: 'audio/mpeg3' })
    if (uploadError) throw new Error(`Could not upload file: ${uploadError.message}`)

    //delete the temp file
    await fs.rm(tempFileName)

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
