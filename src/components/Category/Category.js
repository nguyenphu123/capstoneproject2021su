import '../../App.css'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { red } from '@material-ui/core/colors'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
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
  )
}

export default Category
