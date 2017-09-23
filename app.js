 /*
    Tạo server app
 */
 var mysql = require("mysql");
 var connectionsql = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'skyapp'
 });
 connectionsql.connect();
    connectionsql.query('select * from `user`',function(err,result){
        console.log(result[0]);
    });
 var express = require("express");
 var app = express();
 var sha256 = require("crypto-js/sha256");
 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
 var server = require("http").createServer(app);
 var serveraudio = require("http").createServer(app);
 var servervideo = require("http").createServer(app);
 var ioaudio = require("socket.io").listen(serveraudio);
 var iovideo = require("socket.io").listen(servervideo);
 var io = require("socket.io").listen(server);

app.post("/login",urlencodedParser,function (req,res) {
    var user = req.body;
    if(user.default == 'true') {
        var query = 'select * from `user` where `user`="' + (user.user) + '" and `pass`="' + (sha256(user.pass) + '"');
        console.log(query);
        connectionsql.query(query, function (err, result) {
            if (result) {
                res.send({error: "0", result: true});
            }
            else {
                res.send({error: err, result: false});
            }
        });
    }else{
        var query = 'select * from `user` where `user`="' + (user.user) + '"';
        console.log(query);
        connectionsql.query(query, function (err, result) {
            if (result) {
                var query = 'INSERT INTO `user`(`pass`) VALUES ("'+sha256(user.pass)+'")';
                console.log(query);
                connectionsql.query(query,function (err,result) {
                   if (result)
                       res.send({error: "0", result: true});
                   else {
                       res.send({error: err, result: false});
                   }
                });
            }
            else {
                res.send({error: err, result: false});
            }
        });
    }
});

 app.get("/",function (req,res) {
     console.log(req.query);
     res.send("Index page !!!");
 });

