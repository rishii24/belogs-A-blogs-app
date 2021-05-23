import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInput, setBlogData } from '../Features/UserSlice'
import '../Styles/Blogs.css'


require('dotenv').config()

const Blogs = () => {

    const searchInput = useSelector(selectUserInput);
    const blogURL = `https://gnews.io/api/v4/search?q=${searchInput}&token=${process.env.REACT_APP_API_TOKEN}`

    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(blogURL)
            .then((response) => {
                dispatch(setBlogData(response.data))
                setBlogs(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [searchInput])

    //to run only when a request is made as a search

    return (
        <div className="blogPage">
            <h1 className="blogPageHeader">{searchInput}</h1>
            {loading ? <div className="blogLoading">loading...</div> : ""}
            <div className="blogData">
                {blogs?.articles?.map((blog,index) => (
                    <a className="blogWindow" target="_blank" rel="noreferrer" key={index} href={blog.url}>
                        <img src={blog.image} alt={blog.title}/>
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}

            </div>
                {blogs?.totalArticles === 0 && (
                    <div className="noBlogsHeading">Sorry, couldn't find anything similar to your search..</div>
                )}
            
        </div>
    )
}

export default Blogs
