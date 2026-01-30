import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({priority, ...props}: {priority: boolean}) => <img {...props} loading={priority ? 'eager' : 'lazy'} />,
}));
