import React from 'react'

import Layout from '../components/layout'
import Tree from '../components/tree'

import getTestRuns from '../services/get-test-runs'
import makeTree from '../services/make-tree'

export default class TreePage extends React.Component {
  static async getInitialProps () {
    const testRuns = await getTestRuns()
    const tree = makeTree(testRuns)

    return { tree }
  }

  render () {
    return (
      <Layout title="UI-Test Tree"> 
        <h1 className="silver mt1">
        UI-Test Tree
        </h1>

        <Tree node={this.props.tree} />
      </Layout>
    )
  }
}