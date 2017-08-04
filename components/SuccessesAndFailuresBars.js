import moment from 'moment'
import styled from 'styled-components'

const BarContainer = styled.div`
    width: ${props => props.width}px;
    line-height: ${props => props.height}px;
    height: ${props => props.height}px;
    background-color: #f4f4f4;
`

const Bar = styled.span`
    display: inline-block;
    vertical-align: bottom;
    background-color: ${props => props.success === true ? 'MediumSpringGreen' : 'OrangeRed'};
    margin-right: ${props => props.barGap}px;
    width: ${props => props.width}px;
    height: ${props => Math.ceil(props.height)}px;
`

const defaultLabelFormatFn = d => moment(d.t).fromNow() + ', ' + d.value + ' s'

export default ({ data, labelFormatFn = defaultLabelFormatFn, maxBars = 10, maxValue = 120 }) => {
    const BarWidth = 10
    const BarGap = 1
    const Height = 20
    const Width = maxBars * (BarWidth + BarGap)

    const dataSlice = data.reverse().slice(0, maxBars - 1)

    return (
        <BarContainer height={Height} width={Width}>
            {
                dataSlice.map((d, i) => 
                    <Bar key={i} 
                        title={labelFormatFn(d)} 
                        barGap={BarGap} 
                        width={BarWidth} 
                        height={d.value * Height / maxValue} 
                        success={d.success}>
                    </Bar>
                )
            }
        </BarContainer>
    )
}
