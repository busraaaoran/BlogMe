from passlib.hash import sha256_crypt
liste = {
    "ad":"büş",
    "soyad":"keko",
    "email":"bb@test.com"
}

password = ""
new_password = sha256_crypt.hash(password)
decrypted_password = sha256_crypt.verify("Busra9060@","$5$rounds=535000$209Sc.zzlAxDIFVZ$pG1fIHkQHQQKecXjZEXw4diH15ApYLNUj3anB4aHALC")
print(decrypted_password)
print(new_password)
#print('email' in liste.keys())