import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { secondTableData, secondTableHead } from 'src/constants'

const SecondTable = () => {
  const colors = {
    OverDue: 'red',
    Active: 'yellow',
    'Not Assigned': 'blue'
  }

  return (
    <Table sx={{ marginTop: '20px', padding: '20px', background: '#f7f7f9' }}>
      {/* HEAD */}
      <TableHead>
        <TableRow>
          {secondTableHead.map(item => (
            <TableCell>{item}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      {/* BODY */}
      <TableBody>
        {secondTableData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell
              style={{
                color: colors[item.status],
                textShadow: '2px 2px 2px #71c7ec'
              }}
            >
              {item.status}
            </TableCell>
            <TableCell>{item.success}</TableCell>
            <TableCell style={{ fontWeight: 'bold', color: item.rate === '-12%' ? 'red' : '#72E128' }}>
              {item.rate}
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default SecondTable
