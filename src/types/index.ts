export enum EONGeoType {
    Point="Point",
}

export type EONCategory = {
    id: string;
    title: string;
}

export type EONGeo = {
    date: string;
    magnitudeUnit: string;
    magnitudeValue: number;
    type: EONGeoType.Point; // Declaring as we only support Point
}

type LonLat = [lon: number, lat: number];


export type EONEventRaw = {
    id: string;
    title: string;
    categories: EONCategory[];
    closed: boolean | null;
    coordinates: LonLat;
    description: string;
    geometry: EONGeo[];
    link: string;
}

export type EONEvent = EONEventRaw & {
    dateYMD: string;
    categoryName: string;
}