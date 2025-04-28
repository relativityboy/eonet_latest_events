"use client"

import {useEffect, useState} from "react";
import {fetchEventList} from "@/eonet/api";
import {EONEvent} from "@/types";
import {EventList} from "@/components/EventList";
import {Spinner} from "@/components/Spinner";
import {usePageTitle} from "@/components/PageTitle";
import {DataError} from "@/components/DataError";

export default function Home() {
    const [eventList, setEventList] = useState<EONEvent[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { setPageTitleInfo } = usePageTitle()

    async function getEvents(){
        setPageTitleInfo('')
        setFetching(true)
        try {
            const response = await fetchEventList();
            if(response) {
                setEventList(response)
            }
            setErrorMessage(null)
        } catch (e: unknown) {
            setErrorMessage((e as Error).message)
        }
        setFetching(false)
    }

    useEffect(() => {
        getEvents()
    }, [])

    if(fetching) {
        return <Spinner/>
    }

    return (eventList.length > 0? <EventList eventList={eventList}/> : <DataError errorMessage={errorMessage}/>)

}
