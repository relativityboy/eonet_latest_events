import {fireEvent, render, screen} from "@testing-library/react";
import {PageTitle, usePageTitle, PageTitleContext, PageTitleProvider} from "./PageTitle";
import "@testing-library/jest-dom";

describe("PageTitle", () => {
    it("renders the default title when no title is set", () => {
        render(
            <PageTitleContext.Provider value={{ pageTitle: '', setPageTitleInfo: jest.fn() }}>
                <PageTitle />
            </PageTitleContext.Provider>
        );

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("EONET Latest Events V.1");
    });

    it("renders the provided title from context", () => {
        render(
            <PageTitleContext.Provider value={{ pageTitle: 'Test Event Title', setPageTitleInfo: jest.fn() }}>
                <PageTitle />
            </PageTitleContext.Provider>
        );

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Test Event Title");
    });

    describe("setPageTitleInfo", () => {
        it("updates the page title when setPageTitleInfo is called", () => {
            const TestComponent = () => {
                const { pageTitle, setPageTitleInfo } = usePageTitle();
                return (
                    <div>
                        <button onClick={() => setPageTitleInfo("New Event Title")}>Change Title</button>
                        <h2>{pageTitle}</h2>
                    </div>
                );
            };

            render(
                <PageTitleProvider>
                    <TestComponent />
                </PageTitleProvider>
            );

            expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("");

            fireEvent.click(screen.getByText("Change Title"));

            expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("New Event Title");
        });
    })
});
