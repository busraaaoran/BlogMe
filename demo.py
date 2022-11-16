articles = {"articles": [
            {
                "id": 3,
                "slug": "about-turkish-cinematography2-3fe51e89",
                "title": "About Turkish Cinematography2",
                "author": 6,
                "category_id": 15,
                "upload_date": "2022-11-15T02:13:03.341277",
                "image": None,
                "content": "This article is about T\u00fcrkiye and its concerning differences about Cinematography compared to the other countries2."
            },
            {
                "id": 2,
                "slug": "about-turkish-cinematography3-dd1fbba5",
                "title": "About Turkish Cinematography3",
                "author": 6,
                "category_id": 15,
                "upload_date": "2022-11-15T14:29:29.590825",
                "image": None,
                "content": "This article is about T\u00fcrkiye and its concerning differences about Cinematography compared to the other countries."
            }
        ]
}


for a in articles["articles"]:
    print(a['title'])

print(len(articles["articles"]))


