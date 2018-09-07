import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import './styles.css';

export const SortableList = SortableContainer(({songs, onDelete, searchRelatedVideos}) => {
  return (
    <div className="songListContainer">
      {(songs || []).map((song, index) =>
        <SortableItem key={`item-${index}`} index={index} i={index} song={song} onDelete={onDelete} searchRelatedVideos={searchRelatedVideos}/>
      )}
    </div>
  );
});

const SortableItem = SortableElement(({song, onDelete, i, searchRelatedVideos}) =>
  <div className="songItem" style={{background:i === 0 && 'green', borderBottom:i === 0 && '3px solid gray' }}>
    <div style={{float:'right', paddingTop:20, fontSize:30, marginTop:-15, opacity:0.7}} onClick={() => {searchRelatedVideos(song.id)}}>&#9776;</div>
    <img className="songImage" src={song.image} alt=""/>
    <div className="songTitle">{song.title}</div>
  </div>
);
