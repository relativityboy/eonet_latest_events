import {EONEvent, EONEventRaw} from "@/types";
import {format} from "date-fns/format";

const fetchRoot = 'https://eonet.gsfc.nasa.gov/api/v3/events'

export const fetchEvents = async (): Promise<EONEvent[]> => {
    const fetchUrl = `${fetchRoot}?status=open&limit=20&days=5`;
    const response = await fetch(fetchUrl);
    if(response.ok) {
        const rawEventList: EONEventRaw[] = (await response.json()).events;
        const eventList: EONEvent[] = rawEventList.map(item => {
            const categoryName = item.categories.length > 0? item.categories[0].title : ''
            const dateYMD = item.geometry.length > 0?
                format(new Date(item.geometry[item.geometry.length - 1].date), 'yyyy-MM-dd') : ''
            return {...item, categoryName, dateYMD}
        });

        eventList.sort((a, b) => (
            b.dateYMD.localeCompare(a.dateYMD)
        ));

        return eventList;
    } else {
        throw Error(`Could not fetch events from ${fetchUrl}`);
    }
}