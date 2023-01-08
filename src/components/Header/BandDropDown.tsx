import { useState } from 'react'
import { useBandContext } from '../../contexts/band.context'
import CaretDownIcon from '../common/Icons.tsx/CaretDownIcon'

const BandDropDown = () => {
  const { band, bands, selectBand } = useBandContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-full flex flex-row pl-4 pr-2 py-2 bg-black text-white rounded-lg font-bold justify-center"
      >
        {band?.name || ''}
      </button>
      <div
        className={`absolute mt-2 border bg-white rounded-lg transition-all duration-200 overflow-hidden origin-top-left w-full ${
          !isOpen ? 'opacity-0 scale-0' : 'shadow-xl delay-100'
        }`}
      >
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
      </div>
    </div>
  )
}

export default BandDropDown
