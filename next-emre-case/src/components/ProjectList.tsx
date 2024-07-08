import {
  Avatar,
  AvatarGroup,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { firstTableData, firstTableHead } from 'src/constants'
import ProgressWithLabel from './ProgressWithLabel'
import { styled } from '@mui/material/styles'

const ProjectList = () => {
  const Label = styled(Typography)(({ theme }) => ({
    fontSize: '12px',

    [theme.breakpoints.up('md')]: {
      fontSize: '14px'
    }
  }))

  return (
    <TableContainer>
      <Table
        sx={{
          boxShadow: 20,
          marginTop: '20px',
          padding: '20px',
          background: '#fff',
          borderRadius: '10px',
          fontSize: { xs: '13px', sm: '15px' }
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='h4' align='left' color={'#9e9fab'} fontSize={{ xs: '14px', md: '30px' }}>
                Project List
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ background: '#f7f7f9' }}>
            {firstTableHead.map(item => (
              <TableCell>
                <Label>{item}</Label>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            fontSize: { xs: '13px', sm: '15px' }
          }}
        >
          {firstTableData.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <AvatarGroup>
                  <Avatar
                    sx={{ width: { xs: '20px', sm: '30px' }, height: { xs: '20px', sm: '30px' } }}
                    src={item.image}
                  ></Avatar>
                </AvatarGroup>
                <Typography>
                  <Label>{item.name}</Label>
                </Typography>
              </TableCell>
              <TableCell>
                <Label>{item.totalTask}</Label>
              </TableCell>
              <TableCell>
                <Box sx={{ width: '100%' }}>
                  <ProgressWithLabel
                    value={item.progress}
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: item.progress > 50 ? '#72E128' : '#E6411C'
                      }
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Label>{item.hours}</Label>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectList
