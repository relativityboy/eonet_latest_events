import { fetchEvents } from '@/eonet/api';
import {EONEventRaw, EONGeoType} from '@/types';
import {format} from "date-fns/format";

describe('fetchEvents', () => {
    const mockFetch = jest.fn();

    beforeEach(() => {
        (globalThis.fetch as unknown as jest.Mock) = mockFetch;
        jest.resetAllMocks();
    });

    it('should fetch, transform, sort and return events correctly', async () => {
        const mockEvents: EONEventRaw[] = [
            {
                id: '1',
                title: 'Event One',
                categories: [{ id: 'c1', title: 'Category 1' }],
                geometry: [
                    {
                        date: '2024-04-01T00:00:00Z',
                        type: EONGeoType.Point,
                        coordinates: [10, 20]
                    }
                ],
                description: 'Desc 1',
                link: 'link1',
                closed: null
            },
            {
                id: '2',
                title: 'Event Two',
                categories: [],
                geometry: [],
                description: 'Desc 2',
                link: 'link2',
                closed: null
            }
        ];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ events: mockEvents }),
        });

        const result = await fetchEvents();

        expect(globalThis.fetch).toHaveBeenCalledWith(
            'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20&days=5'
        );

        expect(result).toHaveLength(2);

        expect(result[0]).toMatchObject({
                id: '1',
                title: 'Event One',
                categoryName: 'Category 1',
                coordinates: [10, 20],
                dateYMD: format(new Date('2024-04-01T00:00:00Z'), 'yyyy-MM-dd'), // we want "local" tz in the client-side transforms
        });

        expect(result[1]).toMatchObject({
                id: '2',
                title: 'Event Two',
                categoryName: '',
                coordinates: null,
                dateYMD: '',
        });
    });

    it('should throw an error if fetch fails', async () => {
        mockFetch.mockResolvedValueOnce({ ok: false });

        await expect(fetchEvents()).rejects.toThrow(
            'Could not fetch events from https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20&days=5'
        );
    });
});
