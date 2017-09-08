import moment from 'moment'

import SuccessIcon from 'react-icons/lib/fa/check-circle'
import FailureIcon from 'react-icons/lib/fa/times-circle'

import Pie from './pie'
import Popover from './popover'

const TestIcon = ({ result }) => 
    (result === 'error' || result === false) ? <span className={'orange mr1'}><FailureIcon/></span> : <span className={'green mr1'}><SuccessIcon/></span>


const Tree = ({ className, node }) =>
    <ul className={`list pl4 ${className}`}>
    {
        Object.keys(node)
            .filter(key => !key.startsWith('_'))
            .map(subnodeName => node[subnodeName])
            .map((subnode, i) => 
            subnode._test ?
                <li key={i} className="f6 black-50 mb1">
                    <TestIcon result={subnode._test.result} />

                    {subnode._test.title}

                    <strong className="f7 black-40">
                       &nbsp;*&nbsp;
                       {moment(subnode._test.startedAt).fromNow()}
                    </strong>
                    &nbsp;
                    {
                        subnode._test.outline.steps.length > 0 &&
                        
                        <Popover>
                            <h4 className="ma0 mb1">"{subnode._test.title}"</h4>
                            <ul className="list black-80 f6 ml1 pl1">
                              {
                                  subnode._test.outline.steps.map(step => 
                                    <li className="mb1" key={step.name}>
                                      { step.success !== undefined &&
                                          <TestIcon result={step.success} />}

                                      {step.actualName || step.name}
                                    </li>
                                  )
                              }
                            </ul>
                        </Popover>
                    }
                </li>
                :
                <li className="mt3" key={i}>
                    <h4 className="mv1 black-90">
                        <Pie className="mr2" pct={subnode._meta.successPct * 100} />
                        {subnode._meta.label}
                    </h4>

                    <Tree node={subnode} />
                </li>
        )
    }
    </ul>

export default Tree