let postArr = []

function renderPost() {
    let html = ''
        for (let post of postArr) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr>
            `
        }
        document.getElementById("blog-list").innerHTML = html
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(res => res.json())
    .then(data => {
        postArr = data.slice(0,5)
        console.log(data.slice(0,5))
        renderPost()
    })

document.getElementById('new-post').addEventListener('submit', event => {
    event.preventDefault()
    const postTitle = document.getElementById('post-title').value
    const postBody = document.getElementById('post-body').value
    const data = {
        title: postTitle,
        body: postBody
    }
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(post => {
            postArr.unshift(post)
            renderPost()
        })
    document.getElementById('new-post').reset()
    //postTitle.value = ""
    //postBody.value = ""
})
