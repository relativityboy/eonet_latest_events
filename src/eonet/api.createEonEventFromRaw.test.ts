import {EONEventRaw, EONGeoType} from "@/types";
import {createEonEventFromRaw} from "@/eonet/api";
import {format} from "date-fns/format";

describe('createEonEventFromRaw', () => {
    it('should correctly map category, coordinates, and date when all data is present', () => {
        const raw: EONEventRaw = {
            id: '1',
            title: 'Test Event',
            description: 'Test Description',
            link: 'http://example.com',
            closed: null,
            categories: [{ id: 'cat1', title: 'Test Category' }],
            sources: [{ id: 'source1', url: 'http://source.com' }],
            geometry: [
                {
                    type: EONGeoType.Point,
                    coordinates: [100, 50],
                    date: '2024-04-01T12:00:00Z'
                }
            ]
        };

        const result = createEonEventFromRaw(raw);

        expect(result.categoryName).toBe('Test Category');
        expect(result.coordinates).toEqual([100, 50]);
        expect(result.dateYMD).toBe(format(new Date('2024-04-01T12:00:00Z'), 'yyyy-MM-dd'));
    });

    it('should default to empty categoryName if no categories', () => {
        const raw: EONEventRaw = {
            id: '2',
            title: 'No Category Event',
            description: 'Test Description',
            link: 'http://example.com',
            closed: null,
            categories: [],
            geometry: [],
        };

        const result = createEonEventFromRaw(raw);

        expect(result.categoryName).toBe('');
    });

    it('should default coordinates and dateYMD when no geometry', () => {
        const raw: EONEventRaw = {
            id: '3',
            title: 'No Geometry Event',
            description: 'Test Description',
            link: 'http://example.com',
            closed: null,
            categories: [{ id: 'cat1', title: 'Category' }],
            geometry: [],
        };

        const result = createEonEventFromRaw(raw);

        expect(result.coordinates).toBeNull();
        expect(result.dateYMD).toBe('');
    });

    it('should pick the last, and theoretically latest geometry if multiple are present', () => {
        const raw: EONEventRaw = {
            id: '4',
            title: 'Multiple Geometry Event',
            description: 'Test Description',
            link: 'http://example.com',
            closed: null,
            categories: [{ id: 'cat1', title: 'Category' }],
            geometry: [
                {
                    type: EONGeoType.Point,
                    coordinates: [10, 20],
                    date: '2024-03-01T00:00:00Z'
                },
                {
                    type: EONGeoType.Point,
                    coordinates: [30, 40],
                    date: '2024-04-01T00:00:00Z'
                }
            ]
        };

        const result = createEonEventFromRaw(raw);

        expect(result.coordinates).toEqual([30, 40]);
        expect(result.dateYMD).toBe(format(new Date('2024-04-01T00:00:00Z'), 'yyyy-MM-dd'));

        // This 2nd highlights that our code doesn't care about the actual date
        const raw2: EONEventRaw = {
            id: '4',
            title: 'Multiple Geometry Event',
            description: 'Test Description',
            link: 'http://example.com',
            closed: null,
            categories: [{ id: 'cat1', title: 'Category' }],
            geometry: [
                {
                    type: EONGeoType.Point,
                    coordinates: [30, 40],
                    date: '2024-04-01T00:00:00Z'
                },
                {
                    type: EONGeoType.Point,
                    coordinates: [10, 20],
                    date: '2024-03-01T00:00:00Z'
                }
            ]
        };

        const result2 = createEonEventFromRaw(raw2);

        expect(result2.coordinates).toEqual([10, 20]);
        expect(result2.dateYMD).toBe(format(new Date('2024-03-01T00:00:00Z'), 'yyyy-MM-dd'));
    });
});