import SearchInputWithTanStackQuery from '@/components/SearchInputWithTanstack'
export const metadata = {
  title: 'Explore / Cube',
  description:
    'Explore a wide range of valuable content with our powerful search tool. Quickly find articles, tutorials, guides, and resources tailored to your interests. Start your content discovery journey now and uncover the information you need!',
}
const ExplorePage = () => {
  return (
    <div>
      <div className="mx-4 max-w-[90%] my-1">
        <SearchInputWithTanStackQuery />
      </div>
    </div>
  )
}

export default ExplorePage
