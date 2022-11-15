from wtforms import StringField, PasswordField, TextAreaField, Form, validators
from flask_wtf import FlaskForm

class RegisterForm(FlaskForm):
    first_name = StringField("Ad", validators=[validators.Length(min=2, max=100)])
    last_name = StringField("Soyad", validators=[validators.Length(min=2, max=100)])
    username = StringField("Kullanıcı Adı", validators=[validators.Length(min=5, max=100)])
    email = StringField("Email", validators=[validators.Email(message="Lütfen geçerli bir email adresi giriniz!!")])
    password = PasswordField("Parola", validators=[validators.DataRequired(message="Parola alanı boş bırakılamaz"),
    validators.EqualTo(fieldname="confirm", message="Parolanız uyuşmuyor, lütfen kontrol ediniz!!"),
    validators.Length(min=8, max=150),
    validators.Regexp(regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", message="Parolanız en az 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter içermeli ve en az 8 karakter uzunluğunda olmalıdır.")])
    confirm = PasswordField("Parolayı doğrulayın")
    phone = StringField("Telefon Numarası", validators=[validators.Regexp(regex="^\d{3}[-]{1}\d{3}[-]{1}\d{4}$",message="Geçerli telefon numarası formatı xxx-xxx-xxxx şeklindedir.")])


class LoginForm(FlaskForm):
    username = StringField("Kullanıcı Adı")
    password = PasswordField("Parola")

class ArticleForm(FlaskForm):
    title = StringField("Başlık", validators=[validators.Length(max=150)])
    content = TextAreaField("İçerik", validators=[validators.DataRequired(message="Bu alan boş bırakılamaz!!")])