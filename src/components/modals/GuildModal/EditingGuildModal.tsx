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

enum EditingGuildModalStepEnum {
  GENERAL = 'general',
  DESCRIPTION = 'description',
  IMAGE = 'image',
}

export interface GuildModalStepProps {
  guildPayload: GuildPayloadInterface;
  handleChange: (guild: GuildPayloadInterface) => void;
}

interface EditingGuildModalStepInterface {
  title: string;
  type: EditingGuildModalStepEnum;
  component: React.ReactNode;
}

interface EditingGuildModalProps {
  guild: GuildType;
  onClose: () => void;
  onSubmit: (guild: GuildType) => void;
}

const EditingGuildModal = ({
  guild,
  onClose,
  onSubmit,
}: EditingGuildModalProps): JSX.Element => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { notifications, setNotifications } = useContext(NotificationContext);

  const queryClient = new QueryClient();

  const [guildToEdit, setGuildToEdit] = useState<GuildPayloadInterface>(guild);

  const addGuild = useMutation({
    mutationFn: guildsService.postGuild,
    onSuccess: async (data) => {
      if (guildToEdit.illustration) {
        await uploadBanner(data.id, guildToEdit.illustration);
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

    setGuildToEdit({
      ...guildToEdit,
      ownerId: session.user.id,
    });
  }, [session]);

  const steps: EditingGuildModalStepInterface[] = [
    {
      title: 'Informations générales',
      type: EditingGuildModalStepEnum.GENERAL,
      component: (
        <GeneralStep
          guildPayload={guildToEdit}
          handleChange={(guild) => setGuildToEdit(guild)}
        />
      ),
    },
    {
      title: "Ajout d'une description",
      type: EditingGuildModalStepEnum.DESCRIPTION,
      component: (
        <DescriptionStep
          guildPayload={guildToEdit}
          handleChange={(guild) => setGuildToEdit(guild)}
        />
      ),
    },
    {
      title: "Ajout d'une image",
      type: EditingGuildModalStepEnum.IMAGE,
      component: (
        <ImageStep
          guildPayload={guildToEdit}
          handleChange={(guild) => setGuildToEdit(guild)}
        />
      ),
    },
  ];

  const [isConfirmationModalOpened, setIsConfirmationModalOpened] =
    useState<boolean>(false);

  const handleSubmit = async () => {
    const { illustration, ...guildPayload } = guildToEdit;
    addGuild.mutate(guildPayload);
    navigate('/guilds');
    onClose();
    setNotifications([
      ...notifications,
      {
        type: NotificationEnum.SUCCESS,
        message: 'Votre guilde a été ajouté avec succès !',
      },
    ]);
    // setIsConfirmationModalOpened(false);

    // setIsConfirmationModalOpened(true);
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
      <Modal title="Modifier une guilde" onClose={() => onClose()}>
        <div className="flex flex-col gap-4">
          {/* <form id="editing-form" className="">
            {component}
          </form> */}
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

export default EditingGuildModal;
