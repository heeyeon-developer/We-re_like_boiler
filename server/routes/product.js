const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product')

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {//어느곳에 저장할지
        cb(null, `uploads/`)
    },
    filename: function (req, file, cb) {//이름을 어떻게 저장할지
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req,res) => {
    //가져온 이미지 저장
    upload(req,res,err => {
        if(err){
            return req.json({ success: false, err})
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/', (req, res) => {
    //받아온 정보를 db에 넣기

    const product = new Product(req.body)
    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true})
    })

})

router.post('/products', (req, res) => {
    //product colletion에 들어있는 모든 상품 정보를 가져오기
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Product.find()
    .populate("writer")//글쓴 사람의 모든 정보 가져고이
    .skip(skip)
    .limit(limit)
    .exec((err,productInfo)=>{
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length})
    })

})

module.exports = router;
