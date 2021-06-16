import '../../App.css'
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 150,
      '&:hover': {
      transform: 'scale3d(1.05, 1.05, 1)'
    }
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
)

function Category ({ Id, Name, img }) {
  const classes = useStyles()

  return (
    <div>
      <Link to={'/Category/' + Id}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={img}
            title='Paella dish'
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {Name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
    // <Grid.Column>
    //   <Card href={'/Category/' + Id}>
    //     <Image
    //       size='small'
    //       src={`/${'assets/img/categories/category-1.jpg'}`}
    //       wrapped
    //       ui={false}
    //     />
    //     <Card.Content>
    //       <Card.Description>{Name}</Card.Description>
    //     </Card.Content>
    //   </Card>
    // </Grid.Column>
  )
}

export default Category
