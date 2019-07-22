import React from 'react'
import ReactDOM from 'react-dom'
import TeamsList from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TeamsList />, div)
  ReactDOM.unmountComponentAtNode(div)
})
