
Return all posts:
```js
query {
  posts {
    id
    title,
    slug,
    content,
    excerpt,
    category {
      id,
      label,
      route
    }
  }
}
```

Return all posts with fewer properties:
```js
query {
  posts {
    id
    title,
    slug,
    category {
      label
    }
  }
}
```

Return all categories
```js
query {
  categories {
    id,
    label,
    route
  }
}
```
Return post with id 1 (with my own choice of post properties returned)
```js
query {
  post(id: 1){
    id
    title
    content
  }
}
```

Return post with id 4 (with my own choice of post properties returned)
```js
query {
  post(id: 4){
    id
    category {
      label
    }
  }
}
```

Return all posts of category specified (with my own choice of post properties returned)
```js
query {
  posts(category: "React"){
    id,
    title
  }
}
```

Create a post and return id, title, content and category.label
```js
mutation{
  addPost(input: {
    title: "Article Six",
    slug: "Blop bloup",
    content: "This is Article Six",
    excerpt: "Lorem ipsum",
    category_id: 1}) {
    id,
    title,
    content,
    category {
      label
    }
  }
}
```