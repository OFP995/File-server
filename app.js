const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const storageConfig = multer.diskStorage({  //переименования имени файла на оригинальное
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
 
app.use(express.static(__dirname));
 
app.use(multer({storage:storageConfig}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let loadTime = new Date().toLocaleDateString() + ` || Время: ${new Date().getHours()}` + `:${new Date().getMinutes()}`;
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
        let roundingSize = Math.floor(filedata.size / 10000);
        console.log(`Загужен файл: ${filedata.originalname}` + " || Дата: " + loadTime + ` || Размер: ${(roundingSize)} kb`);
});
app.listen(3000, ()=>{console.log("Сервер начал работу...");});

// https://metanit.com/web/nodejs/10.2.php