import React from 'react';
import Link from 'next/link'
import { getServerSession } from 'next-auth';
import { UserSignOutButton } from '@/components/buttons';

const Home = async () => {
  const session = await getServerSession();
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your E-Library</h1>
      <p className="text-lg mb-8 text-center">
        Explore a vast collection of eBooks, audiobooks, and other digital resources.
      </p>
      <div className="flex justify-center mb-8">
        {session?.user ? (<>
          {/* <UserSignOutButton /> */}
          <Link href="/api/auth/signout" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-5">Sign Out</Link>
          <Link href="/user" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mr-5">Dashboard</Link>
        </>
        ) : (
        <>
          <Link href="/api/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign In</Link>
          <Link href="/sign-up" className="bg-gray-200 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full ml-4">Sign Up</Link>
        </>
        )}
      </div>
    </div>
  );
};

export default Home;
