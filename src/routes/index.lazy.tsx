import {createLazyFileRoute, useNavigate} from '@tanstack/react-router'
import VoiceRecorder from "../components/VoiceRecorder.tsx";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import {BeatLoader} from "react-spinners";
import React, {useEffect} from "react";
import {components} from "../lib/api/schema";
import Typography from "@mui/material/Typography";
import {IoDiceOutline} from "react-icons/io5";
import {IconButton} from "@mui/material";
import Agreement from "../components/Agreement.tsx";
import {useCreateVoice, useListQuestions} from "../hooks/queries.ts";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    const [question, setQuestion] = React.useState<components['schemas']['Question']>()
    const navigator = useNavigate()
    const questions = useListQuestions()
    const voiceCreator = useCreateVoice()

    function selectRandomQuestion() {
        if (!questions.isSuccess) {
            return
        }

        setQuestion(questions!.data[Math.floor(Math.random()*questions!.data.length)])
    }


    useEffect(selectRandomQuestion, [questions.data])
    useEffect(() => {
        if (!voiceCreator.data) {
            return
        }


        navigator({to: '/results/$uuid', params: {uuid: voiceCreator.data.uuid}})
    }, [voiceCreator])

    function handleRecordedVoice(chunks: Blob[]) {
        voiceCreator.mutate(new File(chunks, "voice.wav"))
    }

    return (
        <Card sx={{ width: 600 }}>
            <Grid container spacing={2} minHeight={400}>
                <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
                    {
                        voiceCreator?.isPending
                            ?
                            <div>
                                <BeatLoader/> Stand still while we're processing...
                            </div>
                            :
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

                                        <VoiceRecorder onFinish={handleRecordedVoice}/>

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