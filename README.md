# The Academia Exchange

A network for students.

- `areas, posts, users` are referenced by their objectid
- when finding the ID of a mongoose document after saving, you must set the id before--in the object: `_id: new mongoose.Types.ObjectId()`
  - look up mongoose [populate](https://mongoosejs.com/docs/populate.html)

## Enviornment Variables

```
DATABASE_NAME=ae
DATABASE_URL=mongodb://localhost:27017
```

## Routing

- `/` --  
  Redirects to --> `/~:area` depending on the location of the request. If no location is provided, a random or close one will be chosen.
- `/~:area` --  
  describes school/area
  - `/search/:category?postedToday=1&hasPic=1&searchTitles=1` --  
    URL parameters are **optional**; they should be present on the search page.  
    **NOTE:** the `category` variable is a unique three letter or one letter identifier for a CATECORY or TYPE (respectively); both will have to be searched to identify which is being queried. If it is a type, ALL categories for that are in the type will be searched.
  - `/p/:shortTitle/:post_id` --  
    The shortTitle is simply for readability of URL.  
    The post_id is simply right from the database.
- `/post` --  
  creates a new post and redirects to ˅
  - `/:account_id/:post_id?s=type|cat|edit|geo|preview` --  
    this is creating a new post or referencing an old one. URL argument **is** required.
- `/account` --  
  check-for/validate cookie on backend and either return logon page or account home
