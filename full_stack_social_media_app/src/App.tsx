import { Toaster } from "@/components/ui/toaster"
import { Route, Routes } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/signinForm';
import SignupForm from './_auth/forms/signupForm';
import { Home, AllUsers, CreatePost, EditPost, Explore, PostDetails, Profile, Saved, UpdateProfile, LikedPost } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post" element={<EditPost/>} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App
