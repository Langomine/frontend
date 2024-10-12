import Button from "@mui/material/Button";
import {MdOutlineKeyboardVoice} from "react-icons/md";
import {
    Box,
} from "@mui/material";
import {Recorder} from '../lib/recorder/recorder'
import VoiceRecorderDisallowed from "./VoiceRecorderDisallowed.tsx";
import {useEffect} from "react";

const recorder = new Recorder()

export default function VoiceRecorder() {
    function click() {
        console.log(recorder.isRecording())
        if (recorder.isRecording()) {
            recorder.finish()
        } else {
            recorder.start()
        }
    }

    console.log(recorder)

    if (!recorder.hasPermission()) {
        return <VoiceRecorderDisallowed />
    }

    return (
        <Box>
            s: { recorder.isRecording() }
            <Button
                variant="contained"
                sx={{ width: '200px', height: '200px', borderRadius: '50%', boxShadow: recorder.isRecording() ? 0 : 10}}
                color={recorder.isRecording() ? 'secondary' : 'primary'}
                onClick={click}
            >
                <MdOutlineKeyboardVoice
                    size={100}
                    className={`${recorder.isRecording() ? 'beat' : ''}`}
                />

                {
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
