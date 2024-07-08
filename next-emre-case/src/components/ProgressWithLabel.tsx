import { Box, Typography } from '@mui/material'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'

function ProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          mr: 1,
          display: {
            xs: 'hidden',
            md: 'block'
          }
        }}
      >
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box>
        <Typography
          fontSize={{
            xs: '12px',
            md: '14px'
          }}
          variant='body2'
          color='text.secondary'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default ProgressWithLabel
