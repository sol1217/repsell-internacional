"use client";
import { Suspense } from "react";

import EditBlogs from "@/components/pages/Blogs/EditBlog/EditBlog";

const EditBlogsPage = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <EditBlogs/>
      </Suspense>
    </>
  );
};

export default EditBlogsPage;
