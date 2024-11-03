import {List, ListItem, ListItemIcon, ListItemText, Button, Box} from "@mui/material";
import {IoCheckmark} from "react-icons/io5";
import {LiaTimesSolid} from "react-icons/lia";
import React from "react";

type Props = {
    status: "good" | "bad",
    points: string[],
}

export default function PointList({status, points} : Props) {
    const [expanded, setExpanded] = React.useState(false)
    const initialDisplayCount = 4

    const displayedPoints = expanded ? points : points.slice(0, initialDisplayCount)
    const showButton = points.length > initialDisplayCount

    return (
        <>
            <List dense={true}>
                {
                    displayedPoints.map((point, index) => (
                        <ListItem key={index}>
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
            {showButton && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show Less' : 'Show More'}
                    </Button>
                </Box>
            )}
        </>
    )
}