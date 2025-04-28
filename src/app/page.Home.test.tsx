import { render, screen } from '@testing-library/react';
import { fetchEventList } from '@/eonet/api';
import { PageTitleProvider } from '@/components/PageTitle';
import Home from './page';
import '@testing-library/jest-dom';


jest.mock('../eonet/api', () => ({
    fetchEventList: jest.fn(),
}));

jest.mock('../components/Spinner', () => ({
    Spinner: () => <div data-testid="spinner" />,
}));

jest.mock('../components/DataError', () => ({
    DataError: ({ errorMessage }: { errorMessage?: string | null }) => (
        <div data-testid="data-error">{errorMessage || 'NO DATA'}</div>
    ),
}));

jest.mock('../components/EventList', () => ({
    EventList: ({ eventList }: { eventList: any[] }) => (
        <div data-testid="event-list">{eventList.length} events</div>
    ),
}));


function renderWithProviders() {
    return render(
        <PageTitleProvider>
            <Home />
        </PageTitleProvider>
    );
}

describe('Home', () => {
    it('shows spinner while loading', async () => {
        (fetchEventList as jest.Mock).mockImplementation(() => new Promise(() => {})); // never resolves
        renderWithProviders();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders event list after successful fetch', async () => {
        (fetchEventList as jest.Mock).mockResolvedValue([
            { id: '1', title: 'Event 1' },
            { id: '2', title: 'Event 2' },
        ]);

        renderWithProviders();

        expect(screen.getByTestId('spinner')).toBeInTheDocument(); //just making sure

        expect(await screen.findByTestId('event-list')).toHaveTextContent('2 events');
    });

    it('renders DataError NO DATA if fetch returns empty', async () => {
        (fetchEventList as jest.Mock).mockResolvedValue(null);

        renderWithProviders();

        expect(await screen.findByTestId('data-error')).toHaveTextContent('NO DATA');
    });

    it('renders DataError message if fetch fails', async () => {
        (fetchEventList as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        renderWithProviders();

        expect(await screen.findByTestId('data-error')).toHaveTextContent('Failed to fetch');
    });
});
