import React from 'react'
import { useParams } from 'react-router-dom'

export default function BlogPage() {
    let { blog_id } = useParams();
  return (
    <div>BlogPage {blog_id}</div>
  )
}
