import SingleColumn from "./SingleColumn.jsx";
import {useState} from "react";

export default function MyApp() {

    const [columns, setColumns] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [currentModalValue, setCurrentModalValue] = useState('')

    const addNewColumn = (columnName) => {
        setColumns( prev => [...prev, columnName])
        setCurrentModalValue('')
        setOpenModal(false)
    }

    function changeModalValue(e){
        setCurrentModalValue(String(e.target.value))
    }

    return <div className='font-satoshi  h-screen bg-gray-600 text-white py-4'>
        <div onClick={() => setOpenModal(true)}
             className={` bg-black  w-fit py-3 px-3 rounded-lg hover:cursor-pointer font-medium ml-4 hover:bg-opacity-90 duration-200`}>Add
            Column
        </div>
        {openModal &&
            <div className='bg-black px-4  w-fit absolute left-4 top-20 rounded-b-xl rounded-tr-xl pb-4'>
                <input className='bg-black  mt-4 py-2 px-4 rounded-md
       ' type="text" placeholder='Add your modal name here' value={currentModalValue}
                       onChange={(e) => changeModalValue(e)}/>

                <div className='flex'>
                    <div onClick={() => addNewColumn(currentModalValue)}
                         className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Add
                        Modal
                    </div>
                    <div onClick={() => setOpenModal(false)}
                         className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Cancel
                    </div>
                </div>
            </div>}

        <div className='bg-black bg-opacity-20 flex overflow-x-auto mt-7 min-h-[850px]'>
            {columns.map(eachVal => <SingleColumn columnName={eachVal}/>)}
        </div>
    </div>
}