import { Button } from '../ui/button'

const PeopleCard = () => {
  return (
    <div className="flex-center flex-col gap-2 p-2 cursor-pointer w-56 py-6 shadow-md border border-dark-2 rounded">
      <img src="/assets/icons/profile-placeholder.svg" alt="person" width={64} height={64} className="rounded-full" />
      <h2 className="h5-bold md:h4-bold max-w-48 text-ellipsis overflow-hidden whitespace-nowrap">Test user name alskdfjasldkfjlaskdfjlkasjdf</h2>
      <p className="text-light-3 mb-2">@david</p>
      <Button className="shad-button_primary whitespace-nowrap" type="button" >Follow</Button>
    </div>
  )
}

export default PeopleCard