app.listen(8080);






































 server.listen(4000);
 serveraudio.listen(4008);
 servervideo.listen(4010);
 var listsocket = [];
 var list =[];
 var Location = {};
 var fs = require('fs');
 var room = [];
 var cout =0;
 io.sockets.on("connection",function(socket){
    socket.emit("log",{"id":socket.id});
    console.log("Hello");
    listsocket.push(socket);

    socket.on("upload",function (data) {
                 console.log(data);
        if (data.sel != 0) {
         var id = data.id;
         var lat = data.lat;
         var lng = data.lng;
         for (var i = 0;i<list.length;i++){
             if (id == list[i].id){
                 list[i].lat = lat;
                 list[i].lng = lng;
                 io.emit("update-map",data);
                 break;
             }
         }
        }
    });

    socket.on("out",function (data) {
         console.log("out");
         var id = data;
         for(var i = 0 ;i<list.length;i++){
             if(id == list[i].id){
                 io.emit("dis",{"id":list[i].id});
                 list.splice(i,1);
                 console.log(list.length);
                 break;
             }
         }
    });

    socket.on("call",function (data) {
         for (var i =0;i<list.length;i++){
             if(data[0].idcall == list[i].id)
             {
                 console.log("call");
               list[i].socket.emit("call",data);
                 break;
             }
         }
    });

    socket.on("respon-call",function (data) {
         console.log(data);
         for (var  i=0;i<list.length;i++){
             if(data[0].id == list[i].id){
                 list[i].socket.emit("responcall",data);
                 if(cout>0)
                 cout = cout -1;
                 break;
             }
         }
    });

    socket.on("sign-in",function(data){
        console.log(data);
            if (data.username != null && data.password != null) {
                var query = "select * from user where user ='" + data.username +"' and pass = '" + data.password +"'";
                connectionsql.query(query,function(err,result){
                    if (err) {
                        console.log(err);
                    }
                    if (result.length == 1) {
                                for (var i = 0; i < listsocket.length; i++) {
                                    console.log(listsocket[i].id);
                                    if (data.idsocket == listsocket[i].id) {
                                        result[0].result = true;
                                        listsocket[i].emit("result-sign-in",result[0]);
                                            var user = result[0];
                                            user.idsocket = data.idsocket;
                                            user.socket = listsocket[i];
                                            list.push(user);
                                            listsocket.splice(i,1);
                                    
                            }
                        }
                    }
                    else{
                                    for (var i = 0; i < listsocket.length; i++) 
                                    if (data.idsocket == listsocket[i].id) {
                                        listsocket[i].emit("result-sign-in",{"result" : false});
                                        console.log("password aviable");
                            }
                    }
                });
            }
    });

    socket.on("sign-up",function(data){
            if (data.username != null && data.password != null) {
                var query = "select * from user where username ='" + data.username +"'";
                connectionsql.query(query,function(err,result){
                    if (result.length >= 1) {
                        for (var i = 0; i < list.length; i++) {
                            if (data.idsocket == listsocket[i].id) {
                                listsocket[i].emit("result-sign-up",{"result" : false});
                            }
                        }
                    }
                    else{
                        var user = {
                            name : data.name,
                            user : data.user,
                            pass : data.pass,
                            phone : data.phone,
                            adresss : data.adresss,
                            facebook : data.facebook,
                            google : data.google
                        };
                        query = connectionsql.query("insert into user set ?",user,function(err,result){
                            if (err) {
                                console.log(err);
                            }
                            else{
                                for (var i = 0; i < list.length; i++) {
                                    if (data.idsocket == listsocket[i].id) {
                                        listsocket[i].emit("result-signup",{"result" : true});
                            }
                        }
                            }
                        });
                    }
                });
            }
    });

    socket.on("load-history-buy",function(data){
            var query = "select * from goods where iduser ="+data.id+" order by id limit "+((data.page-1)*10)+",10";
            connectionsql.query(query,function(err,result){
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else{
                        for (var j = 0; j < list.length; j++) {
                            if (data.id == list[j].id) {
                                list[j].socket.emit("load-history-buy",{"results":result});
                            }
                        }
                    }
                });
    });

    socket.on("load-history-sell",function(data){
        var query = "select * from historysell where id ="+data.id+" order by id limit "+((data.page-1)*10)+",10";
        connectionsql.query(query,function(err,result){
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else{
                        for (var j = 0; j < list.length; j++) {
                            if (data.id == list[j].id) {
                                list[j].socket.emit("load-history-sell",{"results":result});
                            }
                        }
                    }
        });
    });

    socket.on("load-sell",function(data){
        console.log(data);
        var query = "select * from goods order by id limit "+((data.page-1)*10)+",10";
        connectionsql.query(query,function(err,result){
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else{
                        for (var j = 0; j < list.length; j++) {
                            if (data.id == list[j].id) {
                                list[j].socket.emit("load-sell",{"results":result});
                            }
                        }
                    }
        });
            //     });
    });

    socket.on("edit-user-about",function(data){
            var query = "UPDATE `user` SET `"+ data.choose +"` = '"+ data.value + "' WHERE `id` =" + data.id;
            connectionsql.query(query,function(err,result){
                if (err) {
                    console.log(err);
                }
                else{
                    for (var j = 0; j < list.length; j++) {
                          if (data.id == list[j].id) {
                                list[i].socket.emit("edit-user-about",{"result":true});
                           }
                    }
                }
            });
    });

    socket.on("come-car",function(data){
            var query = "UPDATE `user` SET `sel` = "+ data.sel + " WHERE `id` =" + data.id;
            connectionsql.query(query,function(err,result){
                if (err) {
                    console.log(err);
                }
                else{
                    for (var j = 0; j < list.length; j++) {
                          if (data.id == list[j].id) {
                                list[i].socket.emit("come-car",{"result":true});
                           }
                    }
                }
            });
    });

    socket.on("you-sell",function(data){
        console.log(data);
                if (data != null) {
                        var goods = {
                            name : data.name,
                            location : data.location,
                            mShip : data.mShip,
                            mItem : data.mItem,
                            url : data.url,
                            iduser : data.iduser,
                            send : data.send,
                            time : data.time
                        };
                        query = connectionsql.query("insert into goods set ?",goods,function(err,result){
                            if (err) {
                                console.log(err);
                            }
                            else{
                                for (var i = 0; i < list.length; i++) {
                                    if (data.id == list[i].id) {
                                        list[i].socket.emit("result-you-sell",{"result" : true});
                            }
                        }
                            }
                        });
                    }
    });

    socket.on("id",function(data){
        if (data != null) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == data.id) {
                    list[i].idsocket = data.idsocket;
                    for (var j = 0; j < listsocket.length; j++) {
                        if(list[i].idsocket == listsocket[j].id){
                            list[i].socket = listsocket[j];
                            listsocket.splice(j,1);
                        }
                    }
                }
            }
        }
    });

    socket.on("read-infor",function(data){
        console.log(data)
        if (data != null) {
            var results = {};
            var query = "select * from `user` WHERE id = "+data.id;
            connectionsql.query(query,function(err,result){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(result);
                        results.phone = result[0].phone;
                        results.name = result[0].name;
                        results.sel = result[0].sel;
                        var query = "select * from `car` WHERE iduser ="+data.id;
                        connectionsql.query(query,function(err,result){
                            if (err) {
                                console.log(err);
                            }
                            else{
                                if (result.length ==1) {
                                    console.log(result);
                                    results.carcode = result[0].carcode;
                                    results.carchal = result[0].chal;
                                    if (results.sel == 5) {
                                        results.from = result[0].location_from;
                                        results.to = results[0].location_to;
                                    }
                                    console.log(results);
                                    for (var i = 0; i < list.length; i++) {
                                        if (data.idsocket == list[i].id) {
                                        list[i].socket.emit("read-infor",results);
                                        }   
                                    }
                                }
                            }
                        });
                }
            });
        }
    });
});

 var listsocketvideo = [];
 var listvideo = [];
 iovideo.sockets.on("connection",function (socket) {
     socket.emit("log",{"id":socket.id});
     listsocketvideo.push(socket);
     idvideo = socket.id;
     console.log("hellovideo");
     socket.on("id",function(data){
         console.log(data);
         var  user = {};
         user.id = data[0].id;
         user.name = data[0].user;
         user.ul = data[0].ul;
         for (var i = 0 ;i<listsocketvideo.length;i++){
             if (user.ul == listsocketvideo[i].id) {
                 user.socket = listsocketvideo[i];
                 // for (var j=0;j<list.length;j++){
                 //     if (list[j].id==user.id){
                        listvideo.push(user);
                 console.log("invideoport");
                 //     }
                 // }
                 listsocketvideo.splice(i,1);
                 break;
             }
         }
         console.log(listvideo.length);
     });
     socket.on("streamvideo",function (data) {
         for (var i = 0; i < listvideo.length; i++) {
             if (data.to == listvideo[i].id) {
                 listvideo[i].socket.emit("streamvideo", data);
                 console.log(data);
                 break;
             }
         }
     });
     socket.on("stopcall",function (data) {
         for (var i = 0; i < listvideo.length; i++) {
             if (data.id == listvideo[i].id || data.idcall == listvideo[i].id) {
                    listvideo.splice(i,1);
             }
         }
     });
 });
 var listsocketaudio = [];
 var listaudio = [];
 ioaudio.sockets.on("connection",function (socket) {
     socket.emit("log",{"id":socket.id});
     listsocketaudio.push(socket);
     idaudio = socket.id;
     console.log("helloaudio");
     socket.on("id",function(data){
         console.log(data);
         var  user = {};
         user.id = data[0].id;
         user.name = data[0].user;
         user.ul = data[0].ul;
         for (var i = 0 ;i<listsocketaudio.length;i++){
             if (user.ul == listsocketaudio[i].id) {
                 user.socket = listsocketaudio[i];
                 // for (var j=0;j<list.length;j++){
                 //     if (list[j].id==user.id){
                 listaudio.push(user);
                 console.log("audio");
                 //     }
                 // }
                 listsocketaudio.splice(i,1);
                 break;
             }
         }
         console.log(listaudio.length);
     });
     socket.on("streamcall",function (data) {
         for (var i = 0; i < listaudio.length; i++) {
             if (data.to == listaudio[i].id) {
                 listaudio[i].socket.emit("streamcall", data);
                  console.log(data);
                 break;
             }
         }
     });
     socket.on("stopcall",function (data) {
         for (var i = 0; i < listaudio.length; i++) {
             if (data.id == listaudio[i].id||data.idcall ==listaudio[i].id) {
                 listaudio.splice(i,1);
             }
         }
     });
 });