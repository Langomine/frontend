import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {IoCheckmark} from "react-icons/io5";
import {LiaTimesSolid} from "react-icons/lia";

type Props = {
    status: "good" | "bad",
    points: string[],
}

export default function PointList({status, points} : Props) {
    return (
        <List dense={true}>
            {
                points.map((point) => (
                    <ListItem>
                        <ListItemIcon sx={{ color: status === 'good' ? 'green' : 'red', minWidth: 25 }}>
                            {
                                status === 'good'
                                ? <IoCheckmark />
                                : <LiaTimesSolid />
                            }
                        </ListItemIcon>
                        <ListItemText primary={point} />
                    </ListItem>
                ))
            }
        </List>
    )
}
