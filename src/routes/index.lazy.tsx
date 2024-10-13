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
import Agreement from "../components/Agreement.tsx";

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


                                <Typography color={'secondary'} px={4}>
                                    { question?.text }

                                    <IconButton size={'small'} onClick={selectRandomQuestion} sx={{marginLeft: '4px'}}>
                                        <IoDiceOutline />
                                    </IconButton>
                                </Typography>


                                <Typography my={1}>
                                    Click and answer!
                                </Typography>

                                <VoiceRecorder />

                                <Agreement>
                                    <Typography variant="caption" my={2} sx={{ display: 'block' }}>

                                        By clicking above, you agree to our
                                        <Typography variant="caption" color={'info'}> Terms </Typography>
                                        and
                                        <Typography variant="caption" color={'info'}> Privacy Policy</Typography>
                                        .
                                    </Typography>
                                </Agreement>


                            </div>
                        )
                    }
                </Grid>
            </Grid>


        </Card>
    )
}