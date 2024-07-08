import React from 'react'
import { Box, AvatarGroup, Avatar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import styled from '@emotion/styled'
import { lessons } from 'src/constants'

const LessonCards = () => {
  const LessonBox = styled(AvatarGroup)({
    borderStyle: 'dashed',
    padding: '20px',
    borderColor: 'gray',
    borderRadius: '10px',
    borderWidth: '2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '120px'
  })

  return (
    <>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h4' mt={'40px'} align='left' color={'#9e9fab'}>
          Progress By Course
          <Typography color={'#9798a5'}>%82 Improvement on Score</Typography>
        </Typography>
        <Typography color='#9798a5'>
          <MoreVertIcon />
        </Typography>
      </Box>

      <Box
        mt={'20px'}
        sx={{
          display: 'flex',
          gap: {
            xs: '20px',
            md: '50px'
          },
          flexWrap: 'wrap'
        }}
      >
        {lessons.map(lesson => (
          <LessonBox style={lesson.styles}>
            <Typography color={'#6c6d7f'}>{lesson.title}</Typography>
            <Avatar src={lesson.img}></Avatar>
          </LessonBox>
        ))}
      </Box>
    </>
  )
}

export default LessonCards
