import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stickman } from '@/components/stickman';

describe('Stickman', () => {
  it('has an accessible identity', () => {
    render(<Stickman />);
    expect(screen.getByRole('img', { name: /balts CASSUX Stickman/i })).toBeInTheDocument();
  });
});
