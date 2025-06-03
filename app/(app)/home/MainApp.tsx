import AddPostComponent from '@/components/home/AddPostComponent'
import DisplayPosts from '../../../components/home/DisplayPosts'
import MainContent from './MainContent'
import { auth } from '@/auth'
import User from '@/models/User'
import { ResponsiveSidebar } from '@/components/ResponsiveSidebar'

const MainApp = async () => {
  const session = await auth()

  if (!session || !session.user) return
  const user = await User.findById(session.user.id)
  return (
    <div className=" min-h-[100vh]">
      <DisplayPosts avatar={user.avatar} />
      <AddPostComponent type="post" avatar={user.avatar} />
      <div className="border-b-[1px] border-b-solid mt-2"></div>
      <MainContent />
    </div>
  )
}

export default MainApp
