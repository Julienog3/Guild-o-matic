import React from 'react'

const Profile = (): JSX.Element => {
  return <div className="cursor-pointer w-fit gap-8 py-2 px-4 border border-light-blue rounded-lg bg-main-blue flex items-center justify-between hover:border-accent-blue transition-colors">
    <span className='text-white font-medium font-raleway'>
      Korloss
    </span>
    <img
      className='rounded-xl w-12 h-12'
      src="https://avatarfiles.alphacoders.com/157/15708.jpg"
      alt="" 
    />
  </div>
}

export default Profile