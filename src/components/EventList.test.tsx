import { render, screen } from "@testing-library/react";
import { EventList } from "@/components/EventList";
import {EONEvent, EONGeoType} from "@/types";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import "@testing-library/jest-dom";

describe("<EventList />", () => {
    const mockEvents: EONEvent[] = [
        {
            id: "event-1",
            title: "Sample Event 1",
            categories: [{ id: "cat-1", title: "Category 1" }],
            closed: null,
            description: "Description 1",
            geometry: [
                {
                    coordinates: [0, 0],
                    date: "2025-04-25T00:00:00Z",
                    type: EONGeoType.Point,
                },
            ],
            link: "https://example.com/event-1",
            categoryName: "Category 1",
            coordinates: [0, 0],
            dateYMD: "2025-04-25",
        },
        {
            id: "event-2",
            title: "Sample Event 2",
            categories: [{ id: "cat-2", title: "Category 2" }],
            closed: false,
            description: "Description 2",
            geometry: [
                {
                    coordinates: [10, 10],
                    date: "2025-05-10T00:00:00Z",
                    type: EONGeoType.Point,
                },
            ],
            link: "https://example.com/event-2",
            categoryName: "Category 2",
            coordinates: [10, 10],
            dateYMD: "2025-05-10",
        },
    ];

    it("renders the header row", () => {
        render(
            <MemoryRouterProvider>
                <EventList eventList={[]} />
            </MemoryRouterProvider>
        );

        expect(screen.getByText("Updated")).toBeInTheDocument();
        expect(screen.getByText("Category")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders a list of events", () => {
        render(
            <MemoryRouterProvider>
                <EventList eventList={mockEvents} />
            </MemoryRouterProvider>
        );

        expect(screen.getByText("Sample Event 1")).toBeInTheDocument();
        expect(screen.getByText("Category 1")).toBeInTheDocument();
        expect(screen.getByText("2025-04-25")).toBeInTheDocument();

        expect(screen.getByText("Sample Event 2")).toBeInTheDocument();
        expect(screen.getByText("Category 2")).toBeInTheDocument();
        expect(screen.getByText("2025-05-10")).toBeInTheDocument();
    });

    it("renders links to each event", () => {
        render(
            <MemoryRouterProvider>
                <EventList eventList={mockEvents} />
            </MemoryRouterProvider>
        );

        const links = screen.getAllByRole("link");
        expect(links.length).toBe(mockEvents.length);

        expect(links[0]).toHaveAttribute("href", "/event/event-1");
        expect(links[1]).toHaveAttribute("href", "/event/event-2");
    });
});
