import type { Meta, StoryObj } from '@storybook/react';
import Alert from "./Alert";
import { AlertTypeEnum } from '../../../interfaces/alert.interface';

const meta: Meta<typeof Alert> = {
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  render: () => <Alert type={AlertTypeEnum.DANGER}/>,
};