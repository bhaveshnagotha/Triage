import Header from './Header/Header'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {  
  return (
    <>
      <Header />      
        <Outlet />
      <LeftSideBar />
    </>
  )
}

export default Layout;