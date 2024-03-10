import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, Button, Alert, Modal } from 'flowbite-react';
import { app } from '../../firebase';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart, updateSuccess, updateFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,logoutSuccess
} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser ,error,loading} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [FormData, setFormData] = useState({});
  const dispatch = useDispatch();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }

  }
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError('Could not upload image');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...FormData, photoProfile: downloadURL })
          setImageFileUploading(false)
        }
        );
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(FormData).length === 0) {
      setUpdateUserError('No changes Made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Waiting for image')
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FormData),
      }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message)
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile update successfully")
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(err.message)
    }
  }

  const handleDeleteUser = async() => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`delete/${currentUser._id}`,{
          method: 'DELETE',
      } );
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }else{
        dispatch(deleteUserSuccess(data));
      }

    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }

  }
const handleLogout = async () => {
  try {
    const res = await fetch('/logout',{
      method: 'POST',
    });
    const data = await res.json();
    if(!res.ok){
      console.log(data.message);
    }else{
      dispatch(logoutSuccess());
    }
  }catch (err) {
      console.log(err.message)
  }

}
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl '>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleImageChange} hidden ref={filePickerRef} />
        <div className=' relative w-24 h-24 self-center cursor-pointer shadow-md 
        overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
              strokeWidth={5} styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                },
                path: {
                  stroke: `rgb(62,152,199,${imageFileUploadProgress / 100})`
                }

              }} />
          )}
          <img
            src={imageFileUrl || currentUser.photoProfile}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
            ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
          />




        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError} </Alert>}
        <TextInput
          type='text'
          name='Firstname'
          placeholder='Firstname'
          defaultValue={currentUser.Firstname}
          onChange={handleChange}
        />
        <TextInput
          type='text'
          name='Lastname'
          placeholder='Lastname'
          defaultValue={currentUser.Lastname}
          onChange={handleChange}
        />
        <TextInput
          type='text'
          name='affiliation'
          placeholder='affiliation'
          defaultValue={currentUser.affiliation}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          name='email'
          placeholder='name@exemple.com'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput type='password' name='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline 
        disabled={loading || imageFileUploading}>
          {loading ? 'Loading...': 'Update'}
        </Button>
        {
          currentUser.isAdmin && (
          <Link to={'create-article'}>
            <Button type='button' 
            gradientDuoTone='purpleToPink'
            className='w-full'
            >Create Article</Button>
            </Link>
          )
        }
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => { setShowModal(true) }} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleLogout} className='cursor-pointer'>Log Out</span>
      </div>
      {updateUserSuccess && (<Alert color="success" className='mt-2'>{updateUserSuccess}</Alert>)}
      {updateUserError && (<Alert color="failure" className='mt-2'>{updateUserError}</Alert>)}
      {error && (<Alert color="failure" className='mt-2'>{error}</Alert>)}

      <Modal
        show={showModal}
        onClose={() => { setShowModal(false) }}
        popup
        size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
