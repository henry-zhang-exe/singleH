import singleH from "./singleH_pfp.png"
import './App.css';
//import ReviewsData from "./singleH_example.js"
import ReviewsData from "./singleH_data.js"
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



function App() {

  const [review, setReview] = React.useState({
    name: "",
    image: "",
    status: "",
    score: "",
    data: ""
  })
  const [query, setQuery] = React.useState("")
  const map = new Map()
  const reviewsList = []
  ReviewsData.map(review => {
    map.set(review.node.title, review)
    reviewsList.push(review.node.title)
  })

  function formatReview(review) {
    for(let i = 0; i < review.length; i++) {
      review[i] = " " + review[i]   
    }
    return review
  }

  React.useEffect(() => {
    if(map.has(query)) {
      const formattedReview = formatReview(map.get(query).list_status.tags)
      setReview(
        {
          name: map.get(query).node.title,
          image: map.get(query).node.main_picture.medium,
          status: map.get(query).list_status.status,
          score: map.get(query).list_status.score,
          data: formattedReview
        }
      )
    }
  }, [query])
  return (
    <main className="App">
      <div className="reviewPage">
        <h1>SingleH Reviews</h1>
        <img src={singleH} className="singleHpfp"></img>
        <Autocomplete
          className="autocomplete"
          disablePortal
          query={query}
          onChange={(event, newQuery) => {
            setQuery(newQuery);
          }}
          options={reviewsList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Anime" />}
        />
        {review.name && <section className="reviewCard">
          {review.name && <h1>{review.name}</h1>}
          <img className="animePic" src={review.image}></img>
          {console.log(review.image)}
          {review.status && <p>{"Status: " + review.status}</p>}
          {review.score && <p>{"Score: " + review.score}</p>}
          {review.data.length > 0 && <p style={{textAlign:'start'}}>{review.data}</p>}
        </section>}
      </div>
    </main>
  );
}

export default App;