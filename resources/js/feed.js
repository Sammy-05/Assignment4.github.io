// $(document).ready(function(){
//     $("#post-form").submit((e)=>{
//         e.preventDefault();
//         const my_content = $("#post-content-field").val()
//         $.post("/post/new", {content: my_content}, function (data) { 
//             if (data=="Created") alert("Post created Successfully")
//             else alert("Error Occured")
//         })
//     })
// })
const cur_user_id = parseInt(document.getElementById("user_id_field").value)

const Form = (props) =>{
    const [content,setContent] = React.useState("")
    const setReload = props.reloadFunction
    const post = (e) =>{
        e.preventDefault()
        $.post("/post/new", {content: content}, function (data) { 
            if (data=="Created"){
                alert("Post created Successfully")
                setReload(cur=>!cur)
            } 
            else alert("Error Occured")
        })   
    }
    
    return(<section className="mt-8 w-3/4 m-auto bg-white p-12 pt-10 rounded-md">
        <h2 className="text-2xl bold mb-2">Create a Post</h2>
        <form action="/post/new" method="POST" id="post-form" onSubmit={post} className="flex flex-row">
            <textarea name="content" placeholder="What's on your mind?" className="border-2 px-3 py-2 w-full" id="post-content-field" value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 float-right min-w-max"><i className="far fa-paper-plane"></i> Now</button>
        </form>
    </section>)   
}

const Posts = () =>{
    const [posts, setPosts] = React.useState([])
    const [reload, setReload] = React.useState(false)

    React.useEffect(()=>{
        fetch("/post/all")
        .then((data)=>{
            data.json()
            .then(final_data =>{
                setPosts(final_data)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [reload])

    return (<div>
        <Form reloadFunction = {setReload}/>
        {posts.map((post, index)=>(
        <div className="mt-8 w-8/12 m-auto bg-white p-12 pt-10 rounded-md flex gap-x-4" key={index}>
                <i className="far fa-user-circle text-8xl"></i>
                <div className="w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-lg bold">{post.name}</h3>
                        <span className="text-gray-400 text-sm">{post.date_posted}</span> 
                    </div>
                    <p>{post.content}</p>
                    
                    {/* {<a>Edit</a>} */}
                </div>
        </div>))}
        </div>)}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<Posts></Posts>)