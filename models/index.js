const User = require("./User"); 
const Post = require("./Post"); 
const Comment = require("./Comment"); 
// const Topic = require("./Topic");

User.hasMany(Post, {
    foreignKey: "user_id", 
    onDelete: "CASCADE"
}); 

User.hasMany(Comment, {
    foreignKey: "user_id", 
    onDelete: "CASCADE"
}); 

Post.hasMany(Comment, {
    foreignKey: "project_id",
    onDelete: "CASCADE"
}); 

Post.belongsTo(User, {
    foreignKey: "user_id"
}); 

Comment.belongsTo(Post, {
    foreignKey: "project_id"
}); 

Comment.belongsTo(User, {
    foreignKey: "user_id"
}); 

module.exports = { User, Post, Comment}