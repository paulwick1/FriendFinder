var surveyData = require ('../data/friends.js');

module.exports = function (app) {

	app.get('/api/surveys', function (req, res) {
		res.json(surveyData);
	});

	app.post('/api/surveys', function (req, res) {
		surveyData.push(req.body);
	})
}