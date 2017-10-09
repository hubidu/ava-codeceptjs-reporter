import QuestionIcon from 'react-icons/lib/fa/question-circle'

import Popover from './popover'
import SourceCodeSnippet from './SourceCodeSnippet'

const screenshotUrl = (path, filename) => `/api/screenshots/${encodeURIComponent(path)}/${encodeURIComponent(filename)}`

export default ({ testPath, lastScreenshot }) =>
  lastScreenshot.failed ?
    <Popover Icon={QuestionIcon}>
      <h4 className="light-red">
        {lastScreenshot.message}
      </h4>

      <code className="f7 mb3">
        {lastScreenshot.orgStack}
      </code>

      <SourceCodeSnippet code={lastScreenshot.codeStack[0].source} location={lastScreenshot.codeStack[0].location} />

      <img className="db" src={screenshotUrl(testPath, lastScreenshot)} alt={lastScreenshot.screenshot} />

    </Popover>
  : null
