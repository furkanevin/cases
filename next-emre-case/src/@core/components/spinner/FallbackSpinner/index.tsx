// ** MUI Import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'

const FallbackSpinner = () => {
  const theme = useTheme()
  // ** Hook

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s ease-in-out',

        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <Box
        sx={{
          width: 'fit-content',
          bgcolor: 'rgba(205, 203, 209, 0.8)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 5,
          borderRadius: '1rem'
        }}
      >
        <Image
          height={50}
          width={180}
          style={{
            backgroundColor: 'white',
            border: '1px solid grey',
            padding: '8px',
            borderRadius: '1rem'
          }}
          src={`/logos/logo-with-text-${theme.palette.mode}.svg`}
          alt='logo'
        />

        {/* Circular Progress should be around mascot image */}

        <Box
          sx={{
            position: 'relative'
          }}
        >
          <CircularProgress color='primary' size={180} thickness={1.5} disableShrink sx={{ mt: 4 }} />
          <Image
            alt='Mascot Pit'
            src='/gifs/pit-tablet.gif'
            height={150}
            width={150}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default FallbackSpinner
