"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM.js';
import {LonLat} from "@/types";
import "ol/ol.css";

type OsmMapProps = {
    center: LonLat
}

export const OsmMap: React.FC<OsmMapProps> = ({ center }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function createMap() {
            if (!mapRef.current) return;
            return new Map({
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                target: mapRef.current,
                view: new View({
                    center:fromLonLat(center),
                    zoom: 8,
                }),
            });
        }

        const mapProm = createMap()
        return () => {
            mapProm.then(map => {
                if(map) {
                    map.setTarget(undefined);
                }
            })
        }
    }, [center]);

    return (
        <div
            ref={mapRef}
            className="h-[200px] w-[200px] border rounded-lg shadow-md"
        />
    );
}
