import { useState } from 'react'
import Button from './common/Button'

const Header = () => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(!loading)
  }
  return (
    <div className="w-screen h-16 flex justify-end items-center px-2 border-b">
      <Button onClick={onClick} loading={loading}>
        Logout
      </Button>
    </div>
  )
}

export default Header
