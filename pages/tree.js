import React from 'react'

import Layout from '../components/layout'
import Tree from '../components/tree'
import getTestRuns from '../services/get-test-runs'

export default class TreePage extends React.Component {
  static async getInitialProps () {
    const testRuns = await getTestRuns()
    const tests = testRuns.map(test => Object.assign({}, test.runs[0]))

    const tree = tests.reduce((result, test) => {
        const prefixes = test.prefix.split(/\s*--\s*/)
        const prefixesAndTest = prefixes.concat(test)

        prefixesAndTest.reduce((agg, prefixOrTest) => {
            if (typeof prefixOrTest === 'object') {
                agg.test = prefixOrTest
                return agg
            } else {
                agg[prefixOrTest] = agg[prefixOrTest] ? agg[prefixOrTest] : {}
                return agg[prefixOrTest]
            }
        }, result)

        return result
    }, {})

    console.log(tree)

    // console.log(tree.versicherungscenter['tarife-vergleichen'].hausratversicherung.test)
    
    return { tree }
  }

  render () {
    return (
      <Layout title="Test Tree"> 
        <div className={'content mh6'}>
          <h1>Test Tree</h1>
          
          <Tree node={this.props.tree} />
        </div>        
      </Layout>
    )
  }
}