import React, { useEffect, useState } from 'react'
import { Button, Item } from '../../components'
import { getPosts, getPostsLimit } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'

const List = ({ categoryCode }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    const [sortType, setSortType] = useState('default')

    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        if (sortType === 'newest') searchParamsObject.order = 'createdAt_DESC';
        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams, categoryCode, sortType])

    const handleSort = (type) => {
        setSortType(type)
    }

    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: {
                    posts?.length > 0 
                        ? moment(posts[0]?.createdAt).format('HH:mm DD/MM/YYYY')
                        : ''
                }</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <Button bgColor={`bg-gray-200${sortType==='default'?' font-bold':''}`} text='Mặc định' onClick={() => handleSort('default')} />
                <Button bgColor={`bg-gray-200${sortType==='newest'?' font-bold':''}`} text='Mới nhất' onClick={() => handleSort('newest')} />
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Item
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            description={item?.description}
                            images={JSON.parse(item?.images?.image)}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default List