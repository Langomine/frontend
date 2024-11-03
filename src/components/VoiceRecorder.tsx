import Button from "@mui/material/Button";
import {MdOutlineKeyboardVoice} from "react-icons/md";
import {
    Box,
} from "@mui/material";
import {Recorder} from '../lib/recorder/recorder'
import VoiceRecorderDisallowed from "./VoiceRecorderDisallowed.tsx";
import {useEffect, useState} from "react";

type Props = {
    onFinish: (chunks: Blob[]) => void,
}


const recorder = new Recorder()
const counterPeriod = 30

export default function VoiceRecorder({onFinish}: Props) {
    const [isRecording, setIsRecording] = useState(false)
    const [countdownSecond, setCountdownSecond] = useState(counterPeriod)
    const [countdownIntervalId, setCountdownIntervalId] = useState<NodeJS.Timeout|undefined>(undefined)

    useEffect(() => {
        if (countdownSecond === 0) {
            stop()
        }
    }, [countdownSecond])

    // useEffect(() => {
    //     const id = setInterval(() => setCountdownSecond((oldCount: number) => oldCount + 1), 1000);
    //
    //     return () => {
    //         clearInterval(id);
    //     };
    // }, []);

    function stop() {
        setCountdownSecond(counterPeriod)
        clearInterval(countdownIntervalId)
        recorder.finish()
        setIsRecording(false)

        onFinish(recorder.chunks)
    }

    function start() {
        recorder.start()
        // setCountdownIntervalId(setInterval(() => {
        //     console.log('booooo', countdownSecond, countdownIntervalId)
        //     setCountdownSecond(countdownSecond - 1)
        // }, 1000))
        setCountdownIntervalId(setInterval(() => setCountdownSecond((oldCount: number) => oldCount - 1), 1000))
        setIsRecording(true)
    }

    console.log(recorder)

    if (!recorder.hasPermission()) {
        return <VoiceRecorderDisallowed />
    }

    return (
        <Box>
            <Button
                variant="contained"
                sx={{ width: '200px', height: '200px', borderRadius: '50%', boxShadow: isRecording ? 0 : 10}}
                color={isRecording ? 'secondary' : 'primary'}
                onClick={isRecording ? stop : start}
            >
                <MdOutlineKeyboardVoice
                    size={100}
                    className={`${isRecording ? 'beat' : ''}`}
                />

                {
                    isRecording
                    ?
                        <div style={{
                            position: 'absolute',
                            bottom: '14px',
                            textTransform: 'initial',
                        }}>
                            {countdownSecond}s
                        </div>
                    :
                        <div style={{
                            position: 'absolute',
                            left: '-10px',
                            bottom: '-22px',
                            clipPath: 'ellipse(99px 106px at 65% -4%)',
                            transform: 'rotate(24deg)',
                        }}>
                          <img width="128" src='/khaby-body.png'/>
                          <img
                            width="45"
                            src='/khaby-hand.png'
                            style={{
                              position: 'absolute',
                              left: '67px',
                              bottom: '32px',
                              transformOrigin: 'bottom',
                            }}
                            className={'khaby-hand'}
                          />
                        </div>
                }
            </Button>
        </Box>
    )
}
