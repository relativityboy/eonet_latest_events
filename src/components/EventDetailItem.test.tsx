import { render, screen, fireEvent } from '@testing-library/react';
import { EventDetailItem } from './EventDetailItem';
import '@testing-library/jest-dom';

describe('EventDetailItem', () => {
    it('renders the name prop', () => {
        render(<EventDetailItem name="Event Name">Details</EventDetailItem>);
        expect(screen.getByText('Event Name')).toBeInTheDocument();
    });

    it('renders the children', () => {
        render(<EventDetailItem name="Event Name">Event Details</EventDetailItem>);
        expect(screen.getByText('Event Details')).toBeInTheDocument();
    });

    it('renders with the default gridCols class if none is provided', () => {
        const { container } = render(<EventDetailItem name="Event Name">Details</EventDetailItem>);
        expect(container.querySelector('li')).toHaveClass('grid-cols-[120px_1fr]');
    });

    it('uses a custom gridCols class if provided', () => {
        const { container } = render(
            <EventDetailItem name="Event Name" gridCols="grid-cols-2">
                Details
            </EventDetailItem>
        );
        expect(container.querySelector('li')).toHaveClass('grid-cols-2');
    });

    it('calls onClick when the name span is clicked', () => {
        const handleClick = jest.fn();
        render(<EventDetailItem name="Clickable Event" onClick={handleClick}>Details</EventDetailItem>);

        fireEvent.click(screen.getByText('Clickable Event'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not have "control" class if onClick is not provided', () => {
        render(<EventDetailItem name="No Click Event">Details</EventDetailItem>);
        const nameSpan = screen.getByText('No Click Event');
        expect(nameSpan).not.toHaveClass('control');
    });

    it('has "control" class if onClick is provided', () => {
        const handleClick = jest.fn();
        render(<EventDetailItem name="Clickable Event" onClick={handleClick}>Details</EventDetailItem>);
        const nameSpan = screen.getByText('Clickable Event');
        expect(nameSpan).toHaveClass('control');
    });
});
