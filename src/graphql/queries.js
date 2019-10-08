import gql from 'graphql-tag';

const onCreateFilm = gql`
  subscription onCreateFilm{
    onCreateFilm{
      createdAt
        director
        episodeId
        id  
        title
        openingCrawl
        planets{
          items{
            id
            name
            climate
            diameter
            filmId
          }
        }      
    }
} 
`

export { onCreateFilm };