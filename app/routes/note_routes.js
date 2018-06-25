let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  
  app.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const details = { '_id': ObjectID(noteId)};
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
  
  // When our express app gets a POST to /notes,
  app.post('/notes', (req, res) => {
    const note = {
                  text: req.body.body,
                  title: req.body.title 
                };
                
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred'});
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};