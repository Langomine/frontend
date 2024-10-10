import { LinguaRecorder } from 'lingua-recorder';
import Button from "@mui/material/Button";
import {MdHelpOutline, MdOutlineKeyboardVoice} from "react-icons/md";
import React from "react";
import Typography from "@mui/material/Typography";
import {
    Box, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";


enum RecorderState {
    Ready,
    Failed,
    Recording,
}

export default function VoiceRecorder() {
    const recorder = new LinguaRecorder() as LinguaRecorderInstance;

    const [state, setState] = React.useState<RecorderState>(RecorderState.Ready)

    /**
     * Since LinguaRecorder doesn't support permission updates, we use a temporary one to
     * keep the state updated.
     */
    setInterval(async () => {
        try {
            await navigator.mediaDevices.getUserMedia({audio: true, video:false})

            if (state === RecorderState.Failed) {
                setState(RecorderState.Ready)
            }
        } catch (e) {
            if (state !== RecorderState.Failed) {
                setState(RecorderState.Failed)
                recorder.stop()
            }
        }
    }, 1000)


    recorder.on('stopped', () => {
        setState(RecorderState.Ready)
        console.log(state);
    })
    recorder.on('started', () => {
        setState(RecorderState.Recording)
        console.log(state);
    })

    function click() {
        if (state === RecorderState.Failed) {
            return
        }

        if (state === RecorderState.Ready) {
            console.log(recorder.start())
        } else {
            console.log(recorder.stop())
        }
    }

    const [helpShown, setHelpShown] = React.useState(false)

    const showHelp = () => {
        setHelpShown(true)
    }

    const hideHelp = () => {
        setHelpShown(false)
    }

    return (
        <>
            <Box>
                { state }
                {
                    state === RecorderState.Failed
                        ? (
                            <>
                                <Typography color={'error'}>
                                    Please allow us to use you microphone.
                                </Typography>
                                <div>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        startIcon={<MdHelpOutline />}
                                        onClick={showHelp}
                                    >
                                        How?
                                    </Button>
                                </div>
                            </>
                        )
                        : (
                            <Button
                                variant="contained"
                                sx={{ width: '200px', height: '200px', borderRadius: '50%', boxShadow: state === RecorderState.Recording ? 0 : 10}}
                                className={`${state === RecorderState.Recording ? 'beat' : ''}`}
                                onClick={click}
                            >
                                <MdOutlineKeyboardVoice size={100}/>
                            </Button>
                        )
                }
            </Box>

            <Dialog
                open={helpShown}
                onClose={hideHelp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Enable Mic'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography align={'center'}>
                            Click on the settings icon near address bar of your browser and allow us to use your mic. A page refresh might be needed if not functioning immediately.
                        </Typography>

                        <img height={300} src="/src/assets/help-allow-microphone.png" alt="How to enable mic"/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideHelp} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
