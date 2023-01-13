import { FC } from 'react'
import { RecordContextProvider } from '../../contexts/record.context'
import Record from './Record'

const RecordWrapper: FC = () => {
  return (
    <RecordContextProvider>
      <Record />
    </RecordContextProvider>
  )
}

export default RecordWrapper
