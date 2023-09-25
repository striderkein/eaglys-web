import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SQL Transformer header', () => {
  render(<App />);
  const headerElement = screen.getByText(/SQL Transformer/i);
  expect(headerElement).toBeInTheDocument();
});