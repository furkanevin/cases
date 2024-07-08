import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ProjectList from 'src/components/ProjectList'
import LessonCards from 'src/components/LessonCards'
import SecondTable from 'src/components/SecondTable'

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl'>
        <Box sx={{ bgcolor: '#f7f7f9', padding: '10px' }}>
          {/* first table */}
          <ProjectList />

          {/* second side */}
          <LessonCards />
        </Box>

        {/* second table */}
        <SecondTable />
      </Container>
    </>
  )
}
