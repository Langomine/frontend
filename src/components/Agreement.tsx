import Button from "@mui/material/Button";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode,
}

export default function Agreement({children}: Props) {
    const [shown, setShown] = React.useState(false)

    const show = () => {
        setShown(true)
    }

    const hide = () => {
        setShown(false)
    }

    return (
        <>
            <div onClick={show} style={{ cursor: 'pointer'}}>
                {children}
            </div>

            <Dialog
                open={shown}
                onClose={hide}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Terms of Use & Privacy Policy'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h2>TL;DR</h2>
                        <p>
                            Langomine is a beta platform that analyzes your uploaded voice files to help you improve your English, but results are not guaranteed to be accurate. After processing, you can delete your voice file, though the analyzed data will be retained for system improvement. The service is free for now, but we don’t guarantee uptime, performance, or accuracy. We use cookies and external services like Google Analytics to enhance user experience and track data. While we take steps to protect your data, we can't guarantee absolute security.
                        </p>


                        <h2>1. Terms of Use</h2>

                        <h3>1.1 General</h3>
                        <p>Langomine is a language testing platform currently in <strong>beta</strong>. By using this
                            service, you agree to the following terms and conditions. Please read them carefully.</p>

                        <h3>1.2 Purpose</h3>
                        <p>Langomine analyzes uploaded voice files to provide English language scoring. The results are
                            intended to help you learn more efficiently by identifying areas of improvement. However,
                            the results are <strong>not guaranteed</strong> to be accurate and should not be considered
                            as a formal rating system.</p>

                        <h3>1.3 Beta Disclaimer</h3>
                        <p>As Langomine is in <strong>beta</strong>, the platform may have bugs, inaccuracies, or
                            inconsistencies. We do <strong>not guarantee</strong> any level of uptime, performance, or
                            accuracy. The service is provided as-is and may be unavailable at times due to maintenance,
                            technical issues, or other reasons. We do not provide warranties for the service's
                            uninterrupted availability.</p>

                        <h3>1.4 Voice File Storage & Deletion</h3>
                        <p>By uploading your voice files, you consent to their use for the purpose of English language
                            scoring and system optimization. After processing, you will receive a link to view your
                            results. You have the option to delete the voice file after viewing the results. Once
                            deleted, the voice file will be permanently removed, but the <strong>analyzed
                                content</strong> will be retained for system optimization.</p>

                        <h3>1.5 Free Service</h3>
                        <p>Langomine is currently a <strong>free service</strong>. We reserve the right to modify,
                            discontinue, or introduce charges for any part of the service in the future.</p>

                        <h2>2. Privacy Policy</h2>

                        <h3>2.1 Data Collection & Usage</h3>
                        <p>We collect and store uploaded voice files for the purpose of analyzing English language
                            proficiency and improving the accuracy of our system. Your voice files are securely stored
                            and will only be used for the stated purposes. If you choose to delete your voice file, only
                            the analyzed content will be retained for ongoing system improvements.</p>

                        <h3>2.2 Cookies</h3>
                        <p>Langomine uses cookies to improve user experience, track campaigns, and gather analytics
                            data. These cookies help us understand how users interact with our platform and allow us to
                            make improvements.</p>

                        <h3>2.3 External Services</h3>
                        <p>We use external services, including <strong>Google Analytics</strong>, to track usage
                            patterns and optimize the performance of our platform. These third-party services may
                            collect information such as your IP address and browsing behavior. By using Langomine, you
                            consent to the collection of such information by third parties.</p>

                        <h3>2.4 Data Security</h3>
                        <p>We take reasonable steps to ensure that your data is protected. However, we cannot guarantee
                            absolute security, and you use Langomine at your own risk.</p>

                        <h2>3. Changes to This Policy</h2>
                        <p>We reserve the right to update these terms of use and privacy policy at any time. Any changes
                            will be reflected on this page, and it is your responsibility to review them
                            periodically.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hide} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
