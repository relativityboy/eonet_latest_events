import { render, screen } from '@testing-library/react';
import { DataError } from './DataError';
import '@testing-library/jest-dom';

describe('DataError', () => {
    it('renders default "NO DATA" message when no errorMessage is provided', () => {
        render(<DataError />);

        const message = screen.getByText('NO DATA');
        expect(message).toBeInTheDocument();
        expect(message).toHaveClass('font-bold', 'text-4xl', 'opacity-70');
        expect(message).not.toHaveClass('text-red-600');
    });

    it('renders provided errorMessage with red text color', () => {
        const errorText = 'Something went wrong';
        render(<DataError errorMessage={errorText} />);

        const message = screen.getByText(errorText);
        expect(message).toBeInTheDocument();
        expect(message).toHaveClass('text-red-600');
    });
});
