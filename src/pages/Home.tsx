import React from 'react';
import Page from '../components/layout/Page';
import GuildCards from '../components/guilds/GuildCards';
import { guildsService } from '../services/guilds.service';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function Home() {
  const { data } = useQuery('guilds', guildsService.getGuilds);

  return (
    <Page>
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
          <div className="flex flex-col z-10 self-end">
            <p className="text-white text-4xl font-semibold mb-2">
              Guild-o-matic
            </p>
            <p className="text-light-gray">
              L&apos;application pour trouver votre futur guilde Guild Wars 2
            </p>
          </div>
          <div className="absolute z-0 top-0 left-0 w-full h-full guild-card__image">
            <img src="/images/bg-landing.jpg" alt="" />
            {/* <video
              className="absolute h-full object-cover w-full"
              src="/videos/home-bg.mp4"
              autoPlay
              muted
            /> */}
          </div>
        </div>
        <div className="w-full flex items-center gap-4 border-b border-light-blue pb-4 my-8">
          <h2 className="text-2xl font-semibold text-white">
            Les guildes récentes
          </h2>
          <Link to="/guilds">
            <span className="text-accent-blue text-sm">
              Voir toutes les guildes
            </span>
          </Link>
        </div>
        {data?.length ? (
          <GuildCards guilds={data} singleRow />
        ) : (
          <div>There is nothing</div>
        )}
      </div>
    </Page>
  );
}

export default Home;
