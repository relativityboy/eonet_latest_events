import {NewWindowIcon} from "@/components/icons";
import {LonLat} from "@/types";
import Link from "next/link";

type GoogleMapLinkProps = {
    coordinates: LonLat | null;
}

export const GoogleMapLink: React.FC<GoogleMapLinkProps> = ({coordinates}) => {
    if(!coordinates) {
        return 'NOT AVAILABLE';
    }
    const [lon, lat] = coordinates;
    return <Link href={`https://www.google.com/maps/@${lat},${lon},1186m`} target="_blank"><NewWindowIcon/></Link>
}
