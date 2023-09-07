import React from 'react';
import { GuildModalStepProps } from '../AddingGuildModal';
import TextEditor from '../../../utils/TextEditor';

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
        <TextEditor handleChange={handleTextEditorChange} />
      </label>
    </>
  );
};

export default DescriptionStep;
