from passlib.hash import sha256_crypt
liste = {
    "ad":"büş",
    "soyad":"keko",
    "email":"bb@test.com"
}

password = "1234"
new_password = sha256_crypt.hash(password)
decrypted_password = sha256_crypt.verify(password,new_password)
print(decrypted_password)
print(new_password)
#print('email' in liste.keys())