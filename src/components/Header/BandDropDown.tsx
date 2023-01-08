import { useBandContext } from '../../contexts/band.context'
import { DropDown } from '../common/DropDown'

const BandDropDown = () => {
  const { band, bands, selectBand } = useBandContext()
  return (
    <DropDown buttonChildren={band?.name || ''}>
      <div className="flex flex-col w-full divide-y">
        {bands.map((b) => (
          <button
            onClick={() => selectBand(b)}
            key={b.id}
            className={`text-center p-2 hover:bg-gray-300 ${b.id === band?.id ? 'underline bg-slate-200' : ''}`}
          >
            {b.name}
          </button>
        ))}
      </div>
    </DropDown>
  )
}

export default BandDropDown
