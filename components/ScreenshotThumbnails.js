import styled from 'styled-components'

const Screenshot = styled.figure`
  width: 30%;
  text-align: center;
  font-style: italic;
  font-size: smaller;
  text-indent: 0;
  border: thin silver solid;
  margin: 0.5em;
  padding: 0.5em;
`

const screenshotUrl = (path, filename) => `/api/screenshots/${encodeURIComponent(path)}/${encodeURIComponent(filename)}`

export default ({ path, screenshots }) =>
    <div>
        {
            screenshots.map(s =>
                <Screenshot>
                    <img width={320} src={screenshotUrl(path, s)} alt="Error Screenshot" />
                    <figcaption>
                        {s}
                    </figcaption>
                </Screenshot>
            )
        }
    </div>