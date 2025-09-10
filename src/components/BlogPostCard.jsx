import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ blog }) => {
  // console.log(blog);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Link to={`/blogs/${blog.id}`} className="block">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition">
          {blog.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500 mt-1">
        by {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-4 text-gray-600 line-clamp-3">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogPostCard;