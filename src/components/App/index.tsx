import React from 'react'
import css from './style.module.css'

import Routes from '../../routes'

const App: React.FC = () => {
  return (
    <div className={css.root}>
      <Routes />
    </div>
  )
}

export default App
