import { Grid } from '@mui/material'
import React from 'react'
import Navigation from '../Navigation/Navigation'
import HomeSection from '../HomeSection/HomeSection'
import RightPanel from '../RightPanel/RightPanel'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import TweetDetails from '../TweetDetails/TweetDetails'

function HomePage() {
  return (
    <Grid container size={{xs: 12}} className='px-5 lg:px-36 justify-between'>

      <Grid size={{xs: 0, lg:2.5}} className='hidden lg:block w-full relative'>
        <Navigation />  
      </Grid>

      <Grid size={{xs: 12, lg:6}} className='px-5 lg:px-9 lg:block w-full relative'>
        <Routes>
          <Route path='/' element={<HomeSection />} />
          <Route path='/home' element={<HomeSection />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/tweet/:id' element={<TweetDetails />} />
        </Routes>
        
      </Grid>

      <Grid size={{xs:0, lg:3}} className='hidden lg:block w-full relative'>
        <RightPanel />
      </Grid>

    </Grid>
  )
}

export default HomePage