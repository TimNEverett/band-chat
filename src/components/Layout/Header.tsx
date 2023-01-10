import BandDropDown from '../Header/BandDropDown'
import SignoutButton from '../Header/SignoutButton'
import RecordModal from '../Record/RecordModal'

const Header = () => {
  return (
    <div className="w-full h-full flex items-center justify-between px-2 border-b bg-black">
      <div className="w-1/4">
        <RecordModal />
      </div>
      <div className="w-1/2 flex justify-center">
        <BandDropDown />
      </div>
      <div className="w-1/4 flex justify-end">
        <SignoutButton />
      </div>
    </div>
  )
}

export default Header
