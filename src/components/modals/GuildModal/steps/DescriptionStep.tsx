import React from 'react';
import TextEditor from '../../../utils/TextEditor';
import { GuildModalStepProps } from '../GuildModal.intefaces';

const DescriptionStep = ({
  guildPayload,
  handleChange,
}: GuildModalStepProps): JSX.Element => {
  const handleTextEditorChange = (change: string): void => {
    handleChange({
      ...guildPayload,
      description: change,
    });
  };

  return (
    <>
      <label
        className="relative flex flex-col gap-3 text-light-gray text-sm w-full"
        htmlFor=""
      >
        <p>Ajouter une description</p>
        <TextEditor
          value={guildPayload.description}
          handleChange={handleTextEditorChange}
        />
      </label>
    </>
  );
};

export default DescriptionStep;
