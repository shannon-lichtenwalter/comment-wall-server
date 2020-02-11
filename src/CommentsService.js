const CommentsService = {
  getAllComments(db){
    return db
      .select('*')
      .from('comments')
      .returning('*');
  },

  postComment(db, username, comment, date) {
    return db
      .insert({username, comment, date})
      .into('comments')
      .returning('*');
  }
};

module.exports = CommentsService;
