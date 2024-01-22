import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

export const inValidPassword = (password,user)=>{
    return bcrypt.compareSync(password,user.password);
};


const checkValidFields = (user)=>{
    const {first_name, email, password} = user;
    if(!first_name || !email || !password){
        return false;
    } else {
        return true;
    }
};

const profileMulterFilter = (req,file,cb)=>{
    if(!checkValidFields(req.body)){
        cb(null, false);
    } else {
        cb(null, true);
    }
};

const profileStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,"/multer/users/img"))
    },
    filename: function(req,file,cb){
        cb(null, `${req.body.email}-perfil-${file.originalname}`)
    },
});

const uploadProfile = multer({storage:profileStorage, fileFilter:profileMulterFilter});

const documentsStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,"/multer/users/documents"))
    },
    filename: function(req,file,cb){
        cb(null, `${req.user.email}-document-${file.originalname}`)
    },
});

const uploadDocuments = multer({storage:documentsStorage});

const imgProductsStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,"/multer/products/img"))
    },
    filename: function(req,file,cb){
        cb(null, `${req.body.code}-product-${file.originalname}`)
    },
});

const uploadImgProducts = multer({storage:imgProductsStorage});

export { uploadProfile , uploadDocuments, uploadImgProducts}