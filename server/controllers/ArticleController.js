const Article = require("../models/Article");


const create = async (req, res, next) => {
  console.log(req.user)
  if (!req.user.isAdmin) {
    return res.status(200).json('You are not allowed to create an Article')
  }
  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
  const newArticle = new Article({
    ...req.body, slug, userId: req.user._id
  })
  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);

  } catch (err) {
    next(err);
  }
}

const getarticles = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const articles = await Article.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.articleId && { _id: req.query.articleId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalarticles = await Article.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthArticle = await Article.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      articles,
      totalarticles,
      lastMonthArticle,
    });

  } catch (error) {

  }
}

const deletearticle = async (req, res) => {
  if (!req.user.isAdmin || req.user._id !== req.params.userId) {
    return res.status(403).json('You are not allowed to delete this article');
  }
  try {
    await Article.findByIdAndDelete(req.params.articleId);
    res.status(200).json('The Article has been deleted')

  } catch (error) {
    res.status(403).json(error.message);
  }
}

const updatearticle = async (req, res) => {
  if (!req.user.isAdmin || req.user._id !== req.params.userId) {
    return res.status(403).json('You are not allowed to update this article');
  }
  try {
    const updatedarticle = await Article.findByIdAndUpdate(
      req.params.articleId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
        }
      }, { new: true })
      res.status(200).json(updatedarticle);
  }


  catch (error) {
    res.status(403).json(error);
  }
}

module.exports = { create, getarticles, deletearticle, updatearticle };