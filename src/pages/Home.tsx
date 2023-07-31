import React from 'react';
import Page from '../components/layout/Page';
import LinkedButton from '../components/utils/LinkedButton';
import GuildFilter from '../components/guilds/GuildFilter';
import GuildCards from '../components/guilds/GuildCards';
import { guildsService } from '../services/guilds.service';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function Home() {
  const { data } = useQuery('guilds', guildsService.getGuilds);

  return (
    <Page>
      <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
        <div className="absolute z-0 top-0 left-0 w-full h-full ">
          <img
            className="absolute h-full object-cover w-full"
            src="/images/bg-landing.jpg"
            alt=""
          />
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
    </Page>
  );
}

export default Home;
