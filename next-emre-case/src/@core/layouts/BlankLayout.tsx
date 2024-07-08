// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({}) => ({
  height: '100vh'
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper' id='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
