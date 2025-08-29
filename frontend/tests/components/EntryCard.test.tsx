import React from 'react';
import { render } from '@testing-library/react-native';
import { EntryCard } from '@components';
import { Entry } from '@sharedTypes';

// Mock the helper module
jest.mock('@helpers', () => ({
  formatEntryDate: jest.fn(() => 'Aug 29, 2025'),
}));

describe('EntryCard Component', () => {
  const mockEntry: Entry = {
    id: '1',
    babyId: '123',
    date: '2025-08-29T12:34:56Z',
    note: 'This is a test note',
  };

  it('renders correctly with entry props', () => {
    const { getByText } = render(<EntryCard entry={mockEntry} />);

    // check that formatted date is displayed
    expect(getByText('Aug 29, 2025')).toBeTruthy();

    // check that note is displayed
    expect(getByText(mockEntry.note)).toBeTruthy();
  });
});
