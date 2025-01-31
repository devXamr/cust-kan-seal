import {useState} from "react";

export default function SingleColumn({columnName}) {
    const [columnItems, setColumnItems] = useState([])
    const [currentVal, setCurrentVal] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    function addColumnItem(itemDesc){
        setColumnItems(prev => [...prev, itemDesc])
        setModalOpen(false)
        setCurrentVal('')
    }

    function handleDragEnd({cardDesc}){
        setColumnItems(prev => [...prev, cardDesc])
    }
    
    return <div className=' bg-black bg-opacity-40 mx-2 min-w-[300px]
     border-x border-black shadow-md rounded-md' onDragEnd={() => handleDragEnd('this this')}>
        <div className='font-bold text-xl bg-gray-800 py-3 px-3'>{columnName}</div>
        {columnItems.map(eachItem => <div draggable={true}>{eachItem}</div>)}
        <div className='hover:cursor-pointer' onClick={() => setModalOpen(true)}>Add an item +</div>
        {modalOpen && <form onSubmit={() => addColumnItem(currentVal)}>
            <input value={currentVal} onChange={(e)=> {setCurrentVal(e.target.value)}}/>
            <button type={"submit"} >Add</button>
            <button onClick={() => {setModalOpen(false)}}>Cancel</button>
        </form>}
    </div>
}