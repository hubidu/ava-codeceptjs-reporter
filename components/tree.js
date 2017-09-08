import moment from 'moment'

import SuccessIcon from 'react-icons/lib/fa/check-circle'
import FailureIcon from 'react-icons/lib/fa/times-circle'

import Pie from '../components/pie'

const Tree = ({ className, node }) =>
    <ul className={`list pl4 ${className}`}>
    {
        Object.keys(node)
            .filter(key => !key.startsWith('_'))
            .map(subnodeName => 
            node[subnodeName]._test ?
                <li key={subnodeName} className="f6 black-50 mb1">
                    {node[subnodeName]._test.result === 'error' ? <span className={'orange mr1'}><FailureIcon/></span> : <span className={'green mr1'}><SuccessIcon/></span>}

                    {node[subnodeName]._test.title}

                    <strong className="f7 black-40">
                       &nbsp;*&nbsp;
                       {moment(node[subnodeName]._test.startedAt).fromNow()}
                    </strong>
            
                </li>
                :
                <li className="mt3" key={subnodeName}>
                    <h4 className="mv1 black-90">
                        <Pie className="mr2" pct={node[subnodeName]._meta.successPct * 100} />
                        {node[subnodeName]._meta.label}
                    </h4>

                    <Tree node={node[subnodeName]} />
                </li>
        )
    }
    </ul>

export default Tree