import React, { useState, useEffect, useRef } from 'react'
import { Button, Form } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { logout } from '../../features/User/UserSlice'
import { useDispatch } from 'react-redux'
import { toastCalling } from '../../features/Toast/ToastSlice'

import { Redirect } from 'react-router-dom'

var SHA256 = require('crypto-js/sha256')

const mapDispatch = { logout, toastCalling }

function UserNewPassword ({ UserInformation }) {
  const dispatch = useDispatch()

  const [newPassword, setNewPassword] = useState('')
  const [matchNewPassword, setMatchNewPassword] = useState('')
  const isFirstRun1 = useRef(true)
  const isFirstRun2 = useRef(true)
  const [isComplete, setIsComplete] = useState(false)
  useEffect(() => {
    if (isFirstRun1.current) {
      isFirstRun1.current = false
      if (
        UserInformation.PassWord === null ||
        UserInformation.PassWord === undefined ||
        typeof UserInformation.PassWord === undefined
      ) {
        setIsComplete(true)
      } else {
        setNewPassword(UserInformation.PassWord)
      }
      return
    } else {
    }
  }, [newPassword])
  useEffect(() => {
    if (isComplete) {
      setIsComplete(isComplete => isComplete)
    }
  }, [isComplete])
  useEffect(() => {
    if (isFirstRun2.current) {
      isFirstRun2.current = false
      if (
        UserInformation.PassWord === null ||
        UserInformation.PassWord === undefined ||
        typeof UserInformation.PassWord === undefined
      ) {
        setIsComplete(true)
      } else {
        setNewPassword(UserInformation.PassWord)
      }

      return
    } else {
      if (matchNewPassword !== newPassword) {
        toast.warn('Your password does not match')
      } else {
      }
    }
  }, [matchNewPassword])

  function handleChangePassword (e, { value }) {
    setNewPassword(value)
  }
  function handleChangeMatchPassword (e, { value }) {
    setMatchNewPassword(value)
  }
  function onSubmitChange () {
    if (newPassword === '') {
      toast.warn('Sorry password cannot be empty')
    } else {
      if (newPassword < 8) {
        toast.warn('Sorry password cannot be under 8 character')
      } else {
        var reg = /^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/
        var test = reg.test(newPassword)
        console.log(newPassword)
        if (test) {
          const authData = {
            Id: UserInformation.Id,
            UserName: UserInformation.UserName,
            PassWord: SHA256(newPassword).toString(),
            RankId: UserInformation.RankId,
            RoleId: UserInformation.RoleId,
            Name: UserInformation.Name,
            Phone: UserInformation.Phone,
            Address: UserInformation.Address,
            Gender: UserInformation.Gender,
            Point: UserInformation.Point,
            Email: UserInformation.Email
          }

          axios({
            method: 'put',
            url: '/api/user-management/users',
            headers: {},
            data: authData
          })
            .then(res => {
              dispatch(toastCalling('Change password successful'))

              toast.success('Change password successful')
              setIsComplete(true)
              dispatch(logout())
            })
            .catch(function (error) {
              console.log('Show error notification!')
              return Promise.reject(error)
            })
        } else {
          toast.warn('password must contain atleast a letter and a number')
        }
      }
    }
  }
  if (isComplete) {
    return (
      <>
        <ToastContainer autoClose={5000} />

        <Redirect to={'/ResetPassword'} />
      </>
    )
  } else {
    return (
      <>
        <Form size='large'>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder=' Password'
            type='password'
            value={newPassword}
            label='New Password'
            onChange={handleChangePassword}
            size='huge'
          />

          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Reapet new Password'
            type='password'
            value={matchNewPassword}
            label='Re enter new password'
            onChange={handleChangeMatchPassword}
            size='huge'
          />
          <Button onClick={onSubmitChange} color='green' size='big'>
            Change
          </Button>
        </Form>
        <ToastContainer autoClose={5000} />
      </>
    )
  }
}
export default UserNewPassword
