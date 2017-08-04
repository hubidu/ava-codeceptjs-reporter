import React from 'react'
import 'isomorphic-fetch'
import Head from 'next/head'

import TestRun from '../components/TestRun'

export default class MyPage extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:3000/api/test-runs')
    const json = await res.json()
    return { testRuns: json }
  }

  render () {
    return (
      <div>
        <Head>
            <title>Test Report</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
             <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/monokai-sublime.css" />
        </Head>      
        {
            this.props.testRuns.map(testRun => <TestRun key={testRun.title} run={testRun}/>)
        }
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}