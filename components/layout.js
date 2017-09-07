import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
        <title>{ title }</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />

        <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/monokai-sublime.css" />
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css"/>            
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,900" rel="stylesheet" />
    </Head> 

    { children }
    
  </div>
)