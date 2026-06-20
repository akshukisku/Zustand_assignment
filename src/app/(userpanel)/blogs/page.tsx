"use client"
import BlogCard from "@/components/BlogCard";
// import React from 'react'

import { useBlogStore } from "@/store/useBlogStore";
import { colgroup } from "framer-motion/client";
import { useEffect } from "react";

const Blogs = () => {
     const { blogs, getPublishedBlogs, isLoading } = useBlogStore();

  useEffect(() => {
    getPublishedBlogs();
  }, []);

  console.log("Data",blogs)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </div>
  );
}

export default Blogs