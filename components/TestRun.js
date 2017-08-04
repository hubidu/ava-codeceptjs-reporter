import styled from 'styled-components'
import Highlight from 'react-highlight'
import Ansi from 'ansi-to-react'
import moment from 'moment'

import ScreenshotThumbnails from './ScreenshotThumbnails'
import SuccessesAndFailuresBars from './SuccessesAndFailuresBars'
import Collapsible from './Collapsible'

import SuccessIcon from 'react-icons/lib/fa/thumbs-o-up'
import FailureIcon from 'react-icons/lib/fa/thumbs-o-down'

const Category = styled.h4`
    font-family: Arial, sans-serif;
    font-weight: normal;
    color: #aaa;
    margin: 4em 0 0 0;
`

const Title = styled.h2`
    content: '&#10004;';
    font-family: Arial, sans-serif;
    color: #666;
    margin: 0.5em 0 0.3em 0;
`

const ErrorMessage = styled.h4`
    color: OrangeRed;
    border: 1px solid OrangeRed;
    padding: 1em;
    text-align: center;
`

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
const firstRun = testRun => testRun.runs[0]
const lastRun = testRun => testRun.runs[testRun.runs.length - 1]
const sourceCode = run => run.error.sourceCode
    .map(entry => {
        return entry.line === run.error.sourceLocation.line ?
            entry.line + ' ==>' + entry.value
            : entry.line + '    ' + entry.value
    }).join('\n')
const screenshotUrl = run => `/api/screenshots/${encodeURIComponent(run.path)}/${encodeURIComponent(run.error.screenshot)}`
const mapToSuccessAndFailure = runs => runs.map(run => ({ t: run.startedAt, value: run.duration, success: run.result === 'success'}))

export default ({ run }) => {
    return (
    <div>
        <Category>{firstRun(run).prefix}</Category>
        <Title>
            {lastRun(run).result === 'error' ? 
                <Red><FailureIcon/></Red> : <Green><SuccessIcon/></Green>}
            {firstRun(run).title}
        </Title>
        <SuccessesAndFailuresBars data={mapToSuccessAndFailure(run.runs)} maxBars={50} />
        <Info>
            last run <b>{moment(lastRun(run).startedAt).fromNow()}</b>
            &nbsp;|&nbsp;
            <b>{run.runs.length}</b> runs
            |&nbsp;
            <b>{ Math.floor(avgDuration(run))}s</b> avg duration
        </Info>
        { lastRun(run).result === 'success' ?
            <Collapsible label="Screenshots">
                <ScreenshotThumbnails path={lastRun(run).path} screenshots={lastRun(run).screenshots} />
            </Collapsible>
            : null
        }

        { lastRun(run).result === 'error' ?
            <div>
                <ErrorMessage>
                    <Ansi>
                        {lastRun(run).error.message}
                    </Ansi>
                </ErrorMessage>

                <h4>In Source</h4>
                <small>{lastRun(run).error.sourceLocation.file}</small>
                <Highlight className="javascript">
                    {sourceCode(lastRun(run))}
                </Highlight>


                <h4>Stacktrace</h4>
                <pre>
                    {lastRun(run).error.stack}
                </pre>
                
                <h4>Screenshot</h4>
                <a href={lastRun(run).error.pageUrl}>{lastRun(run).error.pageUrl}</a>
                <h6>{lastRun(run).error.pageTitle}</h6>
                <img width={320} src={screenshotUrl(lastRun(run))} alt="Error Screenshot"/>
            </div>

            : null
        }
        <p>
        </p>
    </div>
    )
}