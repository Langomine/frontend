export class Recorder {
    stream: MediaStream | null = null
    recorder: MediaRecorder | null = null
    allowed: boolean = true
    chunks: Blob[] = []


    async init() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            this.allowed = true
        } catch (e) {
            this.stream = null
            this.allowed = false
        }

    }

    hasPermission() {
        return this.allowed
    }

    isRecording() {
        return this.recorder?.state === 'recording'
    }

    async start() {
        await this.init()

        if (!this.stream) {
            return
        }

        this.recorder = new MediaRecorder(this.stream);

        this.recorder.start()

        this.recorder.ondataavailable = (e) => {
            console.log('datavailable', e.data.size)
            this.chunks.push(e.data);
        };

        this.recorder.onstop = () => {
            this.stream?.getTracks().forEach(track => track.stop());
        }
    }

    finish() {
        this.recorder?.stop()
        // this.recorder = null
        // this.stream?.getTracks().forEach( track => track.stop() );
        this.chunks = []
    }
}