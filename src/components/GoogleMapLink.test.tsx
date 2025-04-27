import { render, screen } from '@testing-library/react';
import { GoogleMapLink } from './GoogleMapLink';
import '@testing-library/jest-dom';
import {LonLat} from "@/types";

describe('GoogleMapLink', () => {
    it('renders "NOT AVAILABLE" when coordinates are null', () => {
        render(<GoogleMapLink coordinates={null} />);
        expect(screen.getByText('NOT AVAILABLE')).toBeInTheDocument();
    });

    it('renders a link to the correct Google Maps URL when coordinates are provided', () => {
        const coords: LonLat = [123.456, 78.9];
        render(<GoogleMapLink coordinates={coords} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://www.google.com/maps/@78.9,123.456,1186m');
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('renders the NewWindowIcon inside the link', () => {
        const coords: LonLat = [0, 0];
        render(<GoogleMapLink coordinates={coords} />);

        const link = screen.getByRole('link');
        expect(link.querySelector('svg')).toBeInTheDocument();
    });
});
