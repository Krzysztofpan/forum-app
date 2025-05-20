import AddPostComponent from '@/components/home/AddPostComponent'
import DisplayPosts from '../../../components/home/DisplayPosts'
import MainContent from './MainContent'

const MainApp = () => {
  return (
    <div className=" border-x-[1px] border-solid max-w-[600px] w-full min-h-[100vh]">
      <DisplayPosts />
      <AddPostComponent type="post" />
      <div className="border-b-[1px] border-b-solid mt-2"></div>
      <MainContent />
    </div>
  )
}

export default MainApp
