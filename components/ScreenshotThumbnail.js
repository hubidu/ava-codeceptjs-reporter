import styled from 'styled-components'

const Screenshot = styled.div`
  width: 30%;
  text-align: center;
  text-indent: 0;
  border: thin silver solid;
  margin: 0.5em;
  border-color: ${props => props.success === true ? 'MediumSpringGreen' : 'OrangeRed'}  
`

const screenshotUrl = (path, filename) => `/api/screenshots/${encodeURIComponent(path)}/${encodeURIComponent(filename)}`

export default ({ success, title, url, path, screenshot }) =>
    <Screenshot success={success}>
        <figure>
            <h6>{title}</h6>
            <h6>
                <a href={url}>{url}</a>
            </h6>
            <img width={320} src={screenshotUrl(path, screenshot)} alt="Screenshot" />
            <figcaption>
                {screenshot}
            </figcaption>
        </figure>
    </Screenshot>
