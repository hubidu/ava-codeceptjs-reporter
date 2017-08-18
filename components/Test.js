import styled from 'styled-components'
import Highlight from 'react-highlight'
import Ansi from 'ansi-to-react'
import moment from 'moment'

import ScreenshotThumbnailsWithSourceCode from './ScreenshotThumbnailsWithSourceCode'
import SuccessesAndFailuresBars from './SuccessesAndFailuresBars'
import Collapsible from './Collapsible'

import SuccessIcon from 'react-icons/lib/fa/check-circle'
import FailureIcon from 'react-icons/lib/fa/times-circle'

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
    const current = currentRun(test, selectedTestRun)

    return (
        <div>
            <div className="flex">
                <div className="flex-auto">

                    <div className={'f7 black-40'}>{current.prefix}</div>
                    <h2 className={'f4 fw1 black-70 mt2 mb2'}>
                        {current.result === 'error' ? 
                            <span className={'orange mr1'}><FailureIcon/></span> : <span className={'green mr1'}><SuccessIcon/></span>}
                        {current.title}
                    </h2>           


                </div>
                <div>
                    <div className={'f7 mt0 mb1 black-40'}>
                        last run <b>{moment(current.startedAt).fromNow()}</b>
                        &nbsp;|&nbsp;
                        <b>{test.runs.length}</b> runs
                        |&nbsp;
                        <b>{Math.floor(avgDuration(test))}s</b> avg duration
                    </div>

                    <SuccessesAndFailuresBars 
                        data={mapToSuccessAndFailure(test.runs)} 
                        maxBars={50}
                        selectedBar={selectedTestRun}
                        onBarClicked={barIndex => setSelectedTestRun(barIndex)}
                    />
                </div>
                
            </div>

            { currentRun(test, selectedTestRun).result === 'error' ?
                <div>
                    <div className={'ba orange b--light-red br2 mt4 pa3'}>
                        <Ansi>{current.error.message}</Ansi>
                    </div>
                </div>

                : null
            }

            <Collapsible label={`Screenshots (${current.screenshots.length})`}>
                <ScreenshotThumbnailsWithSourceCode run={current} />
            </Collapsible>

            <p>
            </p>
                
        </div>
    )
})