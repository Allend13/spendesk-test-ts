import React from 'react'
import ReactDOM from 'react-dom'
import ApproveFlowForm from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ApproveFlowForm />, div)
  ReactDOM.unmountComponentAtNode(div)
})
