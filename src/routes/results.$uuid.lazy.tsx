import {createLazyFileRoute, createLink} from '@tanstack/react-router'

import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material'
import { IoShareSocialOutline } from 'react-icons/io5'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import 'chart.js/auto'
import { MdDelete, MdOutlineKeyboardVoice } from 'react-icons/md'
import { IoMdCopy } from 'react-icons/io'
import ScoreGauge from "../components/ScoreGauge.tsx";
import VoicePlayer from "../components/VoicePlayer.tsx";
import PointList from "../components/PointList.tsx";
import OverallScoreRadar from "../components/OverallScoreRadar.tsx";

const RouterButton = createLink(Button)

export const Route = createLazyFileRoute('/results/$uuid')({
  component: Results,
})

function Results() {
  const { uuid } = Route.useParams()

  const [tab, setTab] = React.useState(0)
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const [deleteShown, setDeleteShown] = React.useState(false)

  const showDelete = () => {
    setDeleteShown(true)
  }

  const hideDelete = () => {
    setDeleteShown(false)
  }

  const handleDelete = () => {
    hideDelete()
    // TODO: delete ...
  }

  const [shareShown, setShareShown] = React.useState(false)

  const showShare = () => {
    setShareShown(true)
  }

  const hideShare = () => {
    setShareShown(false)
  }

  const [copyText, setCopyText] = React.useState('Copy')

  const copied = () => {
    setCopyText('Copied!')

    setTimeout(() => {
      setCopyText('Copy')
    }, 1000)
  }

  return (
    <>
      <Card sx={{ width: 1000 }}>
        <CardContent sx={{ minHeight: 400 }}>
          <Typography gutterBottom variant="h5" component="div">
            Test Results {uuid}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={12}>
              <div>
                <Tabs
                  variant="fullWidth"
                  value={tab}
                  onChange={handleTabChange}
                  centered
                  aria-label="secondary tabs example"
                >
                  <Tab label="Overview" />
                  <Tab label="Fluency" />
                  <Tab label="Lexical" />
                  <Tab label="Grammar" />
                  <Tab label="Pronunciation" />
                </Tabs>

                <div hidden={tab !== 0}>
                  <Grid container spacing={2}>
                    <Grid size={7}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <ScoreGauge score={2}/>

                        <Typography
                          gutterBottom
                          component="p"
                          my={2}
                          mx={2}
                          align="justify"
                        >
                          Your estimated IELTS score for speaking tests is 2 of
                          9.
                        </Typography>

                        <Divider flexItem />

                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          mt={2}
                          align="left"
                        >
                          Your Voice
                        </Typography>

                        <VoicePlayer src="https://cdn.langomine.com/voices/2b0f3bc8-272f-4301-a98f-187e591f114d.mp3"/>

                        <Typography
                          gutterBottom
                          component="p"
                          my={2}
                          mx={2}
                          align="justify"
                        >
                          In publishing and graphic design, Lorem ipsum is a
                          placeholder text commonly used to demonstrate the
                          visual form of a document or a typeface without
                          relying on meaningful content. Lorem ipsum may be used
                          as a placeholder before the final copy is available.
                        </Typography>

                        <Grid container spacing={2} width="100%">
                          <Grid size={4}>
                            <RouterButton
                              variant="contained"
                              size="small"
                              startIcon={<MdOutlineKeyboardVoice />}
                              to="/"
                            >
                              New
                            </RouterButton>
                          </Grid>
                          <Grid size={4}>
                            <Button
                              onClick={showShare}
                              variant="contained"
                              size="small"
                              startIcon={<IoShareSocialOutline />}
                            >
                              Share
                            </Button>
                          </Grid>
                          <Grid size={4}>
                            <Button
                              onClick={showDelete}
                              variant="contained"
                              size="small"
                              startIcon={<MdDelete />}
                              color="error"
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid size={5}>
                      <OverallScoreRadar fluency={3} grammar={7} lexical={4} pronunciation={6}/>
                    </Grid>
                  </Grid>
                </div>
                <div hidden={tab !== 1}>
                  <PointList status={'bad'} points={['aaaa', 'bbbb']} />
                </div>
                <div hidden={tab !== 2}>
                  <PointList status={'good'} points={['aaaa', 'bbbb']} />
                </div>
                <div hidden={tab !== 3}>
                  <PointList status={'bad'} points={['aaaa', 'bbbb']} />
                </div>
                <div hidden={tab !== 4}>
                  <PointList status={'good'} points={['aaaa', 'bbbb']} />
                </div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={deleteShown}
        onClose={hideDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Voice?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We'll delete your voice file and it's extracted content. However,
            it's stats (such as duration) will be kept for analytical purposes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDelete} autoFocus>
            Nope
          </Button>
          <Button onClick={handleDelete} color="error">
            Yes, Delete!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={shareShown}
        onClose={hideShare}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Share'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CopyToClipboard text="{this.state.value}" onCopy={copied}>
              <Tooltip title={copyText}>
                <OutlinedInput
                  type="text"
                  readOnly={true}
                  value="https://.../uuid"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle visibility" edge="end">
                        <IoMdCopy />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Tooltip>
            </CopyToClipboard>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideShare} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
