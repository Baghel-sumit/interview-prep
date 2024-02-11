import { Outlet } from 'react-router-dom'
import BottomBar from '@/components/Shared/BottomBar'
import LeftSideBar from '@/components/Shared/LeftSideBar'
import TopBar from '@/components/Shared/TopBar'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar />
      <LeftSideBar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <BottomBar />
    </div>
  )
}

export default RootLayout
