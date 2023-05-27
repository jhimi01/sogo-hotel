import qs from 'query-string';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CatagorBox = ({label, icon: Icon}) => {

    const [params, setParams] = useSearchParams()
    // const value = params.get('category')
    const navigate = useNavigate()

    const handleClick = () => {
        let currentQuery = {}
        if (params) {
          currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = {
          ...currentQuery,
          category: label,
        }
    
        const url = qs.stringifyUrl(
          {
            url: '/',
            query: updatedQuery,
          },
          { skipNull: true }
        )
    
        navigate(url)
      }

    return (
        <div onClick={handleClick} className='flex flex-col gap-2 items-center justify-center hover:text-gray-800 text-gray-500 cursor-pointer'>
            <Icon size={26} />
            <div className='font-semibold'>{label}</div>
        </div>
    );
};

export default CatagorBox;