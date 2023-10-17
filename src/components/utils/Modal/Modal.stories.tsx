import type { Meta, StoryObj } from '@storybook/react';
import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  render: () => <Modal title='Modal' onClose={() => {}}><p className='text-white'>Je suis une modal</p></Modal>,
};
