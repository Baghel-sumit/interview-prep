import GridPostList from "@/components/Shared/GridPostList";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { savedPageLinks } from "@/constants"
import { useGetCurrentUser, useGetSavedPosts } from "@/lib/react-query/queryAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Saved = () => {
  const { ref, inView } = useInView();
  const [selectedLink, setSelectedLink] = useState<string>(savedPageLinks[0].slug);
  const { data: user } = useGetCurrentUser();
  const savedPostIds = user?.save?.reduce((acc, item)=> {
    if (item.post.$id) acc.push(item.post.$id);
    return acc;
  }, []);
  const { data: savedPosts, fetchNextPage, hasNextPage } = useGetSavedPosts(savedPostIds);

  useEffect(()=> {
    if (hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/bookmark.svg" width={36} height={36} alt="people" className="invert-white" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
        <div className="max-w-xs xs:max-w-5xl flex-start gap-3 justify-start w-full overflow-auto custom-scrollbar">
          {savedPageLinks.map((link)=> (
            <Button 
              key={link.slug} 
              className={`
                flex-center gap-2 px-10 py-4 border
                ${selectedLink === link.slug ? 'bg-dark-2 border-dark' : 'bg-dark border-dark-2'}
              `} 
              onClick={()=> setSelectedLink(link.slug)} 
            >
              <img src={link.imageURL} alt={link.slug} />
              <p className="h5-bold md:h4-bold">{link.label}</p>
            </Button>
          ))}
        </div>
        <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
          {!savedPosts ? (
            <Loader />
          ) : savedPosts.pages.map((item, index)=> (
            <GridPostList key={`page-${index}`} posts={item?.documents} showStats={false} />
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

export default Saved
