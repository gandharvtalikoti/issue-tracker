import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";


const NewIssuePageLoading = () => {
  return (
    <Box className='max-w-xl'>
      {/* this is for title */}
      <Skeleton />

      {/* this is for description */}
      <Skeleton height="20rem" />
    </Box>
  )
}

export default NewIssuePageLoading