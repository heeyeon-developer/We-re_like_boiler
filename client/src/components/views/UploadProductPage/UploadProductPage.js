import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload'
import axios from 'axios';

// const {Title} = Typography;//이름이 겹침
const {TextArea} = Input;

const Foods = [
    { key: 1, value: "Bread"},
    { key: 2, value: "Rice" },
    { key: 3, value: "Noodle" },
    { key: 4, value: "Fastfood" },
    { key: 5, value: "Snack" }
]


function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Food, setFood] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler =(event) => {
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const foodChangeHandler =(event) => {
        setFood(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Food || !Images ){
            return alert("모든 값을 넣어주세요")
        }

        //서버에 값을 request로 보낸다

        const body = {
            //로그인된 사람의 id
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            foods: Food
        }

        axios.post("/api/product",body)
        .then(response => {
            if(response.data.success){
                alert('업로드 성공!!')
                props.history.push('/')
            }else{
                alert('업로드 실패ㅜㅠ')
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2em'}}>
                < h2 > Product Upload </h2>
            </div>

            < Form onSubmit={submitHandler}>
                {/* {DropZone} */}

                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />
                < select onChange={foodChangeHandler} value={Food}>
                    {Foods.map(item => (
                        < option key={item.key} value={item.key}> {item.value} </option>
                    ))}
                </select>

                <br />
                <br />
                <label>Product Name</label>
                < Input onChange = {titleChangeHandler} value = {Title}/>
                <br />
                <br />
                <label>Details</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br/>
                <br/>
                <label>Prices</label>
                < Input type="number" onChange={priceChangeHandler} value={Price}/>
                
                <br/>
                <br/>
                < Button type="submit" onClick={submitHandler}>
                    Confirm
                </Button>

            </Form>

            
        </div>
    )
}

export default UploadProductPage
