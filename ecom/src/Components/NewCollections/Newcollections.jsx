import React from 'react'
import './Newcollections.css'
import new_collection from '../Assets/new_collections'
import Card from '../Card/Card'


const Newcollections = () => {
  return (
    <>
    <div className="new-collections">
    <h1>New Collections</h1>
    <hr />
    <div className="collections">
        {new_collection.map((item, i)=>{
              return <Card key ={i} id={item.id} name = {item.name} image= {item.image} new_price = {item.new_price} old_price = {item.old_price}/>
        })}

    </div>
    </div>
    </>
  )
}

export default Newcollections