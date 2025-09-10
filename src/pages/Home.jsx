import React, { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import {fetchBlogs} from '../api/api';
import LoadingCards from '../components/LoadingCards';


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  // const [isloading,setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('success'); // 'idle', 'loading', 'success', 'error'

  useEffect(() => {
    const getBlogs = async () => {
      setStatus('loading');
      try {
        const data = await fetchBlogs(page);
        // console.log(data);
        setBlogs(data.content);
        setTotalPages(data.totalPages);
        setStatus('success');
      } catch (err) {
        console.log(err);
        setStatus('error');
      }
    };
    getBlogs();
  }, [page]);

  // if(isloading){
  //   return <LoadingCards/>
  // }

  if (status === 'loading') {
    return <LoadingCards/>;
  }

  if (status === 'error') {
    return <div className="text-center text-red-600 text-lg mt-12">Failed to load blogs. Please try again.</div>;
  }

  if (blogs.length === 0 && status === 'success') {
    return <div className="text-center text-gray-500 text-lg mt-12">No blogs found.</div>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Latest Blog Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <BlogPostCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-12">
        <button
          onClick={() => setPage(prev => prev - 1)}
          disabled={page === 0}
          className="px-6 py-2 border rounded-full text-indigo-600 border-indigo-600 hover:bg-indigo-50 disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="text-lg font-medium text-gray-700">Page {page + 1} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={page + 1 >= totalPages}
          className="px-6 py-2 border rounded-full text-indigo-600 border-indigo-600 hover:bg-indigo-50 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;