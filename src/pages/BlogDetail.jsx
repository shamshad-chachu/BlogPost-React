import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBlogById, deleteBlog } from '../api/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [userId,setUserId] = useState(null) 
  const [deleting,setDeleteing] = useState(false)
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const blogData = await fetchBlogById(id,token); // Pass the token to the API function
        setBlog(blogData);
        console.log(blogData);
        // Assuming the backend returns 'isAuthor' flag
        setIsAuthor(blogData.isAuthor|| false); 
        setUserId(blogData.isAuthor?blogData.author.UserId:null)
      } catch (err) {
        setError('Failed to fetch blog.');
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setDeleteing(true)
      try {
        await deleteBlog(id,userId);
        navigate('/');
      } catch (err) {
        setError('Failed to delete blog.');
      }
      finally{
        setDeleteing(false)
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading blog post...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!blog) return <div className="text-center mt-8">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        by {blog.author.name} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      {isAuthor && (
        <div className="flex space-x-4 mb-6">
          <Link
            to={`/edit/${blog.id}/${blog.author.UserId}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Edit Blog
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            {deleting?"Deleting...":"Delete Blog"}
          </button>
        </div>
      )}
      <div className="prose lg:prose-xl max-w-none">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;