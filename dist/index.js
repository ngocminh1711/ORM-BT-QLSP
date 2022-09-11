"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Product_1 = require("./src/entity/Product");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path = __importStar(require("path"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    const ProductRepo = connection.getRepository(Product_1.Product);
    app.get('/product', async (req, res) => {
        const products = await ProductRepo.find();
        res.render('product', { products: products });
    });
    app.get('/product/delete', async (req, res) => {
        let id = req.query.index;
        await ProductRepo
            .createQueryBuilder()
            .delete()
            .from(Product_1.Product)
            .where("id = :id", { id: id })
            .execute();
        res.redirect('/product');
    });
    app.get('/product/update', (req, res) => {
        res.render('update');
    });
    app.post('/product/update', upload.none(), async (req, res) => {
        let productUpdate = {
            nameUp: req.body.nameUpdate,
            priceUp: req.body.priceUpdate,
            authorUp: req.body.authorUpdate,
            avatarUp: req.body.avatarUpdate
        };
        let index = req.query.index;
        console.log(productUpdate);
        console.log(index);
        await ProductRepo
            .createQueryBuilder()
            .update(Product_1.Product)
            .set({ name: productUpdate.nameUp, price: productUpdate.priceUp, author: productUpdate.authorUp, avatar: productUpdate.avatarUp })
            .where("id = :id", { id: index })
            .execute();
        res.redirect('/product');
    });
    app.listen(PORT, function () {
        console.log('http://localhost:' + PORT);
    });
});
//# sourceMappingURL=index.js.map