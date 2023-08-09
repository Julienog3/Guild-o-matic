import React, { useEffect, useState } from 'react';
import { ProfileType } from '../interfaces/profile.interface';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface ProfileProps {
  profile: ProfileType;
}

const Profile = ({ profile }: ProfileProps): JSX.Element => {
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>();

  useEffect(() => {
    const getAvatar = async () => {
      const { data, error } = await supabase.storage
        .from('users')
        .createSignedUrl(`${profile.userId}/avatar`, 3600);

      if (error) {
        console.error(error);
        return;
      }

      setUserAvatarUrl(data.signedUrl);
    };

    getAvatar();
  }, []);

  return (
    <Link to="/profile">
      <div className="cursor-pointer w-fit gap-8 py-2 px-4 border border-light-blue rounded-lg bg-main-blue flex items-center justify-between hover:border-accent-blue transition-colors">
        <span className="text-white font-medium font-raleway">
          {profile.username}
        </span>
        <img
          className="rounded-xl w-12 h-12 object-cover"
          src={userAvatarUrl}
          alt=""
        />
      </div>
    </Link>
  );
};

export default Profile;
