import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogById, updateBlog } from '../api/api';

const EditBlog = () => {
  const { id,userId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving,setIsSaving] = useState(false)
  const [error, setError] = useState(null);

  const {UserId} = useParams();

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const token = localStorage.getItem('token');
        const blogData = await fetchBlogById(id,token);
        setTitle(blogData.title);
        setContent(blogData.content);
      } catch (err) {
        setError('Failed to load blog data for editing.');
      } finally {
        setLoading(false);
      }
    };
    getBlogData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true)
    try {
      await updateBlog(id, title, content,userId);
      navigate(`/blogs/${id}`);
    } catch (err) {
      setError(err.message);
    }finally{
      setLoading(false)
    }
  };

  if (loading) return <div className="text-center mt-8">Loading blog data...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSaving?"Updating....":"Save Changes"}
        </button>
      </form>
      {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default EditBlog;