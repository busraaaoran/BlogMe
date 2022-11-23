from flask import Flask, request
import os
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, abort
from models import *
from flask_migrate import Migrate
from utils import *
from datetime import datetime
import jsonpickle
from passlib.hash import sha256_crypt

app = Flask(__name__)
api = Api(app)


app.secret_key = os.getenv("SECRET_KEY")

# DB CONFIGURATIONS
POSTGRES_USER = os.getenv("DB_USERNAME")
POSTGRES_PASSWORD = os.getenv("DB_PASSWORD")
POSTGRES_URL = os.getenv("DB_URL")
POSTGRES_NAME = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_URL}/{POSTGRES_NAME}"

CORS(app)

db.init_app(app)

migrate = Migrate(app, db)


class CategoriesController(Resource):

    def get(self):
        categories = Category.query.all()
        return list(c.json() for c in categories), 200

    def post(self):
        data = request.get_json()
        category = Category.query.filter_by(name=data['name']).first()
        if category:
            abort(400, message="Zaten aynı adda bir kategori var!")
        data['slug'] = create_category_slug(data['name'])
        new_category = Category(**data)
        db.session.add(new_category)
        db.session.commit()
        db.session.flush()

        return new_category.json(), 201


class SingleCategoryView(Resource):

    def get(self, id):
        category = Category.query.filter_by(id=id).first()
        if not category:
            abort(404, message="Böyle bir kategori bulunamadı!")

        return category.json()

    def delete(self, id):
        category = Category.query.filter_by(id=id).first()
        if not category:
            abort(404, message="Böyle bir kategori bulunamadı!")
        db.session.delete(category)
        db.session.commit()

        return {"message": f"{id} id numaralı kategori silindi!"}

    def put(self, id):
        data = request.get_json()
        category = Category.query.filter_by(id=id).first()

        if not category:
            abort(404, message="Güncellenecek kategori bulunamadı!")

        category.name = data['name']
        category.slug = create_category_slug(data['name'])
        db.session.commit()

        return category.json()


class UsersController(Resource):
    def get(self):
        users = User.query.all()
        if not users:
            abort(404, message="Hiçbir kullanıcı bulunamadı!")

        #mylist = list(u.json() for u in users)
        # print(jsonpickle.decode(users[0].json()['articles'][0]).author)
        # print(jsonpickle.decode(mylist[0]['articles'][0]).title)
        return list(u.json() for u in users), 200

    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user:
            abort(400, message="Bu emaille kayıtlı bir kullanıcı zaten var!")
        data['slug'] = create_slug(data['first_name'], data['last_name'])
        data['registration_date'] = datetime.utcnow()
        password = data['password']
        data['password'] = sha256_crypt.hash(password)
        if (User.query.filter_by(username=data['username']).first()):
            abort(
                400, message="Bu kullanıcı adı alınmış, başka bir kullanıcı adı seçiniz!")

        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        db.session.flush()

        return new_user.json(), 201


class SingleUserView(Resource):
    def get(self, slug):
        user = User.query.filter_by(slug=slug).first()
        if not user:
            abort(404, message="Böyle kayıtlı bir kullanıcı bulunamadı!")

        return user.json(), 200

    def put(self, slug):
        data = request.get_json()
        user = User.query.filter_by(slug=slug).first()
        if not user:
            abort(404, message="Güncellenecek kullanıcı bulunamadı!!")
        if 'first_name' in data.keys():
            user.first_name = data['first_name']
        if 'last_name' in data.keys():
            user.last_name = data['last_name']
        #user.slug = create_slug(user.first_name, user.last_name)
        if 'phone' in data.keys():
            user.phone = data['phone']
        if 'email' in data.keys():
            if (User.query.filter_by(email=data['email']).first()):
                abort(400, message="Zaten bu emaile sahip bir kullanıcı var!")
            else:
                user.email = data['email']
        if 'username' in data.keys():
            if (User.query.filter_by(username=data['username']).first()):
                abort(400, message="Zaten bu kullanıcı adına sahip bir kullanıcı var!")
            else:
                user.username = data['username']
        if 'profile_picture' in data.keys():
            user.profile_picture = data['profile_picture']

        db.session.commit()
        return user.json()

    def delete(self, slug):
        user = User.query.filter_by(slug=slug).first()
        if not user:
            abort(404, message="Böyle bir kullanıcı bulunamadı!!")

        db.session.delete(user)
        db.session.commit()

        return {"message": f"{user.id} id numaralı kullanıcı silindi!",
                "success": True}


class ArticlesController(Resource):
    def get(self):
        articles = Article.query.all()
        if not articles:
            abort(404, message="Hiçbir blog yazısı bulunamadı!!")
        return list(a.json() for a in articles), 200

    def post(self):
        data = request.get_json()
        article = Article.query.filter_by(
            title=data['title'], author=data['author']).first()
        if article:
            abort(400, message="Bir kullanıcı aynı başlıkta sadece bir yazı yazabilir!!")

        data['slug'] = create_article_slug(data['title'])
        data['upload_date'] = datetime.now()
        if 'image' not in data.keys():
            data['image'] = "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=600"

        new_article = Article(**data)
        db.session.add(new_article)
        db.session.commit()
        db.session.flush()

        return new_article.json(), 201


class SingleArticleView(Resource):
    def get(self, slug):
        article = Article.query.filter_by(slug=slug).first()
        if not article:
            abort(404, message="Böyle bir makale bulunamadı!!")
        return article.json(), 200

    def put(self, slug):
        data = request.get_json()
        article = Article.query.filter_by(slug=slug).first()
        if not article:
            abort(404, message="Güncellenecek makale bulunamadı!!")
        if 'author' in data.keys():
            abort(400, message="Makalenin yazarı değiştirilemez!!")
        if 'title' in data.keys():
            article_ = Article.query.filter_by(
                title=data['title'], author=article.author).first()
            if article_:
                abort(
                    400, message="Zaten aynı başlıkta bir makaleniz var, lütfen değiştiriniz!")
            article.title = data['title']
            article.slug = create_article_slug(data['title'])
        if 'category_id' in data.keys():
            article.category_id = data['category_id']
        article.upload_date = datetime.now()
        if 'image' in data.keys():
            article.image = data['image']
        if 'content' in data.keys():
            article.content = data['content']

        db.session.commit()
        return article.json()

    def delete(self, slug):
        article = Article.query.filter_by(slug=slug).first()
        if not article:
            abort(404, message="Böyle bir makale bulunamadı!")

        db.session.delete(article)
        db.session.commit()
        return {"message": f"{article.id} id numaralı makale silindi!!",
                "success": True}


class LoginView(Resource):
    def post(self):
        data = request.get_json()
        if 'username' in data.keys() and 'password' in data.keys():
            user = User.query.filter_by(username=data['username']).first()
            if not user:
                abort(404, message="Kullanıcı adı ya da parola yanlış!")
            is_logged_in = sha256_crypt.verify(data['password'], user.password)
            return {
                "status": is_logged_in,
                "user": user.json()}
        else:
            abort(400, message="Kullanıcı adı ve parolanızı girdiğinizden emin olunuz!")


api.add_resource(CategoriesController, '/categories')
api.add_resource(SingleCategoryView, '/category/<int:id>')
api.add_resource(UsersController, '/users')
api.add_resource(SingleUserView, '/user/<string:slug>')
api.add_resource(ArticlesController, '/articles')
api.add_resource(SingleArticleView, '/article/<string:slug>')
api.add_resource(LoginView, '/user/login')
'''
if __name__ == "__main__":
    app.run(debug=True)

'''
