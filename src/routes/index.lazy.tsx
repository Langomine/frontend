import { createLazyFileRoute } from '@tanstack/react-router'
import VoiceRecorder from "../components/VoiceRecorder.tsx";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import {useQuery} from "@tanstack/react-query";
import {api} from "../lib/api/client.ts";
import {BeatLoader} from "react-spinners";
import React, {useEffect} from "react";
import {components} from "../lib/api/schema";
import Typography from "@mui/material/Typography";
import {IoDiceOutline} from "react-icons/io5";
import {IconButton} from "@mui/material";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    const [question, setQuestion] = React.useState<components['schemas']['Question']>()

    function selectRandomQuestion() {
        if (!questions.isSuccess) {
            return
        }

        setQuestion(questions!.data[Math.floor(Math.random()*questions!.data.length)])

    }

    const questions = useQuery({
        //    ^? const data: number | undefined
        queryKey: ['questions'],
        queryFn: async () => {
            const {data, error} = await api.GET("/api/questions/")
            if (data) {
                selectRandomQuestion()
                return data;
            }
            throw new Error(error);
        },
    })
    useEffect(selectRandomQuestion, [questions.data])

    return (
        <Card sx={{ width: 600 }}>
            <Grid container spacing={2} minHeight={400}>
                <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
                    {
                        !questions.isSuccess
                        ? <BeatLoader />
                        : (
                            <div>
                                <Typography>
                                    Click to the button below and talk about the following question for 30 seconds:
                                </Typography>

                                <Typography color={'secondary'}>
                                    { question?.text }

                                    <IconButton onClick={selectRandomQuestion}>
                                        <IoDiceOutline />
                                    </IconButton>
                                </Typography>



                                <VoiceRecorder />
                            </div>
                        )
                    }
                </Grid>
            </Grid>


        </Card>
    )
}