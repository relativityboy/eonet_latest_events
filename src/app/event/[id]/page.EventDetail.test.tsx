import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {fetchEvent } from '@/eonet/api';
import { useParams } from 'next/navigation';
import {PageTitleProvider, PageTitle} from '@/components/PageTitle';
import EventDetail from './page';
import '@testing-library/jest-dom';


jest.mock('../../../eonet/api', () => ({
    fetchEvent: jest.fn(),
}));

jest.mock('../../../components/Spinner', () => ({
    Spinner: () => <div data-testid="spinner" />,
}));

jest.mock('../../../components/DataError', () => ({
    DataError: ({ errorMessage }: { errorMessage?: string | null }) => (
        <div data-testid="data-error">{errorMessage || 'NO DATA'}</div>
    ),
}));

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
}));

jest.mock('../../../components/OsmMap', () => ({
    OsmMap: () => <div data-testid="osm-map" />,
}));

jest.mock('../../../components/GoogleMapLink', () => ({
    GoogleMapLink: ({ coordinates }: { coordinates: [number, number] | null }) => (
        <div data-testid="google-map-link">{coordinates ? 'Map Link' : 'No Link'}</div>
    ),
}));



function renderWithProviders() {
    return render(
        <PageTitleProvider>
            <PageTitle/>
            <EventDetail />
        </PageTitleProvider>
    );
}

describe('EventDetail', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: 'abc123' });
    });
    it('shows spinner while loading', async () => {
        (fetchEvent as jest.Mock).mockImplementation(() => new Promise(() => {}));
        renderWithProviders();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('sets page title and renders event details after fetching', async () => {
        (fetchEvent as jest.Mock).mockResolvedValue({
            title: 'Test Event',
            description: 'Event description',
            coordinates: [1, 2],
            categories: [{ id: 'cat1', title: 'Category 1' }],
            sources: [{ id: 'source1', url: 'https://example.com' }],
        });

        renderWithProviders();

        expect(screen.getByTestId('spinner')).toBeInTheDocument(); //just making sure

        await waitFor(() => {
            expect(screen.getByText('Test Event')).toBeInTheDocument();
        });

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

        renderWithProviders();

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

    it('renders DataError NO DATA if fetch returns empty', async () => {
        (fetchEvent as jest.Mock).mockResolvedValue(null);

        renderWithProviders();

        expect(await screen.findByTestId('data-error')).toHaveTextContent('NO DATA');
    });

    it('renders DataError message if fetch fails', async () => {
        (fetchEvent as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        renderWithProviders();

        expect(await screen.findByTestId('data-error')).toHaveTextContent('Failed to fetch');
    });
});
