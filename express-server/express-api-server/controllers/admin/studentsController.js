var Student = require('../../models/Student');
var async = require('async');

view_students = function(req, res){
    var res_data = {}
    Student.find({}, function(err, result){
        if (err) next(err);

        res_data = result;
        for (var i = 0; i < res_data.length; i++) 
            res_data[i].password = '';
        console.log(`List of students registered to our portal ${res_data}`);
    });
    res.json(res_data);
};

module.exports = view_students;