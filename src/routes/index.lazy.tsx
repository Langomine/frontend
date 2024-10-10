import { createLazyFileRoute } from '@tanstack/react-router'
import VoiceRecorder from "../components/VoiceRecorder.tsx";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";


export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <Card sx={{ width: 1000 }}>
            <Grid container spacing={2} minHeight={400}>
                <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
                    <VoiceRecorder />
                </Grid>
            </Grid>
        </Card>
    )
}