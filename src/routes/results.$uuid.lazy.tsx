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
import {useGetProcessedVoice} from "../hooks/queries.ts";
import {BeatLoader} from "react-spinners";

const RouterButton = createLink(Button)

export const Route = createLazyFileRoute('/results/$uuid')({
  component: Results,
})

function Results() {
  const { uuid } = Route.useParams()

  const processedVoice = useGetProcessedVoice(uuid || '')

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

  let overallScore = 0
  if (processedVoice.isSuccess) {
    overallScore = (
        processedVoice.data.analysed.fluency_and_coherence.band_score +
        processedVoice.data.analysed.grammatical_range_and_accuracy.band_score * 1.5 +
        processedVoice.data.analysed.lexical_resource.band_score * 1.5 +
        processedVoice.data.analysed.pronunciation.band_score
    ) / 5
  }

  return (
    <>
      <Card sx={{ width: 1000 }}>
        <CardContent sx={{minHeight: 400}}>
          <Typography gutterBottom variant="h5" component="div">
            Test Results
          </Typography>

          {
            !processedVoice.isSuccess
              ?
                <div>
                  <BeatLoader/> Loading results...
                </div>
              :
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
                        <Tab label="Overview"/>
                        <Tab label="Fluency"/>
                        <Tab label="Grammar"/>
                        <Tab label="Lexical"/>
                        <Tab label="Pronunciation"/>
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
                              <ScoreGauge score={overallScore}/>

                              <Typography
                                  gutterBottom
                                  component="p"
                                  my={2}
                                  mx={2}
                                  align="justify"
                              >
                                Your estimated IELTS score for speaking tests is {overallScore} of
                                9.
                              </Typography>

                              <Typography
                                  gutterBottom
                                  component="p"
                                  my={2}
                                  mx={2}
                                  align="justify"
                              >
                                {processedVoice.data.analysed.overall_assessment.summary}
                              </Typography>

                              <Divider flexItem/>

                              <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  mt={2}
                                  align="left"
                              >
                                Your Response
                              </Typography>

                              <VoicePlayer src={processedVoice.data.file}/>

                              <Typography
                                  gutterBottom
                                  component="p"
                                  my={2}
                                  mx={2}
                                  align="justify"
                              >
                                {processedVoice.data.text}
                              </Typography>

                              <Grid container spacing={2} width="100%">
                                <Grid size={4}>
                                  <RouterButton
                                      variant="contained"
                                      size="small"
                                      startIcon={<MdOutlineKeyboardVoice/>}
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
                                      startIcon={<IoShareSocialOutline/>}
                                  >
                                    Share
                                  </Button>
                                </Grid>
                                <Grid size={4}>
                                  <Button
                                      onClick={showDelete}
                                      variant="contained"
                                      size="small"
                                      startIcon={<MdDelete/>}
                                      color="error"
                                  >
                                    Delete
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid size={5}>
                            <OverallScoreRadar
                                fluency={processedVoice.data.analysed.fluency_and_coherence.band_score}
                                grammar={processedVoice.data.analysed.grammatical_range_and_accuracy.band_score}
                                lexical={processedVoice.data.analysed.lexical_resource.band_score}
                                pronunciation={processedVoice.data.analysed.pronunciation.band_score}
                            />

                            <PointList status={'good'} points={processedVoice.data.analysed.overall_assessment.key_strengths}/>
                            <PointList status={'bad'} points={processedVoice.data.analysed.overall_assessment.priority_improvements}/>
                          </Grid>
                        </Grid>
                      </div>
                      <div hidden={tab !== 1}>
                        <Grid container spacing={2}>
                          <Grid size={12}>
                            <Typography gutterBottom variant="h4" component="div" sx={{textAlign: 'center'}}>
                              {processedVoice.data.analysed.fluency_and_coherence.band_score}/9
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                              {processedVoice.data.analysed.fluency_and_coherence.detailed_feedback}
                            </Typography>
                          </Grid>
                          <Grid size={6}>
                            <Typography gutterBottom component="div">
                              Strengths:
                            </Typography>
                            <PointList status={'good'} points={processedVoice.data.analysed.fluency_and_coherence.strengths}/>
                          </Grid>
                          <Grid size={6}>
                            <Typography gutterBottom component="div">
                              Areas for Improvement:
                            </Typography>
                            <PointList status={'bad'} points={processedVoice.data.analysed.fluency_and_coherence.areas_for_improvement}/>
                          </Grid>
                        </Grid>
                      </div>
                      <div hidden={tab !== 2}>
                        <Grid container spacing={2}>
                          <Grid size={12}>
                            <Typography gutterBottom variant="h4" component="div" sx={{textAlign: 'center'}}>
                              {processedVoice.data.analysed.grammatical_range_and_accuracy.band_score}/9
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                              {processedVoice.data.analysed.grammatical_range_and_accuracy.detailed_feedback}
                            </Typography>
                          </Grid>
                          <Grid size={6}>
                            <Typography gutterBottom component="div">
                              Complex Structures:
                            </Typography>
                            <PointList status={'good'} points={processedVoice.data.analysed.grammatical_range_and_accuracy.structure_analysis.complex_structures}/>
                          </Grid>
                          <Grid size={6}>
                            <Typography gutterBottom component="div">
                              Errors:
                            </Typography>
                            <PointList status={'good'} points={processedVoice.data.analysed.grammatical_range_and_accuracy.structure_analysis.errors}/>
                          </Grid>
                        </Grid>
                      </div>
                      <div hidden={tab !== 3}>
                        <Grid container spacing={2}>
                          <Grid size={12}>
                            <Typography gutterBottom variant="h4" component="div" sx={{textAlign: 'center'}}>
                              {processedVoice.data.analysed.lexical_resource.band_score}/9
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                              {processedVoice.data.analysed.lexical_resource.detailed_feedback}
                            </Typography>
                          </Grid>
                          <Grid size={4}>
                            <Typography gutterBottom component="div">
                              Collocations:
                            </Typography>
                            <PointList status={'good'} points={processedVoice.data.analysed.lexical_resource.vocabulary_analysis.collocations}/>
                          </Grid>
                          <Grid size={4}>
                            <Typography gutterBottom component="div">
                              Idiomatic Expressions:
                            </Typography>
                            <PointList status={'good'} points={processedVoice.data.analysed.lexical_resource.vocabulary_analysis.idiomatic_expressions}/>
                          </Grid>
                          <Grid size={4}>
                            <Typography gutterBottom component="div">
                              Sophisticated Terms:
                            </Typography>
                            <PointList status={'good'} points={processedVoice.data.analysed.lexical_resource.vocabulary_analysis.sophisticated_terms}/>
                          </Grid>
                        </Grid>
                      </div>
                      <div hidden={tab !== 4}>
                        <Grid container spacing={2}>
                          <Grid size={12}>
                            <Typography gutterBottom variant="h4" component="div" sx={{textAlign: 'center'}}>
                              {processedVoice.data.analysed.pronunciation.band_score}/9
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                              {processedVoice.data.analysed.pronunciation.detailed_feedback}
                            </Typography>
                          </Grid>
                          <Grid size={6}>
                            <Typography gutterBottom component="div">
                              Intonation Patterns:
                            </Typography>
                            <PointList status={'good'} points={processedVoice.data.analysed.pronunciation.phonetic_analysis.intonation_patterns}/>
                          </Grid>
                          <Grid size={6}>
                            <Typography gutterBottom component="div">
                              Problem Sounds:
                            </Typography>
                            <PointList status={'bad'} points={processedVoice.data.analysed.pronunciation.phonetic_analysis.problem_sounds}/>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Grid>
                </Grid>
          }

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
