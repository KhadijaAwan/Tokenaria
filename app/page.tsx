"use client";
import { useEffect, useState } from "react";
import axiosInstance from "./lib/axiosInstance";
import { useSession } from "next-auth/react";

interface postProps {
  id: string;
  duration: Int32Array;
  call_type: string;
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const fetchPost = async () => {
    const response = await axiosInstance.get("/calls?offset=10&limit=20");

    if (response) {
      setPosts(response.data.nodes);
      console.log("Post are ", response.data.nodes);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchPost();
    }
  }, [session]);

  return (
    <main className="px-4">
      {session?.user ? (
        <div className="flex justify-center items-center py-10">
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {posts.map((post: postProps, index: any) => (
              <div key={post.id} className="bg-yellow-50 rounded-lg p-5 text-center">
                <h1 className="mb-2 text-gray-900 font-semibold">Call Details</h1>
                <p className="mb-1 text-purple-800">No: {index + 1}</p>
                <p className="mb-1 text-green-800">Type: {post.call_type}</p>
                <p className="mb-1 text-blue-800">Time: {post.duration} seconds</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="flex justify-center items-center h-[80vh] text-purple-900 text-base font-medium">Sign In to view the Call Details</p>
      )}
    </main>

  );
}
