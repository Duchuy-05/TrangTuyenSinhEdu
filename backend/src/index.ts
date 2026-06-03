import express from 'express';
import cors from 'cors';    
import { AppDataSource } from './models/DataSource';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.set('view engine', 'ejs')

try {
    AppDataSource.initialize().then(()=>{
        console.log("Data Source has been initialized!")
    }).catch((err)=>{
        console.error(err)
    })
} catch (error) { console.error("err:", error) }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});