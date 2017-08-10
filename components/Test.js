import styled from 'styled-components'
import Highlight from 'react-highlight'
import Ansi from 'ansi-to-react'
import moment from 'moment'

import ScreenshotThumbnailsWithSourceCode from './ScreenshotThumbnailsWithSourceCode'
import SuccessesAndFailuresBars from './SuccessesAndFailuresBars'
import Collapsible from './Collapsible'

import SuccessIcon from 'react-icons/lib/fa/thumbs-o-up'
import FailureIcon from 'react-icons/lib/fa/thumbs-o-down'

import { withState } from 'recompose'

const Green = styled.span`
    color: MediumSpringGreen;
    margin-right: 10px;
`
const Red = styled.span`
    color: OrangeRed;
    margin-right: 10px;
`

const avgDuration = testRun => testRun.runs.map(run => run.duration).reduce((sum, duration) => sum + duration, 0) / testRun.runs.length
const currentRun = (testRun, i) => testRun.runs[i]
const sourceCode = run => run.error.sourceCode
    .map(entry => {
        return entry.line === run.error.sourceLocation.line ?
            entry.line + ' ==>' + entry.value
            : entry.line + '    ' + entry.value
    }).join('\n')
// const screenshotUrl = run => `/api/screenshots/${encodeURIComponent(run.path)}/${encodeURIComponent(run.error.screenshot)}`
const mapToSuccessAndFailure = runs => runs.map(run => ({ t: run.startedAt, value: run.duration, success: run.result === 'success'}))

const enhance = withState('selectedTestRun', 'setSelectedTestRun', 0)

export default enhance(({ test, selectedTestRun, setSelectedTestRun }) => {
    return (
    <div>
        <div className={'f7 black-40'}>{currentRun(test, selectedTestRun).prefix}</div>
        <h2 className={'f4 fw1 black-70 mt2 mb2'}>
            {currentRun(test, selectedTestRun).result === 'error' ? 
                <span className={'orange mr1'}><FailureIcon/></span> : <span className={'green mr1'}><SuccessIcon/></span>}
            {currentRun(test, selectedTestRun).title}
        </h2>


        <div className={''}>
        
            <div className={'f7 mt0 mb1 black-40'}>
                last run <b>{moment(currentRun(test, selectedTestRun).startedAt).fromNow()}</b>
                &nbsp;|&nbsp;
                <b>{test.runs.length}</b> runs
                |&nbsp;
                <b>{ Math.floor(avgDuration(test))}s</b> avg duration
            </div>


            <SuccessesAndFailuresBars 
                data={mapToSuccessAndFailure(test.runs)} 
                maxBars={50}
                selectedBar={selectedTestRun}
                onBarClicked={barIndex => setSelectedTestRun(barIndex)}
            />


            { currentRun(test, selectedTestRun).result === 'error' ?
                <div>
                    <div className={'ba orange b--light-red br2 mt4 pa3'}>
                        <Ansi>{currentRun(test, selectedTestRun).error.message}</Ansi>
                    </div>
                </div>

                : null
            }

            <Collapsible label={`Screenshots (${currentRun(test, selectedTestRun).screenshots.length})`}>
                <ScreenshotThumbnailsWithSourceCode run={currentRun(test, selectedTestRun)} />
            </Collapsible>

            <p>
            </p>
            
        </div>
    </div>
    )
})