import React, { Component } from 'react'
import { Form, Button, Input, Avatar, Icon } from 'antd'

import { ApproveFlowFormProps } from './interface'
import { ApproveThreshold } from '../../../store/approveFlows/types'

import css from './style.module.css'

class ApproveFlowForm extends Component<ApproveFlowFormProps> {
  renderThresholds = () => {
    const {
      approveThresholds,
      removeApproveThreshold,
      currentTeam: { id: teamId, usersData }
    } = this.props

    return approveThresholds.map(threshold => {
      const { id: thresholdId, from, to, approversIds } = threshold
      const handleChange = this.handleInputChange(threshold)

      return (
        <Form key={thresholdId} className={css.threshold}>
          <div className={css.head}>
            <Icon type="delete" onClick={() => removeApproveThreshold(teamId, thresholdId)} />
          </div>
          <div className={css.range}>
            <Input
              type="number"
              name="from"
              addonBefore="from"
              value={from}
              onChange={handleChange}
            />
            <Input type="number" name="to" addonBefore="to" value={to} onChange={handleChange} />
          </div>
          <div className={css.approvers}>
            {approversIds.map(approverId => {
              const user = usersData.find(({ id: userId }) => userId === approverId)
              if (!user) return null

              const { first_name, last_name } = user
              return (
                <div key={approverId}>
                  <Avatar icon="user" />
                  {` ${first_name} ${last_name}`}
                </div>
              )
            })}
          </div>
        </Form>
      )
    })
  }

  handleInputChange = (threshold: ApproveThreshold) => (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      updateApproveThreshold,
      currentTeam: { id: teamId }
    } = this.props

    const { id: thresholdId } = threshold

    const { name } = evt.currentTarget
    const { value } = evt.currentTarget

    updateApproveThreshold(teamId, thresholdId, {
      ...threshold,
      [name]: parseInt(value)
    })
  }

  render() {
    const { currentTeam, addApproveThreshold } = this.props
    const { name, id: teamId } = currentTeam

    return (
      <div className={css.root}>
        <h3>Set up approvers</h3>
        <p>Who can approve requests of the team {name}</p>
        <div>
          {this.renderThresholds()}
          <Button onClick={() => addApproveThreshold(teamId)}>Add threshold</Button>
        </div>
      </div>
    )
  }
}

export default ApproveFlowForm
