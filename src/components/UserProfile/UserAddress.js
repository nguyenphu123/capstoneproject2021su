import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import 'semantic-ui-css/semantic.min.css'

import { useDispatch } from 'react-redux'
import { updateUserInformation } from '../../features/User/UserSlice'

// const handleChangeDense = event => {
//   setDense(event.target.checked)
// }
const mapDispatch = { updateUserInformation }

function UserAddress ({ UserInformation }) {
  const dispatch = useDispatch()

  const [address, setAddress] = useState(UserInformation.Address)

  useEffect(() => {
    setAddress(address => address)
  }, [address])
  function handleChangeAddress (e, { value }) {
    setAddress(value)
  }

  function onSubmitChange () {
    if (address === '') {
      toast.warn('Sorry address cannot be empty')
    } else {
      const authData = {
        Id: UserInformation.Id,
        UserName: UserInformation.UserName,
        PassWord: UserInformation.PassWord,
        RankId: UserInformation.RankId,
        RoleId: UserInformation.RoleId,
        Name: UserInformation.Name,
        Phone: UserInformation.Phone,
        Address: address,
        Gender: UserInformation.Gender,
        Point: UserInformation.Point,
        Email: UserInformation.Email,
        Rank: null,
        Role: null,
        Orders: null
      }

      axios({
        method: 'put',
        url: '/api/user-management/users',
        headers: {},
        data: authData
      })
        .then(res => {
          dispatch(updateUserInformation(authData))

          toast.success('Change address successful')
        })
        .catch(function (error) {
          console.log('Show error notification!')
          return Promise.reject(error)
        })
    }
  }

  return (
    <>
      <Form size='large'>
        <Form.Input
          fluid
          icon='home'
          iconPosition='left'
          placeholder='address'
          value={address}
          label='Your address'
          onChange={handleChangeAddress}
          size='huge'
        />

        <Button onClick={onSubmitChange} color='green' size='big'>
          Save
        </Button>
      </Form>
      <ToastContainer autoClose={5000} />
    </>
  )
}

export default UserAddress
