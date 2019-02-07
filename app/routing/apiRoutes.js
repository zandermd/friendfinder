const listOfFriends = require('../data/friends.json')
const fs = require('fs');

const match = null;
const totalDifference = null;

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(listOfFriends);
    })


    app.post('/api/friends', function (req, res) {
        let user = req.body;
        userAnswers = buildAnswersArray(user)
        let friendData = {
            name: user['name'],
            photo: user['photo'],
            answers: userAnswers
        }

        listOfFriends.push(friendData)
        newList = JSON.stringify(listOfFriends);
        findMatches(listOfFriends, userAnswers);

        fs.writeFileSync(__dirname + '/../data/friends.json', newList);
        res.json(JSON.stringify(match));
    })
}

const buildAnswersArray = (answers) => {
    return [answers['question-one'], answers['question-two'], answers['question-three'], answers['question-four'], answers['question-five']]
}

const findMatches = (listofFriends, userAnswers) => {
    listOfFriends.forEach((friend) => {
        // kinda of like a for loop but it loops over each element in an array
        let matchDifference = 0;
        friend.answers.forEach((answer, idx) => {
            matchDifference += Math.abs(answer - userAnswers[idx]);
        })

        if(totalDifference < matchDifference || totalDifference === null) {
            match = friend;
            totalDifference = matchDifference;
        }
    })
}