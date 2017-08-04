import ChevronDownIcon from 'react-icons/lib/fa/chevron-down'
import ChevronRightIcon from 'react-icons/lib/fa/chevron-right'

export default class  extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    handleClick(ev) {
        this.setState({visible: !this.state.visible})
    }

    render() {

        return (
            <div>
                <h4 onClick={this.handleClick.bind(this)}>
                    {
                        this.state.visible ? <ChevronDownIcon /> : <ChevronRightIcon /> 
                    }
                    
                    {this.props.label}
                </h4>

                {this.state.visible ? this.props.children : null}
            </div>
        )
    }
}
