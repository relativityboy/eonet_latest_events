import {ReactNode} from "react";

type EventDetailItemProps = {
    name: string,
    gridCols?: string,
    children: ReactNode,
    onClick?: () => void
}

export const EventDetailItem: React.FC<EventDetailItemProps> = ({name, gridCols="grid-cols-[120px_1fr]", onClick, children}) => {
    return <li className={`grid gap-4 items-center py-3 border-b border-gray-200 font-[family-name:var(--font-geist-mono)]
     ${gridCols}`}>
        {onClick? <span className="control" onClick={onClick}>{name}</span> : <span>{name}</span>}
        {children? <span>{children}</span> : null}
    </li>
}