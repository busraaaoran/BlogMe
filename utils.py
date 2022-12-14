from slugify import slugify
import uuid

def get_random():
    code = str(uuid.uuid4())[:8].replace('-', '').lower()
    return code

def create_slug(first_name, last_name):
        string_to_slugify = first_name +" "+ last_name
        slug = slugify(string_to_slugify + " " + get_random())
        return slug


def create_article_slug(title):
        string_to_slugify = title
        slug = slugify(string_to_slugify + " " + get_random())
        return slug

def create_category_slug(name):
        string_to_slugify = name
        slug = slugify(string_to_slugify + " " + get_random())
        return slug

def json_article(article):
        return {
            "id": article.id,
            "slug": article.slug,
            "title": article.title,
            "author": article.author,
            "category_id": article.category_id,
            "upload_date": (article.upload_date).isoformat(),
            "image":article.image,
            "content":article.content
        }
