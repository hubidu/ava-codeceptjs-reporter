import styled from 'styled-components'

import ScreenshotThumbnail from './ScreenshotThumbnail'
import SourceCodeSnippet from './SourceCodeSnippet'

const Container = styled.div`
    display: flex;
    & > div {
        flex:  1;
        max-width: 33%;

        .hljs {
            overflow: hidden;
        }

    }
`

export default ({run}) => 
    <div>
        {
            run.screenshots.map((s, i) =>
                <Container key={i}>
                    <ScreenshotThumbnail success={s.success} title={s.page.title} url={s.page.url} path={run.path} screenshot={s.screenshot} />
                    {
                        s.codeStack.map((cs, i) => 
                            <SourceCodeSnippet key={i} code={cs.source} location={cs.location} />
                        )
                    }
                </Container>
            )
        }

    </div>