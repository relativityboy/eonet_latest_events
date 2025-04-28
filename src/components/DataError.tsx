type DataErrorProps = {
    errorMessage?: string | null
}

export const DataError: React.FC<DataErrorProps> = ({errorMessage}) => {
    const message = errorMessage? errorMessage : "NO DATA";
    const textColor = errorMessage? "text-red-600" : '';
    return <div className="flex items-center justify-center w-full h-full">
        <span className={`${textColor} font-bold text-4xl opacity-70 whitespace-normal overflow-x-auto`}>{message}</span>
    </div>
}