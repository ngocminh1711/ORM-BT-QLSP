import  { AppDataSource} from "./src/data-source";
import  { Product } from "./src/entity/Product";
import  multer from 'multer';

const upload = multer();

import express from "express";
import bodyParser from "body-parser";
import * as path from "path";


const PORT = 3000;


AppDataSource.initialize().then(async connection => {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use(express.json());
    app.use(bodyParser.json());

    const ProductRepo = connection.getRepository(Product);

    app.get('/product', async (req, res) => {
        const products = await ProductRepo.find()
        res.render('product', { products: products})
    })
    app.get('/product/delete', async (req, res) => {
        let id = req.query.index
        await ProductRepo
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("id = :id", { id: id })
            .execute()
        res.redirect('/product');
    })
    app.get('/product/update', (req, res) => {
        res.render('update')
    })
    app.post('/product/update',upload.none(), async(req, res) => {
        let productUpdate = {
            nameUp: req.body.nameUpdate,
            priceUp: req.body.priceUpdate,
            authorUp: req.body.authorUpdate,
            avatarUp: req.body.avatarUpdate
        }

        let index = req.query.index
        console.log(productUpdate)
        console.log(index)
        await ProductRepo
            .createQueryBuilder()
            .update(Product)
            .set({ name: productUpdate.nameUp, price: productUpdate.priceUp, author: productUpdate.authorUp, avatar: productUpdate.avatarUp })
            .where("id = :id", { id: index })
            .execute()
        res.redirect('/product')
    })
    app.listen(PORT, function(){
        console.log('http://localhost:'+PORT);
    })
})