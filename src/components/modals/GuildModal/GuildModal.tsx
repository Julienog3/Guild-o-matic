import Modal from '../../utils/Modal';
import React, { useContext, useEffect, useState } from 'react';
import GeneralStep from './steps/GeneralStep';
import DescriptionStep from './steps/DescriptionStep';
import ImageStep from './steps/ImageStep';
import GuildConfirmationModal from '../GuildConfirmationModal';
import {
  GuildPayloadInterface,
  GuildType,
} from '../../../interfaces/guild.interface';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import usePlayer from '../../../hooks/usePlayer';
import { NotificationEnum } from '../../../interfaces/notification.interface';
import { useMutation } from 'react-query';
import { guildsService } from '../../../services/guilds.service';
import { QueryClient } from '@tanstack/query-core';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { supabase } from '../../../supabaseClient';
import { IoIosArrowForward } from 'react-icons/io';
import { GuildModalMode, GuildModalStep } from './GuildModal.intefaces';

interface GuildModalStepInterface {
  title: string;
  type: GuildModalStep;
  component: React.ReactNode;
}

interface GuildModalProps {
  mode: GuildModalMode;
  guild?: GuildType;
  onClose: () => void;
  onSubmit: (guild?: GuildType) => void;
}

const GuildModal = ({
  mode,
  guild,
  onClose,
  onSubmit,
}: GuildModalProps): JSX.Element => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { notifications, setNotifications } = useContext(NotificationContext);

  const queryClient = new QueryClient();

  const [guildToAdd, setGuildToAdd] = useState<GuildPayloadInterface>(
    guild ?? {
      guildId: '',
      isRecruiting: false,
      description: '',
      discordLink: '',
      categories: [],
      ownerId: '',
    },
  );

  const addingGuild = useMutation({
    mutationFn: guildsService.postGuild,
    onSuccess: async (data) => {
      if (guildToAdd.illustration) {
        await uploadBanner(data.id, guildToAdd.illustration);
      }
      queryClient.invalidateQueries({ queryKey: ['guilds'] });
    },
  });

  const editingGuild = useMutation({
    mutationFn: guildsService.updateGuild,
    onSuccess: async (data) => {
      if (guildToAdd.illustration) {
        await uploadBanner(data.id, guildToAdd.illustration);
      }
      queryClient.invalidateQueries({ queryKey: ['guilds'] });
    },
  });

  useEffect(() => {
    if (!session) {
      return;
    }

    if (!session.user) {
      navigate('/');
    }

    setGuildToAdd({
      ...guildToAdd,
      ownerId: session.user.id,
    });
  }, [session]);

  const steps: GuildModalStepInterface[] = [
    {
      title: 'Informations générales',
      type: GuildModalStep.GENERAL,
      component: (
        <GeneralStep
          mode={mode}
          guildPayload={guildToAdd}
          handleChange={(guild) => setGuildToAdd(guild)}
        />
      ),
    },
    {
      title: "Ajout d'une description",
      type: GuildModalStep.DESCRIPTION,
      component: (
        <DescriptionStep
          mode={mode}
          guildPayload={guildToAdd}
          handleChange={(guild) => setGuildToAdd(guild)}
        />
      ),
    },
    {
      title: "Ajout d'une image",
      type: GuildModalStep.IMAGE,
      component: (
        <ImageStep
          mode={mode}
          guildPayload={guildToAdd}
          handleChange={(guild) => setGuildToAdd(guild)}
        />
      ),
    },
  ];

  const [isConfirmationModalOpened, setIsConfirmationModalOpened] =
    useState<boolean>(false);

  const handleSubmit = async () => {
    const { illustration, ...guildPayload } = guildToAdd;

    if (mode === GuildModalMode.ADDING) {
      addingGuild.mutate(guildPayload);
      navigate('/guilds');
      setNotifications([
        ...notifications,
        {
          type: NotificationEnum.SUCCESS,
          message: 'Votre guilde a été ajouté avec succès !',
        },
      ]);
    }

    if (mode === GuildModalMode.EDITING && guild) {
      editingGuild.mutate({ id: guild?.id, guild: guildPayload });
      setNotifications([
        ...notifications,
        {
          type: NotificationEnum.SUCCESS,
          message: 'Votre guilde a été modifié avec succès !',
        },
      ]);
    }

    onClose();
  };

  const uploadBanner = async (id: string, banner: File) => {
    const { error } = await supabase.storage
      .from('guilds')
      .upload(`${id}/background`, banner, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      setNotifications([
        ...notifications,
        {
          type: NotificationEnum.DANGER,
          message: error.message,
        },
      ]);
    }
  };

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const { title, type, component } = steps[currentStepIndex];

  const nextStep = (): void => {
    if (currentStepIndex >= steps.length - 1) {
      handleSubmit();
      return;
    }

    setCurrentStepIndex((currentStepIndex) => currentStepIndex + 1);
  };

  const previousStep = (): void => {
    if (currentStepIndex <= 0) {
      return;
    }

    setCurrentStepIndex((currentStepIndex) => currentStepIndex - 1);
  };

  return (
    <>
      {/* {isConfirmationModalOpened && (
        <GuildConfirmationModal
          onClose={(): void => setIsConfirmationModalOpened(false)}
          onConfirmation={(): void => {}}
        />
      )} */}
      <Modal
        title={`${
          mode === GuildModalMode.ADDING ? 'Ajouter' : 'Editer'
        } une guilde`}
        onClose={() => onClose()}
      >
        <div className="flex flex-col gap-4">
          <form id="adding-form" className="">
            {component}
          </form>
          <div className="flex gap-4 justify-end">
            {currentStepIndex > 0 && (
              <button
                className="bg-light-blue text-white p-4 rounded-lg text-sm"
                onClick={(): void => previousStep()}
              >
                Précédent
              </button>
            )}
            <button
              className="flex gap-2 bg-accent-blue text-white p-4 rounded-lg text-sm"
              onClick={(): void => nextStep()}
            >
              {currentStepIndex >= steps.length - 1 ? (
                <>Ajouter</>
              ) : (
                <>
                  Suivant <IoIosArrowForward className="text-white text-lg" />
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GuildModal;
