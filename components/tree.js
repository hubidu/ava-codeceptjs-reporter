import SuccessIcon from 'react-icons/lib/fa/check-circle'
import FailureIcon from 'react-icons/lib/fa/times-circle'

const Tree = ({ node }) =>
    <ul className="list mv2 pl4">
    {
        Object.keys(node).map(subnodeName => 
            subnodeName === 'test' ?
                <li className="f7 black-40">
                    {node.test.result === 'error' ? <span className={'orange mr1'}><FailureIcon/></span> : <span className={'green mr1'}><SuccessIcon/></span>}

                    {node.test.title}
                </li>
                :
                <li key={subnodeName}>
                    <h4 className="mv1">
                        {subnodeName}
                    </h4>

                    <Tree node={node[subnodeName]} />
                </li>
        )
    }
    </ul>

export default Tree