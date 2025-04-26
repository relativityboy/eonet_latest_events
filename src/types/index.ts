export enum EONGeoType {
    Point="Point",
}

export type EONCategory = {
    id: string;
    title: string;
}

type LonLat = [lon: number, lat: number];

export type EONGeo = {
    coordinates: LonLat;
    date: string;
    magnitudeUnit: string;
    magnitudeValue: number;
    type: EONGeoType.Point; // Declaring as we only support Point
}

export type EONEventRaw = {
    id: string;
    title: string;
    categories: EONCategory[];
    closed: boolean | null;
    description: string;
    geometry: EONGeo[];
    link: string;
}

export type EONEvent = EONEventRaw & {
    categoryName: string;
    coordinates: LonLat | null;
    dateYMD: string;
}