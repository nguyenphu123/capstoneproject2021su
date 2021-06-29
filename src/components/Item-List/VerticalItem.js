import '../../App.css'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Rating } from 'semantic-ui-react'

const useStyles = makeStyles({
  card: {
    width: 200,
    margin: 10,
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 1)'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {},
  media: {
    height: 10,
    paddingTop: '56.25%' // 16:9
  },
  LikeButton: {
    '&:hover': {
      color: 'red'
    }
  },
  ShareButton: {
    '&:hover': {
      color: 'green'
    }
  },
  AddToWishlistButton: {
    '&:hover': {
      color: 'blue'
    }
  }
})

function VerticalItem ({
  Id,
  Name,
  Price,
  Quantity,
  Star,
  Description,
  Code,
  CurrentPrice,
  CategoryId,
  Status,
  ImageStorages
}) {
  const classes = useStyles()

  return (
    <Link to={'/Product/' + Id}>
      <Card className={classes.card}>
        <div className='item'>
          <div className='item-inner'>
            <div className='item-img'>
              <div className='item-img-info'>
                <CardMedia
                  className={classes.media}
                  image={ImageStorages[0].ImageUrl}
                  title='Paella dish'
                />

                <div className='new-label new-top-left'>Hot</div>
                <div className='sale-label sale-top-left'>
                  -{CurrentPrice / Price}%
                </div>
                <div className='item-box-hover'>
                  <div className='box-inner'>
                    <div className='product-detail-bnt'>
                      <Link className='button detail-bnt'>
                        <span>Quick View</span>
                      </Link>
                    </div>
                    <div className='actions'>
                      <span className='add-to-links'>
                        <Link
                          href='#'
                          className='link-wishlist'
                          title='Add to Wishlist'
                        >
                          <span>Add to Wishlist</span>
                        </Link>
                        <Link
                          href='#'
                          className='link-compare add_to_compare'
                          title='Add to Compare'
                        >
                          <span>Add to Compare</span>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='add_cart'>
                {/* <button className='button btn-cart' type='button'>
                  <span>Add to Cart</span>
                </button> */}
              </div>
            </div>
            <div className='item-info'>
              <div className='info-inner'>
                <div className='item-title'>{Name}</div>
                <div className='item-content'>
                  <div className='rating'>
                    <div className='ratings'>
                      <div className='rating-box'>
                        <div className='rating'></div>
                      </div>
                      <p className='rating-links'>
                        <Link href='#'>1 Review(s)</Link>
                        <span className='separator'>|</span>
                        <Link href='#'>Add Review</Link>
                      </p>
                    </div>
                  </div>
                  <div className='item-price'>
                    <div className='price-box'>
                      <span className='regular-price'>
                        <span className='price'>{CurrentPrice},000 vnd</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <CardMedia
          className={classes.media}
          image={ImageStorages[0].ImageUrl}
          title='Paella dish'
        />
        <CardContent>
          <Typography variant='h5' component='h2'>
            {Name}
          </Typography>
          <Typography className={classes.title} color='red' gutterBottom>
            <Header as='h6' color='red'>
              {CurrentPrice},000 vnd
            </Header>
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {CurrentPrice === Price ? null : (
              <>
                <span style={{ textDecoration: 'line-through' }}>
                  {Price},000 vnd
                </span>
                <span>-{CurrentPrice / Price}%</span>
              </>
            )}
          </Typography>
          <Rating maxRating={5} />
          <CardActions>
            <IconButton
              onClick={e => e.preventDefault()}
              className={classes.LikeButton}
              aria-label='add to favorites'
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              onClick={e => e.preventDefault()}
              className={classes.ShareButton}
              aria-label='share'
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={e => e.preventDefault()}
              className={classes.AddToWishlistButton}
              aria-label='Add to watch list'
            >
              <AddCircleIcon />
            </IconButton>
          </CardActions>
        </CardContent> */}
      </Card>
    </Link>
  )
  // <Card as='a'>
  //   <Card.Content textAlign='left' href={'/Product/' + Id}>
  //     <Image src={ImageStorages[0].ImageUrl} size='small' />

  //     <Card.Header>{Name}</Card.Header>
  //     <Card.Meta>

  //     </Card.Meta>
  //     <Card.Description>
  //       <Header as='h3' color='red'>

  //       </Header>
  //     </Card.Description>
  //   </Card.Content>
  //   <Card.Content textAlign='left' extra>
  //     <Rating icon='star' defaultRating={5} maxRating={5} disabled />
  //   </Card.Content>
  //   <Card.Content extra>
  //     <Button basic size='mini' color='green'>
  //       <Icon name='shopping cart' />
  //     </Button>
  //     <Button basic size='mini' color='red'>
  //       <Icon name='heart' />
  //     </Button>
  //   </Card.Content>
  // </Card>
}

export default VerticalItem
