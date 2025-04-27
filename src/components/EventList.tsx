"use client"

import {EONEvent} from "@/types";
import Link from "next/link";

import './EventList.css'
import {LinkIcon} from "@/components/icons";

type EventListProps = {
    eventList: EONEvent[]
}

const eventItem: string = `grid gap-4 items-center py-3 border-b border-gray-200
     grid-cols-[50px_100px_130px]
     sm:grid-cols-[50px_100px_130px_1fr] 
               `;

export const EventList: React.FC<EventListProps> = ({eventList}) => {
    return <ul>
        <li className={`eventItem header ${eventItem}`}>
            <span className="dateYMD"><LinkIcon/></span>
            <span className="dateYMD">Updated</span>
            <span className="category">Category</span>
            <span className="eventTitle hidden sm:grid">Name</span>
        </li>
        {eventList.map(event => (
            <li key={event.id} className={`eventItem ${eventItem}`}>
                <span className="link"><Link href={`/event/${event.id}`}><LinkIcon/></Link></span>
                <time className="dateYMD">{event.dateYMD}</time>
                <span className="category">{event.categoryName}</span>
                <span className="eventTitle col-span-3 sm:col-span-1">{event.title}</span>
            </li>
        ))
        }
    </ul>
}
