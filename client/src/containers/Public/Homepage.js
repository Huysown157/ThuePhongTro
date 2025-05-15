import React from 'react'
import { text } from '../../ultils/constant'
import { Province, ItemSidebar, RelatedPost } from '../../components'
import { List, Pagination } from './index'
import { useSelector } from 'react-redux'

const Homepage = () => {
    const { categories, prices, areas } = useSelector(state => state.app)

    return (
        <div className='w-full flex flex-col gap-6 p-4 bg-gray-50 min-h-screen'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <h1 className='text-[32px] font-bold text-blue-600 mb-3'>{text.HOME_TITLE}</h1>
                <p className='text-lg text-gray-600 leading-relaxed'>{text.HOME_DESCRIPTION}</p>
            </div>
            
            <div className='bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'>
                <Province />
            </div>

            <div className='w-full flex gap-6'>
                <div className='w-[70%] space-y-6'>
                    <div className='bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'>
                        <List />
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <Pagination />
                    </div>
                </div>
                
                <div className='w-[30%] space-y-6'>
                    <div className='bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'>
                        <ItemSidebar content={categories} title='Danh sách cho thuê' />
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'>
                        <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'>
                        <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'>
                        <RelatedPost />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage