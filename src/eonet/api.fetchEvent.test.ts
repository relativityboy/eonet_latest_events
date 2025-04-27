import { fetchEvent } from '@/eonet/api';
import { EONEventRaw, EONGeoType } from '@/types';
import { format } from 'date-fns/format';

describe('fetchEvent', () => {
    const mockFetch = jest.fn();

    beforeEach(() => {
        (globalThis.fetch as unknown as jest.Mock) = mockFetch;
        jest.resetAllMocks();
    });

    it('should fetch and transform a single event correctly', async () => {
        const eventId = '12345';
        const mockEvent: EONEventRaw = {
            id: eventId,
            title: 'Mock Event',
            categories: [{ id: 'cat1', title: 'Fire' }],
            geometry: [
                {
                    date: '2025-04-25T12:00:00Z',
                    type: EONGeoType.Point,
                    coordinates: [34.05, -118.25],
                }
            ],
            description: 'test event description',
            link: 'https://example.com/event',
            closed: null,
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockEvent,
        });

        const result = await fetchEvent(eventId);

        expect(globalThis.fetch).toHaveBeenCalledWith(
            `https://eonet.gsfc.nasa.gov/api/v3/events/${eventId}`
        );

        expect(result).toMatchObject({
            id: eventId,
            title: 'Mock Event',
            categoryName: 'Fire',
            coordinates: [34.05, -118.25],
            dateYMD: format(new Date('2025-04-25T12:00:00Z'), 'yyyy-MM-dd'),
        });
    });

    it('should throw an error if fetch fails', async () => {
        const eventId = '54321';

        mockFetch.mockResolvedValueOnce({ ok: false });

        await expect(fetchEvent(eventId)).rejects.toThrow(
            `Could not fetch event ${eventId}`
        );
    });
});
