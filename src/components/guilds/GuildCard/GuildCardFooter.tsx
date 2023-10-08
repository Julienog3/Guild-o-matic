import React from 'react';
import { ProfileType } from '../../../interfaces/profile.interface';
import { useQuery } from 'react-query';
import { profilesService } from '../../../services/profiles.service';

interface GuildCardFooterProps {
  guildOwnerProfile: ProfileType;
}

const GuildCardFooter = ({
  guildOwnerProfile,
}: GuildCardFooterProps): JSX.Element => {
  const { data: guildOwnerProfileAvatarUrl } = useQuery({
    queryKey: ['guildOwnerProfileAvatar', guildOwnerProfile.userId],
    queryFn: () => profilesService.getUserAvatar(guildOwnerProfile.userId),
    enabled: !!guildOwnerProfile,
  });

  return (
    <div className="p-4 flex justify-between">
      <div className="flex gap-4 items-center">
        {guildOwnerProfileAvatarUrl ? (
          <img
            className="rounded-xl w-10 h-10 object-cover"
            src={guildOwnerProfileAvatarUrl}
            alt={`Avatar of ${guildOwnerProfile?.username}`}
          />
        ) : (
          <div className="rounded-xl w-10 h-10 bg-main-blue" />
        )}
        <div className="flex flex-col">
          <p className="text-light-gray text-sm">Géré par</p>
          <span className="text-white font-semibold text-sm">
            {guildOwnerProfile?.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuildCardFooter;
