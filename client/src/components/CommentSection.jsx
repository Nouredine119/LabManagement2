import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Textarea, Button } from 'flowbite-react';

export default function CommentSection(articleId) {
  const { currentUser } = useSelector(state => state.user);
// dsfdf
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex justify-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Logged in as:</p>
          <img className='w-5 h-5 object-cover rounded-full' src={currentUser.photoProfile} alt="" />
          <Link to={"/dashboard?tab=profile"} className='lien text-xs text-cyan-600 hover:underline'>
            @{currentUser.Firstname}
          </Link>
          <div />
        </div>
      ) : (
        <div className='text-teal-500 text-sm my-5 flex gap-1'>
          You must be logged in to comment,
          <Link className='text-blue-500 lien hover:underline' to={'/login'}>
            Login
          </Link>
        </div>
      )}
      {currentUser && (
        <form className='border border-teal-500 rounded-md p-3'>
          <Textarea 
            placeholder="add a comment..."
            rows="3"
            maxLength="200" />
          <div className='flex justify-between items-center mt-5 '>
            <p className='text-gray-500 text-xs'>200 characters remaining</p>
            <Button outline gradientDuoTone="purpleToBlue" type='submit'>
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
