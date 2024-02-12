import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queryAndMutations';
import { useDebounce } from '@/hooks/useDebouce';
import SearchResult from '@/components/Shared/SearchResult';
import GridPostList from '@/components/Shared/GridPostList';
import Loader from '@/components/Shared/Loader';
import { useInView } from 'react-intersection-observer';

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);

  useEffect(()=> {
    if (inView && !searchValue) fetchNextPage();
  },[inView]);

  if (!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }
  
  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages.every((item)=> item?.documents.length === 0);

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src="/assets/icons/search.svg" alt="search" width={24} height={24} />
          <Input type="text" placeholder='Search' value={searchValue} className='explore-search' onChange={(e)=> setSearchValue(e.target.value)} />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h2 className='body-bold md:h3-bold'>Popular Today</h2>

        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={20} height={20} />
        </div>
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResult isSearchFetching={isSearchFetching} searchedPosts={searchedPosts} />
        ) : shouldShowPosts ? (
          <p>End of posts</p>
        ) : posts.pages.map((item, index)=> (
          <GridPostList key={`page-${index}`} posts={item?.documents} />
        ))}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore
