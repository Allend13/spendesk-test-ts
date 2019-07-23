import React, { Component } from 'react'
import { Button, Input, Avatar, Icon, Select } from 'antd'

import { ApproveFlowFormProps } from './interface'
import { ApproveThreshold } from '../../../store/approveFlows/types'

import css from './style.module.css'

const { Option } = Select

class ApproveFlowForm extends Component<ApproveFlowFormProps> {
  private renderAddApprovers = ({ id: thresholdId }: ApproveThreshold) => {
    const {
      freeToAddUsers,
      addApproveUser,
      currentTeam: { id: teamId }
    } = this.props

    const handleChange = (userId: string) => addApproveUser(teamId, thresholdId, userId)

    return (
      <Select value="" onChange={handleChange} className={css.addApproversSelect}>
        {freeToAddUsers.map(({ id, first_name, last_name }) => (
          <Option key={id} value={id}>{`${first_name} ${last_name}`}</Option>
        ))}
      </Select>
    )
  }

  private renderThresholds = () => {
    const {
      approveThresholds,
      removeApproveThreshold,
      removeApproveUser,
      currentTeam: { id: teamId, usersData }
    } = this.props

    return approveThresholds.map(threshold => {
      const { id: thresholdId, from, to, approversIds } = threshold
      const handleChange = this.handleInputChange(threshold)

      const handleDeleteUser = (userId: string) => removeApproveUser(teamId, thresholdId, userId)

      return (
        <div key={thresholdId} className={css.threshold}>
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
              className={css.input}
            />
            <Input type="number" name="to" addonBefore="to" value={to} onChange={handleChange} />
          </div>
          <div className={css.approvers}>
            {approversIds.map(approverId => {
              const user = usersData.find(({ id: userId }) => userId === approverId)
              if (!user) return null

              const { first_name, last_name } = user
              return (
                <div key={approverId} className={css.approversItem}>
                  <Avatar icon="user" />
                  {` ${first_name} ${last_name}`}
                  <Icon
                    type="close"
                    className={css.removeIcon}
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </div>
              )
            })}
          </div>
          <div className={css.addApprovers}>
            <div>
              <strong>Add approvers: </strong>
            </div>
            {this.renderAddApprovers(threshold)}
          </div>
          <div />
        </div>
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
        <div>{this.renderThresholds()}</div>
        <div className={css.addBtn}>
          <Button onClick={() => addApproveThreshold(teamId)}>Add threshold</Button>
        </div>
      </div>
    )
  }
}

export default ApproveFlowForm
