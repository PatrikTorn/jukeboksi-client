export const arraysEqual = (arr1, arr2) => {
  if(arr1.length !== arr2.length)
      return false;
  for(var i = arr1.length; i--;) {
      if(arr1[i] !== arr2[i])
          return false;
  }
  return true;
}

export const getEventCoords = (event) => {
  if(!event.x){
    return {x:event.changedTouches[0].clientX, y:event.changedTouches[0].clientY}
  }else{
    return {x:event.x, y:event.y}
  }
}




  // import SpotifyPlayer from 'react-spotify-player';
  // const token = `BQBfJnMJUjl6bS-H8P6rw5lzpoNjyJmFs1B8whexgOm3T4JW2x8wQQg687wEnulD9Mtf4hm5s0bbh9xy108gLhKmGWUoopkkoIFnm53SV_XdSP0jAmDJ8jwMEW4C8ez3JHY-r71QnktitVMoc05TmDmMwhFhECnF`;
  // fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`,  {
  //   headers: {
  //     Authorization:  `Bearer ${token}`
  //   }
  // })
  // .then(res => res.json())
  // .then(data => console.log(data));
  // <SpotifyPlayer
  //   uri="spotify:track:0nLiqZ6A27jJri2VCalIUs"
  //   size={{width:'100%', height:300}}
  //   view={'list'}
  //   theme={'black'}
  // />
