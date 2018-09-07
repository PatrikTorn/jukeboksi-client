import React from 'react';
import './styles.css';
import {Grid, Row, Col, Button} from 'react-bootstrap';

export const GridList = ({onClick, songs}) => (
  <div className="songList">
    <Grid>
      {songs.map(({snippet, id}, i)=> (
      <Rows i={i}>
        <Col md={4} xs={12}>
          <div className="songItem" onClick={() => onClick({snippet, id})} key={i}>
            <img className="songImage" src={snippet.thumbnails.medium.url} alt=""/>
            <div className="songTitle">{snippet.title}</div>
          </div>
        </Col>
      </Rows>
      ))}
    </Grid>
  </div>
);

const Rows = (props) => {
  if((props.i + 1) % 3 === 0){
    return(
      <Row>
        {props.children}
      </Row>
    )
  }
  return props.children;
}
