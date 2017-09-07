import 'isomorphic-fetch'

export default async () => {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:3000/api/test-runs')
    const json = await res.json()
    return json    
}