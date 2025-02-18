import React from 'react'

export default function BlogPostCard({ content, author }) {

    let { publishedAt,
        tags,
        title,
        des,
        banner,
        activity: { total_liken },
        blog_id: id
    } = content;

    let { fullname, profile_img, username } = author;
    return (
        <div>BlogPostCard</div>
    )
}
