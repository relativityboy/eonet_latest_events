'use client'

import {useEffect, useState} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {EONEvent} from "@/types";
import {fetchEvent} from "@/eonet/api";
import {OsmMap} from "@/components/OsmMap";


import './page.css'
import {GoogleMapLink} from "@/components/GoogleMapLink";
import {EventDetailItem} from "@/components/EventDetailItem";


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