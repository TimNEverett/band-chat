import BandDropDown from '../Header/BandDropDown'
import SignoutButton from '../Header/SignoutButton'

const Header = () => {
  return (
    <div className="w-screen h-16 flex items-center justify-between px-2 border-b">
      <div className="w-1/3"></div>
      <div className="w-1/3 flex justify-center">
        <BandDropDown />
      </div>
      <div className="w-1/3 flex justify-end">
        <SignoutButton />
      </div>
    </div>
  )
}

export default Header
