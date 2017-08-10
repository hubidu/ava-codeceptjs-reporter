import React from 'react'
import 'isomorphic-fetch'
import Head from 'next/head'

import Test from '../components/Test'

export default class MyPage extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:3000/api/test-runs')
    const json = await res.json()
    return { tests: json }
  }

  render () {
    return (
      <div className={''}>
        <Head>
            <title>Test Report</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/monokai-sublime.css" />
            <link rel="stylesheet" href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css"/>            
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,900" rel="stylesheet" />
        </Head> 


        <div className={'content ml1 mr1'}>
          <h1>UI Test Report</h1>
          {
              this.props.tests.map(test =>
                <Test key={test.title} test={test}/>
              )
          }
          <br/>
          <br/>
          <br/>
          <br/>
        </div>        
      </div>
    )
  }
}