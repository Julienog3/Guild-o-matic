import React from 'react';
import { BsCheckLg } from 'react-icons/bs';

const AddingGuildHeader = (): JSX.Element => {
  return (
    <>
      <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
        <div className="absolute z-0 top-0 left-0 w-full h-full">
          <img
            className="absolute h-full object-cover w-full"
            src="/images/bg-landing.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center py-4 border-b border-light-blue mb-4">
        <h2 className="text-2xl  font-semibold text-white">
          Ajouter une guilde
        </h2>
        <button
          type="submit"
          form="adding-form"
          className="bg-accent-blue flex gap-4 items-center rounded-lg p-4 text-base font-raleway text-white"
        >
          <BsCheckLg />
          Publier
        </button>
      </div>
    </>
  );
};

export default AddingGuildHeader;
