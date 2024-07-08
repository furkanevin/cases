import { Box, Button, Card, CardContent, LinearProgress, Typography } from '@mui/material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import HelpIcon from '@mui/icons-material/Help'
import SendIcon from '@mui/icons-material/Send'
import {styled} from '@mui/material/styles'
import { Card as CardType } from 'src/types'

const PackageCard = ({ item }: { item: CardType }) => {
  const CardInfo = styled(CardContent)({ display: 'flex', gap: '6px', alignItems: 'center', padding: '0px' })
  const Badge = styled(Typography)({
    color: 'red',
    background: 'rgba(211,211,211,0.4)',
    width: '50px',
    textAlign: 'center',
    fontWeight: 'medium',
    padding: '4px',
    borderRadius: '10px',
    mt: '10px'
  })

  return (
    <Card
      sx={{ width: '100%', boxShadow: 'none', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <Typography>{item.title}</Typography>
      {/* 1 */}
      <Badge>{item.shortTag}</Badge>

      <CardInfo>
        <PermIdentityIcon />
        <Typography color='#868796'>{item.price}</Typography>
      </CardInfo>

      {/* 2 */}
      <CardInfo>
        <CloudQueueIcon />
        <Typography color='#868796'>{item.examContent}</Typography>
      </CardInfo>

      {/* 3 */}
      <CardInfo>
        <HelpIcon />
        <Typography color='#868796'>{item.date}</Typography>
      </CardInfo>

      {/* days */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
          <Typography sx={{ fontSize: 12 }}>Days</Typography>
          <Typography sx={{ fontSize: 12 }}> 26 of 30 Days</Typography>
        </Box>
        <LinearProgress variant='determinate' value={item.progress} />
        <Typography sx={{ fontSize: 13, marginBottom: ' 10px', color: '#868796' }}>{item.desc}</Typography>
      </Box>

      <Button sx={{ width: '100%' }} startIcon={<SendIcon />} variant='contained'>
        {item.btn}
      </Button>
    </Card>
  )
}

export default PackageCard
