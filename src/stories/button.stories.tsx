import type { Story } from "@ladle/react";

import { Button } from "@/components/button";

export const Default: Story = () => <Button>My Button</Button>;

export const Primary: Story = () => (
  <Button variant="primary">My Button</Button>
);

export const Secondary: Story = () => (
  <Button variant="secondary">My Button</Button>
);

export const Outline: Story = () => (
  <Button variant="outline">My Button</Button>
);

export const Demo: Story = () => <div className="text-yellow">My Button</div>;

export const World: Story = () => {
  return (
    <>
      <h1 className="text-yellow-500 font-bold">Yellow</h1>
      <h3 className="text-xl md:text-4xl">Tailwind</h3>
    </>
  );
};
