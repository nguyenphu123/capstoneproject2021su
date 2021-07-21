import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import Title from '../../Assets/Title'
import 'semantic-ui-css/semantic.min.css'

// const handleChangeDense = event => {
//   setDense(event.target.checked)
// }

function UserAddress ({ UserInformation }) {
  const [address, setAddress] = useState('')
  useEffect(() => {
    if (
      UserInformation.Address === null ||
      UserInformation.Address === undefined ||
      typeof UserInformation.Address === undefined
    ) {
    } else {
      setAddress(UserInformation.Address)
    }
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
        Email: UserInformation.Email
      }

      axios({
        method: 'put',
        url: '/api/user-management/users',
        headers: {},
        data: authData
      })
        .then(res => {
          toast.success('Change password successful')
        })
        .catch(function (error) {
          console.log('Show error notification!')
          return Promise.reject(error)
        })
    }
  }

  return (
    <>
      <Title Name='Your address' />

      <Form size='large'>
        <Form.Input
          fluid
          icon='home'
          iconPosition='left'
          placeholder='address'
          type='password'
          value={address}
          label='Your address'
          onChange={handleChangeAddress}
        />

        <Button onClick={onSubmitChange} color='green' size='large'>
          Save
        </Button>
      </Form>
      <ToastContainer autoClose={5000} />
    </>
  )
}

export default UserAddress
