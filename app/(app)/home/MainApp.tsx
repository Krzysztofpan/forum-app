import AddPostComponent from '@/components/home/AddPostComponent'
import DisplayPosts from '../../../components/home/DisplayPosts'
import MainContent from './MainContent'
import { auth } from '@/auth'
import User from '@/models/User'

const MainApp = async () => {
  const session = await auth()

  if (!session || !session.user) return
  const user = await User.findById(session.user.id)
  return (
    <div className=" border-x-[1px] border-solid max-w-[600px]  w-full min-h-[100vh]">
      <DisplayPosts />
      <AddPostComponent type="post" avatar={user.avatar} />
      <div className="border-b-[1px] border-b-solid mt-2"></div>
      <MainContent />
    </div>
  )
}

export default MainApp
