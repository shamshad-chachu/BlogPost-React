import { useState } from "react";

// const API_BASE_URL = 'http://localhost:8082/api'; // Adjust to your Spring Boot port

const API_BASE_URL = 'https://blogpost-sprintboot.onrender.com/api' ; //remder spring boot url

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};


// Public endpoint: Fetch all blogs with pagination
export const fetchBlogs = async (page = 0, size = 10) => {
  const response = await fetch(`${API_BASE_URL}/blogs?page=${page}&size=${size}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  const data = await response.json();
  // console.log(data);
  return data;
};

// Public endpoint: Fetch a single blog by ID
// This function is updated to send the auth token to the backend,
// which will determine if the current user is the author.
export const fetchBlogById = async (id,token) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}/${token}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return await response.json();
};

// Authentication endpoint: Log in a user
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return await response.json();
};

// Authentication endpoint: Register a new user
export const registerUser = async (email, password, name) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  return await response.json();
};

// Protected endpoint: Create a new blog post
export const createBlog = async (title, content) => {
  const token = localStorage.getItem('token');
  const userResponse = await fetch(`${API_BASE_URL}/auth/user/${token}`)
  const author= await userResponse.json();
  console.log(author);
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, content,author}),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create blog');
  }
  console.log(response);
  return await response.json();
};

// Protected endpoint: Update an existing blog post
export const updateBlog = async (id, title, content,userId) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}/${userId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, content, }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update blog');
  }
  const data = await response.json()
  console.log(data.authorName);
  return data;
};

// Protected endpoint: Delete a blog post
export const deleteBlog = async (id,userId) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete blog');
  }
};