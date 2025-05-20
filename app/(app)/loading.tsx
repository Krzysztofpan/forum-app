import Spinner from '@/components/Spinner'

const loading = () => {
  return (
    <div className="flex gap-8 max-w-[600px] lg:max-w-[990px] w-full">
      <div className="border-x-[1px] border-solid max-w-[600px] w-full min-h-[100vh] flex justify-center pt-20">
        <Spinner />
      </div>
    </div>
  )
}

export default loading
