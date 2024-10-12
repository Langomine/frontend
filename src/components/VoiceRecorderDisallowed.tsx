import Button from "@mui/material/Button";
import {MdHelpOutline} from "react-icons/md";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function VoiceRecorderDisallowed() {
    const [helpShown, setHelpShown] = React.useState(false)

    const showHelp = () => {
        setHelpShown(true)
    }

    const hideHelp = () => {
        setHelpShown(false)
    }

    return (
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

                        <img height={300} src="/help-allow-microphone.png" alt="How to enable mic"/>
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
