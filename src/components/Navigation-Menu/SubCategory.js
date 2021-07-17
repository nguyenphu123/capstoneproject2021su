

import Link from '@material-ui/core/Link'


function SubCategory ({ Id, Name }) {
  return (
    <Link to={'/Category/' + Id}>
      <span>{Name}</span>
    </Link>
  )
}

export default SubCategory
