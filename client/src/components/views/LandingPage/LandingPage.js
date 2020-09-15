import React, { useEffect, useState} from 'react'
import { FaCode, FaRProject } from "react-icons/fa";
import axios from 'axios'
import { Col, Card, Row, Button} from 'antd'
import Meta from 'antd/lib/card/Meta'
import { foods } from './Sections/Datas'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)

    const getProducts = (body) => {
        //나중에 필터 필요할때 바디 사용
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품 업로드 실패")
                }
            })
    }

    // //데이터 가져오기
    useEffect(() => {
        let body ={
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
    }, [])

    const loadMoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)
        setSkip(skip)
        // console.log(skip,limit)
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={12} xs={24} key={index}>
            <Card
                cover={<img style={{width : '100%', height: '100%', textAlign: 'center' }}
                    src={ `http://localhost:5000/${product.images[0]}`}/>}
                >
                    <Meta
                        title={product.title}
                        description={`${product.price}원`}
                    />

            </Card>
            <br></br>
        </Col>
    })

    return (
        <div style ={{ width: '75%', margin: '0 auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>We're like<img style ={{ width: "30%"}} src='bread.png'></img></h2>
            </div>
            {/* {filter} */}
            {/* {filter} */}

            {/* {cards} */}
            
            <Row gutter={16,16}>
                {renderCards}
            </Row>
            
            <br>
            </br>

            {PostSize >= Limit && 
                <div style={{ alignContent: 'center'}}>
                    <Button style={{marginLeft: '47%'}}onClick={loadMoreHandler}>more</Button>
                </div>
            }       

        </div>
    )
}

export default LandingPage
