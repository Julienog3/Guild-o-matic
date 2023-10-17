import type { Meta, StoryObj } from '@storybook/react';
import ToasterMessage from "./ToasterMessage";
import { NotificationEnum } from '../../../../interfaces/notification.interface';

const meta: Meta<typeof ToasterMessage> = {
  component: ToasterMessage,
};

export default meta;
type Story = StoryObj<typeof ToasterMessage>;

export const Info: Story = {
  render: () => <ToasterMessage message='Info message.' type={NotificationEnum.INFO} onDelete={() => {}}/>,
};

export const Danger: Story = {
  render: () => <ToasterMessage message='Danger message.' type={NotificationEnum.DANGER} onDelete={() => {}}/>,
};

export const Success: Story = {
  render: () => <ToasterMessage message='Success message.' type={NotificationEnum.SUCCESS} onDelete={() => {}}/>,
};

export const Warning: Story = {
  render: () => <ToasterMessage message='Warning message.' type={NotificationEnum.WARNING} onDelete={() => {}}/>,
};
