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
        className="relative flex flex-col gap-2 text-light-gray w-full"
        htmlFor=""
      >
        <p>Description</p>
        <TextEditor
          value={guildPayload.description}
          handleChange={handleTextEditorChange}
        />
      </label>
    </>
  );
};

export default DescriptionStep;
