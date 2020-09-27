import React from 'react'
import style from './index.module.scss'


function ImagesContainer({images}){
     var images =["https://www.acceseo.com/wp-content/uploads/2020/09/guillermo-villanueva-bonealive.jpg",
     "https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg",
     "https://www.w3schools.com/css/paris.jpg",
     "https://www.w3schools.com/css/rock600x400.jpg",
     "https://static.vecteezy.com/system/resources/previews/001/189/527/non_2x/palm-tree-png.png",
     "https://www.jardineriaon.com/wp-content/uploads/2018/10/jubaea-chilensis-palmera-1024x683.jpg",
     "https://images-na.ssl-images-amazon.com/images/I/61DHLYtetoL._AC_SY400_.jpg",
     "https://revista-ambiente.com.ar/wp-content/uploads/2020/02/Caracter%C3%ADsticas-de-las-palmeras-777x437.jpg",
     "https://www.acceseo.com/wp-content/uploads/2020/09/guillermo-villanueva-bonealive.jpg"
    ]

    
    return(<div className={style.imgcontainer}>
            {images.map((img , i)=>(<div key={i}>
                <i className={["far fa-times-circle",style.removeButton,].join(" ")} onClick={() =>console.log("anda")}/>
                <img src={img}></img>
                </div>
                ))}
            </div>)
}
export default ImagesContainer;
