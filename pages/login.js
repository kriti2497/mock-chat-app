import AddDB from '../components/add-db'
import { Grid } from '@mui/material'
import LoginUser from '../components/login-user'
import React from 'react'

const Login = () => {
  return (
    <Grid>
        <AddDB />
        <LoginUser />
    </Grid>
  )
}

export default Login