myFetch(urlBlog)
.then(blogsObj => {
  for(const blog of blogsObj.data){
    showBlogs(blog)
  }
})


function showBlogs(blog){
  const divBlogs = document.querySelector('.blogsList')
  const ulNavTab = document.querySelector('.nav-tabs')

  const p = document.createElement('p')
  const span = document.createElement('span')
  span.classList.add('label', 'label-primary', 'spanBlogList')
  span.dataset.blogId = blog.id
  span.innerText = `Blog ${blog.id} :  "${blog.attributes.title}"`
  p.append(span)
  divBlogs.append(p)

  const li = document.createElement('li')
  const a = document.createElement('a')
  a.setAttribute("data-toggle", "tab")
  // a.setAttribute("href", `#menu${blog.id}`)
  a.innerText = `Blog ${blog.id}`
  li.append(a)
  ulNavTab.append(li)

  iframe(blog, a)

}


function iframe(blog, a){
const divBlogInfo = document.querySelector('.blogInfo')
const divIFrameLink = document.querySelector('.blogIFrame')



  a.addEventListener('click', () => {
    divIFrameLink.innerHTML = ''
    divBlogInfo.innerHTML = ''

    const panelBody = document.querySelector('.panel-body')

    const blockquote = document.createElement('blockquote')
    blockquote.className = 'embedly-card'

    const h4 = document.createElement('h4')

    const aLink = document.createElement('a')
    aLink.href = blog.attributes.link
    aLink.innerText = blog.attributes.title

    const p = document.createElement('p')
    p.innerText = blog.attributes.description

    h4.append(aLink)
    blockquote.append(h4, p)
    divIFrameLink.append(blockquote)

    const btnBlogDelete = document.createElement('button')

  const spanClap = document.createElement('span')
  spanClap.dataset.blogId = blog.id
  spanClap.className = 'clapCount'
  spanClap.innerText = blog.attributes.clap

    callBtnBlogDelete(blog, divIFrameLink, a, btnBlogDelete)
    createBtnBlogClap(blog, divBlogInfo, divIFrameLink, spanClap, btnBlogDelete)
  })
}


function callBtnBlogDelete(blog, divIFrameLink, a, btnBlogDelete){
  btnBlogDelete.innerText = 'Delete Blog'
  const blogInfo = document.querySelector('.blogInfo')
  const pReview = document.querySelector(`p[data-blog-id="${blog.id}"]`)
  const spanBlog = document.querySelector(`span[data-blog-id="${blog.id}"]`)
  btnBlogDelete.addEventListener('click', () => {
    myFetch(`${urlBlog}/${blog.id}`, {method: 'DELETE'})
    .then(() => {
      divIFrameLink.remove()
      a.remove()
      //   spanBlog.remove()
      //   pReview.remove()
      blogInfo.innerText = ''
        
    })
  })
}


function createBtnBlogClap(blog, divBlogInfo, divIFrameLink, spanClap, btnBlogDelete){
  // const spanClap = document.createElement('span')
  // spanClap.dataset.blogId = blog.id
  // spanClap.className = 'clapCount'
  // spanClap.innerText = 'Clap Count'
  const newClap = document.createElement('span')
  newClap.id = 'new_clap'
  newClap.innerText = 0
  const btnBlogClap = document.createElement('button')
  btnBlogClap.dataset.blogId = blog.id
  btnBlogClap.className = 'btnBlogClap'
  btnBlogClap.innerText = '👏 Clap'

  const form = document.createElement('form')
  form.className = 'commnetForm'
  const labelComment = document.createElement('label')
  labelComment.innerText = 'Comment Here : '
  const inputComment = document.createElement('input')
  inputComment.dataset.blogId = blog.id
  inputComment.className = 'inputComment'
  inputComment.type = 'text'
  const btnSubmit = document.createElement('input')
  btnSubmit.dataset.blogId = blog.id
  btnSubmit.type = 'submit'
  form.append(labelComment, inputComment, ` `, btnSubmit)

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const comment = document.querySelector('.inputComment').value
    const newClap = document.querySelector('#new_clap').innerText
    const options = makeOptions('POST', {review: {blog_id: blog.id, blogger_id: 1, clap: newClap, comment: comment}})

    myFetch(urlReview, options)
      .then(
        reviewComment => {
          showReviews(reviewComment.data)
        const span = document.querySelector('.clapCount')
        console.log(reviewComment)
        console.log("TRY TOTTAL", blog.attributes.clap)
        span.innerText = blog.attributes.clap + reviewComment.data.attributes.clap
        form.reset()
        const newClap = document.querySelector('#new_clap')
          newClap.innerText = 0
        }
      )
  })

  divBlogInfo.append(spanClap, ` `, divIFrameLink, ` `, newClap, btnBlogClap, ` `, btnBlogDelete, form)
}


