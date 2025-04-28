import {EONEvent, EONEventRaw} from "@/types";
import {format} from "date-fns/format";

const fetchRoot = 'https://eonet.gsfc.nasa.gov/api/v3/events'

export const createEonEventFromRaw = (raw: EONEventRaw): EONEvent => {
    const categoryName = raw.categories.length > 0? raw.categories[0].title : ''

    const latestGeometry = raw.geometry.length > 0? raw.geometry[raw.geometry.length - 1] : null
    const coordinates  = latestGeometry? latestGeometry.coordinates : null;
    const dateYMD = latestGeometry? format(new Date(latestGeometry.date), 'yyyy-MM-dd') : ''

    return {...raw, categoryName, coordinates, dateYMD}
}

export const fetchEventList = async (): Promise<EONEvent[]> => {
    const fetchUrl = `${fetchRoot}?status=open&limit=20&days=5`;
    const response = await fetch(fetchUrl);
    if(response.ok) {
        const rawEventList: EONEventRaw[] = (await response.json()).events;
        const eventList: EONEvent[] = rawEventList.map(createEonEventFromRaw);

        eventList.sort((a, b) => (
            b.dateYMD.localeCompare(a.dateYMD)
        ));

        return eventList;
    } else {
        throw Error(`Could not fetch events from ${fetchUrl}`);
    }
}

export const fetchEvent = async (eventId: string) => {
    const fetchUrl = `${fetchRoot}/${eventId}`;
    const response = await fetch(fetchUrl);
    if(response.ok) {
        const rawEvent: EONEventRaw = await response.json()
        return createEonEventFromRaw(rawEvent)
    } else {
        throw Error(`Could not fetch event ${eventId}`);
    }
}
