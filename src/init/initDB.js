const dbConnection = require('../db/connection');
const sequelize = require('../db/sequelize');

const Article = require('../models/article');
const Comment = require('../models/comment');
const Tag = require('../models/tag');
const User = require('../models/user');

const initRelation = () => {

    //user and article
    User.hasMany(Article,{
        onDelete:'CASCADE'
    });
    Article.belongsTo(User);

    //user and comments
    User.hasMany(Comment,{
        onDelete:'CASCADE'
    });
    Comment.belongsTo(User);

    //user and article(like)
    User.belongsToMany(Article,{
        through:'Like',
        uniqueKey:false,
        timestamps:false
    });
    Article.belongsToMany(User,{
        through:'Like',
        uniqueKey:false,
        timestamps:false
    });

    //user and user(follow)
    User.belongsToMany(User,{
        through:'Follow',
        uniqueKey:false,
        as:'followers'
    });

    //article and tag
    Article.belongsToMany(Tag,{
        through:'TagList',
        uniqueKey:false,
        timestamps:false
    });
    Article.belongsToMany(Tag,{
        through:'TagList',
        uniqueKey:false,
        timestamps:false
    });
}

const initDBwithUpdate = async () => {
    //dbConnection
    await dbConnection();

    //init the model relationship
    await initRelation();

    //move the relationship into the database
    await sequelize.sync({alter:true});
    console.log('relationship updated');
}

const initDBwithoutUpdate = async () => {
    //dbConnection
    await dbConnection();
}

module.exports = {
    initDBwithUpdate,
    initDBwithoutUpdate
}