import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { cardData } from 'src/constants'
import PackageCard from 'src/components/PackageCard'
import Image from 'next/image'

export default function Packages() {
  const LayoutBox = styled(Box)(({ theme }) => ({
    bgcolor: '#fff',
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    border: 'solid 1px rgba(76, 78, 100, 0.12)',
    borderRadius: '10px',
    padding: '20px',

    [theme.breakpoints.down('lg')]: {
      gap: '16px',
      padding: '10px'
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  }))

  return (
    <>
      <CssBaseline />
      <Container
        style={{ background: 'white', borderRadius: '10px', padding: '20px', marginTop: '10px' }}
        maxWidth='xl'
      >
        <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: '12px' }}>
          PACKAGES
        </Typography>

        <LayoutBox>
          {cardData.map((item, i) => (
            <PackageCard item={item} key={i} />
          ))}
        </LayoutBox>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            mb: '200px'
          }}
        >
          <Typography
            sx={{ color: '#e6411c', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '20px' }}
          >
            If you have any question please head over to FAQ section
          </Typography>
          <Button sx={{ width: '200px' }} variant='contained'>
            GO TO FAQ
          </Button>
          <Box
            sx={{
              position: 'absolute',
              right: '0',
              display: {
                xs: 'none',
                lg: 'block'
              }
            }}
          >
            <Image
              style={{
                transform: 'scaleX(-1)'
              }}
              width={400}
              height={300}
              src='/avatar.png'
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}
