var listOfFriends = require('../data/friends.json')
var fs = require('fs');

var match = null;
var totalDifference = null;

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(listOfFriends);
    })


    app.post('/api/friends', function (req, res) {
        // set up user variable from the request body object
        let user = req.body;

        let userAnswers = buildAnswersArray(user)

        let friendData = {
            name: user['name'],
            photo: user['photo'],
            answers: userAnswers
        }

        listOfFriends.push(friendData)
        newList = JSON.stringify(listOfFriends);
        match = findMatches(listOfFriends, userAnswers);

        fs.writeFileSync(__dirname + '/../data/friends.json', newList);
        res.json(JSON.stringify(match));
    })


}

var buildAnswersArray = (answers) => {
    return [answers['question-one'], answers['question-two'], answers['question-three'], answers['question-four'], answers['question-five']]
}

var findMatches = (listofFriends, userAnswers) => {
    listOfFriends.forEach((friend) => {
        // kinda of like a for loop but it loops over each element in an array
        let matchDifference = 0;
        friend.answers.forEach((answer, idx) => {
            matchDifference += Math.abs(answer - userAnswers[idx]);
        })

        if (totalDifference < matchDifference || totalDifference === null) {
            match = friend;
            totalDifference = matchDifference;
        }
    })
}