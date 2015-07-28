var models = require('../models/models.js');

var statistics = {
  quizes: 0,
  comments: 0,
  average_comments: 0,
  commented_quizes: 0,
  no_commented: 0
};

var errors = [];


/*exports.calculate = function(req, res, next) {
  models.Quiz.count()
   // preguntas
    .then(function(numQuizes) {
      statistics.quizes = numQuizes;
      return models.Comment.count();
    })
    // comentarios
    .then(function(numComments) {
      statistics.comments = numComments;
      return models.Comment.CountUnPublished();
    })
    // comentarios sin publicar
    .then(function(numUnpublished) {
      statistics.commentsUnpublished = numUnpublished;
      return models.Comment.CountCommentedQuizes();
    })
    // preguntas con comentarios
    .then(function(numCommented) {
      statistics.commentedQuizes = numCommented;
      return (models.Quiz.count() - models.CountCommentedQuizes());
    })
    // preguntas sin comentarios
    .then(function(numUnCommented) {
      statistics.commentsUncomented = numUnCommented;
      //return (models.Quiz.count() - models.CountCommentedQuizes());
    })
    .catch(function(err) {
      errors.push(err);
    })
    .finally(function() {
      next();
    });
};*/

exports.calculate = function(req, res, next) {
  statistics.commented_quizes = 0;
  statistics.no_commented = 0;
  Promise.all([
    models.Quiz.count(),
    models.Comment.count(),
    models.Quiz.findAll({
      include: [{
        model: models.Comment
      }]
    })
  ]).then(function(results) { // `results` is an array of [quizes, comments, all]
    statistics.quizes = results[0];
    statistics.comments = results[1];
    statistics.average_comments = (statistics.comments / statistics.quizes).toFixed(2);
    for (var i in results[2]) {
      if (results[2][i].comments.length) {
        statistics.commented_quizes++;
      } else {
        statistics.no_commented++;
      }
    }
  }).then(next, next);
};


exports.show = function(req, res) {
  res.render('statistics/statistics.ejs', {
    statistics: statistics,
    errors: []
  })
};
