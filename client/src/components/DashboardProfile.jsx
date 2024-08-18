/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../Firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashboardProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const [imageFileProgress, setImageFileProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFileUploadError(null);
            if (file.size > 2 * 1024 * 1024) { 
                setImageFileUploadError('Image should be less than 2MB');
                return;
            }
            setImageFile(file);
            setImageFileURL(URL.createObjectURL(file));
        }
    };
    useEffect(() => {
        if (imageFile) {
            uplaodImage();
        }
    }, [imageFile]);

    const uplaodImage = async () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploaadTask = uploadBytesResumable(storageRef, imageFile);
        uploaadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileProgress(progress);
            },
            (error) => {
                setImageFileUploadError('Failed to upload image');
                setImageFileUploadError(null);
                setImageFile(null);
                setImageFileURL(null);
            },
            () => {
                getDownloadURL(uploaadTask.snapshot.ref).then((downloadURL) => {
                    setImageFile(downloadURL);
                    setImageFileURL(downloadURL); 
                setImageFileProgress(null);
                });
                
            }
        )
    }
    return (
        <div className='w-full max-w-lg p-3 mx-auto'>
            <h1 className='font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-2'>
                <input
                    type="file"
                    accept='image/*'
                    onChange={handleProfilePic}
                    ref={filePickerRef}
                    hidden
                />
                <div
                    className='relative self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer'
                    onClick={() => filePickerRef.current.click()}
                >
                    {imageFileProgress !== null && 
                    (<CircularProgressbar value={imageFileProgress || 0} text={`${imageFileProgress}%`}
                     strokeWidth={3}
                     styles={
                        {
                            root: {
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: "0",
                                left: "0"
                            },
                            
                            path: {
                                stroke: `rgba(250, 100, 85, ${imageFileProgress / 100})`,
                            },
                        }
                     }
                     
                     />)}
                    <img
                        src={imageFileURL || currentUser.profilePic}
                        alt="userPic"
                        className={`object-cover w-32 h-32 border-4 rounded-full dark:border-orange-600 border-sky-500 ${imageFileProgress && imageFileProgress < 100 && 'opacity-70'}`}
                    />
                </div>
                {imageFileUploadError && (
                    <Alert color='failure'>{imageFileUploadError}</Alert>
                )}
                <Label className='mt-3 text-sm'>Full Name</Label>
                <TextInput
                    type='text'
                    id='name'
                    placeholder='Full Name'
                    className='input'
                    value={currentUser.fullName || ""}
                />
                <Label className='mt-3 text-sm'>Username</Label>
                <TextInput
                    type='text'
                    id='username'
                    placeholder='Username'
                    className='input'
                    value={currentUser.username || ""}
                />
                <Label className='mt-3 text-sm'>Email</Label>
                <TextInput
                    type='email'
                    id='email'
                    placeholder='Email'
                    className='input'
                    value={currentUser.email || ""}
                />
                <Label className='mt-3 text-sm'>Password</Label>
                <TextInput
                    type='password'
                    id='password'
                    placeholder='Password'
                    className='input'
                    value={"***********"}
                />
                <Button
                    className='text-white bg-gradient-to-l from-purple-500 to-blue-500 via-orange-500'
                    type='submit'
                >
                    Update
                </Button>
            </form>
            <div className='flex justify-between mt-4 mb-10 text-red-600'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}

export default DashboardProfile;
