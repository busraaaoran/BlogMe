from flask_sqlalchemy import SQLAlchemy
from utils import *
import jsonpickle

db = SQLAlchemy()

#DB MODELS
class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100))
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(12))
    password = db.Column(db.String(150))
    profile_picture = db.Column(db.String(255))
    registration_date = db.Column(db.DateTime)
    username = db.Column(db.String(100), nullable=False)

    articles = db.relationship('Article',backref='user', lazy=True)

    def json(self):
        return {
            "id": self.id,
            "slug":self.slug,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone":self.phone,
            "profile_picture":self.profile_picture,
            "registration_date":(self.registration_date).isoformat(),
            "username":self.username,
            "articles":list(json_article(a) for a in self.articles)
        }


class Category(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100))
    name = db.Column(db.String(50))

    articles = db.relationship('Article', backref='category', lazy=True)
    
    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "articles": list(json_article(a) for a in self.articles)
        }
     

class Article(db.Model):
    __tablename__ = "article"

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100))
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    upload_date = db.Column(db.DateTime)
    image = db.Column(db.String(255))
    content = db.Column(db.Text, nullable=False)

    def json(self):
        return {
            "id": self.id,
            "slug": self.slug,
            "title": self.title,
            "author": self.author,
            "category_id": self.category_id,
            "upload_date": (self.upload_date).isoformat(),
            "image":self.image,
            "content":self.content
        }
