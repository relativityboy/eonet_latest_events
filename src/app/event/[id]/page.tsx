'use client'

import {useEffect, useState} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {EONEvent} from "@/types";
import {fetchEvent} from "@/eonet/api";
import {OsmMap} from "@/components/OsmMap";
import {GoogleMapLink} from "@/components/GoogleMapLink";
import {EventDetailItem} from "@/components/EventDetailItem";
import {Spinner} from "@/components/Spinner";
import {usePageTitle} from "@/components/PageTitle";
import {DataError} from "@/components/DataError";
import './page.css'

export default function EventDetail() {
    const [showRaw, setShowRaw] = useState<boolean>(false);
    const [event, setEvent] = useState<EONEvent | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { id: eventId } = useParams<{ id: string }>();
    const { setPageTitleInfo } = usePageTitle()

    useEffect(() => {
        async function getEvent() {
            setFetching(true)
            setPageTitleInfo(' ')
            try {
                const response = await fetchEvent(eventId);
                if(response) {
                    setPageTitleInfo(response.title)
                    setEvent(response)
                }
                setErrorMessage(null)
            } catch (e: unknown) {
                setErrorMessage((e as Error).message)
            }
            setFetching(false)
        }
        getEvent();
    }, [eventId])

    const rawDetailName = showRaw? "Raw +" : "Raw -"
    if(fetching) {
        return <Spinner/>
    }

    return (event?
            <div>
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
            </div> : <DataError errorMessage={errorMessage}/>
    )
}