import React from 'react'
import { getDay } from '../common/date';

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
        <div className='w-full'>

            <div className='flex gap-2 items-center mb-7'>
                <img src={profile_img} className='w-6 h-6 rounded-full' />

                <p className='line-clamp-1'>{fullname} @{username}</p>
                <p className='min-w-fit'>{getDay(publishedAt)}</p>

            </div>





            <h1 className='blog-title'>{title}</h1>

            <p className='my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2'>{des}</p>


        </div>
    )
}
