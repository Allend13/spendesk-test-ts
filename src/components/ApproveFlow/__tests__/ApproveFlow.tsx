import React from 'react'
import ReactDOM from 'react-dom'
import ApproveFlow from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ApproveFlow />, div)
  ReactDOM.unmountComponentAtNode(div)
})
