var models = require('../models/models.js');

var statistics = {
  quizes: 0,
  comments: 0,
  numUnpublished: 0,
  numCommented: 0
};

var errors = [];


exports.calculate = function(req, res, next) {
  models.Quiz.count()
    .then(function(numQuizes) { // número de preguntas
      statistics.quizes = numQuizes;
      return models.Comment.count();
    })
    .then(function(numComments) { // número de comentarios
      statistics.comments = numComments;
      return models.Comment.countUnpublished();
    })
    .then(function(numUnpublished) { // número de comentarios sin publicar
      statistics.numUnpublished = numUnpublished;
      return models.Comment.countUnpublished();
    })
    .then(function(numCommented) { // número de preguntas con comentario
      statistics.numCommented = numCommented;
      return models.CountUnCommentedQuizes();
    })
    .catch(function(err) {
      errors.push(err);
    })
    .finally(function() {
      next();
    });
};



exports.show = function(req, res) {
  res.render('statistics/statistics.ejs', {
    statistics: statistics,
    errors: []
  })
};
