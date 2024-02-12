import PeopleCard from "@/components/Shared/PeopleCard"


const AllUsers = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/people.svg" width={36} height={36} alt="people" />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        <div className='flex flex-wrap justify-center gap-9 w-full max-w-5xl'>
          <PeopleCard />
        </div>

      </div>
    </div>
  )
}

export default AllUsers
