"use client"
import React, {ReactNode} from 'react'

import { createContext, useState, useContext } from 'react';

export const PageTitleContext = createContext({
    pageTitle: '',
    setPageTitleInfo: (title: string) : void => { throw new Error(`'PageTitleContext' not in the parent tree. 'setPageTitleInfo' not available`) },
});

export const PageTitleProvider = ({ children }: {children: ReactNode}) => {
    const [pageTitle, setPageTitleInfo] = useState("");

    return (
        <PageTitleContext.Provider value={{ pageTitle, setPageTitleInfo }}>
            {children}
        </PageTitleContext.Provider>
    );
};

// Custom hook for easier access
export const usePageTitle = () => useContext(PageTitleContext);


export const PageTitle: React.FC = () => {
    const { pageTitle } = usePageTitle();
    return <h1 className="text-4xl">{pageTitle? pageTitle : "EONET Latest Events V.1"}</h1>
}
