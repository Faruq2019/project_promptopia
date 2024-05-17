"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick, handleUserProfile }) => {
  return(
    <div className='mt-16 prompt_layout'>
      {
        data.map(post => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleUserProfile={handleUserProfile}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const router = useRouter();
  const {data: session} = useSession();

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  const handleTagClick = async (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

  const handleUserProfile = async (post) => {
    post.creator._id === session?.user.id ? router.push('/profile') : router.push(`/profile/${post.creator._id}?username=${post.creator.username}`)
  }

  const fetchPost = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPost();
  }, []);


  return (
    <section className='feed'>
      {/* Serach area */}
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {/* Serach area */}

      {/* Prompt List  */}
      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleUserProfile={handleUserProfile}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} handleUserProfile={handleUserProfile} />
      )}
      {/* Prompt List  */}
    </section>
  )
}

export default Feed