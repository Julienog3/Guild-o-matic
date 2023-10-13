import React, { useEffect, useState } from 'react';
import { GuildModalStepProps } from '../GuildModal.intefaces';

const ImageStep = ({
  mode,
  guildPayload,
  handleChange,
}: GuildModalStepProps): JSX.Element => {
  const [selectedBanner, setSelectedBanner] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setSelectedBanner(e.target.files[0]);

    handleChange({
      ...guildPayload,
      illustration: e.target.files[0],
    });
  };

  useEffect(() => {
    if (!selectedBanner) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedBanner);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [guildPayload]);

  return (
    <>
      <p className="text-light-gray text-sm mb-2">Ajouter une illustration</p>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-light-blue border-dashed rounded-lg cursor-pointer bg-main-blue"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {preview ? (
            <img
              className=" w-28 overflow-hidden rounded-lg mb-4"
              src={preview}
            />
          ) : (
            <svg
              className="w-8 h-8 mb-4 text-white dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
          )}

          <p className="mb-2 text-white dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-white">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleBannerChange(e)
          }
          type="file"
          accept=".jpg, .jpeg, .png"
          className="hidden"
        />
      </label>
    </>
  );
};

export default ImageStep;
