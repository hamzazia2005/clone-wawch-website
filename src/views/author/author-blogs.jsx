"use client";

import { BlogCard } from "@/components";
import { FeaturedBlogCard } from ".";

const AuthorBlogs = ({ detail, page_title }) => {
  const blogs = detail || [];
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1, 5);

  return (
    <div className="mx-auto my-3 sm:my-10 w-full">
      <h2 className="text-3xl font-bold text-center font-plus">
        {page_title}{" "}
        <span className="hover:text-secondary">
          {featuredBlog?.author?.title}
        </span>
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 max-w-4xl py-10 mx-auto">
        <div className="w-full max-w-[525px] md:w-[40%]">
          <FeaturedBlogCard blog={featuredBlog} />
        </div>

        <div className="w-full max-w-xl md:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-6 sm:px-[10px] md:px-3 py-[2px] mx-auto justify-items-center">
          {otherBlogs.map((item) => (
            <BlogCard key={item.id} item={item} flag={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorBlogs;
