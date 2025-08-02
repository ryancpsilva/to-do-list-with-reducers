"use client"

import { listReducer } from "@/reducers/listReducer"
import { Item } from "@/types/Item"
import { useReducer, useState } from "react"

const Page = () => {
  const [list, dispatch] = useReducer(listReducer, [])
  const [addField, setAddField] = useState('')

  // Aplicando Reducer para deletar
  const handleDeleteButton = (id: number) => {
    dispatch({
      type: 'remove',
      payload: {
        id
      }
    })
  }
  // Aplicando Reducer para editar
  const handleEditButton = (id: number) => {
    const item = list.find(it => it.id === id)
    if (!item) return false
    const newTxt = window.prompt('Digite o novo texto', item.txt)
    if (!newTxt || newTxt.trim() === '') return false

    dispatch({
      type: 'editText',
      payload: {
        id,
        newTxt
      }
    })
  }
  // Aplicando o reducer de Checkbox
  const handleDoneCheckbox = (id:number) => {
    dispatch({
      type: 'toggleDone',
      payload: { id }
    })
  }
  // Reducer para adicionar Item na lista
  const handleAddButton = () => {
    if (addField.trim() === '') return false

    dispatch({
      type:'add',
      payload: {
        txt:addField.trim()
      }
    })

    setAddField('')
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center mt-4">Lista de tarefas</h1>
      <div className="flex border border-gray-400 p-4 my-4 max-w-2xl mx-auto rounded-md bg-gray-900">
        <input type="text" 
        className="flex-1 rounded-md border border-white p-3 bg-transparent mr-3 outline-none"
        placeholder="Digite um item"
        value={addField}
        onChange={e => setAddField(e.target.value)}
        />
        <button onClick={handleAddButton} className="p-2 border border-white rounded-md cursor-pointer">ADICIONAR</button>
      </div>
      
        <ul className="mx-auto max-w-2xl">
          {list.map(item => (
              <li className="flex items-center p-3 my-3 border-b border-gray-600" key={item.id}>
                <input 
                  type="checkbox"
                  className="w-8 h-8 mr-4"
                  checked={item.done}
                  onChange={() => handleDoneCheckbox(item.id)}
                />
                <p className="flex-1 text-lg">{item.txt}</p>
                <button className="hover:underline hover:text-gray-500  cursor-pointer mx-4 " onClick={() => handleEditButton(item.id)}>Editar</button> 
                <button className="hover:underline hover:text-red-800 text-red-500 cursor-pointer mx-4" onClick={() => handleDeleteButton(item.id)}>Deletar</button>
              </li>
          ))}
          {list.length > 0 && 
            <button className="mt-5 border border-white bg-transparent rounded-md cursor-pointer p-3" type="button" onClick={() => list.map(item => handleDeleteButton(item.id))}>Apagar lista</button>
          }
        </ul>

    </div>
  )
}

export default Page