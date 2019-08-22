const mysql=require('mysql');
var connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Koti123@',
    database : 'node_db', 
    // port:3306
});
/*-----------------other way of getting connection----------*/
// var connection = mysql.createConnection('mysql://root:Koti123@@localhost/node_db');

/*-----------------getting connection in debug mode----------*/
// var connection = mysql.createConnection('mysql://root:Koti123@@localhost/node_db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');


connection.connect(function(err) {         //passing callback is optional. we can call connection.connect() also.
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });


exports.add=function (req,res){
     console.log('post method');
     console.log(req.body)
    var id=req.body.id;
    var name=req.body.name;
    var age=req.body.age;
    var user={
        id:id,
        name:name,
        age: age 
    } 
    connection.query('INSERT INTO user SET ?',user, function(error, results, fields){   
            if (error){
                throw error;
            } 
            else{
                console.log("added rows are : "+results.affectedRows);
                res.redirect('/UserList');
            }
    });
}

exports.Singleretrieve=function retrieveSingleUser(req,res){
    var id=req.query.id;
   connection.query('select * from user where id = ?',[id],function (error, results, fields) {
        if (error){
           throw error;
        }
        else{    
           console.log('The Retrieve user is: ', JSON.parse(JSON.stringify(results))[0]);  
           var user= JSON.parse(JSON.stringify(results))[0]; 
           res.render('updateuser',{
            user: user
         });             
        }
  });
}

exports.update=function updateUser(req,res){
    var id=req.params.id;
    var name=req.body.name;
    var age=req.body.age;
    connection.query('UPDATE user SET name = ?, age= ? WHERE id = ?',[name,age,id], function (error, results, fields) {
        if (error) {
            throw error;
        }
        else{
            console.log("updated rows are :"+results.affectedRows);  
            res.redirect('/UserList');
        } 
      });
}

exports.retrieve=function retrieveUser(req,res){
    
       connection.query('select * from user',function (error, results, fields) {
            if (error){
               throw error;
            }
            else{    
               var userlist= JSON.parse(JSON.stringify(results))
               console.log('The Retrieve users are: ', JSON.parse(JSON.stringify(results)));
               res.render('usersList',{
                  users: userlist
               });               
            }
      });
}

exports.delete=function deleteUser(req,res){
    var id=req.params.id;
    console.log(req.params);
    console.log("deleted user id : "+id);
    connection.query('DELETE FROM user WHERE id =?',[id],function (error, results, fields) {
        if (error){
            throw error;
        }
        else{
            console.log('Number of Rows deleted : '+results.affectedRows);
            // res.send('deleted');
            // res.render('home');
            res.redirect('/UserList');
        }
      });  
}

function connectionEnd(){
    connection.end();
}

// module.exports ={ 
//     add:addUser,
//     update:updateUser,
//     retrive:retrieveUser,
//     delete:deleteUser,
//     connEnd:connectionEnd
// };