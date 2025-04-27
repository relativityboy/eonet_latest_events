import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventDetail from './page';
import { fetchEvent } from '@/eonet/api';
import { useParams } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock useParams
jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
}));

// Mock fetchEvent
jest.mock('../../../eonet/api', () => ({
    fetchEvent: jest.fn(),
}));

// Mock OsmMap
jest.mock('../../../components/OsmMap', () => ({
    OsmMap: () => <div data-testid="osm-map" />,
}));

// Mock GoogleMapLink
jest.mock('../../../components/GoogleMapLink', () => ({
    GoogleMapLink: ({ coordinates }: { coordinates: [number, number] | null }) => (
        <div data-testid="google-map-link">{coordinates ? 'Map Link' : 'No Link'}</div>
    ),
}));

describe('EventDetail', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: 'abc123' });
    });

    it('renders event details after fetching', async () => {
        (fetchEvent as jest.Mock).mockResolvedValue({
            title: 'Test Event',
            description: 'Event description',
            coordinates: [1, 2],
            categories: [{ id: 'cat1', title: 'Category 1' }],
            sources: [{ id: 'source1', url: 'https://example.com' }],
        });

        render(<EventDetail />);

        // Wait for fetchEvent to resolve
        expect(await screen.findByText('Test Event')).toBeInTheDocument();

        expect(screen.getByText('Event description')).toBeInTheDocument();
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'source1' })).toHaveAttribute('href', 'https://example.com');
        expect(screen.getByTestId('osm-map')).toBeInTheDocument();
        expect(screen.getByTestId('google-map-link')).toHaveTextContent('Map Link');
    });

    it('toggles raw event JSON', async () => {
        (fetchEvent as jest.Mock).mockResolvedValue({
            title: 'Test Event',
            description: 'Event description',
            coordinates: [1, 2],
            categories: [],
            sources: [],
        });

        render(<EventDetail />);

        const rawButton = await screen.findByText('Raw -');
        expect(rawButton).toBeInTheDocument();

        fireEvent.click(rawButton);

        // JSON should be visible
        await waitFor(() => {
            expect(screen.getByText((content) => content.startsWith('{'))).toBeInTheDocument();
        });

        // Checking my cheap expanded indicator ;p
        expect(screen.getByText('Raw +')).toBeInTheDocument();
    });

    it('renders nothing if no event is fetched', async () => {
        (fetchEvent as jest.Mock).mockResolvedValue(null);

        const { container } = render(<EventDetail/>);

        await waitFor(() => {
            expect(container).toBeEmptyDOMElement();
        });
    });
});
