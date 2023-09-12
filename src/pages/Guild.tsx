import React from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import Page from '../components/layout/Page';
import { useQuery } from 'react-query';
import { guildsService } from '../services/guilds.service';
import GuildPresentation from '../components/guild/tabs/GuildPresentation';
import GuildConditions from '../components/guild/tabs/GuildConditions';
import GuildTabs from '../components/guild/GuildTabs';
import GuildHeader from '../components/guild/GuildHeader';

export type Tab = {
  name: string,
  label: string,
  component: React.ReactNode,
};

function Guild(): JSX.Element {
  const { guildId } = useParams();

  const { data: guild } = useQuery(['guilds', guildId], () => {
    if (guildId) {
      return guildsService.getGuildById(guildId);
    }
  });

  const tabs: Tab[] = [
    {
      name: 'general',
      label: 'Général',
      component: <GuildPresentation description={guild?.description} />,
    },
    {
      name: 'conditions',
      label: 'Conditions',
      component: <GuildConditions description={guild?.description} />,
    },
  ];

  return (
    <Page>
      <ScrollRestoration />
      {guild && <GuildHeader guild={guild} />}
      <GuildTabs tabs={tabs} />
    </Page>
  );
}

export default Guild;
