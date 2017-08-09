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

// const Category = styled.h4`
//     font-family: Arial, sans-serif;
//     font-weight: normal;
//     color: #aaa;
//     margin: 4em 0 0 0;
// `

// const ErrorMessage = styled.h4`
//     color: OrangeRed;
//     border: 1px solid OrangeRed;
//     padding: 1em;
//     text-align: center;
// `

const Info = styled.div`
    font-family: Arial, sans-serif;
    font-size: 0.8em;
    color: #aaa;
    margin: 1em 0 0 0;
`

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
const screenshotUrl = run => `/api/screenshots/${encodeURIComponent(run.path)}/${encodeURIComponent(run.error.screenshot)}`
const mapToSuccessAndFailure = runs => runs.map(run => ({ t: run.startedAt, value: run.duration, success: run.result === 'success'}))

const enhance = withState('selectedTestRun', 'setSelectedTestRun', 0)

export default enhance(({ test, selectedTestRun, setSelectedTestRun }) => {
    return (
    <div>
        <div className={'ml4 black-30'}>{currentRun(test, selectedTestRun).prefix}</div>
        <h2 className={'f5 f4-m f3-l fw2 black-70 mt0 mb1 lh-copy'}>
            {currentRun(test, selectedTestRun).result === 'error' ? 
                <Red><FailureIcon/></Red> : <Green><SuccessIcon/></Green>}
            {currentRun(test, selectedTestRun).title}
        </h2>

        <div className={'ml4'}>
        
            <div className={'f6 mt0 mb1 black-40'}>
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

            <Collapsible label={`Screenshots (${test.runs.length})`}>
                <ScreenshotThumbnailsWithSourceCode run={currentRun(test, selectedTestRun)} />
            </Collapsible>

            <p>
            </p>
        
        </div>

    </div>
    )
})