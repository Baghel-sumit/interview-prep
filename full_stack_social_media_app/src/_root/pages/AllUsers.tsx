import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/Shared/Loader";
import PeopleCard from "@/components/Shared/PeopleCard";
import { useGetUsers } from "@/lib/react-query/queryAndMutations";


const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: peoples, fetchNextPage, hasNextPage } = useGetUsers();
  
  useEffect(()=> {
    if(inView) fetchNextPage();
  }, [inView])

  if (!peoples) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/people.svg" width={36} height={36} alt="people" className="invert-white" />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        <div className='flex flex-wrap justify-center gap-9 w-full max-w-5xl'>
          {peoples.pages.map((item, index)=> (
            <PeopleCard key={`person-${index}`} persons={item?.documents} />
          ))}
        </div>

      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default AllUsers
