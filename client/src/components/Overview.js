import React from 'react'
import { Select, InputReadOnly, InputFormV2 } from './'
import { useSelector } from 'react-redux'

const targets = [
    { code: 'Nam', text: 'Nam' },
    { code: 'Nữ', text: 'Nữ' },
    { code: 'Tất cả', text: 'Tất cả' }
]

const Overview = ({ payload, setPayload }) => {
    const { categories, prices, areas } = useSelector(state => state.app)
    const { currentData } = useSelector(state => state.user)

    const getPriceCode = (value) => {
        if (!prices || prices.length === 0) return ''; // Kiểm tra dữ liệu
        const found = prices.find(item => {
            const numbers = item.value.match(/\d+/g)?.map(Number) || [];
            if (item.value.includes('Dưới')) return value < numbers[0];
            if (item.value.includes('Trên')) return value > numbers[0];
            if (numbers.length === 2) return value >= numbers[0] && value <= numbers[1];
            return false;
        });
        return found?.code || '';
    };

    const getAreaCode = (value) => {
        if (!areas || areas.length === 0) return ''; // Kiểm tra dữ liệu
        const found = areas.find(item => {
            const numbers = item.value.match(/\d+/g)?.map(Number) || [];
            if (item.value.includes('Dưới')) return value < numbers[0];
            if (item.value.includes('Trên')) return value > numbers[0];
            if (numbers.length === 2) return value >= numbers[0] && value <= numbers[1];
            return false;
        });
        return found?.code || '';
    };

    const handlePriceChange = (e) => {
        const value = +e.target.value;
        if (!isNaN(value) || e.target.value === '') {
            setPayload(prev => ({
                ...prev,
                priceNumber: value,
                priceCode: getPriceCode(value)
            }));
        }
    };

    const handleAreaChange = (e) => {
        const value = +e.target.value;
        if (!isNaN(value) || e.target.value === '') {
            setPayload(prev => ({
                ...prev,
                areaNumber: value,
                areaCode: getAreaCode(value)
            }));
        }
    };

    const handleDescriptionChange = (e) => {
        setPayload(prev => ({
            ...prev,
            description: e.target.value
        }))
    }

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-1/2'>
                    <Select 
                        value={payload.categoryCode} 
                        setValue={setPayload} 
                        name='categoryCode' 
                        options={categories?.map(item => ({
                            code: item.code,
                            text: item.value
                        }))} 
                        label='Loại chuyên mục' 
                        onChange={e => setPayload(prev => ({ ...prev, categoryCode: e.target.value }))}
                    />
                </div>
                <InputFormV2 
                    value={payload.title} 
                    setValue={setPayload} 
                    name='title' 
                    label='Tiêu đề' 
                />
                <div className='flex flex-col gap-2'>
                    <label htmlFor="desc">Nội dung mô tả</label>
                    <textarea
                        id="desc"
                        cols="30" 
                        rows="10"
                        className='w-full rounded-md outline-none border border-gray-300 p-2'
                        value={payload.description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <div className='w-1/2 flex flex-col gap-4'>
                    <InputReadOnly 
                        label='Thông tin liên hệ' 
                        value={currentData?.name || currentData?.username} 
                    />
                    <InputReadOnly 
                        label='Điện thoại' 
                        value={currentData?.phone} 
                    />
                    <InputFormV2 
                        value={payload.priceNumber} 
                        label='Giá cho thuê' 
                        unit='đồng' 
                        name='priceNumber' 
                        small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000' 
                        onChange={handlePriceChange}
                    />
                    <InputFormV2 
                        value={payload.areaNumber} 
                        label='Diện tích' 
                        unit='m2' 
                        name='areaNumber' 
                        onChange={handleAreaChange}
                    />
                    <Select 
                        value={payload.target} 
                        setValue={setPayload} 
                        name='target' 
                        options={targets} 
                        label='Đối tượng cho thuê' 
                    />
                </div>
            </div>
        </div>
    )
}

export default Overview