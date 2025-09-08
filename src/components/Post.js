import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';


export default function Post({ post, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {post.content ? `${post.content.substring(0, 100)}...` : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={() => onDelete(post.id)}>
          削除
        </Button>
      </CardActions>
    </Card>
  );
}