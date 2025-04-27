"use client"

import {useEffect, useState} from "react";
import {fetchEventList} from "@/eonet/api";
import {EONEvent} from "@/types";
import {EventList} from "@/components/EventList";

export default function Home() {
    const [eventList, setEventList] = useState<EONEvent[]>([]);

    async function getEvents(){
        const events = await fetchEventList();
        setEventList(events)
    }

    useEffect(() => {
        getEvents()
    }, [])
  return (
      <div className="pl-5 md:pl-10 pt-5 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl">EONET Latest Events V.1</h1>
        <EventList eventList={eventList} />
      </div>
  );
}
