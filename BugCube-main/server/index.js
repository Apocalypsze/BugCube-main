const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path')

//requires Cors to be installed for the communication betweent SVR n Client!
app.use(cors());
//Tells express that the incoming object is JSON object!!
app.use(express.json());
app.use(express.static('ImgDB'))
app.use('/api/staticImages', express.static('ImgDB'))

//variable to start the file location on shared folders
var location = "./ImgDB"

//All the Functions that get the information from the folders and send them to the front end

app.get('/api/publist', (req,res) => {
    fs.readdir(location + "/Publication/",'utf8', function(err,data){
        res.send(data)
    })
})

app.get('/api/datasets', (req,res) => {
    fs.readdir(location + "/Publication/" + req.query.datasetname,'utf8', function(err,data){
        if (data === undefined){
            data = ["No Datasets"]
        }
        res.send(data)
    })
})

app.get('/api/channels', (req,res) => {
    fs.readdir(location + "/Publication/" + req.query.channelname[1] +"/"+ req.query.channelname[2] + "/PNG/" +  req.query.channelname[0],'utf8', function(err,data){
        if (data === undefined){
            data = ["No Channels"]
        }
        res.send(data)
    })
})

app.get('/api/directions', (req,res) => {
    fs.readdir(location + "/Publication/" + req.query.directionsname[1] +"/"+ req.query.directionsname[0] + "/PNG",'utf8', function(err,data){
        if (data === undefined){
            data = ["No Direction"]
        }
        res.send(data)
    
    })
})

app.get('/api/textinfo', (req,res) => {
    textstuff = ""
    fs.readdir(location + "/Publication/" + req.query.textname[1] +"/"+ req.query.textname[0] + "/(B1)-Metadata",'utf8', function(err,data){
        if (data === undefined){
            textstuff = ["No Direction"]
            }
        data.forEach(element => {
            if (element.includes("-Info.txt")){
                fs.readFile(location + "/Publication/" + req.query.textname[1] +"/"+ req.query.textname[0] + "/(B1)-Metadata/" + element,'utf8', function(err,textdata){
                    textstuff = (textdata)
                    res.send(textstuff)
                } 
                )
            }
        });

    })
})

app.get('/api/images', (req,res) => {
    var dirpath = location + "/Publication/" + req.query.pathinfo[1] +"/"+ req.query.pathinfo[0] + "/PNG/" + req.query.pathinfo[2] +"/"+ req.query.pathinfo[3]
    var NameList = []
    for (i = 0; i < (fs.readdirSync(dirpath).length); i++ ){
        NameList.push(fs.readdirSync(dirpath + "/" + (fs.readdirSync(dirpath)[i])))
    }
    for (x = 0; x < NameList.length; x++){
        for (y=0; y< NameList[x].length; y++){
            NameList[x][y] = dirpath.replace(location,"/api/staticImages") + "/" + fs.readdirSync(dirpath)[x] + "/" + NameList[x][y]
        }
    }
    res.send(NameList)
})
   

//Function just when startin up the backend to let me know it is up and running
app.listen(3001, () => {
    console.log("Server is up and running, me Lord!")
})






