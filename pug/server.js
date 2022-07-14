const express = require("express");
const app = express();

const fs = require("fs");



app.set("views", "./views");
app.set("view engine", 'pug');
app.use('/static', express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/productos", async (req,res)=>{
    const contenido =  await fs.promises.readFile('./productos.txt', "utf-8");
    let productos = JSON.parse(contenido);
    res.render('index.pug', {productos} )
})

app.post("/productos", async (req, res)=>{
  let item = req.body    
  let data = await fs.promises.readFile('./productos.txt', "utf-8");      
  let productos = JSON.parse(data);

  let result= productos.map(producto => producto.id);
  let id=Math.max(...result)+1;  
  item.id = id
  productos.push(item)
  await fs.promises.writeFile(
    './productos.txt',
    JSON.stringify(productos, null, 2)

)
res.render('index.pug', {productos} )
})


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listen in PORT ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error server ${error}`));
