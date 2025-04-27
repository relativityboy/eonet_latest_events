'use client'

import {ReactNode, useEffect, useState} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {EONEvent, LonLat} from "@/types";
import {fetchEvent} from "@/eonet/api";
import {OsmMap} from "@/components/OsmMap";


import './page.css'
import {NewWindowIcon} from "@/components/icons";

type EventDetailItemProps = {
    name: string,
    gridCols?: string,
    children: ReactNode,
    onClick?: () => void
}

const EventDetailItem: React.FC<EventDetailItemProps> = ({name, gridCols="grid-cols-[120px_1fr]", onClick, children}) => {
    return <li className={`grid gap-4 items-center py-3 border-b border-gray-200 font-[family-name:var(--font-geist-mono)]
     ${gridCols}`}>
        {onClick? <span className="control" onClick={onClick}>{name}</span> : <span>{name}</span>}
        {children? <span>{children}</span> : null}
    </li>
}

type GoogleMapLinkProps = {
    coordinates: LonLat | null;
}

const GoogleMapLink: React.FC<GoogleMapLinkProps> = ({coordinates}) => {
    if(!coordinates) {
        return 'NOT AVAILABLE';
    }
    const [lon, lat] = coordinates;
    return <Link href={`https://www.google.com/maps/@${lat},${lon},1186m`} target="_blank"><NewWindowIcon/></Link>
}

export default function EventDetail() {
    const [showRaw, setShowRaw] = useState<boolean>(false);
    const [event, setEvent] = useState<EONEvent | null>(null);
    const { id: eventId } = useParams<{ id: string }>();

    useEffect(() => {
        async function getEvent() {
            const response = await fetchEvent(eventId);
            setEvent(response)
        }
        getEvent();
    }, [eventId])

    const rawDetailName = showRaw? "Raw +" : "Raw -"

    return event? (
        <div className="pl-5 md:pl-10 pt-5 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl">{event.title}</h1>
            { event.coordinates? <OsmMap center={event.coordinates} /> : null }
            <ol className="eventDetails">
                <EventDetailItem name="Description">{event.description}</EventDetailItem>
                <EventDetailItem name="Categories">{
                    event.categories.map(item => <span key={item.id} className="eventCategory">{item.title}</span>)
                }</EventDetailItem>
                <EventDetailItem name="Sources">{
                    event.sources? event.sources.map(item => <Link key={item.id} href={item.url}>{item.id}</Link>) : 'NONE'
                }</EventDetailItem>
                <EventDetailItem name="Google Maps">
                    <GoogleMapLink coordinates={event.coordinates}/>
                </EventDetailItem>
                <EventDetailItem name={rawDetailName}
                                 gridCols="grid-cols-[1fr]"
                                 onClick={() => setShowRaw(!showRaw)}
                >{
                    showRaw? <pre className="rawEventJson">{JSON.stringify(event, null, 2)}</pre> : null
                }</EventDetailItem>
            </ol>

        </div>
    ) : null
}