import { Models } from 'appwrite'
import { Button } from '../ui/button'

const PeopleCard = ({ persons }: { persons?: Models.Document[] }) => {

  return (
    <ul className='grid-container'>
      {persons?.map((person)=> (
      <div className="flex-center flex-col gap-2 cursor-pointer w-56 bg-transparent rounded-3xl border border-dark-2 p-5">
        <img 
          src={person?.imageUrl || "/assets/icons/profile-placeholder.svg"} 
          alt="person" width={64} height={64} 
          className="rounded-full" 
        />
        <h2 className="h5-bold md:h4-bold max-w-44 text-ellipsis overflow-hidden whitespace-nowrap">{person?.name}</h2>
        <p className="text-light-3 mb-2">@{person?.username}</p>
        <Button className="shad-button_primary whitespace-nowrap" type="button" >Follow</Button>
      </div>
      ))}
    </ul>
  )
}

export default PeopleCard
