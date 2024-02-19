import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react text', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn text 1/i);
  expect(linkElement).toBeInTheDocument();
});
