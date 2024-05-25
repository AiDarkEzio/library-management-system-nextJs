"use client";
import React, { useState } from 'react';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface SignUpForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const SignUp: React.FC = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true)
      event.preventDefault();

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }
      const data = await response.json();
      if (data.user === null) {
        toast.error(data.message);
        return;
      }
      console.log(data);
      // const signInResponse = await signIn('credentials', {
      //   redirect: false,
      //   email: formData.email,
      //   password: formData.password,
      // });
      // if (!signInResponse || !signInResponse?.ok || signInResponse?.error) {
      //   console.error('Error:', signInResponse?.error?signInResponse?.error:signInResponse);
      //   router.push('/api/auth/signin');
      //   return;
      // }
      toast.success('User created successfully');
      router.refresh()
      router.push('/api/auth/signin');
      // router.push('/user')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md px-8 py-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-white text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <Input placeholder='Enter your email' label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input placeholder='First Name' label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <Input placeholder='Last Name' label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <button type="submit" disabled={isLoading} className="w-full py-2 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
